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
      overline: TextInput({ label: "Overline", defaultValue: "We'd Love To Hear From You" }),
      heading: TextInput({ label: "Heading", defaultValue: "Get In" }),
      headingAccent: TextInput({ label: "Heading Accent (gold)", defaultValue: "Touch" }),
      description: TextInput({ label: "Description", defaultValue: "Have a project in mind? Want to become a TradePro member? Our team is ready to help." }),
      phone: TextInput({ label: "Phone", defaultValue: "(973) 423-2303" }),
      email: TextInput({ label: "Email", defaultValue: "info@castlighting.com" }),
      address: TextInput({ label: "Address", defaultValue: "Pine Brook, NJ 07058" }),
      formHeading: TextInput({ label: "Form Heading", defaultValue: "Send Us A Message" }),
      submitLabel: TextInput({ label: "Submit Button Label", defaultValue: "Send Message" }),
    },
  }
)
