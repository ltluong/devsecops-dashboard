import os
import json
import sys
import sqlite3

DB_FILE = "devsecops.db"

def import_dast_to_db(json_file):
    if not os.path.exists(json_file):
        print(f"❌ Không tìm thấy file DAST: {json_file}")
        return

    try:
        with open(json_file, "r", encoding="utf-8") as f:
            data = json.load(f)
        
        conn = sqlite3.connect(DB_FILE)
        cursor = conn.cursor()
        
        # Đảm bảo bảng đã tồn tại
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS vulnerabilities (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                rule_id TEXT,
                severity TEXT,
                message TEXT,
                file_path TEXT,
                start_line INTEGER,
                source_tool TEXT
            )
        ''')
        
        counter = 0
        # Cấu trúc mẫu chuẩn của OWASP ZAP JSON
        site_data = data.get("site", [])
        if isinstance(site_data, dict): site_data = [site_data]
        
        for site in site_data:
            alerts = site.get("alerts", [])
            for alert in alerts:
                rule_id = alert.get("pluginId", "DAST-Rule")
                alert_name = alert.get("alert", "DAST Vulnerability")
                risk_desc = alert.get("riskdesc", "warning").split(" ")[0].lower() # High, Medium, Low
                desc = alert.get("desc", "No description")
                url_target = alert.get("instances", [{}])[0].get("uri", "URL Target")
                
                cursor.execute('''
                    INSERT INTO vulnerabilities (rule_id, severity, message, file_path, start_line, source_tool)
                    VALUES (?, ?, ?, ?, ?, ?)
                ''', (rule_id, risk_desc, alert_name + ": " + desc[:100], url_target, 0, "DAST/ZAP"))
                counter += 1
                
        conn.commit()
        conn.close()
        print(f"✅ [DAST] Đã nạp thành công {counter} lỗ hổng từ {json_file} vào DB!")
    except Exception as e:
        print(f"❌ Lỗi xử lý file DAST: {str(e)}")

if __name__ == "__main__":
    file_path = sys.argv[1] if len(sys.argv) > 1 else "dast-report.json"
    import_dast_to_db(file_path)
