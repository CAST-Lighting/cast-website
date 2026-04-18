import { lazy } from "react"
import { Style, List, Shape, TextInput, Image, Color, Select, Number as NumberControl} from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./ShopGrid")),
  {
    type: "site-shop-grid",
    label: "Product / Shop Grid",
    props: {
      className: Style({ properties: [Style.Padding, Style.Margin] }),

      // 🎨 Background
      bgColor: Color({ label: "🎨 Background — Color", defaultValue: "#25262d" }),
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
      heading: TextInput({ label: "✏️ Content — Heading", defaultValue: "" }),
      headingAccent: TextInput({ label: "✏️ Content — Heading Accent (gradient)", defaultValue: "" }),

      // 🌓 Theme
      mode: Select({ label: '🌓 Theme', options: [{ value: 'dark', label: 'Dark' }, { value: 'light', label: 'Light' }], defaultValue: 'dark' }),

      // 📦 Items — Products
      products: List({
        label: "📦 Items — Products",
        type: Shape({
          type: {
            image: Image({ label: "Product Image" }),
            name: TextInput({ label: "Product Name", defaultValue: "Product Name" }),
            price: TextInput({ label: "Price", defaultValue: "$0.00" }),
            category: TextInput({ label: "Category", defaultValue: "Category" }),
            badge: TextInput({ label: "Badge (optional)", defaultValue: "" }),
            href: TextInput({ label: "Product URL", defaultValue: "#" }) } }),
        getItemLabel(item) { return item?.name || "Product"; } }) } }
)
