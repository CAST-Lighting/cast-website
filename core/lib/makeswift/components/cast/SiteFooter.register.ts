import { lazy } from "react"
import { Style, Color, Image, Number as NumberControl, Select, TextInput, List, Shape } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./SiteFooter")),
  {
    type: "site-footer",
    label: "Footer / Site Footer",
    props: {
      className: Style({ properties: [Style.Padding, Style.Margin] }),
      lineHeight: NumberControl({ label: "📐 Layout — Line Height", defaultValue: 1.6, min: 1, max: 3, step: 0.05 }),
      paddingTop: NumberControl({ label: "📐 Layout — Padding Top", defaultValue: 64, min: 0, max: 400, step: 8, suffix: "px" }),
      paddingBottom: NumberControl({ label: "📐 Layout — Padding Bottom", defaultValue: 64, min: 0, max: 400, step: 8, suffix: "px" }),

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
      tagline: TextInput({ label: "✏️ Content — Tagline", defaultValue: "Professional-grade landscape lighting trusted by contractors since 2001." }),
      phone: TextInput({ label: "✏️ Content — Phone", defaultValue: "(800) 555-CAST" }),
      address: TextInput({ label: "✏️ Content — Address", defaultValue: "Pine Brook, NJ 07058" }),
      copyright: TextInput({ label: "✏️ Content — Copyright", defaultValue: "© 2026 CAST Lighting. All rights reserved." }),

      // 👤 Social
      facebookHref: TextInput({ label: "👤 Social — Facebook URL", defaultValue: "https://www.facebook.com/CASTLighting" }),
      instagramHref: TextInput({ label: "👤 Social — Instagram URL", defaultValue: "https://www.instagram.com/castlighting/" }),
      youtubeHref: TextInput({ label: "👤 Social — YouTube URL", defaultValue: "https://www.youtube.com/channel/UCdrFCItpEFh6pwrLS0cJH8w" }),
      linkedinHref: TextInput({ label: "👤 Social — LinkedIn URL", defaultValue: "https://www.linkedin.com/company/cast-lighting-llc" }),
      xHref: TextInput({ label: "👤 Social — X (Twitter) URL", defaultValue: "https://twitter.com/CAST_Lighting" }),
      pinterestHref: TextInput({ label: "👤 Social — Pinterest URL", defaultValue: "#" }),

      // 🔗 Links — Navigation Columns
      col1Title: TextInput({ label: "🔗 Links — Column 1 Title", defaultValue: "Products" }),
      col1Links: List({
        label: "🔗 Links — Column 1 Links",
        type: Shape({
          type: {
            label: TextInput({ label: "Label", defaultValue: "" }),
            href: TextInput({ label: "URL", defaultValue: "#" }),
          },
        }),
        getItemLabel(item) { return item?.label || "Link" },
      }),
      col2Title: TextInput({ label: "🔗 Links — Column 2 Title", defaultValue: "Resources" }),
      col2Links: List({
        label: "🔗 Links — Column 2 Links",
        type: Shape({
          type: {
            label: TextInput({ label: "Label", defaultValue: "" }),
            href: TextInput({ label: "URL", defaultValue: "#" }),
          },
        }),
        getItemLabel(item) { return item?.label || "Link" },
      }),
      col3Title: TextInput({ label: "🔗 Links — Column 3 Title", defaultValue: "Company" }),
      col3Links: List({
        label: "🔗 Links — Column 3 Links",
        type: Shape({
          type: {
            label: TextInput({ label: "Label", defaultValue: "" }),
            href: TextInput({ label: "URL", defaultValue: "#" }),
          },
        }),
        getItemLabel(item) { return item?.label || "Link" },
      }),
      col4Title: TextInput({ label: "🔗 Links — Column 4 Title", defaultValue: "Support" }),
      col4Links: List({
        label: "🔗 Links — Column 4 Links",
        type: Shape({
          type: {
            label: TextInput({ label: "Label", defaultValue: "" }),
            href: TextInput({ label: "URL", defaultValue: "#" }),
          },
        }),
        getItemLabel(item) { return item?.label || "Link" },
      }),
    },
  }
)
