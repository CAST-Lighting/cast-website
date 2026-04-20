import { lazy } from "react"
import { Style, Color, Image, Select, TextInput, Number as NumberControl, Checkbox} from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./RotatingTextHero")),
  {
    type: "cast-rotating-text-hero",
    label: "Hero / Rotating Text Hero",
    props: {
      className: Style({ properties: [Style.Padding, Style.Margin] }),
      lightMode: Checkbox({ label: '💡 Light Mode', defaultValue: false }),
      lineHeight: NumberControl({ label: "📐 Layout — Line Height", defaultValue: 1.6, min: 1, max: 3, step: 0.05 }),

      // 📸 Media — Slides
      slide1Image: Image({ label: "📸 Media — Slide 1 Image" }),
      slide2Image: Image({ label: "📸 Media — Slide 2 Image" }),
      slide3Image: Image({ label: "📸 Media — Slide 3 Image" }),
      slide4Image: Image({ label: "📸 Media — Slide 4 Image" }),
      slide5Image: Image({ label: "📸 Media — Slide 5 Image" }),

      // ✏️ Content
      badgeText: TextInput({ label: "✏️ Content — Badge Text", defaultValue: "New 2026 Product Catalog Now Available" }),
      headingLine1: TextInput({ label: "✏️ Content — Heading", defaultValue: "Premium Landscape Lighting" }),
      phrase1: TextInput({ label: "✏️ Content — Rotating Phrase 1", defaultValue: "Built to Last Forever" }),
      phrase2: TextInput({ label: "✏️ Content — Rotating Phrase 2", defaultValue: "Designed for Contractors" }),
      phrase3: TextInput({ label: "✏️ Content — Rotating Phrase 3", defaultValue: "Loved by Homeowners" }),
      description: TextInput({
        label: "✏️ Content — Description",
        defaultValue: "Professional-grade brass and copper fixtures trusted by contractors nationwide. Lifetime warranty on every product." }),

      // 🔘 Buttons
      btn1Label: TextInput({ label: "🔘 Buttons — Button 1 Label", defaultValue: "Shop Products" }),
      btn1Href: TextInput({ label: "🔘 Buttons — Button 1 Link", defaultValue: "#" }),
      btn2Label: TextInput({ label: "🔘 Buttons — Button 2 Label", defaultValue: "Become a TradePro →" }),
      btn2Href: TextInput({ label: "🔘 Buttons — Button 2 Link", defaultValue: "#" }),

      // 🎨 Background
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
        defaultValue: "135deg" }) } }
)
