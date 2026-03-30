import { lazy } from "react"
import { Style, TextInput, TextArea, Color, Number as NumberControl, List, Shape } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./PatentsList")),
  {
    type: "cast-patents-list",
    label: "Sections / Patents List",
    props: {
      className: Style(),

      // 🎨 Background
      bgColor: Color({ label: "🎨 Background — Color", defaultValue: "#0f1923" }),
      paddingTop: NumberControl({ label: "📐 Layout — Padding Top (px)", defaultValue: 64, min: 0, max: 400, step: 8 }),
      paddingBottom: NumberControl({ label: "📐 Layout — Padding Bottom (px)", defaultValue: 64, min: 0, max: 400, step: 8 }),

      // ✏️ Content
      heading: TextInput({ label: "✏️ Content — Heading", defaultValue: "CAST Lighting Patents" }),
      headingAccent: TextInput({ label: "✏️ Content — Heading Accent", defaultValue: "" }),
      overline: TextInput({ label: "✏️ Content — Overline", defaultValue: "Intellectual Property" }),
      description: TextArea({ label: "✏️ Content — Description", defaultValue: "Our portfolio of patents reflects decades of innovation in outdoor lighting technology, materials science, and intelligent control systems." }),

      // 📦 Items — Patents
      patents: List({
        label: "📦 Items — Patents",
        type: Shape({
          type: {
            patentNumber: TextInput({ label: "Patent Number", defaultValue: "US 10,000,000 B2" }),
            title: TextInput({ label: "Title", defaultValue: "Patent Title Goes Here" }),
            description: TextArea({ label: "Description", defaultValue: "Brief description of the patented technology or invention." }),
            date: TextInput({ label: "Issue Date", defaultValue: "Jan 1, 2024" }),
            category: TextInput({ label: "Category", defaultValue: "Fixture Design" }),
          },
        }),
        getItemLabel(item) {
          return item?.patentNumber || item?.title || "Patent"
        },
      }),
    },
  }
)
