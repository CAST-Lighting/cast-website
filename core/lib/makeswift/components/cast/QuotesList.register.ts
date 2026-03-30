import { lazy } from "react"
import { Style, TextInput, Color, Number as NumberControl } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./QuotesList")),
  {
    type: "cast-quotes-list",
    label: "Account / Quotes List",
    props: {
      className: Style(),
      bgColor: Color({ label: "Background Color", defaultValue: "#0f1923" }),
      paddingTop: NumberControl({ label: "Padding Top (px)", defaultValue: 64, min: 0, max: 400, step: 8 }),
      paddingBottom: NumberControl({ label: "Padding Bottom (px)", defaultValue: 64, min: 0, max: 400, step: 8 }),
      heading: TextInput({ label: "Heading", defaultValue: "My Quotes" }),
      emptyMessage: TextInput({ label: "Empty State Message", defaultValue: "No quotes yet." }),
    },
  }
)
