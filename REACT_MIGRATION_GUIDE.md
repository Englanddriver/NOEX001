# NOEX 社區交流終端：React 重構與學習指南

這份文件配合本次重構後的程式碼使用。專案已由多個靜態 HTML 頁面改為 **React + Vite + React Router**，並保留 GitHub Pages 所需的 `docs/` 建置輸出。

## 1. 為什麼選 React + Vite

React 適合把側欄、狀態列、帖子卡片和 AI 助手拆成可重複使用的元件。當網站功能增加時，只需要修改對應元件，不必在多個 HTML 頁面複製同一段結構。

Vite 啟動和建置速度快，設定量少，很適合目前這個以前端為主的網站。它會把 `src/` 程式碼編譯成瀏覽器可直接載入的檔案。

React Router 讓 `/posts`、`/create`、`/profile` 等頁面在同一個 React 應用程式內切換。這次採用 `HashRouter`，所以部署到 GitHub Pages 時不需要額外設定伺服器重寫規則。

這次沒有選 Next.js，因為目前沒有伺服器端渲染、資料庫 API 或複雜後端需求；Next.js 的能力在這個規模下會增加學習和設定成本。

## 2. 專案目錄

```text
NOEX001/
├── index.html                 # Vite 的 HTML 入口
├── package.json               # 依賴和 npm 指令
├── vite.config.js             # Vite 設定，輸出到 docs/
├── public/                    # 不需編譯的舊網址跳轉頁
├── src/
│   ├── main.jsx               # React 啟動點
│   ├── App.jsx                # 路由表
│   ├── data.js                # 教學用的帖子和分類資料
│   ├── styles.css             # 工業終端風格設計系統
│   ├── components/
│   │   ├── Layout.jsx         # 公共側欄、狀態列、頁尾、AI 浮窗
│   │   ├── AIAssistant.jsx    # AI 助手互動元件
│   │   ├── PageHeader.jsx     # 頁面標題區
│   │   └── PostCard.jsx       # 可重複使用的帖子卡片
│   └── pages/                 # 各個路由頁面
└── docs/                      # npm run build 產生的部署檔案
```

## 3. React 的啟動流程

`src/main.jsx` 先找到 `index.html` 裡的 `<div id="root">`，再用 `createRoot` 將 `App` 渲染進去：

```jsx
createRoot(document.getElementById("root")).render(
  <HashRouter>
    <App />
  </HashRouter>,
);
```

`HashRouter` 會把路由放在 `#` 後面，例如 `/#/posts`。瀏覽器切換這一段時，React 會重新渲染對應頁面，但不需要重新下載整個網站。

`src/App.jsx` 是路由表。`Layout` 包住所有 `Route`，因此側欄、頂部狀態列、頁尾和 AI 助手會在每個頁面共用：

```jsx
<Layout>
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/posts" element={<PostsPage />} />
    <Route path="/posts/:postId" element={<PostDetailPage />} />
  </Routes>
</Layout>
```

## 4. 元件和資料如何配合

`PostCard` 接收一個 `post` 物件和顯示順序 `index`。首頁、情報站和個人頁都可以傳入不同資料並重用同一張卡片：

```jsx
{posts.map((post, index) => (
  <PostCard key={post.id} post={post} index={index} />
))}
```

這就是元件化的核心：外層決定資料，元件決定顯示方式。之後接上後端 API 時，可以保留 `PostCard`，只替換 `data.js` 的靜態資料來源。

`PostsPage` 使用 `useSearchParams` 讀取網址中的 `?category=supplies`，再用 `filter` 找出對應分類。這讓分類篩選可以被複製網址或加入書籤。

## 5. `useState`、`useEffect` 和 AI 助手

AI 助手在 `AIAssistant.jsx` 內使用三個主要狀態：

- `open`：浮窗是否開啟。
- `messages`：對話訊息陣列。
- `loading`：是否正在等待回覆，避免重複送出。

`useEffect` 有兩個用途。第一個把最近 20 則訊息存入 `sessionStorage`，所以重新整理目前分頁時仍能保留對話；第二個在訊息增加或視窗開啟時，把畫面捲到最新訊息。

目前沒有設定 `VITE_AI_ENDPOINT` 時，助手使用本地教學模式，會根據關鍵字回覆。要接上自己的後端 API，可以在專案根目錄建立 `.env.local`：

```bash
VITE_AI_ENDPOINT=https://你的後端.example.com/api/chat
```

後端需要接受：

```json
{
  "message": "使用者問題",
  "history": [{"role": "assistant", "content": "..."}]
}
```

並回傳：

```json
{"reply": "AI 的回覆"}
```

不要把 API 金鑰直接寫在 React 前端；金鑰應該只放在後端環境變數中。

## 6. CSS 設計重點

`src/styles.css` 使用 CSS 變數集中管理顏色，例如 `--black`、`--yellow`、`--green` 和 `--line`。整體參考《明日方舟：終末地》的工業終端感：深色側欄、螢光黃色提示線、資訊編號和高密度資料卡片，但沒有使用官方 Logo、角色或受版權保護素材。

桌面端使用固定側欄；寬度小於 640px 時，側欄會變成抽屜，右上角的選單按鈕控制 `menuOpen` 狀態。`@media` 同時調整卡片欄數、字體大小和 AI 浮窗寬度。

## 7. 常用指令

```bash
npm install       # 安裝依賴
npm run dev       # 啟動開發伺服器
npm run build     # 建置到 docs/
npm run preview   # 預覽 production 建置
```

舊的 `login.html`、`posts.html`、`create.html` 等入口由 `public/` 複製到 `docs/`，並跳轉至新的 hash 路由，因此原有書籤仍然可以使用。

## 8. 建議練習

1. 在 `src/data.js` 新增一筆帖子，觀察首頁和情報站如何自動顯示。
2. 在 `categories` 新增分類，並在 `PostsPage` 測試篩選。
3. 為 `PostCard` 加入作者名稱或圖片欄位。
4. 在 `localReply` 加入一個新的關鍵字回覆。
5. 把 `CreatePostPage` 的表單改成使用 `useState`，送出後新增到前端狀態。
6. 建立一個簡單後端，設定 `VITE_AI_ENDPOINT`，把本地教學模式換成真實 AI 回覆。

完成每次修改後，先在瀏覽器測試，再執行 `npm run build`，確保部署版本也能編譯。
