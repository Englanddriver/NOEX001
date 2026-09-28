import { ArrowRight, ChevronRight, RadioTower, ShieldCheck, Users } from "lucide-react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import PostCard from "../components/PostCard";
import { categories, posts } from "../data";

export default function HomePage() {
  return (
    <div className="home-page">
      <PageHeader
        code="SYS / 001"
        eyebrow="HONG KONG COMMUNITY RECOVERY NETWORK"
        title={<>在城市重新連線之前，<em>先讓彼此找到。</em></>}
        description="一個供災後居民交換資訊、尋求支援與整理社區資源的公開終端。"
        actions={(
          <>
            <Link className="button button--primary" to="/posts">進入情報站 <ArrowRight size={17} /></Link>
            <Link className="button button--quiet" to="/create">發布求助</Link>
          </>
        )}
      />

      <section className="signal-grid" aria-label="平台狀態">
        <div className="signal-card signal-card--large">
          <span className="eyebrow">ACTIVE SIGNALS / 24H</span>
          <strong>03</strong>
          <p>最新社區情報</p>
          <div className="signal-lines"><i /><i /><i /><i /><i /><i /></div>
        </div>
        <div className="signal-card">
          <RadioTower size={21} />
          <strong>ONLINE</strong>
          <p>網絡狀態</p>
        </div>
        <div className="signal-card">
          <Users size={21} />
          <strong>128</strong>
          <p>已連線社區成員</p>
        </div>
        <div className="signal-card signal-card--accent">
          <ShieldCheck size={21} />
          <strong>999</strong>
          <p>緊急求助電話</p>
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <div><span className="eyebrow">DIRECTORY / 00—04</span><h2>情報分類</h2></div>
          <span className="section-heading__rule" />
        </div>
        <div className="category-grid">
          {categories.slice(1).map((category) => (
            <Link className="category-tile" to={`/posts?category=${category.id}`} key={category.id}>
              <span>{category.code}</span>
              <strong>{category.label}</strong>
              <ChevronRight size={18} />
            </Link>
          ))}
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <div><span className="eyebrow">LATEST TRANSMISSIONS / 03</span><h2>最新情報</h2></div>
          <Link className="text-link" to="/posts">查看全部 <ArrowRight size={15} /></Link>
        </div>
        <div className="post-list">
          {posts.map((post, index) => <PostCard key={post.id} post={post} index={index} />)}
        </div>
      </section>

      <section className="home-callout">
        <div><span className="eyebrow">COMMUNITY PROTOCOL / 01</span><h2>分享前，先保護自己。</h2></div>
        <p>請勿在公開帖子中留下身份證號碼、精確住址、銀行資料或其他敏感個人資料。需要緊急救援時，請直接致電 999。</p>
      </section>
    </div>
  );
}
