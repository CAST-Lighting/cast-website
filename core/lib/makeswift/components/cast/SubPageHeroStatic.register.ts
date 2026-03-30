import { lazy } from "react"
import { Style, Color, Image, Number as NumberControl, Select, TextInput } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./SubPageHeroStatic")),
  {
    type: "cast-subpage-hero-static",
    label: "Hero / Sub Page Hero (Static)",
    props: {
      className: Style(),

      // 🎨 Background
      bgImage: Image({ label: "🎨 Background — Image" }),
      bgColor: Color({ label: "🎨 Background — Overlay Color", defaultValue: "#25262d" }),
      bgOpacity: NumberControl({ label: "🎨 Background — Overlay Opacity", defaultValue: 60, min: 0, max: 100, step: 1, suffix: "%" }),
      gradientFrom: Color({ label: "🎨 Background — Gradient From", defaultValue: "#25262d" }),
      gradientTo: Color({ label: "🎨 Background — Gradient To", defaultValue: "#25262d" }),
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
        defaultValue: "135deg",
      }),

      // ✏️ Content
      badgeText: TextInput({ label: "✏️ Content — Badge Text", defaultValue: "Section Label" }),
      headingLine1: TextInput({ label: "✏️ Content — Heading", defaultValue: "Heading Goes Here" }),
      headingAccent: TextInput({ label: "✏️ Content — Heading Accent (blue)", defaultValue: "Accent" }),
      description: TextInput({ label: "✏️ Content — Description", defaultValue: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." }),

      // 🔘 Buttons
      btn1Label: TextInput({ label: "🔘 Buttons — Button 1 Label", defaultValue: "Button Here" }),
      btn1Href: TextInput({ label: "🔘 Buttons — Button 1 Link", defaultValue: "#" }),
      btn2Label: TextInput({ label: "🔘 Buttons — Button 2 Label", defaultValue: "" }),
      btn2Href: TextInput({ label: "🔘 Buttons — Button 2 Link", defaultValue: "#" }),

      // 📐 Layout
      lineHeight: NumberControl({ label: "📐 Layout — Line Height", defaultValue: 1.6, min: 1, max: 3, step: 0.05 }),
      paddingTop: NumberControl({ label: "📐 Layout — Padding Top", defaultValue: 165, min: 0, max: 400, step: 1, suffix: "px" }),
      paddingBottom: NumberControl({ label: "📐 Layout — Padding Bottom", defaultValue: 64, min: 0, max: 400, step: 8, suffix: "px" }),
    },
  }
)
