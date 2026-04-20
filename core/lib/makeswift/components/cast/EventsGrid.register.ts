import { lazy } from "react"
import { Style, TextInput, Color, Number as NumberControl} from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./EventsGrid")),
  {
    type: "cast-events-grid",
    label: "Sections / Events Grid",
    props: {
      className: Style({ properties: [Style.Padding, Style.Margin] }),
      lightMode: Checkbox({ label: '💡 Light Mode', defaultValue: false }),

      // 🎨 Background
      bgColor: Color({ label: "🎨 Background — Color", defaultValue: "#0f1923" }),

      // ✏️ Content
      heading: TextInput({ label: "✏️ Content — Heading", defaultValue: "Upcoming" }),
      headingAccent: TextInput({ label: "✏️ Content — Heading Accent", defaultValue: "Events" }),
      overline: TextInput({ label: "✏️ Content — Label over Title", defaultValue: "Training & Community" }),
      emptyMessage: TextInput({ label: "✏️ Content — Empty State Message", defaultValue: "No upcoming events at this time." }) } }
)
