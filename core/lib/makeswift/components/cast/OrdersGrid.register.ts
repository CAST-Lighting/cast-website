import { lazy } from "react"
import { Style, TextInput, Color } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./OrdersGrid")),
  {
    type: "cast-orders-grid",
    label: "Account / Orders Grid",
    props: {
      className: Style({ properties: [Style.Padding, Style.Margin] }),
      lightMode: Checkbox({ label: '💡 Light Mode', defaultValue: false }),
      bgColor:      Color({ label: "🎨 Background — Color", defaultValue: "#F5F5F5" }),
      heading:      TextInput({ label: "✏️ Content — Heading",             defaultValue: "My Orders" }),
      emptyMessage: TextInput({ label: "✏️ Content — Empty State Message", defaultValue: "No orders yet." }) } }
)
