import { lazy } from "react"
import { Style, Color, Checkbox} from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./OrderDetail")),
  {
    type: "cast-order-detail",
    label: "Account / Order Detail",
    props: {
      className: Style({ properties: [Style.Padding, Style.Margin] }),
      lightMode: Checkbox({ label: '💡 Light Mode', defaultValue: false }),
      bgColor:       Color({ la