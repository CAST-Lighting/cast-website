import { lazy } from "react"
import { Style, Color, Number } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  // @ts-expect-error Makeswift control types vs optional props
  lazy(() => import("./CmsBlogBody")),
  {
    type: "cast-cms-blog-body",
    label: "CMS Content / Blog Body",
    props: {
      className: Style({ properties: [Style.Padding, Style.Margin] }),
      paddingTop: Number({ label: "📐 Padding Top (px)", defaultValue: 56, min: 0, step: 4 }),
      paddingBottom: Number({ label: "📐 Padding Bottom (px)", defaultValue: 80, min: 0, step: 4 }),
      bgColor: Color({ label: "🎨 Background Color", defaultValue: "#F5F5F5" }) } }
)
