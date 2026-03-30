import { lazy } from "react"
import { Style, TextInput, List, Shape, Image, Color, Number as NumberControl, Select } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./PartsGrid")),
  {
    type: "site-parts-grid",
    label: "Product / Parts Grid",
    props: {
      className: Style(),
      sectionStyle: Style({ properties: [Style.Padding, Style.Margin] }),

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
        defaultValue: "to bottom",
      }),

      // 📐 Layout
      paddingTop: NumberControl({ label: "📐 Layout — Padding Top", defaultValue: 96, min: 0, max: 400, step: 8, suffix: "px" }),
      paddingBottom: NumberControl({ label: "📐 Layout — Padding Bottom", defaultValue: 96, min: 0, max: 400, step: 8, suffix: "px" }),

      // ✏️ Content
      overline: TextInput({ label: "✏️ Content — Overline", defaultValue: "Section Label" }),
      heading: TextInput({ label: "✏️ Content — Heading", defaultValue: "Heading Goes Here" }),
      headingAccent: TextInput({ label: "✏️ Content — Heading Accent (gradient)", defaultValue: "" }),

      // 📦 Items — Parts
      parts: List({
        label: "📦 Items — Parts",
        type: Shape({
          type: {
            image: Image({ label: "Part Image" }),
            name: TextInput({ label: "Part Name", defaultValue: "Part Name" }),
            partNumber: TextInput({ label: "Part Number", defaultValue: "PART-001" }),
            price: TextInput({ label: "Price", defaultValue: "$0.00" }),
            href: TextInput({ label: "Product URL", defaultValue: "#" }),
          },
        }),
        getItemLabel(item) { return item?.name || "Part"; },
      }),
    },
  }
)
