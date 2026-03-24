import { lazy } from "react"
import { Style, TextInput, Image, Color, Checkbox, Number } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./ShopHero")),
  {
    type: "site-shop-hero",
    label: "Site / Shop Hero",
    props: {
      className: Style(),
      headline: TextInput({ label: "Headline", defaultValue: "Shop Professional Outdoor Lighting" }),
      subheadline: TextInput({ label: "Subheadline", defaultValue: "Built for contractors. Tested for decades. Trusted by the industry." }),
      bgImage: Image({ label: "Background Image" }),
      bgColor: Color({ label: "Background Color", defaultValue: "#0f1e28" }),
      ctaLabel: TextInput({ label: "CTA Button Label", defaultValue: "Browse All Products" }),
      ctaHref: TextInput({ label: "CTA Button URL", defaultValue: "#shop-grid" }),
      showSearch: Checkbox({ label: "Show Search Bar", defaultValue: true }),
    },
  }
)
