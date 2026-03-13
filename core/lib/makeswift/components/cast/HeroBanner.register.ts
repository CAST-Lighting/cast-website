import { lazy } from "react"
import { Style } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./HeroBanner")),
  {
    type: "site-hero-banner",
    label: "Site / Hero Banner",
    props: {
      className: Style(),
    },
  }
)
