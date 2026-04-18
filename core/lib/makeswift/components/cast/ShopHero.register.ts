import { lazy } from "react"
import { Style, TextInput, Image, Color, Checkbox, Select, Number as NumberControl} from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./ShopHero")),
  {
    type: "site-shop-hero",
    label: "Hero / Shop Hero",
    props: {
      className: Style({ properties: [Style.Padding, Style.Margin] }),

      // ✏️ Content
      headline: TextInput({ label: "✏️ Content — Headline", defaultValue: "Shop CAST Lighting Products" }),
      subheadline: TextInput({ label: "✏️ Content — Subheadline", defaultValue: "Professional outdoor lighting fixtures built to last a lifetime. Solid brass, copper, and bronze construction with lifetime warranties." }),

      // 🎨 Background
      bgImage: Image({ label: "🎨 Background — Image" }),
      bgColor: Color({ label: "🎨 Background — Color", defaultValue: "#0f1e28" }),
      bgOpacity: NumberControl({ label: "🎨 Background — Opacity", defaultValue: 85, min: 0, max: 100, step: 1, suffix: "%" }),
      gradientFrom: Color({ label: "🎨 Background — Gradient From" }),
      gradientTo: Color({ label: "🎨 Background — Gradient To" }),
      gradientDirection: Select({
        label: "🎨 Background — Gradient Direction",
        options: [
          { value: "to bottom", label: "Top to Bottom" },
          { value: "to top", label: "Bottom to Top" },
          { value: "to right", label: "Left to Right" },
          { value: "to left", label: "Right to Left" },
          { value: "135deg", label: "Diagonal" },
        ],
        defaultValue: "to bottom" }),

      // 🔘 Buttons
      ctaLabel: TextInput({ label: "🔘 Buttons — CTA Button Label", defaultValue: "Browse All Products" }),
      ctaHref: TextInput({ label: "🔘 Buttons — CTA Button URL", defaultValue: "/category/23" }),
      showSearch: Checkbox({ label: "📐 Layout — Show Search Bar", defaultValue: true }) } }
)
