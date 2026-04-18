import { lazy } from "react"
import { Style, TextInput, Color, Number as NumberControl } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./FavoritesGrid")),
  {
    type: "cast-favorites-grid",
    label: "Account / Favorites Grid",
    props: {
      className: Style(),

      // 🎨 Background
      bgColor: Color({ label: "🎨 Background — Color", defaultValue: "#F5F5F5" }),

      // ✏️ Content
      heading: TextInput({ label: "✏️ Content — Heading", defaultValue: "My Favorites" }),
      emptyMessage: TextInput({ label: "✏️ Content — Empty State Message", defaultValue: "Your favorites list is empty." }),
    },
  }
)
