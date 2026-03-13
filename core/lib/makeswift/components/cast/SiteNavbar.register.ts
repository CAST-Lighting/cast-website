import { lazy } from "react"
import { Style } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./SiteNavbar")),
  {
    type: "site-navbar",
    label: "Site / Navbar",
    props: {
      className: Style(),
    },
  }
)
