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
      bgColor: Color({ label: "Background Color", defaultValue: "#0f1923" }),
      paddingTop: Number({ label: "Padding Top (px)", defaultValue: 48 }),
      paddingBottom: Number({ label: "Padding Bottom (px)", defaultValue: 96 }),
      heading: TextInput({ label: "Heading", defaultValue: "Search" }),
      headingAccent: TextInput({ label: "Heading Accent", defaultValue: "Results" }),
      placeholder: TextInput({ label: "Search Placeholder", defaultValue: "Search products, guides, resources..." }),
      emptyHeading: TextInput({ label: "Empty State Heading", defaultValue: "No results found" }),
      emptyBody: TextArea({ label: "Empty State Body", defaultValue: "Try a different search term or browse our product categories." }),
      pageSize: Number({ label: "Products Per Page", defaultValue: 12, min: 4, max: 48, step: 4 }),
    },
  }
)
