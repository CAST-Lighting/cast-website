import { lazy } from "react"
import { Style, Color } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  // @ts-expect-error Makeswift control types vs optional props
  lazy(() => import("./CmsBlogBody")),
  {
    type: "cast-cms-blog-body",
    label: "CMS Content / Blog Body",
    props: {
      className: Style(),
      bgColor: Color({ label: "🎨 Background Color", defaultValue: "#0f1923" }),
    },
  }
)
