import { lazy } from "react"
import { Style, Color, Number as NumberControl, TextInput, Checkbox, Image } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./BlogPostContent")),
  {
    type: "cast-blog-post-content",
    label: "Sections / Blog Post Content",
    props: {
      className: Style(),
      bgColor: Color({ label: "Background Color", defaultValue: "#0f1923" }),
      paddingTop: NumberControl({ label: "Padding Top", defaultValue: 64, min: 0, max: 400, step: 8, suffix: "px" }),
      paddingBottom: NumberControl({ label: "Padding Bottom", defaultValue: 96, min: 0, max: 400, step: 8, suffix: "px" }),

      // Post meta
      postTitle: TextInput({ label: "Post Title", defaultValue: "Heading Goes Here" }),
      postDate: TextInput({ label: "Date", defaultValue: "March 24, 2026" }),
      category: TextInput({ label: "Category", defaultValue: "Installation" }),
      categoryHref: TextInput({ label: "Category URL", defaultValue: "/blog" }),
      authorName: TextInput({ label: "Author Name", defaultValue: "CAST Lighting Team" }),
      authorRole: TextInput({ label: "Author Role", defaultValue: "Lighting Expert" }),
      readTime: TextInput({ label: "Read Time", defaultValue: "5 min" }),

      // Audio
      audioUrl: TextInput({ label: "Audio File URL (optional)", defaultValue: "" }),
      audioLabel: TextInput({ label: "Audio Label", defaultValue: "Prefer to listen instead?" }),

      // Featured image
      featuredImage: Image({ label: "Featured Image" }),
      featuredImageAlt: TextInput({ label: "Featured Image Alt Text", defaultValue: "" }),

      // Tags
      tag1: TextInput({ label: "Tag 1", defaultValue: "Installation" }),
      tag2: TextInput({ label: "Tag 2", defaultValue: "" }),
      tag3: TextInput({ label: "Tag 3", defaultValue: "" }),

      // Body
      bodyText: TextInput({ label: "Body Text (use line breaks for paragraphs)", defaultValue: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.\n\nSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam." }),

      // Social share
      shareUrl: TextInput({ label: "Share URL (leave blank to use current page)", defaultValue: "" }),
      showShare: Checkbox({ label: "Show Share Buttons", defaultValue: true }),

      // CTA block
      ctaHeading: TextInput({ label: "CTA Heading", defaultValue: "Ready to Upgrade Your Lighting?" }),
      ctaBody: TextInput({ label: "CTA Body", defaultValue: "Join thousands of contractors who trust CAST Lighting for professional-grade outdoor fixtures." }),
      cta1Label: TextInput({ label: "CTA Button 1 Label", defaultValue: "Shop Products" }),
      cta1Href: TextInput({ label: "CTA Button 1 URL", defaultValue: "/shop" }),
      cta2Label: TextInput({ label: "CTA Button 2 Label", defaultValue: "Join TradePro" }),
      cta2Href: TextInput({ label: "CTA Button 2 URL", defaultValue: "/trade-pro" }),

      // Related posts
      related1Title: TextInput({ label: "Related Post 1 Title", defaultValue: "" }),
      related1Href: TextInput({ label: "Related Post 1 URL", defaultValue: "#" }),
      related1Category: TextInput({ label: "Related Post 1 Category", defaultValue: "" }),
      related2Title: TextInput({ label: "Related Post 2 Title", defaultValue: "" }),
      related2Href: TextInput({ label: "Related Post 2 URL", defaultValue: "#" }),
      related2Category: TextInput({ label: "Related Post 2 Category", defaultValue: "" }),
      related3Title: TextInput({ label: "Related Post 3 Title", defaultValue: "" }),
      related3Href: TextInput({ label: "Related Post 3 URL", defaultValue: "#" }),
      related3Category: TextInput({ label: "Related Post 3 Category", defaultValue: "" }),
    },
  }
)
