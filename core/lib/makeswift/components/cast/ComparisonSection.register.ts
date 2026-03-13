import { lazy } from "react"
import { Style } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./ComparisonSection")),
  {
    type: "site-comparison",
    label: "Site / Comparison Section",
    props: {
      className: Style(),
    },
  }
)
