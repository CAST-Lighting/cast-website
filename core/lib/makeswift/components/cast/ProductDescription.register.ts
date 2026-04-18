import { lazy } from "react"
import { Style, TextInput, TextArea, List, Shape, Color, Image, Select } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./ProductDescription")),
  {
    type: "site-product-description",
    label: "Product / Description",
    props: {
      className: Style({ properties: [Style.Padding, Style.Margin] }),
      sectionStyle: Style({ properties: [Style.Padding, Style.Margin] }),

      // 🎨 Background
      bgColor: Color({ label: "🎨 Background — Color", defaultValue: "#2d353c" }),
      bgImage: Image({ label: "🎨 Background — Image" }),
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

      // ✏️ Content
      heading: TextInput({ label: "✏️ Content — Heading", defaultValue: "Heading Goes Here" }),
      description: TextArea({ label: "✏️ Content — Description", defaultValue: "" }),

      // 📦 Items — Bullet Points
      bulletPoints: List({
        label: "📦 Items — Bullet Points",
        type: Shape({
          type: {
            text: TextInput({ label: "Bullet Text", defaultValue: "Feature or specification" }) } }),
        getItemLabel(item) { return item?.text?.slice(0, 40) || "Bullet"; } }) } }
)
