import { Activity, ArrowRight, CircleUserRound, MessageSquare, PenLine } from "lucide-react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import PostCard from "../components/PostCard";
import { posts } from "../data";

export default function ProfilePage() {
  return <div><PageHeader code="SYS / 007" eyebrow="PERSONAL MEMBER TERMINAL" title="個人終端" description="管理個人資料、帖子與社區活動紀錄。" actions={<Link className="button button--primary" to="/create">發布新帖子 <ArrowRight size={17} /></Link>} /><div className="profile-layout"><section className="profile-card"><div className="profile-avatar"><CircleUserRound size={40} /></div><div><span className="eyebrow">MEMBER / HK-023</span><h2>社區義工</h2><p>願意協助整理及分享社區支援資訊。</p></div><div className="profile-card__date">JOINED<br /><strong>2026.09.23</strong></div></section><section className="stats-grid"><div><Activity size={19} /><strong>01</strong><span>已發布帖子</span></div><div><MessageSquare size={19} /><strong>03</strong><span>已作出回覆</span></div><div><PenLine size={19} /><strong>12</strong><span>已保存情報</span></div></section></div><section className="content-section"><div className="section-heading"><div><span className="eyebrow">MY TRANSMISSIONS / 01</span><h2>我的帖子</h2></div></div><div className="post-list"><PostCard post={posts[1]} index={0} /></div></section></div>;
}
