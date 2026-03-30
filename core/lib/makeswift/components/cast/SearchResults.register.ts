import { lazy } from "react"
import { Style, TextInput, TextArea, Color, Number } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./SearchResults")),
  {
    type: "cast-search-results",
    label: "Search / Results Grid",
    props: {
      className: Style(),
      paddingTop: Number({ label: "📐 Layout — Padding Top (px)", defaultValue: 48 }),
      paddingBottom: Number({ label: "📐 Layout — Padding Bottom (px)", defaultValue: 96 }),

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
