import { lazy } from "react"
import { Style, Color, Checkbox} from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  // @ts-expect-error Makeswift control types vs optional props
  lazy(() => import("./CmsBlogBody")),
  {
    type: "cast-cms-blog-body",
    label: "CMS Content / Blog Body",
    props: {
      className: Style({ properties: [Style.Padding, Style.Margin] }),
      lightMode: Checkbox({ label: '💡 Light Mode', defaultValue: false }),
      bgCol