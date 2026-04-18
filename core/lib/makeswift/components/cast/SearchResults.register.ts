import { lazy } from "react"
import { Style, TextInput, TextArea, Color, Number } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./SearchResults")),
  {
    type: "cast-search-results",
    label: "Search / Results Grid",
    props: {
      className: Style({ properties: [Style.Padding, Style.Margin] }),
      paddingTop:    Number({ label: "📐 Layout — Padding Top",    defaultValue: 48, min: 0, max: 400, step: 8, suffix: "px" }),
      paddingBottom: Number({ label: "📐 Layout — Padding Bottom", defaultValue: 96, min: 0, max: 400, step: 8, suffix: "px" }),

      // 🎨 Background
      bgColor: Color({ label: "🎨 Background — Color", defaultValue: "#0f1923" }),

      // ✏️ Content
      heading: TextInput({ label: "✏️ Content — Heading", defaultValue: "Search" }),
      headingAccent: TextInput({ label: "✏️ Content — Heading Accent", defaultValue: "Results" }),
      placeholder: TextInput({ label: "✏️ Content — Search Placeholder", defaultValue: "Search products, guides, resources..." }),
      emptyHeading: TextInput({ label: "✏️ Content — Empty State Heading", defaultValue: "No results found" }),
      emptyBody: TextArea({ label: "✏️ Content — Empty State Body", defaultValue: "Try a different search term or browse our product categories." }),

      // 📐 Layout
      pageSize: Number({ label: "📐 Layout — Products Per Page", defaultValue: 12, min: 4, max: 48, step: 4 }),
    },
  }
)
