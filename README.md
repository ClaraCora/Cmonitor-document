# Cmonitor 文档

https://cmonitor-document.pages.dev/

## Cloudflare Pages

- 构建命令：`npm run build`
- 输出目录：`dist`
- 根目录：`/`
- Node.js：24（仓库已提供 `.node-version`）
- 如果界面要求部署命令：`npx wrangler deploy`

仓库中的 `wrangler.jsonc` 已明确把 `dist` 作为静态资源目录，避免 Wrangler 自动改写 Vite 的 SSR 构建。
