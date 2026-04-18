import { lazy } from "react"
import { Style, TextInput, TextArea, Image, Color, Number, Select } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./ReadyCTA")),
  {
    type: "site-ready-cta",
    label: "CTA / Ready CTA",
    props: {
      className: Style({ properties: [Style.Padding, Style.Margin] }),
      paddingTop: Number({ label: "📐 Layout — Padding Top (px)", defaultValue: 96 }),
      paddingBottom: Number({ label: "📐 Layout — Padding Bottom (px)", defaultValue: 96 }),

      // 🌓 Theme
      mode: Select({ label: "🌓 Theme", options: [{ value: "dark", label: "Dark" }, { value: "light", label: "Light" }], defaultValue: "dark" }),

      // 🎨 Background
      bgColor: Color({ label: "🎨 Background — Color", defaultValue: "#004960" }),
      bgImage: Image({ label: "🎨 Background — Image" }),
      bgOpacity: Number({ label: "🎨 Background — Overlay Opacity %", defaultValue: 88, min: 0, max: 100, step: 5 }),

      // ✏️ Content
      overline: TextInput({ label: "✏️ Content — Overline", defaultValue: "Section Label" }),
      heading: TextInput({ label: "✏️ Content — Heading", defaultValue: "Heading Goes Here" }),
      headingAccent: TextInput({ label: "✏️ Content — Heading Accent (gold)", defaultValue: "Accent" }),
      body: TextArea({ label: "✏️ Content — Body Text", defaultValue: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." }),

      // 🔘 Buttons
      btn1Label: TextInput({ label: "🔘 Buttons — Button 1 Label", defaultValue: "Button Here" }),
      btn1Href: TextInput({ label: "🔘 Buttons — Button 1 URL", defaultValue: "#" }),
      btn2Label: TextInput({ label: "🔘 Buttons — Button 2 Label", defaultValue: "Button Here" }),
      btn2Href: TextInput({ label: "🔘 Buttons — Button 2 URL", defaultValue: "#" }) } }
)
