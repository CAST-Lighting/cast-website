import { lazy } from "react"
import { Style, Color, Number } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  // @ts-expect-error Makeswift control types vs optional props
  lazy(() => import("./CmsCategoryGrid")),
  {
    type: "cast-cms-category-grid",
    label: "CMS Content / Category Grid",
    props: {
      className: Style({ properties: [Style.Padding, Style.Margin] }),
      paddingTop: Number({ label: "📐 Padding Top (px)", defaultValue: 48, min: 0, step: 4 }),
      paddingBottom: Number({ label: "📐 Padding Bottom (px)", defaultValue: 64, min: 0, step: 4 }),
      bgColor: Color({ label: "🎨 Background Color", defaultValue: "#0f1923" }),
      columns: Number({ label: "📐 Columns", defaultValue: 4, min: 1, max: 6, step: 1 }) } }
)
