import { lazy } from "react"
import { Style, Color, Image, Number as NumberControl, TextInput } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./BlogHero")),
  {
    type: "cast-blog-hero",
    label: "Hero / Blog Hero",
    props: {
      className: Style(),

      // 🎨 Background
      bgColor: Color({ label: "🎨 Background — Color", defaultValue: "#0d1620" }),
      bgImage: Image({ label: "🎨 Background — Image" }),
      bgOpacity: NumberControl({ label: "🎨 Background — Overlay Opacity %", defaultValue: 92, min: 0, max: 100, step: 1 }),

      // 📐 Layout
      paddingTop: NumberControl({ label: "📐 Layout — Padding Top", defaultValue: 80, min: 0, max: 400, step: 8, suffix: "px" }),
      paddingBottom: NumberControl({ label: "📐 Layout — Padding Bottom", defaultValue: 64, min: 0, max: 400, step: 8, suffix: "px" }),

      // ✏️ Content
      overline: TextInput({ label: "✏️ Content — Overline", defaultValue: "Section Label" }),
      heading: TextInput({ label: "✏️ Content — Heading", defaultValue: "Heading Goes Here" }),
      headingAccent: TextInput({ label: "✏️ Content — Heading Accent (gold)", defaultValue: "Accent" }),
      description: TextInput({ label: "✏️ Content — Description", defaultValue: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." }),
    },
  }
)
