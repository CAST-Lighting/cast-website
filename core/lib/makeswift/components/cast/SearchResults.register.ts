import { lazy } from "react"
import { Style, TextInput, TextArea, Color, Number, Checkbox} from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./SearchResults")),
  {
    type: "cast-search-results",
    label: "Search / Results Grid",
    props: {
      className: Style({ properties: [Style.Padding, Style.Margin] }),
      lightMode: Checkbox({ label: '💡 Light Mode', defaultValue: false }),

      // 🎨 Background
      bgColor: Color({ label: "🎨 Background — Color", defaultValue: "#f5f5f5" }),

      // ✏️ Content
      heading: TextInput({ label: "✏️ Content — Heading", defaultValue: "Search" }),
      headingAccent: TextInput({ label: "✏️ Content — Heading Accent", defaultValue: "Results" }),
      placeholder: TextInput({ label: "✏️ Content — Search Placeholder", defaultValue: "Search products, guides, resources..." }),
      emptyHeading: TextInput({ label: "✏️ Content — Empty State Heading", defaultValue: "No results found" }),
      emptyBody: TextArea({ label: "✏️ Content — Empty State Body", defaultValue: "Try a different search term or browse our product categories." }),

      // 📐 Layout
      pageSize: Number({ label: "📐 Layout