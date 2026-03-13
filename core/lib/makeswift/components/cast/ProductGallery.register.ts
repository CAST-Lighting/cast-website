import { lazy } from "react"
import { Style } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./ProductGallery")),
  {
    type: "site-product-gallery",
    label: "Site / Product Gallery",
    props: {
      className: Style(),
    },
  }
)
