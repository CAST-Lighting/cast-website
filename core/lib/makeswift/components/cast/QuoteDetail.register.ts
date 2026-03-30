import { lazy } from "react"
import { Style, Color, Number as NumberControl } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./QuoteDetail")),
  {
    type: "cast-quote-detail",
    label: "Account / Quote Detail",
    props: {
      className: Style(),

      // ─── 📐 Layout ────────────────────────────────────────────────
      paddingTop:    NumberControl({ label: "📐 Layout — Padding Top",    defaultValue: 64, min: 0, max: 400, step: 8, suffix: "px" }),
      paddingBottom: NumberControl({ label: "📐 Layout — Padding Bottom", defaultValue: 64, min: 0, max: 400, step: 8, suffix: "px" }),

      // ─── 🎨 Background ────────────────────────────────────────────
      bgColor: Color({ label: "🎨 Background — Color", defaultValue: "#F5F5F5" }),
    },
  }
)
