import { lazy } from "react"
import { Style, TextInput, Color } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./FavoritesGrid")),
  {
    type: "cast-favorites-grid",
    label: "Account / Favorites Grid",
    props: {
      className: Style({ properties: [Style.Padding, Style.Margin] }),
      lightMode: Checkbox({ label: '💡 Light Mode', defaultValue: false }),

      // 🎨 Background
      bgColor: Color({ label: "🎨 Background — Color", defaultValue: "#f5f5f5" }),

      // ✏️ Content
      heading: TextInput({ label: "✏️ Content — Heading", defaultValue: "My Favorites" }),
      emptyMessage: TextInput({ label: "✏️ Content — Empty State Message", defaultValue: "Your favorites list is empty." }) } }
)
