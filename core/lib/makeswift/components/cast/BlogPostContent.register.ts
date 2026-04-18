import { lazy } from "react"
import { Style, Color, Number as NumberControl, TextInput, Checkbox, Image } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./BlogPostContent")),
  {
    type: "cast-blog-post-content",
    label: "Sections / Blog Post Content",
    props: {
      className: Style({ properties: [Style.Padding, Style.Margin] }),
      paddingTop: NumberControl({ label: "📐 Layout — Padding Top", defaultValue: 64, min: 0, max: 400, step: 8, suffix: "px" }),
      paddingBottom: NumberControl({ label: "📐 Layout — Padding Bottom", defaultValue: 96, min: 0, max: 400, step: 8, suffix: "px" }),

      // 🎨 Background
      bgColor: Color({ label: "🎨 Background — Color", defaultValue: "#0f1923" }),

      // ✏️ Content — Post Meta
      postTitle: TextInput({ label: "✏️ Content — Post Title", defaultValue: "Heading Goes Here" }),
      postDate: TextInput({ label: "✏️ Content — Date", defaultValue: "March 24, 2026" }),
      category: TextInput({ label: "✏️ Content — Category", defaultValue: "Installation" }),
      categoryHref: TextInput({ label: "🔗 Links — Category URL", defaultValue: "/blog" }),
      authorName: TextInput({ label: "✏️ Content — Author Name", defaultValue: "CAST Lighting Team" }),
      authorRole: TextInput({ label: "✏️ Content — Author Role", defaultValue: "Lighting Expert" }),
      readTime: TextInput({ label: "✏️ Content — Read Time", defaultValue: "5 min" }),

      // 📸 Media — Audio
      audioUrl: TextInput({ label: "📸 Media — Audio File URL (optional)", defaultValue: "" }),
      audioLabel: TextInput({ label: "📸 Media — Audio Label", defaultValue: "Prefer to listen instead?" }),

      // 📸 Media — Featured Image
      featuredImage: Image({ label: "📸 Media — Featured Image" }),
      featuredImageAlt: TextInput({ label: "📸 Media — Featured Image Alt Text", defaultValue: "" }),

      // ✏️ Content — Tags
      tag1: TextInput({ label: "✏️ Content — Tag 1", defaultValue: "Installation" }),
      tag2: TextInput({ label: "✏️ Content — Tag 2", defaultValue: "" }),
      tag3: TextInput({ label: "✏️ Content — Tag 3", defaultValue: "" }),

      // ✏️ Content — Body
      bodyText: TextInput({ label: "✏️ Content — Body Text (use line breaks for paragraphs)", defaultValue: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.\n\nSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam." }),

      // 👤 Social — Share
      shareUrl: TextInput({ label: "👤 Social — Share URL (leave blank to use current page)", defaultValue: "" }),
      showShare: Checkbox({ label: "👤 Social — Show Share Buttons", defaultValue: true }),

      // 🔘 Buttons — CTA Block
      ctaHeading: TextInput({ label: "✏️ Content — CTA Heading", defaultValue: "Ready to Upgrade Your Lighting?" }),
      ctaBody: TextInput({ label: "✏️ Content — CTA Body", defaultValue: "Join thousands of contractors who trust CAST Lighting for professional-grade outdoor fixtures." }),
      cta1Label: TextInput({ label: "🔘 Buttons — CTA Button 1 Label", defaultValue: "Shop Products" }),
      cta1Href: TextInput({ label: "🔘 Buttons — CTA Button 1 URL", defaultValue: "/shop" }),
      cta2Label: TextInput({ label: "🔘 Buttons — CTA Button 2 Label", defaultValue: "Join TradePro" }),
      cta2Href: TextInput({ label: "🔘 Buttons — CTA Button 2 URL", defaultValue: "/trade-pro" }),

      // 🔗 Links — Related Posts
      related1Title: TextInput({ label: "🔗 Links — Related Post 1 Title", defaultValue: "" }),
      related1Href: TextInput({ label: "🔗 Links — Related Post 1 URL", defaultValue: "#" }),
      related1Category: TextInput({ label: "🔗 Links — Related Post 1 Category", defaultValue: "" }),
      related2Title: TextInput({ label: "🔗 Links — Related Post 2 Title", defaultValue: "" }),
      related2Href: TextInput({ label: "🔗 Links — Related Post 2 URL", defaultValue: "#" }),
      related2Category: TextInput({ label: "🔗 Links — Related Post 2 Category", defaultValue: "" }),
      related3Title: TextInput({ label: "🔗 Links — Related Post 3 Title", defaultValue: "" }),
      related3Href: TextInput({ label: "🔗 Links — Related Post 3 URL", defaultValue: "#" }),
      related3Category: TextInput({ label: "🔗 Links — Related Post 3 Category", defaultValue: "" }),
    },
  }
)
