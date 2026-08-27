const EMBEDDED_CASES = [
  {
    "id": 1,
    "domain": "研發",
    "tech_stack": "LLM 代理與 AI 助手 (Agent)",
    "badge_class": "badge-enterprise",
    "title": "Claude Code、Gemini CLI與Codex共通信任風險，惡意GitHub議題可影響後續代理",
    "pub_date": "2026-08-10 00:00",
    "source": "iThome 科技報",
    "author": "iThome 產業資深編輯",
    "read_time": "5 分鐘細讀",
    "link": "https://www.ithome.com.tw/news/178005",
    "cover_image": "https://www.ithome.com.tw/sites/default/files/field/image/claude-gemini-codex-shared-trust-risk-20260810.png",
    "summary": "多個AI程式開發代理在工具權限、行程隔離及共享工作區存在信任落差，攻擊者可藉GitHub惡意內容繞過限制，造成程式碼執行、機密外洩，甚至持續影響後續代理。 攻擊者可透過GitHub議題送入惡意內容，進而影響代理執行。",
    "full_digest": "📖 閱讀筆記與精華摘要：Claude Code、Gemini CLI與Codex共通信任風險，惡意GitHub議題可影響後續代理\n📰 來源：iThome 科技報 | 📅 發布日期：2026-08-10 00:00\n🔗 原文網址：https://www.ithome.com.tw/news/178005\n🏷️ 領域分類：研發\n\n📌 一、事件背景與報導摘要\n  • 多個AI程式開發代理在工具權限、行程隔離及共享工作區存在信任落差，攻擊者可藉GitHub惡意內容繞過限制，造成程式碼執行、機密外洩，甚至持續影響後續代理\n  • Claude Code案例中，研究人員先利用允許執行的Git操作繞過安全檢查，在執行環境執行任意程式碼。Anthropic修補後，研究人員又找到讀取環境機密及利用公開服務帶出API金鑰的方法，其中最後一項問題編為CVE-2026-54316，Anthropic已將Claude Code對huggingface.co的預先允許存取範圍限縮至文件路徑。\n\n🔍 二、關鍵技術與架構細節\n  • 資安業者Novee Security分析Anthropic Claude Code、Google Gemini CLI與OpenAI Codex的自動化工作流程，發現三套AI程式開發代理雖採用不同安全機制，仍可能在工具權限、沙箱隔離及共享工作區等環節出現信任落差。攻擊者可透過GitHub議題送入惡意內容，進而影響代理執行，研究展示的攻擊方式包括遠端程式碼執行、機密資料外洩及持續控制後續代理。\n  • 外部輸入造成的提示注入、工具權限與命令限制失效、行程（process）與機密資料隔離不完整，以及共享工作區遭污染等問題，並非單純來自AI模型接受惡意提示，而是代理取得檔案、命令列及網路等工具後，各層防護對可信操作的判斷不一致。原本在單一環節成立的限制，資料或工作狀態交給下一個元件後可能不再有效。\n  • Gemini CLI的問題則出現在命令限制與行程隔離。工作流程表面上只允許少數命令，但實際執行時沒有完整套用限制，而另一方面，系統雖從代理啟動的子行程移除GitHub權杖及Gemini API金鑰，親代行程仍保留這些資料，攻擊者因而有機會從同一執行環境讀取。Google將相關安全問題評為CVSS 10.0，並修改非互動式自動執行環境的信任機制。\n  • Codex案例則利用兩次代理執行共用同一工作區，第一個Codex若受到惡意內容影響，可寫入Codex會自動讀取的AGENTS.md專案指令檔，而第二個Codex啟動後再把這份檔案當成指令載入，使第一階段的惡意影響延續到下一階段。\n\n💡 三、戰略佈局與產業影響\n  • OpenAI後來將兩次Codex執行拆到不同工作環境，避免前一階段留下的檔案影響後續代理，並進一步採用唯讀沙箱。研究人員表示，他們也在超過百個公開儲存庫發現類似AI代理自動化配置。",
    "key_metric": "Claude Code、Gemini CLI與Codex共通信任... │ iThome 科技報",
    "rationale": "對應主題《Claude Code、Gemini C》核心技術落地與實務應用。",
    "cover_bg": "linear-gradient(135deg, #2563eb, #06b6d4)",
    "icon": "💡",
    "problem_statement": {
      "text": "根據 iThome 科技報 報導，多個AI程式開發代理在工具權限、行程隔離及共享工作區存在信任落差，攻擊者可藉GitHub惡意內容繞過限制，造成程式碼執行、機密外洩，甚至持續影響後續代理。 攻擊者可透過GitHub議題送入惡意內容，進而影響代理執行。",
      "pain_points": [
        "請參閱全文章節拆解「一、事件背景與產業影響」"
      ]
    },
    "innovation_breakthrough": {
      "text": "採用關鍵技術：LLM 代理與 AI 助手 (Agent)。詳細技術細節與架構請參閱全文章節拆解。",
      "tech_highlights": [
        "核心採用關鍵技術：LLM 代理與 AI 助手 (Agent)",
        "請參閱全文章節拆解「二、關鍵技術與實作細節」"
      ]
    },
    "impact_and_roi": {
      "text": "專家評估切入點：對應主題《Claude Code、Gemini C》核心技術落地與實務應用。",
      "impact_results": [
        "請參閱全文章節拆解「四、決策效益與行動建議」"
      ]
    }
  },
  {
    "id": 2,
    "domain": "製造",
    "tech_stack": "邊緣 AI 感測與自動化控制",
    "badge_class": "badge-manufacturing",
    "title": "【2026自動化展】台達如何用 AI-Ready 架構支援跨廠部署與集中管理？",
    "pub_date": "2026-08-24 11:19",
    "source": "TechOrange 科技報橘",
    "author": "TechOrange 產業資深編輯",
    "read_time": "5 分鐘細讀",
    "link": "https://techorange.com/2026/08/24/2026automation-delta-ai-ready-linemanager/?utm_source=rss&utm_medium=feed&utm_campaign=techorange_rss",
    "cover_image": "https://techorange.com/app/uploads/2026/08/0132ea15e90c295f-1024x683.jpg",
    "summary": "以模組標準化為基礎，並將標準化範圍擴及設備、產線、通訊協定與資料結構，降低多家硬體拼湊的整合負擔，也能同步製程配方，支援快速換線與混線生產。 企業在不同國家設置產線，可縮短供應距離並分散營運風險，據點增加後。",
    "full_digest": "📖 閱讀筆記與精華摘要：【2026自動化展】台達如何用 AI-Ready 架構支援跨廠部署與集中管理？\n📰 來源：TechOrange 科技報橘 | 📅 發布日期：2026-08-24 11:19\n🔗 原文網址：https://techorange.com/2026/08/24/2026automation-delta-ai-ready-linemanager/?utm_source=rss&utm_medium=feed&utm_campaign=techorange_rss\n🏷️ 領域分類：製造\n\n📌 一、事件背景與報導摘要\n  • 關稅變化、供應鏈區域化與客戶在地生產需求，促使製造業重新配置全球產能。企業在不同國家設置產線，可縮短供應距離並分散營運風險，據點增加後，設備配置、製程經驗與管理方式也更難維持一致。「製造業目前面臨的重要課題，是如何將既有廠區累積的製造能力、產線經驗與專業知識，快速移轉至其他生產據點。」台達智能製造軟體新事業發展部處長陳鴻輝表示。\n  • 台達 Line Manager 扮演 IT 與 OT 之間的溝通樞紐，將設備、工單、產量、良率及人工站資料整理至動態看板，供管理者查看稼動狀況與生產異常；數位雙生用於設備調試及製程驗證，AI Agent 則協助調用資料與分析工具。\n\n🔍 二、關鍵技術與架構細節\n  • 台達今年在 2026 台北國際自動化工業大展中，展出一系列針對跨國設廠的部署與管理解決方案。主展位以軟硬體整合方案與應用成果為核心，以 AI-Ready 的智造架構回應跨域製造與管理的需求，包含：整線級數位雙生、智慧 PCB 噴塗膠協同模擬，以及人工站 AI 視覺工序偵測方案。第二展區則展出電子及半導體等行業專用的智造方案基石，從馬達、伺服驅動、控制器、機器視覺等產品，呈現 IIoT 架構下的完整產品組合。\n  • 台達將跨廠部署與集中管理列為主軸，建立可供 AI 運用的製造數據環境。陳鴻輝提到，數位雙生、AI 與製造管理平台將成為跨廠營運工具，業者可先透過數位雙生在虛擬環境驗證產線與製程，並藉由管理平台集中整理各廠資料，最後再利用 AI 分析生產狀態。\n  • 跨廠部署同時涉及製程知識的轉譯。設備雖可複製，但工程師的調機經驗與參數判斷很難直接移植，虛擬環境算出的路徑及參數，也未必符合實體設備的控制語言，因此建議企業必須模擬結果轉換成機台可執行的製程配方，才能用於異地產線。\n  • 另外，台達智能製造解決方案發展部研發總監楊應龍表示，要讓資料在產線中流動，設備與管理軟體必須使用可互通的介面。台達此次展出的智造方案納入 SMT、DIP 及組裝設備，以標準化、模組化設備執行製程並採集資料，利用 AI 視覺工序偵測方案，讓人工站也能採集完整數據。接著，台達整線管理方案 Line Manager 串聯各工作站、人工站與資訊系統。以模組標準化為基礎，並將標準化範圍擴及設備、產線、通訊協定與資料結構，降低多家硬體拼湊的整合負擔，也能同步製程配方，支援快速換線與混線生產。\n\n📊 三、營運數據與效益指標\n  • 要讓這套架構發揮作用，第一步是確保現場資料能被整合、辨識與使用，多數產線由不同供應商的設備組成，使用不同通訊協定、資料格式與命名方式，系統也分開運作，若未先釐清產能、良率、交期與成本等管理目標，大量訊號仍難整理成有效 KPI。\n\n💡 四、戰略佈局與產業影響\n  • 另外，台達將跨域集中管理融入製造管理平台，把跨廠製造拆成實物流、資訊流與管理流：實物流是工廠現場，由智能設備與產線執行製程，產生設備、品質及產量資料；資訊流透過工業網路串聯設備、產線與管理平台，讓資料跨系統傳遞；管理流則透過營運管理平台整合各廠資訊。相較以往 MES 等系統儀表板，無法自訂資訊的種類、顆粒度，台達方案的優勢在於，不同職能的管理人員可以自訂介面呈現的資訊，並透過儀表板、移動設備等裝置即時掌握，以敏捷決策因應全球變動。\n  • 產線部署前，企業可利用數位雙生進行虛擬調試、測試設備配置、運行路徑與製程配方，再將驗證結果部署到其他廠區，減少現場反覆架線與試產；新工廠運作後，各地設備、品質、產能及異常資料再回傳管理平台，支援跨廠 KPI 比較、原因分析與產能調度。\n  • 跨廠部署要順利運作，必須先讓製程在虛擬環境完成驗證與最佳化。陳鴻輝以台達自動化展的智慧 PCB 噴塗膠舉例，「如果移動速度快，膠散出去的面積會比較小，噴頭離產品較高，噴幅會變廣，但厚度也會變薄。」。\n  • 傳統調機仰賴工程師在現場一邊作業一邊調整、重新試驗。一般設備數位雙生未必能計算膠體如何擴散、無法判斷設備路徑是否合理、會不會碰撞或干涉 PCB 元件。對此，台達整合虛擬機台開發平台 DIATwin、NVIDIA OmniverseTM 函式庫進行協同模擬，AI 自動生成最佳路徑並即時轉換為機台配方，高擬真模擬膠量與擴散軌跡，在虛擬階段即可完成驗證，縮短量產準備週期，更已成功導入泰國廠 AI 伺服器電源產線。\n  • 數位雙生主要處理設備調試與製程驗證，但半自動產線中的人工作業資料仍須透過其他方式補足。台達 AI 人機協同方案針對工站設計，一旦漏裝、裝錯位置或順序不符 SOP，AI 視覺工序偵測方案即時警示異常，並記錄各項動作、工時，將人工站資料轉為可分析資訊。",
    "key_metric": "【2026自動化展】台達如何用 AI-Ready 架構支援跨廠部... │ TechOrange 科技報橘",
    "rationale": "對應主題《【2026自動化展】台達如何用 AI-R》核心技術落地與實務應用。",
    "cover_bg": "linear-gradient(135deg, #059669, #10b981)",
    "icon": "🏭",
    "problem_statement": {
      "text": "根據 TechOrange 科技報橘 報導，以模組標準化為基礎，並將標準化範圍擴及設備、產線、通訊協定與資料結構，降低多家硬體拼湊的整合負擔，也能同步製程配方，支援快速換線與混線生產。 企業在不同國家設置產線，可縮短供應距離並分散營運風險，據點增加後。",
      "pain_points": [
        "請參閱全文章節拆解「一、事件背景與產業影響」"
      ]
    },
    "innovation_breakthrough": {
      "text": "採用關鍵技術：邊緣 AI 感測與自動化控制。詳細技術細節與架構請參閱全文章節拆解。",
      "tech_highlights": [
        "核心採用關鍵技術：邊緣 AI 感測與自動化控制",
        "請參閱全文章節拆解「二、關鍵技術與實作細節」"
      ]
    },
    "impact_and_roi": {
      "text": "專家評估切入點：對應主題《【2026自動化展】台達如何用 AI-R》核心技術落地與實務應用。",
      "impact_results": [
        "請參閱全文章節拆解「四、決策效益與行動建議」"
      ]
    }
  },
  {
    "id": 3,
    "domain": "高階治理",
    "tech_stack": "LLM 代理與 AI 助手 (Agent) / 開源套件供應鏈與資安防護",
    "badge_class": "badge-enterprise",
    "title": "AI Agent 不必全程上雲？Perplexity 聯手 NVIDIA 推 Portable Computer",
    "pub_date": "2026-08-26 18:02",
    "source": "TechOrange 科技報橘",
    "author": "TechOrange 產業資深編輯",
    "read_time": "5 分鐘細讀",
    "link": "https://techorange.com/2026/08/26/perplexity-nvidia-portable-computer/?utm_source=rss&utm_medium=feed&utm_campaign=techorange_rss",
    "cover_image": "https://techorange.com/app/uploads/2026/08/5ccc9180f0af8c6b-1024x601.png",
    "summary": "和一問一答的聊天機器人不同，Agent 為了完成一項工作，可能持續規劃任務、讀取文件、搜尋資料、呼叫工具，再反覆檢查結果。 《VentureBeat》指出，Portable Computer 把 planner、工具路由、排程、任務佇列、本地搜尋、安全沙盒等 Agent 執行元件一起搬到本地。",
    "full_digest": "📖 閱讀筆記與精華摘要：AI Agent 不必全程上雲？Perplexity 聯手 NVIDIA 推 Portable Computer\n📰 來源：TechOrange 科技報橘 | 📅 發布日期：2026-08-26 18:02\n🔗 原文網址：https://techorange.com/2026/08/26/perplexity-nvidia-portable-computer/?utm_source=rss&utm_medium=feed&utm_campaign=techorange_rss\n🏷️ 領域分類：高階治理\n\n📌 一、事件背景與報導摘要\n  • 當 AI Agent（AI 代理）開始長時間、自主執行任務後，還適合每一步都靠雲端模型、按 token 付費嗎？和一問一答的聊天機器人不同，Agent 為了完成一項工作，可能持續規劃任務、讀取文件、搜尋資料、呼叫工具，再反覆檢查結果。當工作時間從幾秒拉長到數十分鐘甚至數小時，模型呼叫次數跟著增加，雲端推論成本與資料傳輸問題也會被放大。\n  • 雙方的合作也不只是 Perplexity 把軟體裝到 NVIDIA 硬體上。Perplexity 負責 Agent harness、模型後訓練與產品介面，NVIDIA 則提供 DGX Spark 與本地 AI 推論的軟硬體環境，雙方並持續調整模型與 Agent 在本地端的執行。目前官方主要以 DGX Spark 作為首發平台，更多 Windows 與 NVIDIA GPU 平台支援則仍在擴展中。\n\n🔍 二、關鍵技術與架構細節\n  • Perplexity 現在提出另一種做法，8/25 它與 NVIDIA 推出「Portable Computer」，嘗試把原本依賴雲端執行的 Agent 工作流程搬到使用者自己的設備，需要最新網路資訊或更強模型時，再選擇向雲端求援。\n  • 名稱雖然叫 Portable Computer，但它不是 Perplexity 推出的一台實體電腦，而是一套本地端優先的 AI Agent 軟體環境。Perplexity 官方表示，這是其產品 Perplexity Computer 的完全本地版本，模型、Agent 執行架構、對話內容與任務執行過程，預設都能留在使用者設備上。\n  • 它也不只是下載一個大型語言模型到電腦裡。《VentureBeat》指出，Portable Computer 把 planner、工具路由、排程、任務佇列、本地搜尋、安全沙盒等 Agent 執行元件一起搬到本地，讓 Agent 能在設備上完成規劃、讀取資料與操作工具等一整套流程。\n  • 目前 Portable Computer 首先針對 NVIDIA 的桌上型 AI 超級電腦 DGX Spark 最佳化。DGX Spark 採用 GB10 Grace Blackwell Superchip 與 128 GB 統一記憶體，主打讓開發者直接在桌面執行較大型 AI 模型與 Agent。\n\n📊 三、營運數據與效益指標\n  • Perplexity 公布的 Terminal Bench 2.1 自測中，單獨使用本地 Qwen 3.8 27B 時，任務成功率為 59.6%；允許系統遇到困難時向雲端 Claude Opus 5 尋求建議後，提高至 73%，Perplexity 估算每項任務的 API 成本為 0.415 美元；若整項任務都交給 Claude Opus 5，成功率則提高到 82.4%，成本為 0.65 美元。\n  • 這組數據來自 Perplexity 自行測試，尚未經第三方驗證。不過，它呈現的設計取捨是，不要求本地模型解決所有最困難的問題，而是先承擔大量、頻繁的工作，真的超出能力範圍時，才呼叫成本較高的雲端模型。\n  • 除了成本，資料也是 Perplexity 強調本地 Agent 的另一項優勢。當 Agent 處理公司文件、程式碼或內部資料時，讀取、搜尋與部分推理可以直接留在設備上，不必把所有中間步驟都交給外部模型。\n\n💡 四、戰略佈局與產業影響\n  • 需要留意的是，Perplexity 並沒有宣稱 27B 級本地模型已能取代 Claude 等前沿模型。Portable Computer 更重要的概念，是讓不同模型分工。\n  • 但本地端優先不代表資料永遠不會離開設備。《Computerworld》指出，Portable Computer 本身可以連接 Google Drive、Gmail、Slack、GitHub 等服務，也能在需要時呼叫雲端模型，因此企業真正需要管理的問題，仍包括哪些資料可以向外傳送、什麼情況允許 Agent 連接外部服務，以及由誰決定。\n  • Perplexity 表示，將任務升級給雲端 advisor 預設不會自動啟用，使用者必須先授權。不過《Computerworld》訪問的企業資安人士也提醒，若要進入金融、醫療等高度監管產業，只靠個別使用者同意可能還不夠，企業仍可能需要更完整的資料外傳政策、DLP 與稽核機制。",
    "key_metric": "AI Agent 不必全程上雲？Perplexity 聯手 NV... │ TechOrange 科技報橘",
    "rationale": "對應主題《AI Agent 不必全程上雲？Perp》核心技術落地與實務應用。",
    "cover_bg": "linear-gradient(135deg, #7c3aed, #8b5cf6)",
    "icon": "⚖️",
    "problem_statement": {
      "text": "根據 TechOrange 科技報橘 報導，和一問一答的聊天機器人不同，Agent 為了完成一項工作，可能持續規劃任務、讀取文件、搜尋資料、呼叫工具，再反覆檢查結果。",
      "pain_points": [
        "請參閱全文章節拆解「一、事件背景與產業影響」"
      ]
    },
    "innovation_breakthrough": {
      "text": "採用關鍵技術：LLM 代理與 AI 助手 (Agent) / 開源套件供應鏈與資安防護。詳細技術細節與架構請參閱全文章節拆解。",
      "tech_highlights": [
        "核心採用關鍵技術：LLM 代理與 AI 助手 (Agent) / 開源套件供應鏈與資安防護",
        "請參閱全文章節拆解「二、關鍵技術與實作細節」"
      ]
    },
    "impact_and_roi": {
      "text": "專家評估切入點：對應主題《AI Agent 不必全程上雲？Perp》核心技術落地與實務應用。",
      "impact_results": [
        "請參閱全文章節拆解「四、決策效益與行動建議」"
      ]
    }
  },
  {
    "id": 4,
    "domain": "財務",
    "tech_stack": "LLM 代理與 AI 助手 (Agent) / 開源套件供應鏈與資安防護",
    "badge_class": "badge-finance",
    "title": "【金融 AI 代理安全與防禦】AI Agents 直接經手支付與交易，機構「分階段放權」才是安全底線",
    "pub_date": "2026-08-15 06:29",
    "source": "TechOrange 科技報橘",
    "author": "TechOrange 產業資深編輯",
    "read_time": "5 分鐘細讀",
    "link": "https://techorange.com/2026/08/15/securing-ai-agents-in-financial-infrastructure/?utm_source=rss&utm_medium=feed&utm_campaign=techorange_rss",
    "cover_image": "https://techorange.com/app/uploads/2026/08/6e247aec7659df05.jpg",
    "summary": "Gartner 預估 2026 年底將有 40% 的企業應用程式，嵌入任務型 AI 代理人（2025 年小於 5%），且已有 79% 企業著手導入。 區塊鏈與資安公司 Halborn 發佈《Securing AI Agents in Financial Infrastructure》報告，提出針對企業級 AI 代理人。",
    "full_digest": "📖 閱讀筆記與精華摘要：【金融 AI 代理安全與防禦】AI Agents 直接經手支付與交易，機構「分階段放權」才是安全底線\n📰 來源：TechOrange 科技報橘 | 📅 發布日期：2026-08-15 06:29\n🔗 原文網址：https://techorange.com/2026/08/15/securing-ai-agents-in-financial-infrastructure/?utm_source=rss&utm_medium=feed&utm_campaign=techorange_rss\n🏷️ 領域分類：財務\n\n📌 一、事件背景與報導摘要\n  • 金融自動化浪潮正以驚人速度席捲。Gartner 預估 2026 年底將有 40% 的企業應用程式，嵌入任務型 AI 代理人（2025 年小於 5%），且已有 79% 企業著手導入。\n  • 在此高度整合下，代理人任何錯誤決策或惡意操作，都將在數秒內對資產負債表與監管合規造成不可逆的重大損害，成為金融資安最迫切的戰場。\n\n🔍 二、關鍵技術與架構細節\n  • 區塊鏈與資安公司 Halborn 發佈《Securing AI Agents in Financial Infrastructure》報告，提出針對企業級 AI 代理人，在金融與支付基礎設施中運作的自主權分級框架；以下摘要核心內容，涵蓋九大金融特有威脅、以「提案與執行分離」為核心的防禦邏輯、七大層面的複層控制措施，以及由 Tier 1 至 Tier 4 的自主權分級治理路線圖。\n  • 報告針對在監管金融環境中負責部署、安全管理與治理 AI 代理人的專業工作者設計，適合讀者包括：\n  • 當 AI 代理人被賦予了實質的資金調度與系統操作權限，隨之而來的是急遽擴張的安全性挑戰，這讓傳統以「代碼安全」為核心的防禦模型（AppSec）完全失焦。\n  • AI 代理人之所以會讓攻擊面呈現指數級擴張，主要源於其「非確定性」的運作特性，並可歸納為三大核心維度：\n\n📊 三、營運數據與效益指標\n  • 與僅能生成文字回應的無狀態 Chatbot 不同，AI 代理人結合推理、長期記憶與 API 工具存取，具備自主規劃與執行多步驟任務的能力；這群代理人正深度整合進資金、支付、交易、託管與會計等五大核心領域，從「動口」給資訊轉為直接「動手」運作。\n  • 根據 Gravitee 2026 年發布的 AI 代理安全報告，高達 88% 的組織在過去一年內曾報告過確認或懷疑的 AI 代理安全事件，而確認發生實質安全事件的比例也接近 35%。這項數據證實 AI 代理人在步入生產環境時所面臨的嚴峻風險。\n\n💡 四、戰略佈局與產業影響\n  • 1. 推理：與傳統軟體死板的確定性代碼不同，AI 代理人是在運行時根據上下文動態生成執行路徑。安全團隊無法預先撰寫好所有的輸入驗證規則，這使得傳統的靜態防線完全失效。\n  • 2. 記憶：代理人擁有持久性的長期記憶以維持上下文。這項特性雖然提升了跨會話的營運效率，卻也讓攻擊者有機可乘，能透過長期的「漸進式記憶毒害」暗中改變代理人的決策傾向。\n  • 3. 工具存取：代理人需要調用各種 API、智能合約與系統工具來執行任務。若缺乏最小權限控制，一旦某個工具或代理人本身被妥協，其骨牌效應將迅速蔓延到所有串接的金融系統。\n  • 面對如此龐大且動態的安全性威脅，金融機構到底該如何防備？報告提出的防禦底線是「提案與執行分離」。",
    "key_metric": "【金融 AI 代理安全與防禦】AI Agents 直接經手支付與... │ TechOrange 科技報橘",
    "rationale": "對應主題《【金融 AI 代理安全與防禦】AI Ag》核心技術落地與實務應用。",
    "cover_bg": "linear-gradient(135deg, #059669, #34d399)",
    "icon": "📊",
    "problem_statement": {
      "text": "根據 TechOrange 科技報橘 報導，Gartner 預估 2026 年底將有 40% 的企業應用程式，嵌入任務型 AI 代理人（2025 年小於 5%），且已有 79% 企業著手導入。",
      "pain_points": [
        "請參閱全文章節拆解「一、事件背景與產業影響」"
      ]
    },
    "innovation_breakthrough": {
      "text": "採用關鍵技術：LLM 代理與 AI 助手 (Agent) / 開源套件供應鏈與資安防護。詳細技術細節與架構請參閱全文章節拆解。",
      "tech_highlights": [
        "核心採用關鍵技術：LLM 代理與 AI 助手 (Agent) / 開源套件供應鏈與資安防護",
        "請參閱全文章節拆解「二、關鍵技術與實作細節」"
      ]
    },
    "impact_and_roi": {
      "text": "專家評估切入點：對應主題《【金融 AI 代理安全與防禦】AI Ag》核心技術落地與實務應用。",
      "impact_results": [
        "請參閱全文章節拆解「四、決策效益與行動建議」"
      ]
    }
  },
  {
    "id": 5,
    "domain": "資安",
    "tech_stack": "開源套件供應鏈與資安防護",
    "badge_class": "badge-legal",
    "title": "從單點風險到產線韌性，叡揚資訊打造製造業資安閉環：看得見、隔得開、追得完",
    "pub_date": "2026-08-24 17:01",
    "source": "TechOrange 科技報橘",
    "author": "TechOrange 產業資深編輯",
    "read_time": "5 分鐘細讀",
    "link": "https://techorange.com/2026/08/24/gss-bitsight-mendio-codesonar-trackosecops/?utm_source=rss&utm_medium=feed&utm_campaign=techorange_rss",
    "cover_image": "https://techorange.com/app/uploads/2026/08/7f4a831040b454f0-1024x683.jpg",
    "summary": "根據 Gartner 預測，企業若採用持續威脅暴露管理（CTEM），可降低約 67% 的安全漏洞與資安事件，帶動防守戰略從被動回應轉為主動防衛。 面對日益嚴峻的資安防禦考驗，叡揚資訊資安直屬事業處技術顧問許農育於日前「半導體供應鏈競爭力論壇」中，以「從一行外部程式碼到一條產線停擺：製造業資安閉環」為題。",
    "full_digest": "📖 閱讀筆記與精華摘要：從單點風險到產線韌性，叡揚資訊打造製造業資安閉環：看得見、隔得開、追得完\n📰 來源：TechOrange 科技報橘 | 📅 發布日期：2026-08-24 17:01\n🔗 原文網址：https://techorange.com/2026/08/24/gss-bitsight-mendio-codesonar-trackosecops/?utm_source=rss&utm_medium=feed&utm_campaign=techorange_rss\n🏷️ 領域分類：資安\n\n📌 一、事件背景與報導摘要\n  • 根據 Gartner 預測，企業若採用持續威脅暴露管理（CTEM），可降低約 67% 的安全漏洞與資安事件，帶動防守戰略從被動回應轉為主動防衛。面對日益嚴峻的資安防禦考驗，叡揚資訊資安直屬事業處技術顧問許農育於日前「半導體供應鏈競爭力論壇」中，以「從一行外部程式碼到一條產線停擺：製造業資安閉環」為題，分析高科技製造業面臨的新型態供應鏈資安威脅，強調企業應建立持續監控與自動化治理能力，從源頭化解隱形風險並確保產線運作穩定。\n\n🔍 二、關鍵技術與架構細節\n  • 現代製造業的資安防護已無法僅仰賴傳統的內網邊界防禦。許農育以 2024 年 Polyfill.io 供應鏈攻擊事件為例，多家知名企業網站因載入的外部套件遭惡意篡改，使攻擊者藉此將惡意程式碼散布至使用相關服務的網站，凸顯第三方與開源軟體供應鏈可能成為企業難以察覺的風險入口。\n  • 其中，第一階段「看得見」著重於提升資安可視性，並從外部攻擊面、軟體供應鏈及程式碼三大層面進一步剖析：\n  • 掌握風險只是第一步。許農育進一步指出，當資安事件發生時，企業更需要掌握受影響設備與系統之間的連線關係，避免單點入侵進一步擴散至其他關鍵資產。傳統工廠內網若缺乏足夠的流量可視性與存取控管，一旦單一設備遭到入侵，攻擊者可能透過橫向移動持續擴大影響範圍，甚至衝擊核心產線。\n  • 因此，第二階段「隔得開」著重於透過網路微分段（Microsegmentation）技術掌握並可視化東西向網路流量，建立設備、系統與應用程式之間的通訊關係，再依據環境、應用程式、角色及地點等多元條件進行資產分類與存取控管，建立細緻的安全政策，限制不必要的系統間通訊。微分段並非單純進行網路切割，而是需要依據企業既有網路架構、應用環境與營運需求，逐步盤點資產、分析通訊關係、制定存取政策，再循序導入分段與阻擋機制。\n\n📊 三、營運數據與效益指標\n  • 外部程式碼所引發的供應鏈威脅，可能進一步衝擊企業營運；同時，隨著主管機關合規要求與客戶稽核日益嚴格，製造業也面臨更高的資安治理要求。對此，許農育提出叡揚資訊可助製造業建構資安韌性的核心框架——「看得見、隔得開、追得完」，協助企業從風險可視性出發，逐步建立完整的資安防禦閉環。\n  • 對製造業而言，導入微分段更需要兼顧 IT、OT 與產線設備的運作特性，避免安全政策影響既有生產流程。叡揚資訊具備多元微分段技術導入經驗，可提供具備 Gartner 客戶評價與市場肯定的 Illumio、Akamai、ColorTokens 等國際微分段領導品牌，由專業顧問協助企業從環境盤點、流量分析與風險評估開始，依據實際營運需求規劃分段策略與安全政策，並以「先看見、再分段；先告警、再阻擋」的防禦原則，兼顧安全防護與營運持續性，降低攻擊者入侵後的橫向移動與擴散風險。\n  • 叡揚資訊 Tracko SecOps 資安營運治理平台串聯情資風險、弱點管理、事件管理與合規管理四大核心環節，當前端偵測到漏洞或合規異常時，平台會自動立案並進行智慧派案，直接指派給相應團隊進行漏洞修補，且完整保留通報、修補與覆核等軌跡，讓管理人員更方便應對內部稽核與客戶的合規檢視。 面對地緣政治與倍速成長的資安威脅，高科技製造業的資安佈局已不再是單純的成本支出，而是確保產線持續營運、建立國際客戶信任的商業核心競爭力。叡揚資訊整合外部攻擊面管理、軟體供應鏈安全、程式碼檢測、零信任微分段與資安營運治理等多層防護能力，協助企業讓潛在風險「看得見」、讓威脅擴散「隔得開」、讓修補進度「追得完」，將分散的資安工具與管理流程串聯為持續運作的資安治理閉環，提升製造業面對資安威脅時的營運韌性。",
    "key_metric": "從單點風險到產線韌性，叡揚資訊打造製造業資安閉環：看得見、隔得開... │ TechOrange 科技報橘",
    "rationale": "對應主題《從單點風險到產線韌性，叡揚資訊打造製造業》核心技術落地與實務應用。",
    "cover_bg": "linear-gradient(135deg, #dc2626, #ef4444)",
    "icon": "🛡️",
    "problem_statement": {
      "text": "根據 TechOrange 科技報橘 報導，根據 Gartner 預測，企業若採用持續威脅暴露管理（CTEM），可降低約 67% 的安全漏洞與資安事件，帶動防守戰略從被動回應轉為主動防衛。",
      "pain_points": [
        "請參閱全文章節拆解「一、事件背景與產業影響」"
      ]
    },
    "innovation_breakthrough": {
      "text": "採用關鍵技術：開源套件供應鏈與資安防護。詳細技術細節與架構請參閱全文章節拆解。",
      "tech_highlights": [
        "核心採用關鍵技術：開源套件供應鏈與資安防護",
        "請參閱全文章節拆解「二、關鍵技術與實作細節」"
      ]
    },
    "impact_and_roi": {
      "text": "專家評估切入點：對應主題《從單點風險到產線韌性，叡揚資訊打造製造業》核心技術落地與實務應用。",
      "impact_results": [
        "請參閱全文章節拆解「四、決策效益與行動建議」"
      ]
    }
  }
];

