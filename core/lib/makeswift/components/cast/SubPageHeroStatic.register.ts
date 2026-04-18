import { lazy } from "react"
import { Style, Color, Image, Select, TextInput, Number as NumberControl} from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./SubPageHeroStatic")),
  {
    type: "cast-subpage-hero-static",
    label: "Hero / Sub Page Hero (Static)",
    props: {
      className: Style({ properties: [Style.Padding, Style.Margin] }),
      lineHeight: NumberControl({ label: "📐 Layout — Line Height", defaultValue: 1.6, min: 1, max: 3, step: 0.05 }),

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
        defaultValue: "135deg" }),

      // ✏️ Content
      badgeText: TextInput({ label: "✏️ Content — Badge Text", defaultValue: "CAST Lighting" }),
      headingLine1: TextInput({ label: "✏️ Content — Heading", defaultValue: "Professional Landscape Lighting" }),
      headingAccent: TextInput({ label: "✏️ Content — Heading Accent (blue)", defaultValue: "" }),
      description: TextInput({ label: "✏️ Content — Description", defaultValue: "Professional-grade outdoor lighting trusted by contractors since 2001." }),

      // 🔘 Buttons
      btn1Label: TextInput({ label: "🔘 Buttons — Button 1 Label", defaultValue: "Shop Products" }),
      btn1Href: TextInput({ label: "🔘 Buttons — Button 1 Link", defaultValue: "#" }),
      btn2Label: TextInput({ label: "🔘 Buttons — Button 2 Label", defaultValue: "" }),
      btn2Href: TextInput({ label: "🔘 Buttons — Button 2 Link", defaultValue: "#" }) } }
)
