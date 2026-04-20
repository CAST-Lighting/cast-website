import { lazy } from "react"
import { Style, Color, Image, TextInput, TextArea, Number as NumberControl, Checkbox} from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./AboutHero")),
  {
    type: "cast-about-hero",
    label: "Hero / About Hero",
    props: {
      className: Style({ properties: [Style.Padding, Style.Margin] }),
      lightMode: Checkbox({ label: '💡 Light Mode', defaultValue: false }),

      // 🎨 Background
      bgImage: Image({ label: "🎨 Background — Image" }),
      bgColor: Color({ label: "🎨 Background — Overlay Color", defaultValue: "#25262d" }),
      bgOpacity: NumberControl({ label: "🎨 Background — Overlay Opacity", defaultValue: 60, min: 0, max: 100, step: 1, suffix: "%" }),

      // ✏️ Content
      badgeText: TextInput({ label: "✏️ Content — Badge Text", defaultValue: "Our Story" }),
      heading: TextInput({ label: "✏️ Content — Heading", defaultValue: "About CAST Lighting" }),
      headingAccent: TextInput({ label: "✏️ Content — Heading Accent (gradient)", defaultValue: "" }),
      description: TextArea({ label: "✏️ Content — Description", defaultValue: "Professional-grade landscape lighting trusted by contractors since 2001." }),

      // 🔘 Buttons
      btn1Label: TextInput({ label: "🔘 Buttons — Button 1 Label", defaultValue: "Shop Products" }),
      btn1Href: TextInput({ label: "🔘 Buttons — Button 1 Link", defaultValue: "/shop" }),
      btn2Label: TextInput({ label: "🔘 Buttons — Button 2 Label", defaultValue: "Contact Us" }),
      btn2Href: TextInput({ label: "🔘 Buttons — Button 2 Link", defaultValue: "/contact" }) } }
)
