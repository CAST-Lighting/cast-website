import { lazy } from "react"
import { Style, TextInput, TextArea, List, Shape, Color, Image, Select, Number as NumberControl, Checkbox} from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./ProductFAQ")),
  {
    type: "site-product-faq",
    label: "Product / FAQ",
    props: {
      className: Style({ properties: [Style.Padding, Style.Margin] }),
      lightMode: Checkbox({ label: '💡 Light Mode', defaultValue: false }),

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

      // 🌓 Theme
      mode: Select({ label: "🌓 Theme", options: [{ value: "dark", label: "Dark" }, { value: "light", label: "Light" }], defaultValue: "dark" }),

      // ✏️ Content
      heading: TextInput({ label: "✏️ Content — Heading", defaultValue: "Frequently Asked Questions" }),
      headingAccent: TextInput({ label: "✏️ Content — Heading Accent (gradient)", defaultValue: "" }),

      // 📦 Items — FAQs
      faqs: List({
        label: "📦 Items — FAQs",
        type: Shape({
          type: {
            question: TextInput({ label: "Question", defaultValue: "Question goes here?" }),
            answer: TextArea({ label: "Answer", defaultValue: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." }) } }),
        getItemLabel(item) { return item?.question?.slice(0, 50) || "FAQ"; } }) } }
)
