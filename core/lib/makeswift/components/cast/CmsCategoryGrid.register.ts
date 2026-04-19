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
      bgColor: Color({ label: "🎨 Background Color", defaultValue: "#27474f" }),
      columns: Number({ label: "📐 Columns", defaultValue: 6, min: 1, max: 6, step: 1 }) } }
)
