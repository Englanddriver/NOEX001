import { KeyRound, LogIn, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";

export default function AuthPage({ mode }) {
  const login = mode === "login";
  return (
    <div>
      <PageHeader code={login ? "SYS / 005" : "SYS / 006"} eyebrow={login ? "IDENTITY VERIFICATION" : "NEW MEMBER REGISTRATION"} title={login ? "登入終端" : "建立帳號"} description={login ? "登入後管理你的帖子與社區回覆。" : "加入社區，一起分享可靠的支援資訊。"} />
      <div className="auth-layout"><form className="form-panel" onSubmit={(event) => event.preventDefault()}><div className="form-panel__title">{login ? <LogIn size={20} /> : <UserPlus size={20} />}<div><span className="eyebrow">AUTH / {login ? "01" : "02"}</span><h2>{login ? "身份驗證" : "成員資料"}</h2></div></div>{!login && <><label htmlFor="username">使用者名稱</label><input id="username" type="text" /></>}<label htmlFor="email">電郵地址</label><input id="email" type="email" /> <label htmlFor="password">密碼</label><input id="password" type="password" />{!login && <><label htmlFor="confirm-password">確認密碼</label><input id="confirm-password" type="password" /><label className="checkbox-label"><input type="checkbox" /> 我同意遵守論壇規則及私隱政策</label></>}<button className="button button--primary" type="submit">{login ? "登入" : "建立帳號"} <KeyRound size={16} /></button></form><div className="auth-aside"><span className="eyebrow">SECURITY NOTICE</span><h2>你的資料，<em>只用於連線。</em></h2><p>請使用獨立且不重複的密碼。不要把密碼或驗證碼傳送給任何帖子作者。</p><Link className="text-link" to={login ? "/register" : "/login"}>{login ? "尚未有帳號？建立帳號" : "已有帳號？前往登入"}</Link></div></div>
    </div>
  );
}
