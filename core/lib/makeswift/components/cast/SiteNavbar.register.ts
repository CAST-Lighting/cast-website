import { lazy } from "react"
import { Style, Number as NumberControl } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./SiteNavbar")),
  {
    type: "site-navbar",
    label: "Navigation / Navbar",
    props: {
      className: Style(),
      lineHeight: NumberControl({ label: 'Text Line Height', defaultValue: 1.6, min: 1, max: 3, step: 0.05 }),
    },
  }
)
