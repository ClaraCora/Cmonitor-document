import { renderToString } from "react-dom/server"
import { App } from "@/App"
import { docs } from "@/nav"

export function render(url: string) {
  return renderToString(<App url={url} />)
}

/** Every URL the build has to emit a file for. */
export const routes = [
  {
    path: "/",
    title: "Cmonitor — 服务器探针文档",
    desc: "用 Rust 写的轻量级服务器探针，支持通过在线 Cagent 打开无需 SSH 凭据的 Web Terminal。",
  },
  ...docs.map((d) => ({ path: d.path, title: `${d.label} — Cmonitor 文档`, desc: d.desc })),
]
