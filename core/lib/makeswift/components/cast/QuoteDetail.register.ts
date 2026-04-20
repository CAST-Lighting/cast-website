import { lazy } from "react"
import { Style, Color, Checkbox} from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./QuoteDetail")),
  {
    type: "cast-quote-detail",
    label: "Account / Quote Detail",
    props: {
      className: Style({ properties: [Style.Padding, Style.Margin] }),
      lightMode: Checkbox({ label: '💡 Light Mode', defaultValue: false }),

      // ─── 📐 Layout ────────────────────────────────────────────────

      // ─── 🎨 Background ────────────────────────────────────────────
      bgColor: 