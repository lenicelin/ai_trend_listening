# 智企前瞻 AI Pulse — AI 趨勢聽誌與電子報自動化生成系統

[![Python](https://img.shields.io/badge/Python-3.10%2B-blue.svg)](https://www.python.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15%2B-blue)](https://www.postgresql.org/)
[![pgvector](https://img.shields.io/badge/pgvector-Supported-green)](https://github.com/pgvector/pgvector)
[![License](https://img.shields.io/badge/License-Proprietary-red.svg)]()

**智企前瞻 AI Pulse** 是一套專為企業高階主管與決策團隊打造的自動化 AI 趨勢監聽、精選策展與電子報發行系統。系統結合強大的多階段流水線（Multi-Stage Pipeline）、PostgreSQL + `pgvector` 向量資料庫架構與 LLM 輔助摘要生成，確保發行內容兼具權威性、商業實務價值與 100% 資料真實度。

---

## 📌 核心特色與亮點 (Key Features)

1. **零捏造數據 (Zero Hallucination)**
   - 100% 忠實擷取並對接真實權威新聞媒體報導（如 TechCrunch、Wired、VentureBeat、Google News 美/台雙區檢索）。
   - 新聞標題、連結、來源媒體與原創摘要絕對真實，避免 LLM 虛構數據。

2. **多階段單向流水線 (Multi-Stage Pipeline)**
   - **Stage 1 (監聽與品質過濾)**：多源頭 RSS 與 API 自動擷取，經特定應用場景、技術細節與量化效益 3 大原則自動清理去重。
   - **Stage 2 (動態主題策展)**：讀取編輯團隊設定之週主題，進行 4-Tier 權重評分（100分制），並生成 HR、財務、法務、行銷、製造 5 大職能切入視角與選入理由。
   - **Stage 3 (電子報生成與自動歸檔)**：動態同步網頁版 `newsletter.html` / `newsletter.js` / `cases.json`，並一鍵封存離線單檔 HTML 至 `archives/` 目錄。

3. **高併發資料庫支援 (PostgreSQL + pgvector)**
   - 專為企業級運維設計，支援原生 PostgreSQL 與 `pgvector` 擴充套件，具備 1536 維向量 Embeddings 語意檢索能力。
   - 完全相容 Docker Compose 本地部署及 Supabase / AWS RDS / Neon 等雲端託管資料庫。

4. **24 小時背景自動維運服務 (Scheduler Service)**
   - 每日 17:00 自動執行 Stage 1 增量新聞採集。
   - 每週五 09:00 自動觸發 Master Pipeline 完成主題策展、電子報建置與 Issue 歷史封存。

---

## 🏗️ 系統架構與流水線流程 (System Architecture)

```mermaid
flowchart TD
    subgraph Master [主控與排程層 Master Orchestration]
        PIPE[master_run_pipeline.py - 一鍵流水線執行器]
        SCHED[master_scheduler_service.py - 背景定時服務]
    end

    subgraph Config [編輯主題設定]
        EXCEL[(data/weekly_newsletter_theme.xlsx)] -->|讀取 Active 主題| STAGE2
    end

    subgraph DB [資料庫層 Database Layer]
        PG[(PostgreSQL + pgvector)]
    end

    subgraph STAGE1 [Stage 1：新聞監聽與品質過濾]
        S1_FETCH[stage1_news_fetcher.py]
        S1_CLEAN[stage1_clean_database.py]
        S1_RUN[run_stage1.py]
        S1_FETCH --> S1_DATA[(data/stage1_ai_news.json / xlsx)]
        S1_FETCH --> PG
    end

    subgraph STAGE2 [Stage 2：主題策展與 4-Tier 評分]
        S1_DATA --> S2_CURATE[stage2_curator.py]
        S2_RUN[run_stage2.py]
        S2_CURATE --> S2_DATA[(data/stage2_curated_news.xlsx / report.md)]
        S2_CURATE --> PG
    end

    subgraph STAGE3 [Stage 3：電子報發行與歷史歸檔]
        S2_DATA --> S3_BUILD[stage3_newsletter_builder.py]
        S3_ARC[stage3_archive_engine.py]
        S3_RUN[run_stage3.py]
        S3_BUILD --> S3_WEB[newsletter.html / newsletter.js / cases.json]
        S3_ARC --> ARCHIVE[(archives/Issue_XX/standalone_newsletter.html)]
    end

    PIPE -.->|順序 1| STAGE2
    PIPE -.->|順序 2| STAGE3
    PIPE -.->|順序 3| S3_ARC

    SCHED -.->|每日 17:00| STAGE1
    SCHED -.->|每週五 09:00| PIPE
```

---

## ⚙️ 4-Tier 策展評分機制 (Stage 2 Curation Standard)

Stage 2 依據總分 100 分制進行新聞篩選與排序：

| 評分項目 | 權重 | 評估標準描述 |
| :--- | :---: | :--- |
| **1. 主題契合度** | **40%** | 是否高度切合本期 Excel 設定之「週主題」與「核心領域」。 |
| **2. 實務價值與 ROI** | **30%** | 是否具備具體企業應用場景、量化效益數據或落地合規處置方案。 |
| **3. 媒體權威度與時效** | **20%** | 報導來源是否為國際權威科技媒體，且發布時間具備高時效性。 |
| **4. 可讀性與切入點** | **10%** | 案例是否易於高階主管吸收，並具備啟發性的商業策略洞察。 |

---

## 🛠️ 環境需求與安裝 (Setup & Installation)

### 1. 系統需求
- **Python**: 3.10 +
- **Database**: PostgreSQL 15+ (需支援 `pgvector`) 或 Supabase 雲端資料庫
- **Docker**: (選用) 用於本地快速啟動 PostgreSQL

### 2. 安裝 Python 依賴套件
```bash
pip install -r requirements.txt
```

### 3. 設定環境變數 (`.env`)
複製 `.env.example` 並建立 `.env` 檔案：
```env
# Gemini API Key (用於 Stage 2 與 Stage 3 之專家評比與摘要生成)
GEMINI_API_KEY=your_gemini_api_key_here
LLM_PROVIDER=gemini

# PostgreSQL 資料庫連線設定
DB_BACKEND=postgresql
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=ai_trend_listening
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/ai_trend_listening
```

---

## 🗄️ 資料庫啟動與無縫轉移 (Database Migration)

### 1. 使用 Docker Compose 啟動本地 PostgreSQL
```bash
docker compose up -d
```
檢查運行狀態：
```bash
docker compose ps
```

### 2. 一鍵初始化與歷史資料轉移
執行以下腳本，將自動開啟 `vector` 擴充套件、建立資料表並移轉既有 JSON/Excel 歷史新聞：
```bash
python init_db_and_migrate.py
```

---

## 🚀 快速上手與執行指令 (Usage Guide)

### 1. 一鍵連貫執行全流水線 (Master Pipeline)
自動順序執行 Stage 2 策展 ➔ Stage 3 建置 ➔ 期數封存歸檔：

```bash
python master_run_pipeline.py
```

### 2. 分階段獨立執行 (Independent Stage Execution)

#### 🔹 Stage 1：新聞聽誌與採集
```bash
python run_stage1.py
# 或直接呼叫爬蟲核心
python stage1_news_fetcher.py
```

#### 🔹 Stage 2：每週主題策展與專家評分
```bash
python run_stage2.py
```

#### 🔹 Stage 3：電子報發行與歷史歸檔
```bash
python run_stage3.py
```

### 3. 啟動 24 小時背景自動維運服務 (Scheduler)
```bash
python master_scheduler_service.py
```
> **排程觸發規則**：
> - **每日 17:00**：自動觸發 Stage 1 增量新聞抓取。
> - **每週五 09:00**：自動觸發 Master Pipeline 全流程生成與備份。

---

## 📂 專案目錄結構 (Project Directory Layout)

```text
ai_trend_listening/
├── 📄 master_run_pipeline.py        # 🚀 一鍵流水線連貫執行器 (Master Orchestrator)
├── 📄 master_scheduler_service.py   # ⏰ 24 小時背景定時維運服務 (Scheduler)
├── 📄 init_db_and_migrate.py        # 🗄️ 資料庫 Schema 初始化與資料遷移工具
├── 📄 db_manager.py                 # 🔌 PostgreSQL + pgvector 資料庫管理模組
│
├── 📄 stage1_news_fetcher.py        # Stage 1 新聞爬蟲與 3 大品質過濾器
├── 📄 stage1_clean_database.py      # Stage 1 資料庫清理與自動去重
├── 📄 run_stage1.py                 # Stage 1 獨立執行器
│
├── 📄 stage2_curator.py             # Stage 2 主題對接與 4-Tier 專家評分策展
├── 📄 run_stage2.py                 # Stage 2 獨立執行器
│
├── 📄 stage3_newsletter_builder.py  # Stage 3 網頁版電子報動態建置器
├── 📄 stage3_archive_engine.py      # Stage 3 Issue 離線打包與歸檔引擎
├── 📄 run_stage3.py                 # Stage 3 獨立執行器
│
├── 📄 setup_weekly_theme_excel.py   # 週主題 Excel 範本初始化工具
├── 📄 sync_stage1_excel.py          # Stage 1 新聞同步寫入 Excel 工具
│
├── 🌐 newsletter.html               # 電子報主頁面 (HTML)
├── 🎨 newsletter.css                # 電子報 UI 明亮風格樣式檔 (CSS)
├── ⚡️ newsletter.js                 # 互動篩選與數據雙軌備援邏輯 (JS)
│
├── 📂 data/                         # 資料庫與產出檔案目錄
│   ├── weekly_newsletter_theme.xlsx # ⭐️【編輯核心】每週主題設定檔
│   ├── stage1_ai_news.json          # Stage 1 增量新聞庫 (JSON)
│   ├── stage1_ai_news.xlsx          # Stage 1 原始新聞 (Excel)
│   ├── stage2_curated_news.xlsx     # Stage 2 精選新聞與評分 (Excel)
│   ├── stage2_curated_report.md     # Stage 2 專家評比分析報告 (Markdown)
│   └── newsletter_cases.json        # Stage 3 精選 6 大案例庫 (JSON)
│
├── 📂 archives/                     # 歷史電子報自動封存目錄
│   └── Issue_XX_YYYY-MM-DD_主題/    # 獨立期數備份 (含離線單檔 HTML)
│
├── 📂 docs/                         # 系統架構與開發文件
│   ├── IMPLEMENTATION_PLAN.md       # 📋 系統技術實作計畫書
│   ├── POSTGRES_MIGRATION_GUIDE.md  # 📘 PostgreSQL 升級與維運指南
│   └── PRD.md                       # 📕 產品需求文件
│
├── 📄 docker-compose.yml            # PostgreSQL + pgvector Docker 配置
├── 📄 requirements.txt              # Python 依賴套件清單
└── 📄 .env.example                  # 環境變數設定範例
```

---

## 📖 相關技術文件與手冊 (Documentation)

- 📋 [系統技術實作計畫書 (IMPLEMENTATION_PLAN.md)](file:///c:/Users/Pei-Ying/.antigravity/ai_trend_listening/docs/IMPLEMENTATION_PLAN.md)
- 📘 [PostgreSQL 升級與維運指南 (POSTGRES_MIGRATION_GUIDE.md)](file:///c:/Users/Pei-Ying/.antigravity/ai_trend_listening/docs/POSTGRES_MIGRATION_GUIDE.md)
- 📕 [產品需求規格書 (PRD.md)](file:///c:/Users/Pei-Ying/.antigravity/ai_trend_listening/docs/PRD.md)

---

## 📄 版權與維護 (License)

智企前瞻 AI Pulse © 2026. All rights reserved.
