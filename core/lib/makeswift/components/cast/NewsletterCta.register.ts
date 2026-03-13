import { lazy } from "react"
import { Style } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./NewsletterCta")),
  {
    type: "site-newsletter",
    label: "Site / Newsletter",
    props: {
      className: Style(),
    },
  }
)
