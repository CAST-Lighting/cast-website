import { lazy } from "react"
import { Style } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./StyleGuide")),
  {
    type: "cast-style-guide",
    label: "Utilities / Style Guide",
    props: {
      className: Style({ properties: [Style.Padding, Style.Margin] }),
    },
  }
)
