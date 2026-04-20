import { lazy } from "react"
import { Style, Checkbox} from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./StyleGuide")),
  {
    type: "cast-style-guide",
    label: "Utilities / Style Guide",
    props: {
      className: Style({ properties: [Style.Padding, Style.Margin] }) } }
      lightMode: Checkbox({ label: '💡 Light Mode', defaultValue: false }),
)
