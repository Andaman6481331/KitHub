import pymysql

def test_connection():
    config = {
        "host": "127.0.0.1",
        "port": 3306,
        "user": "root",
        "password": "Andaman#1",
        "database": "kithub"
    }
    
    try:
        print(f"Attempting to connect to database '{config['database']}' at {config['host']}:{config['port']}...")
        conn = pymysql.connect(**config)
        print("Connection successful!")
        
        with conn.cursor() as cursor:
            cursor.execute("SHOW TABLES")
            tables = cursor.fetchall()
            print(f"Found {len(tables)} tables: {[t[0] for t in tables]}")
            
            if len(tables) > 0:
                cursor.execute("SELECT COUNT(*) FROM items")
                count = cursor.fetchone()[0]
                print(f"'items' table has {count} records.")
        
        conn.close()
    except Exception as e:
        print(f"Connection failed: {e}")

if __name__ == "__main__":
    test_connection()
