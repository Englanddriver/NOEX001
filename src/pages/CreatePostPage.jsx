import { FilePlus2, Info, Send } from "lucide-react";
import PageHeader from "../components/PageHeader";

export default function CreatePostPage() {
  return (
    <div>
      <PageHeader code="SYS / 004" eyebrow="NEW TRANSMISSION PROTOCOL" title="發布情報" description="清楚描述你的需要，讓社區更快提供可核實的支援。" />
      <div className="form-layout">
        <form className="form-panel form-panel--wide" onSubmit={(event) => event.preventDefault()}>
          <div className="form-panel__title"><FilePlus2 size={20} /><div><span className="eyebrow">CREATE / 01</span><h2>建立新帖子</h2></div></div>
          <label htmlFor="title">帖子標題</label><input id="title" type="text" placeholder="例如：需要臨時住宿協助" />
          <label htmlFor="category">帖子分類</label><select id="category" defaultValue=""><option value="" disabled>請選擇分類</option><option>緊急求助</option><option>物資互助</option><option>臨時安置</option><option>災後資訊</option></select>
          <label htmlFor="location">大致地區</label><input id="location" type="text" placeholder="例如：九龍東" />
          <label htmlFor="content">帖子內容</label><textarea id="content" rows="8" placeholder="描述需要、時間和已知資訊..." />
          <label htmlFor="contact">聯絡方式（選填）</label><input id="contact" type="text" placeholder="請勿填寫敏感個人資料" />
          <button className="button button--primary" type="submit">發布帖子 <Send size={16} /></button>
        </form>
        <aside className="side-note side-note--warning"><Info size={20} /><strong>發布前檢查</strong><p>請確認內容不包含身份證號碼、精確住址、銀行資料或他人的私人聯絡方式。</p></aside>
      </div>
    </div>
  );
}
