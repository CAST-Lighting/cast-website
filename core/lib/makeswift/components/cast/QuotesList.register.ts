import { lazy } from "react"
import { Style, TextInput, Color, Number as NumberControl} from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./QuotesList")),
  {
    type: "cast-quotes-list",
    label: "Account / Quotes List",
    props: {
      className: Style({ properties: [Style.Padding, Style.Margin] }),
      paddingTop: NumberControl({ label: "📐 Layout — Padding Top (px)", defaultValue: 64, min: 0, max: 400, step: 8 }),
      paddingBottom: NumberControl({ label: "📐 Layout — Padding Bottom (px)", defaultValue: 64, min: 0, max: 400, step: 8 }),

      // 🎨 Background
      bgColor: Color({ label: "🎨 Background — Color", defaultValue: "#0f1923" }),

      // ✏️ Content
      heading: TextInput({ label: "✏️ Content — Heading", defaultValue: "My Quotes" }),
      emptyMessage: TextInput({ label: "✏️ Content — Empty State Message", defaultValue: "No quotes yet." }) } }
)