document.addEventListener('DOMContentLoaded', () => {
  const casesData = (typeof EMBEDDED_CASES !== 'undefined' && EMBEDDED_CASES.length > 0) ? EMBEDDED_CASES : [];
  const gridContainer = document.getElementById('cases-grid');

  const DEFAULT_VISIBLE_COUNT = 6;
  let isExpanded = false;

  function renderCases(cases, showAll = false) {
    if (!gridContainer) return;
    gridContainer.innerHTML = '';

    if (!cases || cases.length === 0) {
      gridContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 48px 24px; background: #F8FAFC; border: 1px dashed #CBD5E1; border-radius: 12px; margin: 20px 0;">
          <div style="font-size: 32px; margin-bottom: 12px;">📡</div>
          <h3 style="color: #1E293B; font-size: 18px; margin-bottom: 8px;">本期符合主題之高品質新聞不足</h3>
          <p style="color: #64748B; font-size: 14px; margin: 0;">系統堅持「零湊數原則與最低合格門檻 (Score ≥ 80 分)」，本期無達到入選標準之報導。</p>
        </div>
      `;
      return;
    }

    const visibleCases = (showAll || cases.length <= DEFAULT_VISIBLE_COUNT) 
      ? cases 
      : cases.slice(0, DEFAULT_VISIBLE_COUNT);

    visibleCases.forEach((c, index) => {
      const card = document.createElement('div');
      card.className = 'case-card' + (index >= DEFAULT_VISIBLE_COUNT ? ' card-fade-in' : '');
      
      const coverImgSrc = c.cover_image || c.cover_bg;
      const coverImageHtml = coverImgSrc ? `
        <div class="card-img-wrap">
          <img src="${coverImgSrc}" alt="${c.title}" loading="lazy" onerror="this.parentElement.style.display='none';">
        </div>
      ` : '';

      card.innerHTML = `
        ${coverImageHtml}
        <div class="case-card-content">
          <div class="case-top-meta">
            <span class="case-domain-badge ${c.badge_class || 'badge-enterprise'}">${c.icon || '📌'} ${c.domain || '主題精選'}</span>
            <span class="case-date-source">📅 ${c.pub_date} │ 📰 ${c.source}</span>
          </div>

          <h3 class="case-title">${c.title}</h3>
          <p class="case-summary">${c.summary}</p>

          <div class="case-actions">
            <a href="${c.link}" target="_blank" rel="noopener noreferrer" class="read-detail-btn">
              閱讀全文 ↗
            </a>
          </div>
        </div>
      `;
      gridContainer.appendChild(card);
    });

    updateExpandButton(cases, showAll);
  }

  function updateExpandButton(cases, showAll) {
    let expandContainer = document.getElementById('expand-cases-container');
    if (!expandContainer) {
      expandContainer = document.createElement('div');
      expandContainer.id = 'expand-cases-container';
      expandContainer.className = 'expand-cases-container';
      if (gridContainer && gridContainer.parentNode) {
        gridContainer.parentNode.insertBefore(expandContainer, gridContainer.nextSibling);
      }
    }

    if (!expandContainer) return;

    if (cases.length <= DEFAULT_VISIBLE_COUNT) {
      expandContainer.style.display = 'none';
      return;
    }

    expandContainer.style.display = 'flex';
    const remainingCount = cases.length - DEFAULT_VISIBLE_COUNT;

    if (!showAll) {
      expandContainer.innerHTML = `
        <button id="expand-cases-btn" class="expand-cases-btn">
          🚀 查看更多精選案例 (+${remainingCount})
        </button>
      `;
      const btn = document.getElementById('expand-cases-btn');
      if (btn) {
        btn.addEventListener('click', () => {
          isExpanded = true;
          renderCases(cases, true);
        });
      }
    } else {
      expandContainer.innerHTML = `
        <button id="expand-cases-btn" class="expand-cases-btn" style="background: #f1f5f9; color: #475569; border-color: #cbd5e1; box-shadow: none;">
          ▲ 收起部分案例 (顯示前 ${DEFAULT_VISIBLE_COUNT} 則)
        </button>
      `;
      const btn = document.getElementById('expand-cases-btn');
      if (btn) {
        btn.addEventListener('click', () => {
          isExpanded = false;
          renderCases(cases, false);
          if (gridContainer) {
            gridContainer.scrollIntoView({ behavior: 'smooth' });
          }
        });
      }
    }
  }

  // Initial render
  renderCases(casesData, false);

  // Keyword Radar Tag Click Handler
  const kwTags = document.querySelectorAll('.kw-tag');
  kwTags.forEach(tag => {
    tag.addEventListener('click', () => {
      kwTags.forEach(t => t.classList.remove('active'));
      tag.classList.add('active');

      const filterKw = tag.getAttribute('data-kw');
      if (!filterKw || filterKw === 'all') {
        renderCases(casesData, isExpanded);
      } else {
        const filtered = casesData.filter(c => {
          const fullText = (c.title + ' ' + c.summary + ' ' + c.full_digest + ' ' + c.rationale).toLowerCase();
          return fullText.includes(filterKw.toLowerCase());
        });
        renderCases(filtered.length > 0 ? filtered : casesData, true);
      }
    });
  });

  // Checklist Interactive State
  const checkBoxes = document.querySelectorAll('.chk-box');
  checkBoxes.forEach((box, idx) => {
    const savedState = localStorage.getItem(`newsletter_chk_${idx}`);
    if (savedState === 'true') {
      box.checked = true;
    }
    box.addEventListener('change', () => {
      localStorage.setItem(`newsletter_chk_${idx}`, box.checked);
    });
  });

  // Reader Feedback & Floating Modal Interactions
  const floatingBtn = document.getElementById('floating-feedback-btn');
  const feedbackModal = document.getElementById('feedback-modal');
  const modalClose = document.getElementById('feedback-modal-close');

  if (floatingBtn && feedbackModal) {
    floatingBtn.addEventListener('click', () => {
      feedbackModal.classList.add('active');
    });
  }

  if (modalClose && feedbackModal) {
    modalClose.addEventListener('click', () => {
      feedbackModal.classList.remove('active');
    });
  }

  if (feedbackModal) {
    feedbackModal.addEventListener('click', (e) => {
      if (e.target === feedbackModal) {
        feedbackModal.classList.remove('active');
      }
    });
  }

  const allFeedbackBtns = document.querySelectorAll('.feedback-btn');
  let selectedRating = null;

  allFeedbackBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      allFeedbackBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedRating = btn.getAttribute('data-rating');
    });
  });

  function handleFeedbackSubmit(inputEl, submitBtn, modalToClose) {
    if (!submitBtn) return;
    submitBtn.addEventListener('click', () => {
      const comment = inputEl ? inputEl.value.trim() : '';
      if (!selectedRating && !comment) {
        alert('請先點選滿意度評分或填寫意見建議，謝謝！');
        return;
      }

      const feedbackData = {
        rating: selectedRating || '5',
        comment: comment,
        timestamp: new Date().toISOString()
      };

      try {
        localStorage.setItem('reader_feedback_submitted', JSON.stringify(feedbackData));
      } catch(e) {}

      const originalText = submitBtn.innerText;
      submitBtn.innerText = '✅ 反饋成功！';
      submitBtn.style.background = '#166534';

      if (inputEl) inputEl.value = '';

      setTimeout(() => {
        submitBtn.innerText = originalText;
        submitBtn.style.background = '';
        if (modalToClose) {
          modalToClose.classList.remove('active');
        }
      }, 1800);
    });
  }

  const inlineSubmit = document.getElementById('feedback-submit-btn');
  const inlineInput = document.getElementById('feedback-input-text');
  handleFeedbackSubmit(inlineInput, inlineSubmit, null);

  const modalSubmit = document.getElementById('modal-feedback-submit');
  const modalInput = document.getElementById('modal-feedback-text');
  handleFeedbackSubmit(modalInput, modalSubmit, feedbackModal);
});


