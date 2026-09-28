import { ArrowLeft, ArrowRight, Clock3, MapPin, ShieldCheck } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { posts } from "../data";

export default function PostDetailPage() {
  const { postId } = useParams();
  const post = posts.find((item) => item.id === postId);

  if (!post) {
    return (
      <div>
        <PageHeader code="SYS / 404" eyebrow="TRANSMISSION NOT FOUND" title="找不到這則情報" description="這則情報可能已被移除，或網址並不完整。" />
        <section className="content-section empty-state">
          <Link className="button button--primary" to="/posts"><ArrowLeft size={17} /> 返回情報站</Link>
        </section>
      </div>
    );
  }

  return (
    <div>
      <PageHeader code="SYS / 003" eyebrow={`TRANSMISSION / ${post.categoryLabel}`} title={post.title} description={post.excerpt} />
      <article className="detail-layout">
        <section className="detail-card">
          <div className="detail-card__top">
            <span className="post-tag">{post.categoryLabel}</span>
            {post.priority === "urgent" && <span className="priority-tag">PRIORITY</span>}
          </div>
          <div className="detail-card__meta">
            <span><Clock3 size={16} /> {post.date} / {post.time}</span>
            <span><MapPin size={16} /> {post.location}</span>
          </div>
          <div className="detail-card__content"><p>{post.content}</p></div>
          <div className="detail-card__notice"><ShieldCheck size={19} /><span>請先核實資訊，再前往指定地點或分享聯絡方式。</span></div>
        </section>
        <aside className="side-note">
          <span className="eyebrow">CHANNEL / RESPONSE</span>
          <h2>回應這則情報</h2>
          <p>如果你能提供協助，請先登入後留下回應。請勿在公開內容中分享敏感個人資料。</p>
          <Link className="button button--primary" to="/login">登入後回應 <ArrowRight size={16} /></Link>
        </aside>
      </article>
      <div className="detail-back"><Link className="text-link" to="/posts"><ArrowLeft size={15} /> 返回情報站</Link></div>
    </div>
  );
}
