import { useMemo } from "react";
import { ArrowRight, Filter } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import PostCard from "../components/PostCard";
import { categories, posts } from "../data";

export default function PostsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") || "all";
  const filteredPosts = useMemo(() => activeCategory === "all" ? posts : posts.filter((post) => post.category === activeCategory), [activeCategory]);

  return (
    <div>
      <PageHeader code="SYS / 002" eyebrow="PUBLIC INFORMATION TERMINAL" title="情報站" description="按分類檢索最新的求助、物資、安置與災後資訊。" actions={<Link className="button button--primary" to="/create">發布新情報 <ArrowRight size={17} /></Link>} />
      <section className="content-section posts-directory">
        <div className="section-heading">
          <div><span className="eyebrow">FILTER CHANNEL / {activeCategory.toUpperCase()}</span><h2>選擇分類</h2></div>
          <Filter size={20} />
        </div>
        <div className="filter-row">
          {categories.map((category) => (
            <button key={category.id} className={`filter-chip ${activeCategory === category.id ? "filter-chip--active" : ""}`} type="button" onClick={() => setSearchParams(category.id === "all" ? {} : { category: category.id })}>
              <span>{category.code}</span>{category.label}
            </button>
          ))}
        </div>
      </section>
      <section className="content-section">
        <div className="section-heading"><div><span className="eyebrow">TRANSMISSIONS / {String(filteredPosts.length).padStart(2, "0")}</span><h2>{activeCategory === "all" ? "全部情報" : categories.find((category) => category.id === activeCategory)?.label}</h2></div></div>
        {filteredPosts.length ? <div className="post-list">{filteredPosts.map((post, index) => <PostCard key={post.id} post={post} index={index} />)}</div> : <div className="empty-state">此分類目前沒有公開情報。</div>}
      </section>
    </div>
  );
}
