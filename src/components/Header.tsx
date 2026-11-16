import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useState } from "react"
import { Menu } from "lucide-react"
import { GithubMark } from "@/components/GithubMark"
import { Button } from "@/components/ui/button"
import { Search } from "@/components/Search"
import { ThemeToggle } from "@/components/ThemeToggle"
import { Sidebar } from "@/components/Sidebar"
import { A } from "@/lib/router"
import { REPO } from "@/site"

export function Header({ path }: { path: string }) {
  const [menu, setMenu] = useState(false)

  return (
    <Dialog open={menu} onOpenChange={setMenu}>
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-[88rem] items-center gap-3 px-4 lg:px-8">
          <DialogTrigger asChild><Button variant="ghost" size="icon-sm" className="lg:hidden" aria-label="目录">
            <Menu />
          </Button></DialogTrigger>

          <A to="/" className="flex items-baseline gap-2">
            <span className="font-semibold tracking-tight">Cmonitor</span>
            <span className="hidden text-xs text-muted-foreground sm:inline">文档</span>
          </A>

          <div className="ml-auto flex items-center gap-1.5">
            <Search />
            <Button variant="ghost" size="icon-sm" asChild aria-label="GitHub">
              <a href={REPO} target="_blank" rel="noreferrer"><GithubMark className="size-4" /></a>
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <DialogContent aria-describedby={undefined} className="inset-y-0 left-0 top-0 flex h-dvh max-h-dvh w-72 max-w-[85vw] translate-x-0 translate-y-0 flex-col rounded-none border-0 p-0 sm:max-w-72">
        <div className="flex h-14 shrink-0 items-center border-b px-5"><DialogTitle>文档目录</DialogTitle></div>
        <div className="thin-scroll min-h-0 flex-1 overflow-y-auto px-2 py-5">
          <Sidebar path={path} onNavigate={() => setMenu(false)} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
