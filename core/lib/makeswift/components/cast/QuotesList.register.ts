import { lazy } from "react"
import { Style, TextInput, Color } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./QuotesList")),
  {
    type: "cast-quotes-list",
    label: "Account / Quotes List",
    props: {
      className: Style({ properties: [Style.Padding, Style.Margin] }),

      // 🎨 Background
      bgColor: Color({ label: "🎨 Background — Color", defaultValue: "#f5f5f5" }),

      // ✏️ Content
      heading: TextInput({ label: "✏️ Content — Heading", defaultValue: "My Quotes" }),
      emptyMessage: TextInput({ label: "✏️ Content — Empty State Message", defaultValue: "No quotes yet." }) } }
)
