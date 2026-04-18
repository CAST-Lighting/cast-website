import { lazy } from "react"
import { Style, Color, Number as NumberControl, TextInput } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./ContactSection")),
  {
    type: "cast-contact-section",
    label: "Forms / Contact Section",
    props: {
      className: Style({ properties: [Style.Padding, Style.Margin] }),

      // 🎨 Background
      bgColor: Color({ label: "🎨 Background — Color", defaultValue: "#0d1620" }),

      // ✏️ Content
      overline: TextInput({ label: "✏️ Content — Overline", defaultValue: "Section Label" }),
      heading: TextInput({ label: "✏️ Content — Heading", defaultValue: "Heading Goes Here" }),
      headingAccent: TextInput({ label: "✏️ Content — Heading Accent (gold)", defaultValue: "Accent" }),
      description: TextInput({ label: "✏️ Content — Description", defaultValue: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." }),
      phone: TextInput({ label: "✏️ Content — Phone", defaultValue: "(973) 423-2303" }),
      email: TextInput({ label: "✏️ Content — Email", defaultValue: "info@castlighting.com" }),
      address: TextInput({ label: "✏️ Content — Address", defaultValue: "Pine Brook, NJ 07058" }),

      // 📋 Form
      formHeading: TextInput({ label: "📋 Form — Heading", defaultValue: "Form Heading Here" }),
      submitLabel: TextInput({ label: "📋 Form — Submit Button Label", defaultValue: "Submit" }),
    },
  }
)
