import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Bot,
  CircleUserRound,
  FilePlus2,
  House,
  LogIn,
  Menu,
  Radio,
  ShieldAlert,
  UsersRound,
  X,
} from "lucide-react";
import AIAssistant from "./AIAssistant";

const navigation = [
  { to: "/", label: "總覽", icon: House, exact: true },
  { to: "/posts", label: "情報站", icon: Radio },
  { to: "/create", label: "發布", icon: FilePlus2 },
  { to: "/profile", label: "個人終端", icon: CircleUserRound },
];

export default function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <div className="app-shell">
      <aside className={`side-rail ${menuOpen ? "side-rail--open" : ""}`}>
        <NavLink className="brand-mark" to="/" aria-label="香港災後交流終端首頁">
          <span className="brand-mark__symbol">HK</span>
          <span className="brand-mark__text">COMM<br />LINK</span>
        </NavLink>

        <nav className="primary-nav" aria-label="主要導覽">
          {navigation.map(({ to, label, icon: Icon, exact }) => (
            <NavLink
              key={to}
              to={to}
              end={exact}
              className={({ isActive }) => `nav-link ${isActive ? "nav-link--active" : ""}`}
            >
              <Icon size={19} strokeWidth={1.8} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="rail-actions">
          <NavLink className="nav-link" to="/login">
            <LogIn size={19} strokeWidth={1.8} />
            <span>登入</span>
          </NavLink>
          <NavLink className="nav-link" to="/register">
            <UsersRound size={19} strokeWidth={1.8} />
            <span>註冊</span>
          </NavLink>
        </div>
      </aside>

      <button
        className="mobile-menu"
        type="button"
        aria-label={menuOpen ? "關閉導覽" : "打開導覽"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((value) => !value)}
      >
        {menuOpen ? <X /> : <Menu />}
      </button>

      {menuOpen && <button className="nav-scrim" aria-label="關閉導覽" onClick={() => setMenuOpen(false)} />}

      <div className="page-frame">
        <header className="status-bar">
          <div className="status-bar__signal">
            <span className="live-dot" />
            <span>COMMUNITY NETWORK ONLINE</span>
          </div>
          <div className="status-bar__meta">
            <span>HK / 22.3193 N</span>
            <span className="status-code">NOEX-001</span>
          </div>
        </header>

        <main>{children}</main>

        <footer className="site-footer">
          <div>
            <ShieldAlert size={20} aria-hidden="true" />
            <p>如有即時危險，請立即離開危險位置並致電香港緊急求助電話 <strong>999</strong>。</p>
          </div>
          <span>COMMUNITY SUPPORT SYSTEM / 2026</span>
        </footer>
      </div>

      <AIAssistant icon={<Bot size={23} />} />
    </div>
  );
}
