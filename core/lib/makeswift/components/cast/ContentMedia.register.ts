import { lazy } from "react"
import { Style } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./ContentMedia")),
  {
    type: "site-content-media",
    label: "Site / Content + Media",
    props: {
      className: Style(),
    },
  }
)
