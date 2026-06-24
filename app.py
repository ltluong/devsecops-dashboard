import sqlite3
from flask import Flask, render_template_string

app = Flask(__name__)
DB_FILE = "devsecops.db"

def get_db_summary():
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    
    def fetch_data(query, params=(), default=[]):
        try:
            cursor.execute(query, params)
            return cursor.fetchall()
        except:
            return default

    # 1. Tổng số lỗ hổng tính từ các công cụ hiện tại (loại bỏ Snyk khỏi tổng số nếu cần, ở đây lấy tổng trừ Snyk)
    total_vulns = fetch_data("SELECT COUNT(*) FROM vulnerabilities WHERE source_tool NOT LIKE '%Snyk%'", (), [(0,)])[0][0]
    
    # 2. Thống kê số lỗi thực tế theo từng công cụ (Bỏ qua Snyk)
    tool_stats = fetch_data("SELECT source_tool, COUNT(*) FROM vulnerabilities WHERE source_tool NOT LIKE '%Snyk%' GROUP BY source_tool")
    
    # 3. Phân luồng dữ liệu vào 3 Quality Gates chuẩn mới
    # CỔNG 1: Đã LOẠI BỎ Snyk - Chỉ giữ lại SonarQube và Semgrep
    gate1_data = fetch_data('''
        SELECT source_tool, rule_id, severity, file_path 
        FROM vulnerabilities 
        WHERE (source_tool LIKE "%Sonar%" OR source_tool LIKE "%Semgrep%")
          AND source_tool NOT LIKE "%Snyk%"
        ORDER BY id DESC LIMIT 10
    ''')
    
    # CỔNG 2: CONTAINER SECURITY (Trivy)
    gate2_data = fetch_data('''
        SELECT source_tool, rule_id, severity, file_path 
        FROM vulnerabilities 
        WHERE source_tool LIKE "%trivy%"
        ORDER BY id DESC LIMIT 10
    ''')
    
    # CỔNG 3: DYNAMIC SECURITY (DAST / OWASP ZAP)
    gate3_data = fetch_data('''
        SELECT source_tool, rule_id, severity, file_path 
        FROM vulnerabilities 
        WHERE source_tool LIKE "%DAST%" OR source_tool LIKE "%ZAP%"
        ORDER BY id DESC LIMIT 10
    ''')

    conn.close()
    return {
        "total_vulns": total_vulns,
        "tool_stats": tool_stats,
        "gate1": gate1_data,
        "gate2": gate2_data,
        "gate3": gate3_data
    }

@app.route("/")
def index():
    data = get_db_summary()
    
    html_header = """<!DOCTYPE html><html lang="vi"><head><meta charset="UTF-8"><title>DevSecOps 3-Gate Dashboard</title><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"></head><body class="bg-light"><div class="container my-5"><h1 class="mb-2 text-center text-primary">🛡️ DEVSECOPS 3-GATE AUTOMATION DASHBOARD</h1><p class="text-center text-muted mb-4">Hệ thống tổng hợp tự động tối ưu: SonarQube, Semgrep, Trivy, DAST</p><hr>"""
    
    html_overview = """<div class="row text-center g-3 mb-5"><div class="col-md-4"><div class="card bg-danger text-white p-4 shadow-sm h-100 d-flex flex-column justify-content-center"><h3>Tổng Số Lỗ Hổng</h3><p class="display-3 font-weight-bold mb-0">{{ data['total_vulns'] }}</p></div></div><div class="col-md-8"><div class="card bg-dark text-white p-3 shadow-sm h-100"><h5>Trạng thái các công cụ quét cốt lõi</h5><div class="row text-start mt-2 px-3">{% for tool, count in data['tool_stats'] %}<div class="col-6 mb-2">🔹 <strong>{{ tool }}</strong>: <span class="badge bg-secondary">{{ count }} lỗi</span></div>{% else %}<div class="col-12 text-center text-muted">Chưa nạp dữ liệu từ SonarQube / Semgrep / Trivy / DAST.</div>{% endfor %}</div></div></div></div>"""
    
    html_gate1 = """<div class="card shadow-sm mb-4"><div class="card-header bg-primary text-white font-weight-bold">💻 CỔNG 1: SOURCE CODE SECURITY (SonarQube & Semgrep)</div><div class="card-body p-0 table-responsive"><table class="table table-striped table-hover mb-0"><thead><tr class="table-secondary"><th>Công cụ</th><th>Mã Luật (Rule)</th><th>Mức độ</th><th>Vị trí File</th></tr></thead><tbody>{% for tool, rule, sev, path in data['gate1'] %}<tr><td><span class="badge bg-info text-dark">{{ tool }}</span></td><td><code>{{ rule }}</code></td><td><span class="badge {% if sev in ['error','high','critical'] %}bg-danger{% else %}bg-warning text-dark{% endif %}">{{ sev | upper }}</span></td><td><small>{{ path }}</small></td></tr>{% else %}<tr><td colspan="4" class="text-center py-3 text-muted">Cổng 1 Sạch! Không phát hiện lỗi mã nguồn từ SonarQube và Semgrep.</td></tr>{% endfor %}</tbody></table></div></div>"""
    
    html_gate2 = """<div class="card shadow-sm mb-4"><div class="card-header bg-secondary text-white font-weight-bold">🏗️ CỔNG 2: CONTAINER SECURITY (Trivy)</div><div class="card-body p-0 table-responsive"><table class="table table-striped table-hover mb-0"><thead><tr class="table-secondary"><th>Công cụ</th><th>Mã CVE / Rule</th><th>Mức độ</th><th>Thành phần ảnh hưởng</th></tr></thead><tbody>{% for tool, rule, sev, path in data['gate2'] %}<tr><td><span class="badge bg-dark">{{ tool }}</span></td><td><code>{{ rule }}</code></td><td><span class="badge {% if sev in ['error','high','critical'] %}bg-danger{% else %}bg-warning text-dark{% endif %}">{{ sev | upper }}</span></td><td><small>{{ path }}</small></td></tr>{% else %}<tr><td colspan="4" class="text-center py-3 text-muted">Cổng 2 Sạch! Docker Image an toàn.</td></tr>{% endfor %}</tbody></table></div></div>"""
    
    html_gate3 = """<div class="card shadow-sm mb-4"><div class="card-header bg-warning text-dark font-weight-bold">🌐 CỔNG 3: DYNAMIC SECURITY (DAST)</div><div class="card-body p-0 table-responsive"><table class="table table-striped table-hover mb-0"><thead><tr class="table-secondary"><th>Công cụ</th><th>Mã Luật / Cảnh báo</th><th>Mức độ</th><th>Endpoint URL</th></tr></thead><tbody>{% for tool, rule, sev, path in data['gate3'] %}<tr><td><span class="badge bg-warning text-dark">{{ tool }}</span></td><td><code>{{ rule }}</code></td><td><span class="badge {% if sev in ['error','high','critical'] %}bg-danger{% else %}bg-warning text-dark{% endif %}">{{ sev | upper }}</span></td><td><small>{{ path }}</small></td></tr>{% else %}<tr><td colspan="4" class="text-center py-3 text-muted">Cổng 3 Sạch! Không phát hiện lỗ hổng động.</td></tr>{% endfor %}</tbody></table></div></div>"""
    
    html_footer = """</div></body></html>"""

    full_template = html_header + html_overview + html_gate1 + html_gate2 + html_gate3 + html_footer
    return render_template_string(full_template, data=data)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
