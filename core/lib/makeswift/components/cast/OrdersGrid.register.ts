import { lazy } from "react"
import { Style, TextInput, Color, Number as NumberControl } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./OrdersGrid")),
  {
    type: "cast-orders-grid",
    label: "Account / Orders Grid",
    props: {
      className: Style(),
      paddingTop:    NumberControl({ label: "📐 Layout — Padding Top",    defaultValue: 64, min: 0, max: 400, step: 8, suffix: "px" }),
      paddingBottom: NumberControl({ label: "📐 Layout — Padding Bottom", defaultValue: 64, min: 0, max: 400, step: 8, suffix: "px" }),
      bgColor:      Color({ label: "🎨 Background — Color", defaultValue: "#F5F5F5" }),
      heading:      TextInput({ label: "✏️ Content — Heading",             defaultValue: "My Orders" }),
      emptyMessage: TextInput({ label: "✏️ Content — Empty State Message", defaultValue: "No orders yet." }),
    },
  }
)
