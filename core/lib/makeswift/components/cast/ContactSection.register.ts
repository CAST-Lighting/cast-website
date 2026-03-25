import { lazy } from "react"
import { Style, Color, Number as NumberControl, TextInput } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./ContactSection")),
  {
    type: "cast-contact-section",
    label: "Forms / Contact Section",
    props: {
      className: Style(),
      bgColor: Color({ label: "Background Color", defaultValue: "#0d1620" }),
      paddingTop: NumberControl({ label: "Padding Top", defaultValue: 96, min: 0, max: 400, step: 8, suffix: "px" }),
      paddingBottom: NumberControl({ label: "Padding Bottom", defaultValue: 96, min: 0, max: 400, step: 8, suffix: "px" }),
      overline: TextInput({ label: "Overline", defaultValue: "Section Label" }),
      heading: TextInput({ label: "Heading", defaultValue: "Heading Goes Here" }),
      headingAccent: TextInput({ label: "Heading Accent (gold)", defaultValue: "Accent" }),
      description: TextInput({ label: "Description", defaultValue: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." }),
      phone: TextInput({ label: "Phone", defaultValue: "(973) 423-2303" }),
      email: TextInput({ label: "Email", defaultValue: "info@castlighting.com" }),
      address: TextInput({ label: "Address", defaultValue: "Pine Brook, NJ 07058" }),
      formHeading: TextInput({ label: "Form Heading", defaultValue: "Form Heading Here" }),
      submitLabel: TextInput({ label: "Submit Button Label", defaultValue: "Submit" }),
    },
  }
)
