import { lazy } from "react"
import { Style, Color, Image, Number as NumberControl, Select, TextInput, List, Shape } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./ComparisonSection")),
  {
    type: "site-comparison",
    label: "Sections / Brand Comparison",
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

      // ✏️ Content
      overline: TextInput({ label: "✏️ Content — Overline", defaultValue: "CAST vs Other Brands" }),
      heading: TextInput({ label: "✏️ Content — Heading", defaultValue: "Why Contractors Choose" }),
      headingAccent: TextInput({ label: "✏️ Content — Heading Accent", defaultValue: "CAST" }),
      description: TextInput({ label: "✏️ Content — Description", defaultValue: "See how CAST Lighting compares to other landscape lighting brands." }),
      castTitle: TextInput({ label: "✏️ Content — CAST Column Title", defaultValue: "CAST Advantages" }),
      othersTitle: TextInput({ label: "✏️ Content — Others Column Title", defaultValue: "Other Lighting Brands" }),

      // 🃏 Cards — Comparison Points
      castPoints: List({
        label: "🃏 Cards — CAST Points",
        type: Shape({
          type: {
            text: TextInput({ label: "Point", defaultValue: "" }),
          },
        }),
        getItemLabel(item) { return item?.text || "Point" },
      }),
      otherPoints: List({
        label: "🃏 Cards — Other Brand Points",
        type: Shape({
          type: {
            text: TextInput({ label: "Point", defaultValue: "" }),
          },
        }),
        getItemLabel(item) { return item?.text || "Point" },
      }),
    },
  }
)
