import { useState, type ReactNode } from "react";
import {
  Move, SquareDashed, Lasso, Wand2, Crop, Frame, Pipette, Bandage, Brush, Stamp, History,
  Eraser, PaintBucket, Droplet, Sun, PenTool, Type, MousePointer2, RectangleHorizontal,
  Hand, ZoomIn, MoreHorizontal, Home, ChevronDown, Search, Share, Sparkles, LayoutPanelLeft,
  PanelLeftClose, PanelLeftOpen, PanelRightClose, PanelRightOpen, X, Plus, Folder, Trash2,
  Eye, EyeOff, Lock, Link2, Image as ImageIcon, Circle, SlidersHorizontal, Settings2,
  AlignStartVertical, AlignCenterVertical, AlignEndVertical, AlignStartHorizontal,
  AlignCenterHorizontal, AlignEndHorizontal, Palette, Layers, Wand, MessageSquare,
  Undo2, Redo2, Minus, Grid3x3, Check, ArrowLeftRight,
} from "lucide-react";
import canvasImg from "@/assets/canvas.jpg";
import { cn } from "@/lib/utils";

const tools = [
  [Move, "Move", "V"], [SquareDashed, "Rectangular Marquee", "M"], [Lasso, "Lasso", "L"],
  [Wand2, "Object Selection", "W"], [Crop, "Crop", "C"], [Frame, "Frame", "K"],
  [Pipette, "Eyedropper", "I"], null,
  [Bandage, "Spot Healing", "J"], [Brush, "Brush", "B"], [Stamp, "Clone Stamp", "S"],
  [History, "History Brush", "Y"], [Eraser, "Eraser", "E"], [PaintBucket, "Gradient", "G"],
  [Droplet, "Blur", "R"], [Sun, "Dodge", "O"], null,
  [PenTool, "Pen", "P"], [Type, "Type", "T"], [MousePointer2, "Path Selection", "A"],
  [RectangleHorizontal, "Rectangle", "U"], null,
  [Hand, "Hand", "H"], [ZoomIn, "Zoom", "Z"],
] as const;

const menus = ["File", "Edit", "Image", "Layer", "Type", "Select", "Filter", "View", "Plugins", "Window", "Help"];

function IconBtn({ children, active, title, className, onClick }: { children: ReactNode; active?: boolean | undefined; title?: string | undefined; className?: string | undefined; onClick?: (() => void) | undefined }) {
  return (
    <button
      title={title}
      onClick={onClick}
      className={cn(
        "grid h-8 w-8 shrink-0 place-items-center rounded-[5px] text-muted-foreground transition-all duration-150 hover:bg-surface-3 hover:text-foreground active:scale-95 [&_svg]:h-[16px] [&_svg]:w-[16px] [&_svg]:stroke-[1.75]",
        active && "bg-surface-3 text-foreground",
        className,
      )}
    >
      {children}
    </button>
  );
}

function Segmented({ items, value, onChange }: { items: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex min-w-0 gap-0.5 rounded-[6px] bg-background/60 p-[3px] shadow-[inset_0_0_0_1px_var(--hairline)]">
      {items.map((it) => (
        <button
          key={it}
          onClick={() => onChange(it)}
          className={cn(
            "truncate rounded-[4px] px-2.5 py-1 text-[11.5px] font-medium transition-all",
            value === it ? "bg-surface-3 text-foreground shadow-[0_1px_2px_oklch(0_0_0/40%),inset_0_1px_0_oklch(1_0_0/6%)]" : "text-muted-foreground hover:text-foreground",
          )}
        >
          {it}
        </button>
      ))}
    </div>
  );
}

function Pill({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("flex h-7 items-center gap-1.5 rounded-[5px] bg-surface-2 px-2.5 text-[11.5px] text-foreground shadow-[inset_0_0_0_1px_var(--hairline)]", className)}>
      {children}
    </div>
  );
}

function Switch({ on }: { on: boolean }) {
  return (
    <span className={cn("relative inline-flex h-4 w-7 shrink-0 rounded-full transition-colors", on ? "bg-primary" : "bg-surface-3")}>
      <span className={cn("absolute top-0.5 h-3 w-3 rounded-full bg-foreground shadow transition-all", on ? "left-3.5" : "left-0.5")} />
    </span>
  );
}

