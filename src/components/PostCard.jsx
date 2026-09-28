import { ArrowUpRight, Clock3, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export default function PostCard({ post, index }) {
  return (
    <article className={`post-card ${post.priority === "urgent" ? "post-card--urgent" : ""}`}>
      <div className="post-card__number">{String(index + 1).padStart(2, "0")}</div>
      <div className="post-card__body">
        <div className="post-card__meta">
          <span>{post.categoryLabel}</span>
          {post.priority === "urgent" && <strong>PRIORITY</strong>}
        </div>
        <h3><Link to={`/posts/${post.id}`}>{post.title}</Link></h3>
        <p>{post.excerpt}</p>
        <div className="post-card__details">
          <span><Clock3 size={14} /> {post.date} / {post.time}</span>
          <span><MapPin size={14} /> {post.location}</span>
        </div>
      </div>
      <Link className="post-card__open" to={`/posts/${post.id}`} aria-label={`查看${post.title}`}>
        <ArrowUpRight />
      </Link>
    </article>
  );
}
