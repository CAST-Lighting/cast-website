import { lazy } from "react"
import { Style, Color, Number as NumberControl } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./OrderDetail")),
  {
    type: "cast-order-detail",
    label: "Account / Order Detail",
    props: {
      className: Style({ properties: [Style.Padding, Style.Margin] }),
      bgColor:       Color({ label: "🎨 Background — Color", defaultValue: "#F5F5F5" }),
    },
  }
)
