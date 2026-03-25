import { lazy } from "react"
import { Style, Color, Number as NumberControl, TextInput } from "@makeswift/runtime/controls"
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
      authorName: TextInput({ label: "Author Name", defaultValue: "CAST Lighting Team" }),
      authorRole: TextInput({ label: "Author Role", defaultValue: "Lighting Expert" }),
      readTime: TextInput({ label: "Read Time", defaultValue: "5 min" }),

      // Tags
      tag1: TextInput({ label: "Tag 1", defaultValue: "Installation" }),
      tag2: TextInput({ label: "Tag 2", defaultValue: "" }),
      tag3: TextInput({ label: "Tag 3", defaultValue: "" }),

      // Body
      bodyText: TextInput({ label: "Body Text (use line breaks for paragraphs)", defaultValue: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur." }),

      // CTA
      ctaHeading: TextInput({ label: "CTA Heading", defaultValue: "Ready to Upgrade Your Lighting?" }),
      ctaBody: TextInput({ label: "CTA Body", defaultValue: "Join thousands of contractors who trust CAST Lighting for professional-grade outdoor fixtures." }),
      cta1Label: TextInput({ label: "CTA Button 1 Label", defaultValue: "Shop Products" }),
      cta1Href: TextInput({ label: "CTA Button 1 URL", defaultValue: "/shop" }),
      cta2Label: TextInput({ label: "CTA Button 2 Label", defaultValue: "Join TradePro" }),
      cta2Href: TextInput({ label: "CTA Button 2 URL", defaultValue: "/trade-pro" }),
    },
  }
)
