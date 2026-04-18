import { lazy } from "react"
import { Color, Number, Style } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./CastSiteTheme")),
  {
    type: "cast-site-theme",
    label: "Utilities / Global Theme",
    props: {
      className: Style({ properties: [Style.Padding, Style.Margin] }),

      // 🎨 Background — Colors
      primaryColor: Color({ label: "🎨 Background — Primary (Dark Blue)", defaultValue: "#004960" }),
      accentColor: Color({ label: "🎨 Background — Accent (Mid Blue)", defaultValue: "#057cb0" }),
      secondaryColor: Color({ label: "🎨 Background — Secondary Blue", defaultValue: "#005c7a" }),
      lightColor: Color({ label: "🎨 Background — Light Blue", defaultValue: "#7fbee8" }),
      titleColor: Color({ label: "🎨 Background — Title Text", defaultValue: "#1a2332" }),
      bodyColor: Color({ label: "🎨 Background — Body Text", defaultValue: "#3c3c47" }),

      // 📐 Layout — Typography
      h1Px: Number({ label: "📐 Layout — H1 Size (px)", defaultValue: 46, min: 28, max: 96, step: 1 }),
      h2Px: Number({ label: "📐 Layout — H2 Size (px)", defaultValue: 36, min: 22, max: 72, step: 1 }),
      h3Px: Number({ label: "📐 Layout — H3 Size (px)", defaultValue: 29, min: 18, max: 56, step: 1 }),
      h4Px: Number({ label: "📐 Layout — H4 Size (px)", defaultValue: 26, min: 16, max: 44, step: 1 }),
      h5Px: Number({ label: "📐 Layout — H5 Size (px)", defaultValue: 23, min: 14, max: 36, step: 1 }),
      h6Px: Number({ label: "📐 Layout — H6 Size (px)", defaultValue: 20, min: 12, max: 28, step: 1 }),
      bodyPx: Number({ label: "📐 Layout — Body Text (px)", defaultValue: 18, min: 14, max: 24, step: 1 }),
      bodyLgPx: Number({ label: "📐 Layout — Body Large (px)", defaultValue: 20, min: 16, max: 28, step: 1 }),
      bodySmPx: Number({ label: "📐 Layout — Body Small (px)", defaultValue: 16, min: 12, max: 20, step: 1 }),
      headingWeight: Number({ label: "📐 Layout — Heading Weight", defaultValue: 700, min: 300, max: 900, step: 100 }),
      bodyLineHeight: Number({ label: "📐 Layout — Body Line Height", defaultValue: 1.5, min: 1.2, max: 2, step: 0.05 }),
      headingLineHeight: Number({ label: "📐 Layout — Heading Line Height", defaultValue: 1.1, min: 0.9, max: 1.5, step: 0.05 }) } }
)
