import { lazy } from "react"
import { Style, Color, Number } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  // @ts-expect-error Makeswift control types vs optional props
  lazy(() => import("./CmsProductContent")),
  {
    type: "cast-cms-product-content",
    label: "CMS Content / Product Details",
    props: {
      className: Style(),
      bgColor: Color({ label: "Background Color", defaultValue: "#0f1923" }),
      paddingTop: Number({ label: "Padding Top (px)", defaultValue: 48, min: 0, step: 4 }),
      paddingBottom: Number({ label: "Padding Bottom (px)", defaultValue: 64, min: 0, step: 4 }),
    },
  }
)
