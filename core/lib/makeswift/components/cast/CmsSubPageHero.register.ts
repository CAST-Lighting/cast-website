import { lazy } from "react"
import { Style, TextInput, TextArea, Image, Color, Number } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

const heroControls = {
  className: Style(),

  // 🎨 Background
  bgImage: Image({ label: "🎨 Background — Image" }),
  bgColor: Color({ label: "🎨 Background — Overlay Color", defaultValue: "#25262d" }),
  bgOpacity: Number({ label: "🎨 Background — Overlay Opacity %", defaultValue: 60, min: 0, max: 100, step: 5 }),

  // 📐 Layout
  paddingTop: Number({ label: "📐 Layout — Padding Top (px)", defaultValue: 165 }),
  paddingBottom: Number({ label: "📐 Layout — Padding Bottom (px)", defaultValue: 64 }),

  // ✏️ Content
  badgeText: TextInput({ label: "✏️ Content — Badge Text", defaultValue: "Badge Text" }),
  headingLine1: TextInput({ label: "✏️ Content — Default Heading (CMS overrides this)", defaultValue: "Page Title Goes Here" }),
  headingAccent: TextInput({ label: "✏️ Content — Heading Accent (hidden when CMS heading active)", defaultValue: "" }),
  description: TextArea({ label: "✏️ Content — Default Description (CMS overrides this)", defaultValue: "Description text that gets replaced by CMS content." }),

  // 🔘 Buttons
  btn1Label: TextInput({ label: "🔘 Buttons — Button 1 Label", defaultValue: "" }),
  btn1Href: TextInput({ label: "🔘 Buttons — Button 1 URL", defaultValue: "#" }),
  btn2Label: TextInput({ label: "🔘 Buttons — Button 2 Label", defaultValue: "" }),
  btn2Href: TextInput({ label: "🔘 Buttons — Button 2 URL", defaultValue: "#" }),
}

// Blog Hero — heading replaced by blog post title
runtime.registerComponent(
  lazy(() => import("./CmsSubPageHero")),
  {
    type: "cast-cms-hero-blog",
    label: "CMS Hero / Blog",
    props: {
      ...heroControls,
      badgeText: TextInput({ label: "✏️ Content — Badge Text", defaultValue: "Blog" }),
      headingLine1: TextInput({ label: "✏️ Content — Default Heading (blog title overrides)", defaultValue: "Blog Post Title" }),
      description: TextArea({ label: "✏️ Content — Default Description (publish date/author overrides)", defaultValue: "Article description goes here." }),
    },
  }
)

// Product Hero — heading replaced by product name
runtime.registerComponent(
  lazy(() => import("./CmsSubPageHero")),
  {
    type: "cast-cms-hero-product",
    label: "CMS Hero / Product",
    props: {
      ...heroControls,
      badgeText: TextInput({ label: "✏️ Content — Badge Text", defaultValue: "Product" }),
      headingLine1: TextInput({ label: "✏️ Content — Default Heading (product name overrides)", defaultValue: "Product Name" }),
      description: TextArea({ label: "✏️ Content — Default Description (product summary overrides)", defaultValue: "Product description goes here." }),
    },
  }
)

// Category Hero — heading replaced by category name
runtime.registerComponent(
  lazy(() => import("./CmsSubPageHero")),
  {
    type: "cast-cms-hero-category",
    label: "CMS Hero / Category",
    props: {
      ...heroControls,
      badgeText: TextInput({ label: "✏️ Content — Badge Text", defaultValue: "Shop" }),
      headingLine1: TextInput({ label: "✏️ Content — Default Heading (category name overrides)", defaultValue: "Category Name" }),
      description: TextArea({ label: "✏️ Content — Default Description (category desc overrides)", defaultValue: "Browse our selection." }),
    },
  }
)

// Search Hero — heading replaced by search term
runtime.registerComponent(
  lazy(() => import("./CmsSubPageHero")),
  {
    type: "cast-cms-hero-search",
    label: "CMS Hero / Search",
    props: {
      ...heroControls,
      badgeText: TextInput({ label: "✏️ Content — Badge Text", defaultValue: "Search Results" }),
      headingLine1: TextInput({ label: "✏️ Content — Default Heading (search term overrides)", defaultValue: "Search Term" }),
      description: TextArea({ label: "✏️ Content — Default Description (result count overrides)", defaultValue: "Products found" }),
    },
  }
)
