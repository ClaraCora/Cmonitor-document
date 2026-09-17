// Renders every route to its own index.html. GitHub Pages then serves real
// markup at every URL -- what a reader on a slow connection, a search engine
// and `curl` all get before any JavaScript runs.
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises"
import { basename, dirname, join } from "node:path"
import { pathToFileURL } from "node:url"

// Plain Vite writes dist-ssr/entry-server.js. Cloudflare's Vite integration
// places the same bundle under assets/ and adds a content hash. Locate the
// generated entry instead of coupling prerendering to either layout.
const ssrDir = join(import.meta.dirname, "..", "dist-ssr")
const ssrEntry = (await readdir(ssrDir, { recursive: true })).find((file) =>
  /^entry-server(?:-[A-Za-z0-9_-]+)?\.js$/.test(basename(file)),
)
if (!ssrEntry) throw new Error("SSR build did not produce an entry-server JavaScript bundle")
const { render, routes } = await import(pathToFileURL(join(ssrDir, ssrEntry)).href)

const dist = join(import.meta.dirname, "..", "dist")
const template = await readFile(join(dist, "index.html"), "utf8")
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;")

for (const r of routes) {
  const html = template
    .replace("<!--app-html-->", render(r.path))
    .replace(/<title>.*?<\/title>/, `<title>${esc(r.title)}</title>`)
    .replace(/(<meta name="description" content=").*?(")/, `$1${esc(r.desc)}$2`)
  // "<route>.html", not "<route>/index.html": Pages drops the extension, so
  // the canonical URL is the slashless one the in-app links already use --
  // "/install/quick-start", with "/install/quick-start/" redirecting to it.
  const file = r.path === "/" ? join(dist, "index.html") : join(dist, r.path.slice(1) + ".html")
  await mkdir(dirname(file), { recursive: true })
  await writeFile(file, html)
}

// Anything else -- an old link, a typo -- lands on the home page with a note.
await writeFile(join(dist, "404.html"), template.replace("<!--app-html-->", ""))

console.log(`prerendered ${routes.length} routes`)

// llms.txt is the prompt from /ai as plain text. Extracted from the same MDX
// the page renders, so the two cannot drift.
const ai = await readFile(join(import.meta.dirname, "..", "src", "content", "ai.mdx"), "utf8")
const prompt = ai.match(/```text\n([\s\S]*?)\n```/)
if (!prompt) throw new Error("ai.mdx: no ```text block to publish as llms.txt")
await writeFile(join(dist, "llms.txt"), prompt[1] + "\n")
