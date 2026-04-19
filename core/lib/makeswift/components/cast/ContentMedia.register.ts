import { lazy } from "react"
import { Style, Color, Image, Select, TextInput, List, Shape, Number as NumberControl, Checkbox } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./ContentMedia")),
  {
    type: "site-content-media",
    label: "Sections / Content + Video",
    props: {
      className: Style({ properties: [Style.Padding, Style.Margin] }),
      lineHeight: NumberControl({ label: "📐 Layout — Line Height", defaultValue: 1.6, min: 1, max: 3, step: 0.05 }),
      reverseLayout: Checkbox({ label: "📐 Layout — Reverse (media left, content right)", defaultValue: false }),

      // 🎨 Background
      bgImage: Image({ label: "🎨 Background — Image" }),
      bgColor: Color({ label: "🎨 Background — Color", defaultValue: "#004960" }),
      bgOpacity: NumberControl({ label: "🎨 Background — Opacity", defaultValue: 88, min: 0, max: 100, step: 1, suffix: "%" }),
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
        defaultValue: "to bottom" }),

      // ✏️ Content
      heading: TextInput({ label: "✏️ Content — Heading", defaultValue: "Heading Goes Here" }),
      headingAccent: TextInput({ label: "✏️ Content — Heading Accent", defaultValue: "Accent" }),
      bodyText: TextInput({ label: "✏️ Content — Body Text", defaultValue: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." }),

      // 🌓 Theme
      mode: Select({ label: '🌓 Theme', options: [{ value: 'dark', label: 'Dark' }, { value: 'light', label: 'Light' }], defaultValue: 'dark' }),

      // 📦 Items — Features
      features: List({
        label: "📦 Items — Features",
        type: Shape({
          type: {
            title: TextInput({ label: "Title", defaultValue: "" }),
            desc: TextInput({ label: "Description", defaultValue: "" }) } }),
        getItemLabel(item) { return item?.title || "Feature" } }),

      // 🔘 Buttons
      btn1Label: TextInput({ label: "🔘 Buttons — Button 1 Label", defaultValue: "Button Here" }),
      btn1Href: TextInput({ label: "🔘 Buttons — Button 1 Href", defaultValue: "/shop" }),
      btn2Label: TextInput({ label: "🔘 Buttons — Button 2 Label", defaultValue: "Button Here" }),
      btn2Href: TextInput({ label: "🔘 Buttons — Button 2 Href", defaultValue: "/about" }),

      // 📸 Media
      mediaType: Select({
        label: "📸 Media — Type",
        options: [
          { value: "video", label: "🎬 Video (YouTube)" },
          { value: "image", label: "🖼️ Image" },
        ],
        defaultValue: "video" }),
      videoUrl: TextInput({ label: "📸 Media — Video URL (YouTube)", defaultValue: "www.youtube.com/watch?v=kVI5XNyKFvw" }),
      imageUrl: Image({ label: "📸 Media — Image" }),

      // ✏️ Content — Stat badge
      stat: TextInput({ label: "✏️ Content — Stat Number", defaultValue: "25+" }),
      statLabel: TextInput({ label: "✏️ Content — Stat Label", defaultValue: "Years of Excellence" }) } }
)
