import { lazy } from "react"
import { Style, Color } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./QuoteDetail")),
  {
    type: "cast-quote-detail",
    label: "Account / Quote Detail",
    props: {
      className: Style({ properties: [Style.Padding, Style.Margin] }),

      // ─── 📐 Layout ────────────────────────────────────────────────

      // ─── 🎨 Background ────────────────────────────────────────────
      bgColor: Color({ label: "🎨 Background — Color", defaultValue: "#F5F5F5" }) } }
)
