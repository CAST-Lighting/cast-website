import { lazy } from "react"
import { Style } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./SiteFooter")),
  {
    type: "site-footer",
    label: "Site / Footer",
    props: {
      className: Style(),
    },
  }
)