function PanelCard({ tabs, children, grow, collapsed, onToggle }: { tabs: string[]; children: ReactNode; grow?: boolean; collapsed?: boolean; onToggle?: () => void }) {
  const [tab, setTab] = useState<string>(tabs[0] ?? "");
  return (
    <section className={cn("flex min-h-0 flex-col overflow-hidden", grow && !collapsed && "flex-1")}>
      <header className="flex items-center gap-2 px-2 pt-2 pb-1.5">
        <div className="min-w-0 flex-1 overflow-hidden"><Segmented items={tabs} value={tab} onChange={setTab} /></div>
        <IconBtn title={collapsed ? "Expand" : "Collapse"} onClick={onToggle} className="h-7 w-7">
          <ChevronDown className={cn("transition-transform", collapsed && "-rotate-90")} />
        </IconBtn>
      </header>
      <div className={cn("grid transition-[grid-template-rows] duration-300 ease-out", collapsed ? "grid-rows-[0fr]" : "grid-rows-[1fr]", grow && !collapsed && "min-h-0 flex-1")}>
        <div className="min-h-0 overflow-hidden">{children}</div>
      </div>
    </section>
  );
}

function ColorPanel() {
  return (
    <div className="flex gap-3 px-3 pb-3 pt-1">
      <div className="relative h-14 w-14 shrink-0">
        <div className="absolute bottom-0 right-0 h-9 w-9 rounded-[4px] bg-foreground shadow-[0_0_0_2px_var(--surface)]" />
        <div className="absolute left-0 top-0 h-9 w-9 rounded-[4px] bg-[oklch(0.55_0.2_25)] shadow-[0_0_0_2px_var(--surface),0_4px_10px_oklch(0_0_0/50%)]" />
        <ArrowLeftRight className="absolute -bottom-0.5 left-0 h-3 w-3 text-faint" />
      </div>
      <div className="relative h-28 flex-1 overflow-hidden rounded-[4px] shadow-[inset_0_0_0_1px_var(--hairline)]" style={{ background: "linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, hsl(0 85% 50%))" }}>
        <span className="absolute left-[78%] top-[22%] h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-foreground shadow-[0_0_0_1px_oklch(0_0_0/50%)]" />
      </div>
      <div className="hue-strip relative h-28 w-3 shrink-0 rounded-full">
        <span className="absolute -left-0.5 top-0 h-1.5 w-4 rounded-full border-2 border-foreground" />
      </div>
    </div>
  );
}

const presets = ["saturate(1.4) hue-rotate(-8deg)", "contrast(1.2) brightness(1.05)", "sepia(.35) saturate(1.3)", "hue-rotate(30deg) saturate(1.2)", "contrast(1.3) saturate(.7)", "grayscale(1) contrast(1.15)", "brightness(1.15) saturate(1.1)", "hue-rotate(-30deg)"];

