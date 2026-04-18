import { lazy } from "react"
import { Style, Color, Image, Number as NumberControl, Select, TextInput, List, Shape } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./ContentMedia")),
  {
    type: "site-content-media",
    label: "Sections / Content + Video",
    props: {
      className: Style(),

      // 🎨 Background
      bgImage: Image({ label: "🎨 Background — Image" }),
      bgColor: Color({ label: "🎨 Background — Color", defaultValue: "#014960" }),
      bgOpacity: NumberControl({ label: "🎨 Background — Opacity", defaultValue: 100, min: 0, max: 100, step: 1, suffix: "%" }),
      gradientFrom: Color({ label: "🎨 Background — Gradient From", defaultValue: "#014960" }),
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
      heading: TextInput({ label: "✏️ Content — Heading", defaultValue: "Unmatched Quality, Technology &" }),
      headingAccent: TextInput({ label: "✏️ Content — Heading Accent", defaultValue: "Durability" }),
      bodyText: TextInput({ label: "✏️ Content — Body Text", defaultValue: "Every CAST fixture is made from solid brass and copper alloys that will never rust or corrode. Our proprietary LED technology delivers superior color rendering and energy efficiency." }),

      // 🌓 Theme
      mode: Select({ label: '🌓 Theme', options: [{ value: 'dark', label: 'Dark' }, { value: 'light', label: 'Light' }], defaultValue: 'dark' }),

      // 📦 Items — Features
      features: List({
        label: "📦 Items — Features",
        type: Shape({
          type: {
            title: TextInput({ label: "Title", defaultValue: "" }),
            desc: TextInput({ label: "Description", defaultValue: "" }),
          },
        }),
        getItemLabel(item) { return item?.title || "Feature" },
      }),

      // 🔘 Buttons
      btn1Label: TextInput({ label: "🔘 Buttons — Button 1 Label", defaultValue: "Shop Products" }),
      btn1Href: TextInput({ label: "🔘 Buttons — Button 1 Href", defaultValue: "/shop" }),
      btn2Label: TextInput({ label: "🔘 Buttons — Button 2 Label", defaultValue: "Learn More →" }),
      btn2Href: TextInput({ label: "🔘 Buttons — Button 2 Href", defaultValue: "/about" }),

      // 📸 Media
      videoUrl: TextInput({ label: "📸 Media — Video URL (YouTube embed)", defaultValue: "www.youtube.com/watch?v=kVI5XNyKFvw" }),

      // ✏️ Content — Stat
      stat: TextInput({ label: "✏️ Content — Stat Number", defaultValue: "25+" }),
      statLabel: TextInput({ label: "✏️ Content — Stat Label", defaultValue: "Years of Excellence" }),
    },
  }
)
