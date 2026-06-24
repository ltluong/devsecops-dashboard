import os
import json
import sys
import sqlite3

DB_FILE = "devsecops.db"

def import_vitest_to_db(data, source_file):
    try:
        conn = sqlite3.connect(DB_FILE)
        cursor = conn.cursor()
        
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS test_results (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                test_suite TEXT,
                test_name TEXT,
                status TEXT,
                duration REAL,
                error_message TEXT,
                source_tool TEXT
            )
        ''')
        
        counter = 0
        
        # Thử đọc theo cấu trúc Vitest chuẩn (giống Jest)
        test_results = data.get("testResults", [])
        
        # Nếu không tìm thấy cấu trúc "testResults" phân cấp, kiểm tra xem có phải mảng phẳng không
        if not test_results and isinstance(data, list):
            test_results = data

        for suite in test_results:
            suite_name = suite.get("name", "Unknown Suite")
            
            # Tìm danh sách các bài test con
            assertion_results = suite.get("assertionResults", [])
            
            # Dự phòng nếu cấu trúc file lưu trực tiếp kết quả test ở cấp suite
            if not assertion_results and "status" in suite:
                assertion_results = [suite]
                
            for test in assertion_results:
                test_name = test.get("title", test.get("fullName", "Unknown Test"))
                status = test.get("status", "failed")
                duration = test.get("duration", 0)
                
                failure_messages = test.get("failureMessages", [])
                error_message = "\n".join(failure_messages) if failure_messages else None
                
                cursor.execute('''
                    INSERT INTO test_results (test_suite, test_name, status, duration, error_message, source_tool)
                    VALUES (?, ?, ?, ?, ?, ?)
                ''', (suite_name, test_name, status, duration, error_message, "Vitest"))
                counter += 1
                
        conn.commit()
        print(f"✅ [Vitest] Đã nạp thành công {counter} kết quả test từ {source_file} vào DB!")
        
    except Exception as e:
        print(f"❌ LỖI HỆ THỐNG khi nạp kết quả Vitest: {str(e)}")
    finally:
        if 'conn' in locals():
            conn.close()

def main():
    if len(sys.argv) < 2:
        print("❌ Thiếu tham số! Cú pháp: python3 import_vitest_to_db.py <vitest-report.json>")
        return

    json_file = sys.argv[1]

    if not os.path.exists(json_file):
        print(f"❌ Không tìm thấy file báo cáo Vitest: {json_file}")
        return

    try:
        with open(json_file, "r", encoding="utf-8") as f:
            data = json.load(f)
            import_vitest_to_db(data, json_file)
    except Exception as e:
        print(f"❌ Lỗi khi đọc file JSON Vitest {json_file}: {str(e)}")

if __name__ == "__main__":
    main()
