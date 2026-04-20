import { lazy } from "react"
import { Style, TextInput, List, Shape, Image, Color, Select, Number as NumberControl, Checkbox} from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./BrandLogos")),
  {
    type: "site-brand-logos",
    label: "Sections / Brand Logos",
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

      // ✏️ Content
      overline: TextInput({ label: "✏️ Content — Label over Title", defaultValue: "Section Label" }),
      heading: TextInput({ label: "✏️ Content — Heading", defaultValue: "Heading Goes Here" }),
      headingAccent: TextInput({ label: "✏️ Content — Heading Accent (gradient)", defaultValue: "" }),

      // 🌓 Theme
      mode: Select({ label: '🌓 Theme', options: [{ value: 'dark', label: 'Dark' }, { value: 'light', label: 'Light' }], defaultValue: 'dark' }),

      // 📦 Items — Logos
      logos: List({
        label: "📦 Items — Brand Logos",
        type: Shape({
          type: {
            image: Image({ label: "Logo Image" }),
            name: TextInput({ label: "Brand Name", defaultValue: "Brand Name" }),
            url: TextInput({ label: "Link URL", defaultValue: "#" }) 