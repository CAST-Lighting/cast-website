import { lazy } from "react"
import { Style, TextInput, Image, Color, Checkbox, Number as NumberControl, Select } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./ShopHero")),
  {
    type: "site-shop-hero",
    label: "Hero / Shop Hero",
    props: {
      className: Style(),
      headline: TextInput({ label: "Headline", defaultValue: "Shop Professional Outdoor Lighting" }),
      subheadline: TextInput({ label: "Subheadline", defaultValue: "Built for contractors. Tested for decades. Trusted by the industry." }),
      bgImage: Image({ label: "Background Image" }),
      bgColor: Color({ label: "Background Color", defaultValue: "#0f1e28" }),
      bgOpacity: NumberControl({ label: 'Background Opacity', defaultValue: 85, min: 0, max: 100, step: 1, suffix: '%' }),
      gradientFrom: Color({ label: 'Gradient From' }),
      gradientTo: Color({ label: 'Gradient To' }),
      gradientDirection: Select({
        label: 'Gradient Direction',
        options: [
          { value: 'to bottom', label: 'Top to Bottom' },
          { value: 'to top', label: 'Bottom to Top' },
          { value: 'to right', label: 'Left to Right' },
          { value: 'to left', label: 'Right to Left' },
          { value: '135deg', label: 'Diagonal' },
        ],
        defaultValue: 'to bottom',
      }),
      paddingTop: NumberControl({ label: 'Padding Top', defaultValue: 96, min: 0, max: 400, step: 8, suffix: 'px' }),
      paddingBottom: NumberControl({ label: 'Padding Bottom', defaultValue: 96, min: 0, max: 400, step: 8, suffix: 'px' }),
      ctaLabel: TextInput({ label: "CTA Button Label", defaultValue: "Browse All Products" }),
      ctaHref: TextInput({ label: "CTA Button URL", defaultValue: "#shop-grid" }),
      showSearch: Checkbox({ label: "Show Search Bar", defaultValue: true }),
    },
  }
)