function AdjustmentsPanel() {
  const [mode, setMode] = useState("Presets");
  const [open, setOpen] = useState(true);
  return (
    <div className="flex flex-col gap-2 px-3 pb-3">
      <div className="flex items-center justify-between">
        <Segmented items={["Presets", "Single"]} value={mode} onChange={setMode} />
        <div className="flex"><IconBtn title="New"><Plus /></IconBtn><IconBtn title="Group"><Folder /></IconBtn><IconBtn title="Delete"><Trash2 /></IconBtn></div>
      </div>
      <button onClick={() => setOpen(!open)} className="flex items-center gap-1.5 rounded-[4px] px-1 py-1 text-[11.5px] font-medium text-muted-foreground hover:text-foreground">
        <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", !open && "-rotate-90")} /> Automotive
        <span className="ml-auto font-mono text-[10px] text-faint">8</span>
      </button>
      {open && (
        <div className="grid grid-cols-4 gap-1.5">
          {presets.map((f, i) => (
            <button key={i} className="group relative aspect-square overflow-hidden rounded-[5px] shadow-[inset_0_0_0_1px_var(--hairline)] ring-primary transition-all hover:ring-2 hover:ring-offset-2 hover:ring-offset-surface">
              <img src={canvasImg} alt="" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110" style={{ filter: f, objectPosition: "60% 50%" }} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function LayersPanel() {
  const [sel, setSel] = useState(0);
  const [vis, setVis] = useState([true, true, true]);
  const layers = [
    { name: "Color Grade", kind: "adj" },
    { name: "Vehicle Cutout", kind: "img" },
    { name: "Background", kind: "img", locked: true },
  ];
  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex flex-col gap-1.5 px-3 pb-2">
        <div className="flex items-center gap-1.5">
          <Pill className="flex-1 text-muted-foreground"><Search className="h-3.5 w-3.5" /> Filter layers</Pill>
          <IconBtn className="h-7 w-7"><ImageIcon /></IconBtn><IconBtn className="h-7 w-7"><Circle /></IconBtn><IconBtn className="h-7 w-7"><Type /></IconBtn>
        </div>
        <div className="flex gap-1.5">
          <Pill className="flex-1 justify-between">Normal <ChevronDown className="h-3 w-3 text-faint" /></Pill>
          <Pill className="w-[110px] justify-between"><span className="text-faint">Opacity</span><span className="font-mono">100%</span></Pill>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] text-faint">Lock</span>
          <div className="flex rounded-[5px] bg-surface-2 p-0.5">
            {[Grid3x3, Brush, Move, Frame, Lock].map((I, i) => <IconBtn key={i} className="h-6 w-6 [&_svg]:h-3.5 [&_svg]:w-3.5"><I /></IconBtn>)}
          </div>
          <Pill className="ml-auto w-[110px] justify-between"><span className="text-faint">Fill</span><span className="font-mono">100%</span></Pill>
        </div>
      </div>
      <div className="min-h-0 flex-1 space-y-1 overflow-auto px-2 pb-2">
        {layers.map((l, i) => (
          <div
            key={l.name}
            onClick={() => setSel(i)}
            className={cn(
              "group flex cursor-default items-center gap-2 rounded-[5px] p-1.5 pr-2.5 transition-all",
              sel === i ? "bg-primary/15 shadow-[inset_0_0_0_1px_oklch(0.68_0.16_250/35%)]" : "hover:bg-surface-2",
            )}
          >
            <button onClick={(e) => { e.stopPropagation(); setVis(vis.map((v, j) => (j === i ? !v : v))); }} className="grid h-6 w-6 place-items-center rounded-[5px] text-muted-foreground hover:text-foreground">
              {vis[i] ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5 text-faint" />}
            </button>
            {l.kind === "adj" ? (
              <div className="grid h-9 w-12 place-items-center rounded-[4px] bg-surface-3"><SlidersHorizontal className="h-4 w-4 text-muted-foreground" /></div>
            ) : (
              <div className="checker h-9 w-12 overflow-hidden rounded-[4px] shadow-[inset_0_0_0_1px_var(--hairline)]">
                <img src={canvasImg} alt="" className={cn("h-full w-full object-cover", !vis[i] && "opacity-30")} />
              </div>
            )}
            <span className={cn("min-w-0 flex-1 truncate text-[12px]", !vis[i] && "text-faint")}>{l.name}</span>
            {l.locked && <Lock className="h-3.5 w-3.5 text-faint" />}
          </div>
        ))}
      </div>
      <footer className="flex items-center justify-end gap-0.5 border-t border-hairline px-2 py-1.5">
        {[Link2, Sparkles, RectangleHorizontal, Circle, Folder, Plus, Trash2].map((I, i) => <IconBtn key={i} className="h-7 w-7"><I /></IconBtn>)}
      </footer>
    </div>
  );
}

export function PhotoshopShell() {
  const [tool, setTool] = useState("Move");
  const [leftOpen, setLeftOpen] = useState(true);
  const [rightOpen, setRightOpen] = useState(true);
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const toggle = (k: string) => setCollapsed((c) => ({ ...c, [k]: !c[k] }));
  const [flyout, setFlyout] = useState<string | null>(null);
  const [zoom, setZoom] = useState(42);

  return (
    <div className="flex h-screen flex-col gap-2 bg-background p-2 text-foreground">
      {/* Title / menu bar */}
      <div className="flex h-10 shrink-0 items-center gap-1 px-1">
        <div className="mr-2 grid h-7 w-7 place-items-center rounded-[5px] text-[11px] font-bold tracking-tight text-primary-foreground" style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-active)" }}>Ps</div>
        <nav className="flex min-w-0 items-center overflow-hidden">
          {menus.map((m) => (
            <button key={m} className="rounded-[5px] px-2.5 py-1 text-[12.5px] text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground">{m}</button>
          ))}
        </nav>
        <div className="mx-auto hidden items-center gap-2 lg:flex">
          <div className="flex h-8 w-[340px] items-center gap-2 rounded-[6px] bg-surface px-3.5 text-muted-foreground shadow-[var(--shadow-island)]">
            <Search className="h-3.5 w-3.5" />
            <span className="text-[12px]">Search tools, actions, help…</span>
            <kbd className="ml-auto rounded-[4px] bg-surface-3 px-1.5 py-0.5 font-mono text-[10px]">⌘K</kbd>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <IconBtn title="Undo"><Undo2 /></IconBtn><IconBtn title="Redo"><Redo2 /></IconBtn>
          <button className="ml-1 flex h-8 items-center gap-1.5 rounded-[5px] px-3.5 text-[12px] font-medium text-primary-foreground transition-transform active:scale-95" style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-active)" }}>
            <Share className="h-3.5 w-3.5" /> Share
          </button>
          <div className="ml-1 grid h-8 w-8 place-items-center rounded-full bg-surface-3 text-[11px] font-semibold">AK</div>
        </div>
      </div>

      {/* Options bar */}
      <div className="island flex h-11 shrink-0 items-center gap-2 overflow-hidden px-1.5">
        <IconBtn title="Home"><Home /></IconBtn>
        <div className="h-5 w-px bg-hairline" />
        <Pill><Move className="h-3.5 w-3.5" /> {tool} <ChevronDown className="h-3 w-3 text-faint" /></Pill>
        <label className="flex items-center gap-2 text-[11.5px] text-muted-foreground"><Switch on /> Auto-Select</label>
        <Pill>Layer <ChevronDown className="h-3 w-3 text-faint" /></Pill>
        <label className="flex items-center gap-2 whitespace-nowrap text-[11.5px] text-muted-foreground"><Switch on={false} /> Transform controls</label>
        <div className="h-5 w-px bg-hairline" />
        <div className="flex rounded-[5px] bg-surface-2 p-0.5">
          {[AlignStartVertical, AlignCenterVertical, AlignEndVertical, AlignStartHorizontal, AlignCenterHorizontal, AlignEndHorizontal].map((I, i) => <IconBtn key={i} className="h-7 w-7"><I /></IconBtn>)}
        </div>
        <IconBtn><MoreHorizontal /></IconBtn>
        <div className="ml-auto flex items-center gap-1">
          <button className="flex h-8 items-center gap-1.5 rounded-[5px] bg-surface-2 px-3 text-[11.5px] font-medium shadow-[inset_0_0_0_1px_var(--hairline)] hover:bg-surface-3">
            <Sparkles className="h-3.5 w-3.5 text-primary" /> Generative Fill
          </button>
          <IconBtn><Settings2 /></IconBtn>
          <IconBtn><LayoutPanelLeft /></IconBtn>
        </div>
      </div>

      {/* Main */}
      <div className="flex min-h-0 flex-1 gap-2">
        {/* Left toolbar */}
        <aside className={cn("island flex shrink-0 flex-col items-center overflow-hidden px-1.5 py-1.5 transition-[width] duration-300 ease-out", leftOpen ? "w-[80px]" : "w-12")}>
          <div className={cn("grid min-h-0 flex-1 content-start justify-items-center gap-1 overflow-y-auto overflow-x-hidden [scrollbar-width:none]", leftOpen ? "grid-cols-2" : "grid-cols-1")}>
            {tools.map((t, i) => {
              if (!t) return <div key={i} className="col-span-full my-1 h-px w-full shrink-0 bg-hairline" />;
              const [I, name, key] = t;
              const active = tool === name;
              return (
                <div key={name} className="group relative">
                  <IconBtn title={`${name} (${key})`} onClick={() => setTool(name)} className={cn(active && "tool-active text-primary-foreground hover:bg-transparent hover:text-primary-foreground")}>
                    <I />
                  </IconBtn>
                  {active && <span className="absolute -left-1 top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-full bg-primary" />}
                </div>
              );
            })}
          </div>
          <div className="relative mt-1 h-9 w-9 shrink-0">
            <div className="absolute bottom-0 right-0 h-5 w-5 rounded-[4px] bg-foreground shadow-[0_0_0_2px_var(--surface)]" />
            <div className="absolute left-0 top-0 h-5 w-5 rounded-[4px] bg-[oklch(0.55_0.2_25)] shadow-[0_0_0_2px_var(--surface)]" />
          </div>
          <div className={cn("mt-1 w-full shrink-0 border-t border-hairline pt-1", leftOpen ? "grid grid-cols-2 justify-items-center gap-1" : "flex flex-col items-center gap-1")}>
            <IconBtn title="Edit Toolbar"><MoreHorizontal /></IconBtn>
            <IconBtn title={leftOpen ? "Collapse toolbar" : "Expand toolbar"} onClick={() => setLeftOpen(!leftOpen)} className="text-faint">
              {leftOpen ? <PanelLeftClose /> : <PanelLeftOpen />}
            </IconBtn>
          </div>
        </aside>


        {/* Document */}
        <main className="island flex min-w-0 flex-1 flex-col overflow-hidden">
          <div className="flex h-10 shrink-0 items-end gap-1 px-1.5">
            <div className="flex h-9 items-center gap-2 rounded-t-[7px] bg-workspace pl-3 pr-1.5 text-[12px] shadow-[inset_0_1px_0_var(--hairline),inset_1px_0_0_var(--hairline),inset_-1px_0_0_var(--hairline)]">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="truncate font-medium">porsche_mural.psd</span>
              <span className="font-mono text-[10.5px] text-faint">{zoom}% · RGB/8</span>
              <IconBtn className="h-5 w-5 [&_svg]:h-3 [&_svg]:w-3"><X /></IconBtn>
            </div>
            <div className="mb-0.5 flex h-8 items-center gap-2 rounded-[5px] px-3 text-[12px] text-muted-foreground hover:bg-surface-2">
              <span className="truncate">untitled-2.psd</span>
            </div>
            <IconBtn className="mb-0.5 h-7 w-7"><Plus /></IconBtn>
          </div>
          <div className="workspace-bg relative grid min-h-0 flex-1 place-items-center overflow-hidden rounded-b-[7px] mx-1.5 mb-1.5">
            <div className="relative shadow-canvas" style={{ width: `${zoom * 1.6}%`, maxWidth: "92%" }}>
              <img src={canvasImg} alt="Document canvas" width={1600} height={912} className="block h-auto w-full select-none" draggable={false} />
              <div className="pointer-events-none absolute inset-[12%_8%_10%_12%] rounded-[1px] border border-primary/80">
                {["-left-1 -top-1", "-right-1 -top-1", "-left-1 -bottom-1", "-right-1 -bottom-1"].map((p) => (
                  <span key={p} className={cn("absolute h-2 w-2 rounded-[2px] border border-primary bg-foreground", p)} />
                ))}
              </div>
            </div>
            {/* Floating contextual task bar */}
            <div className="absolute bottom-14 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-[7px] bg-popover/90 p-1 pl-3 shadow-[var(--shadow-island)] backdrop-blur-xl">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span className="mr-1 text-[11.5px] text-muted-foreground">Vehicle Cutout</span>
              {["Select subject", "Remove background", "Generative expand"].map((a) => (
                <button key={a} className="whitespace-nowrap rounded-[5px] px-3 py-1.5 text-[11.5px] font-medium hover:bg-surface-3">{a}</button>
              ))}
              <IconBtn className="h-7 w-7"><MoreHorizontal /></IconBtn>
            </div>
            {/* Status bar */}
            <div className="absolute inset-x-2 bottom-2 flex items-center gap-3 rounded-[6px] bg-surface/80 px-2 py-1 text-[11px] text-muted-foreground backdrop-blur-xl shadow-[inset_0_0_0_1px_var(--hairline)]">
              <div className="flex items-center rounded-[5px] bg-surface-2">
                <IconBtn className="h-6 w-6 [&_svg]:h-3 [&_svg]:w-3" onClick={() => setZoom(Math.max(15, zoom - 5))}><Minus /></IconBtn>
                <span className="w-10 text-center font-mono text-foreground">{zoom}%</span>
                <IconBtn className="h-6 w-6 [&_svg]:h-3 [&_svg]:w-3" onClick={() => setZoom(Math.min(60, zoom + 5))}><Plus /></IconBtn>
              </div>
              <span className="font-mono">3840 × 2160 px · 72 ppi</span>
              <span className="ml-auto flex items-center gap-1.5"><Check className="h-3 w-3 text-primary" /> Saved to cloud</span>
            </div>
          </div>
        </main>

        {/* Right rail + panels */}
        <div className="island relative flex shrink-0">
          <aside className="flex w-11 border-r border-hairline flex-col items-center gap-0.5 py-1.5">
            <IconBtn title={rightOpen ? "Collapse panels" : "Expand panels"} onClick={() => { setRightOpen(!rightOpen); setFlyout(null); }} className="h-7 w-7 text-faint">
              {rightOpen ? <PanelRightClose /> : <PanelRightOpen />}
            </IconBtn>
            <div className="my-1 h-px w-6 bg-hairline" />
            {[[Palette, "color"], [Wand, "adjust"], [Layers, "layers"]].map(([I, k]) => {
              const Ic = I as typeof Palette;
              const key = k as string;
              const active = rightOpen ? !collapsed[key] : flyout === key;
              return (
                <IconBtn
                  key={key}
                  active={active}
                  title={{ color: "Color", adjust: "Adjustments", layers: "Layers" }[key]}
                  onClick={() => { if (rightOpen) toggle(key); else setFlyout((f) => (f === key ? null : key)); }}
                >
                  <Ic />
                </IconBtn>
              );
            })}
            <div className="my-1 h-px w-6 bg-hairline" />
            <IconBtn><History /></IconBtn><IconBtn><MessageSquare /></IconBtn>
          </aside>
          {/* Floating flyout panel when the rail is collapsed */}
          {!rightOpen && flyout && (
            <div
              className="absolute right-full z-50 mr-2 w-[300px] overflow-hidden rounded-[7px] bg-popover/95 shadow-[var(--shadow-island)] backdrop-blur-xl animate-in fade-in slide-in-from-right-1 duration-150"
              style={{ top: { color: 46, adjust: 82, layers: 118 }[flyout] }}
            >
              <div className="flex items-center justify-between border-b border-hairline px-3 py-1.5">
                <span className="text-[12px] font-medium">{{ color: "Color", adjust: "Adjustments", layers: "Layers" }[flyout]}</span>
                <IconBtn title="Close" className="h-6 w-6 [&_svg]:h-3.5 [&_svg]:w-3.5" onClick={() => setFlyout(null)}><X /></IconBtn>
              </div>
              <div className="max-h-[70vh] overflow-y-auto pt-1.5">
                {flyout === "color" && <ColorPanel />}
                {flyout === "adjust" && <AdjustmentsPanel />}
                {flyout === "layers" && <LayersPanel />}
              </div>
            </div>
          )}
          <div className={cn("flex min-h-0 flex-col overflow-hidden transition-[width,opacity] duration-300 ease-out", rightOpen ? "w-[316px] opacity-100" : "w-0 opacity-0")}>
            <div className="flex min-h-0 w-[316px] flex-1 flex-col divide-y divide-hairline">
              <PanelCard tabs={["Color", "Swatches", "Gradients"]} collapsed={!!collapsed["color"]} onToggle={() => toggle("color")}><ColorPanel /></PanelCard>
              <PanelCard tabs={["Adjustments", "Properties", "Libraries"]} collapsed={!!collapsed["adjust"]} onToggle={() => toggle("adjust")}><AdjustmentsPanel /></PanelCard>
              <PanelCard tabs={["Layers", "Channels", "Paths"]} grow collapsed={!!collapsed["layers"]} onToggle={() => toggle("layers")}><LayersPanel /></PanelCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
