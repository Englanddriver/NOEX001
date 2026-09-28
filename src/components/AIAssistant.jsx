import { useEffect, useRef, useState } from "react";
import { Bot, Send, X } from "lucide-react";

const STORAGE_KEY = "noex-react-assistant-history-v1";
const welcomeMessage = {
  role: "assistant",
  content: "通訊已建立。我是社區支援 AI 終端，可以協助你尋找帖子、發布求助或整理物資資訊。即時危險請致電 999。",
};

function readHistory() {
  try {
    const stored = JSON.parse(sessionStorage.getItem(STORAGE_KEY));
    return Array.isArray(stored) && stored.length ? stored : [welcomeMessage];
  } catch {
    return [welcomeMessage];
  }
}

function localReply(message) {
  if (/999|火警|著火|濃煙|受傷|危險|緊急/.test(message)) {
    return "偵測到緊急情況。請立即離開危險位置並致電 999；本站與 AI 助手不能代替緊急服務。";
  }
  if (/發布|發帖|求助|新增/.test(message)) {
    return "前往「發布」終端，依序填寫標題、分類、地區與內容。請勿公開住址、身份證號碼或銀行資料。";
  }
  if (/住宿|安置|住處/.test(message)) {
    return "請在「情報站」篩選「臨時安置」，也可以發布求助並說明人數、大致地區和所需日期。";
  }
  if (/物資|食物|衣物|領取/.test(message)) {
    return "請在「情報站」篩選「物資互助」。發布需求时建议列出種類、數量、大致地區和可聯絡時間。";
  }
  return "目前處於本地教學模式。你可以問我如何發布求助、尋找臨時安置或查看物資資訊。";
}

export default function AIAssistant({ icon }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(readHistory);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const messageEnd = useRef(null);

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-20)));
    messageEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  useEffect(() => {
    const closeOnEscape = (event) => event.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    const message = value.trim();
    if (!message || loading) return;

    const nextMessages = [...messages, { role: "user", content: message }];
    setMessages(nextMessages);
    setValue("");
    setLoading(true);

    try {
      const endpoint = import.meta.env.VITE_AI_ENDPOINT;
      let reply;
      if (endpoint) {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message, history: messages }),
        });
        if (!response.ok) throw new Error(`AI endpoint returned ${response.status}`);
        const data = await response.json();
        reply = data.reply;
      } else {
        await new Promise((resolve) => window.setTimeout(resolve, 350));
        reply = localReply(message);
      }
      setMessages((current) => [...current, { role: "assistant", content: reply }]);
    } catch {
      setMessages((current) => [...current, { role: "assistant", content: "AI 服務暫時無法連線，請稍後再試。" }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        className="assistant-trigger"
        type="button"
        aria-label="打開 AI 支援終端"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {icon}
        <span>AI</span>
      </button>

      {open && (
        <section className="assistant-panel" aria-label="AI 支援終端">
          <header>
            <div>
              <span className="eyebrow">ASSISTANCE CHANNEL / 07</span>
              <strong><Bot size={18} /> 社區支援終端</strong>
            </div>
            <button type="button" aria-label="關閉 AI 支援終端" onClick={() => setOpen(false)}>
              <X size={20} />
            </button>
          </header>
          <div className="assistant-messages" aria-live="polite">
            {messages.map((message, index) => (
              <div className={`assistant-message assistant-message--${message.role}`} key={`${message.role}-${index}`}>
                <span>{message.role === "assistant" ? "SYS" : "YOU"}</span>
                <p>{message.content}</p>
              </div>
            ))}
            {loading && <div className="assistant-loading">ANALYSING<span>...</span></div>}
            <div ref={messageEnd} />
          </div>
          <form className="assistant-form" onSubmit={handleSubmit}>
            <label htmlFor="assistant-input">輸入問題</label>
            <input
              id="assistant-input"
              value={value}
              onChange={(event) => setValue(event.target.value)}
              placeholder="輸入支援請求..."
              autoComplete="off"
            />
            <button type="submit" aria-label="發送" disabled={loading || !value.trim()}>
              <Send size={19} />
            </button>
          </form>
        </section>
      )}
    </>
  );
}
