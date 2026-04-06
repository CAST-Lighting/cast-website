import { lazy } from "react"
import { Style, TextInput, TextArea, List, Shape, Image, Color, Number as NumberControl, Select } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./NewsletterCtaFull")),
  {
    type: "site-newsletter-cta-full",
    label: "CTA / Newsletter Full",
    props: {
      className: Style(),
      paddingTop: NumberControl({ label: "📐 Layout — Padding Top", defaultValue: 96, min: 0, max: 400, step: 8, suffix: "px" }),
      paddingBottom: NumberControl({ label: "📐 Layout — Padding Bottom", defaultValue: 96, min: 0, max: 400, step: 8, suffix: "px" }),

      // 🎨 Background
      bgImage: Image({ label: "🎨 Background — Image" }),
      bgColor: Color({ label: "🎨 Background — Color", defaultValue: "#25262d" }),
      overlayColor: Color({ label: "🎨 Background — Overlay Color" }),
      overlayOpacity: NumberControl({ label: "🎨 Background — Overlay Opacity %", defaultValue: 0, min: 0, max: 100, step: 5 }),
      containerBgColor: Color({ label: "🎨 Background — Container Color", defaultValue: "#111827" }),
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
        defaultValue: "to bottom",
      }),

      // ✏️ Content
      heading: TextInput({ label: "✏️ Content — Heading", defaultValue: "Heading Goes Here" }),
      description: TextArea({
        label: "✏️ Content — Description",
        defaultValue: "Get the latest on new products, contractor resources, and exclusive offers delivered straight to your inbox.",
      }),

      // 🔘 Buttons
      buttonText: TextInput({ label: "🔘 Buttons — Button Text", defaultValue: "Submit" }),

      // 📦 Items — Benefits
      items: List({
        label: "📦 Items — Benefit Items",
        type: Shape({
          type: {
            text: TextInput({ label: "Text", defaultValue: "Benefit item" }),
          },
        }),
        getItemLabel(item) { return item?.text || "Item"; },
      }),
    },
  }
)
