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
      bgColor: Color({ label: "Background Color", defaultValue: "#0f1923" }),
      paddingTop: NumberControl({ label: "Padding Top (px)", defaultValue: 72, min: 0, max: 400, step: 8 }),
      paddingBottom: NumberControl({ label: "Padding Bottom (px)", defaultValue: 96, min: 0, max: 400, step: 8 }),
      heading: TextInput({ label: "Heading", defaultValue: "Upcoming" }),
      headingAccent: TextInput({ label: "Heading Accent", defaultValue: "Events" }),
      overline: TextInput({ label: "Overline", defaultValue: "Training & Community" }),
      emptyMessage: TextInput({ label: "Empty State Message", defaultValue: "No upcoming events at this time." }),
    },
  }
)
