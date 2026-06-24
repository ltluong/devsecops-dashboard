import os
import json
import sys
import sqlite3

DB_FILE = "devsecops.db"

def import_to_db(data, source_file):
    """Hàm xử lý parse dữ liệu từ SARIF (Snyk/Trivy/Semgrep) và nạp vào SQLite"""
    try:
        conn = sqlite3.connect(DB_FILE)
        cursor = conn.cursor()
        
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
        runs = data.get("runs", [])
        for run in runs:
            # Lấy tên tool quét (Snyk, Trivy, Semgrep...)
            tool_name = run.get("tool", {}).get("driver", {}).get("name", "Unknown")
            
            results = run.get("results", [])
            for result in results:
                rule_id = result.get("ruleId", "N/A")
                message = result.get("message", {}).get("text", "No description")
                level = result.get("level", "warning")
                
                locations = result.get("locations", [])
                file_path = "Unknown"
                start_line = 0
                if locations:
                    phys_loc = locations[0].get("physicalLocation", {})
                    file_path = phys_loc.get("artifactLocation", {}).get("uri", "Unknown")
                    start_line = phys_loc.get("region", {}).get("startLine", 0)
                
                cursor.execute('''
                    INSERT INTO vulnerabilities (rule_id, severity, message, file_path, start_line, source_tool)
                    VALUES (?, ?, ?, ?, ?, ?)
                ''', (rule_id, level, message, file_path, start_line, tool_name))
                counter += 1
        
        conn.commit()
        print(f"✅ [{tool_name}] Đã nạp thành công {counter} bản ghi từ {source_file} vào DB!")
        
    except Exception as e:
        print(f"❌ LỖI HỆ THỐNG khi nạp DB từ {source_file}: {str(e)}")
    finally:
        if 'conn' in locals():
            conn.close()

def main():
    if len(sys.argv) < 2:
        print("❌ Thiếu tham số! Cú pháp: python3 import_semgrep_to_db.py <duong_dan_file_sarif>")
        return

    sarif_file = sys.argv[1]

    if not os.path.exists(sarif_file):
        print(f"❌ Không tìm thấy file báo cáo: {sarif_file}")
        return

    try:
        with open(sarif_file, "r", encoding="utf-8") as f:
            data = json.load(f)
            import_to_db(data, sarif_file)
    except Exception as e:
        print(f"❌ Lỗi khi đọc file SARIF {sarif_file}: {str(e)}")

if __name__ == "__main__":
    main()
