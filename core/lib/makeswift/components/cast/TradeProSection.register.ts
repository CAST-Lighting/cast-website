import { lazy } from "react"
import { Style, Color, Image, Number as NumberControl, Select, TextInput, List, Shape } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./TradeProSection")),
  {
    type: "site-trade-pro",
    label: "CTA / TradePro Benefits",
    props: {
      className: Style(),

      // 🎨 Background
      bgImage: Image({ label: "🎨 Background — Image" }),
      bgColor: Color({ label: "🎨 Background — Color" }),
      bgOpacity: NumberControl({ label: "🎨 Background — Opacity", defaultValue: 85, min: 0, max: 100, step: 1, suffix: "%" }),
      gradientFrom: Color({ label: "🎨 Background — Gradient From" }),
      gradientTo: Color({ label: "🎨 Background — Gradient To" }),
      gradientDirection: Select({
        label: "🎨 Background — Gradient Direction",
        options: [
          { value: "to bottom", label: "↓ Top to Bottom" },
          { value: "to top", label: "↑ Bottom to Top" },
          { value: "to right", label: "→ Left to Right" },
          { value: "to left", label: "← Right to Left" },
          { value: "135deg", label: "↘ Diagonal ↘" },
          { value: "225deg", label: "↙ Diagonal ↙" },
        ],
        defaultValue: "to bottom",
      }),

      // 📐 Layout
      lineHeight: NumberControl({ label: "📐 Layout — Line Height", defaultValue: 1.6, min: 1, max: 3, step: 0.05 }),
      paddingTop: NumberControl({ label: "📐 Layout — Padding Top", defaultValue: 96, min: 0, max: 400, step: 8, suffix: "px" }),
      paddingBottom: NumberControl({ label: "📐 Layout — Padding Bottom", defaultValue: 96, min: 0, max: 400, step: 8, suffix: "px" }),

      // ✏️ Content
      overline: TextInput({ label: "✏️ Content — Overline", defaultValue: "For Contractors & Installers" }),
      heading: TextInput({ label: "✏️ Content — Heading", defaultValue: "The TradePro" }),
      headingAccent: TextInput({ label: "✏️ Content — Heading Accent", defaultValue: "Advantage" }),
      description: TextInput({ label: "✏️ Content — Description", defaultValue: "Access professional products with lifetime warranties that give you design control in the field." }),

      // 📦 Items — Benefits
      benefits: List({
        label: "📦 Items — Benefits",
        type: Shape({
          type: {
            title: TextInput({ label: "Title", defaultValue: "" }),
            desc: TextInput({ label: "Description", defaultValue: "" }),
          },
        }),
        getItemLabel(item) { return item?.title || "Benefit" },
      }),

      // 🔘 Buttons
      btnLabel: TextInput({ label: "🔘 Buttons — Button Label", defaultValue: "Join The TradePro Program" }),
      btnHref: TextInput({ label: "🔘 Buttons — Button Href", defaultValue: "/trade-pro" }),
    },
  }
)
