import { lazy } from "react"
import { Style, TextInput, Color, Number as NumberControl } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./EventsGrid")),
  {
    type: "cast-events-grid",
    label: "Sections / Events Grid",
    props: {
      className: Style(),

      // 🎨 Background
      bgColor: Color({ label: "🎨 Background — Color", defaultValue: "#0f1923" }),
      paddingTop: NumberControl({ label: "📐 Layout — Padding Top (px)", defaultValue: 72, min: 0, max: 400, step: 8 }),
      paddingBottom: NumberControl({ label: "📐 Layout — Padding Bottom (px)", defaultValue: 96, min: 0, max: 400, step: 8 }),

      // ✏️ Content
      heading: TextInput({ label: "✏️ Content — Heading", defaultValue: "Upcoming" }),
      headingAccent: TextInput({ label: "✏️ Content — Heading Accent", defaultValue: "Events" }),
      overline: TextInput({ label: "✏️ Content — Overline", defaultValue: "Training & Community" }),
      emptyMessage: TextInput({ label: "✏️ Content — Empty State Message", defaultValue: "No upcoming events at this time." }),
    },
  }
)
