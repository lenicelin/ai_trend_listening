# AI Trend Listening — PostgreSQL 資料庫升級與運維指南

本指南說明如何啟動與維運 《AI Trend Listening》 的 PostgreSQL 資料庫環境（包含 pgvector 向量搜尋擴充套件）。

---

## 一、 快速啟動本地 PostgreSQL + pgvector (Docker Compose)

系統已內建 `docker-compose.yml` 配置檔，請確定電腦已安裝 Docker / Docker Desktop。

### 1. 啟動 PostgreSQL 服務
在專案根目錄開啟終端機執行：
```bash
docker compose up -d
```

### 2. 檢查資料庫運行狀態
```bash
docker compose ps
```
確認 `ai_trend_postgres` 容器呈現 `Up (healthy)` 狀態。

---

## 二、 設定環境變數 (`.env`)

確認專案根目錄下的 `.env` 設定檔內容：

```env
# 選擇啟用資料庫類型 (postgresql 或 sqlite)
DB_BACKEND=postgresql

# PostgreSQL 連線設定
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=ai_trend_listening
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/ai_trend_listening
```

> **提示 (使用 Supabase / Neon / AWS RDS 等雲端 PostgreSQL)**：  
> 若您使用雲端託管資料庫，只需將 `DATABASE_URL` 替換為雲端業者提供的 SSL/Postgres 連線字串即可。

---

## 三、 一鍵初始化 Schema 與資料無縫轉移

在已經啟動 PostgreSQL (或設定好雲端 DATABASE_URL) 後，執行以下指令：

```bash
python init_db_and_migrate.py
```

這將會自動執行：
1. 在 PostgreSQL 中自動啟動 `CREATE EXTENSION IF NOT EXISTS vector;`。
2. 建立 `articles` (包含 vector(1536) 欄位)、`weekly_themes` 及 `curated_articles` 資料表。
3. 自動將過去 SQLite `data/ai_trend_listening.db` 與 `stage1_ai_news.json` 裡的歷史累積資料無痛移轉至 PostgreSQL。

---

## 四、 多管道 Pipeline 驗證

資料庫升級完成後，既有的所有自動化流程完全不受影響：

* **Stage 1 (新聞監聽累積)**：
  ```bash
  python run_stage1.py
  ```
* **Stage 2 (主題 4-Tier 策展)**：
  ```bash
  python run_stage2.py
  ```
* **Stage 3 (電子報建置)**：
  ```bash
  python run_stage3.py
  ```
* **全排程背景服務 (Scheduler Service)**：
  ```bash
  python master_scheduler_service.py
  ```

---

## 五、 自動向下相容 (SQLite Fallback) 機制

如果 Docker 未啟動或 PostgreSQL 連線失敗，`db_manager.py` 會自動切換回原本的 SQLite 資料庫 (`data/ai_trend_listening.db`)，確保系統在任何情況下皆可正常維護運作。
