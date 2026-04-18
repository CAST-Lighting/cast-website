import { lazy } from "react"
import { Style, TextInput, Image, Color, Number as NumberControl, Select } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./SignupHero")),
  {
    type: "site-signup-hero",
    label: "Hero / Signup Hero",
    props: {
      className: Style({ properties: [Style.Padding, Style.Margin] }),
      sectionStyle: Style({ properties: [Style.Padding, Style.Margin] }),

      // 🎨 Background
      bgColor: Color({ label: "🎨 Background — Color", defaultValue: "#25262d" }),
      bgImage: Image({ label: "🎨 Background — Image" }),
      bgOpacity: NumberControl({ label: "🎨 Background — Opacity", defaultValue: 85, min: 0, max: 100, step: 1, suffix: "%" }),
      gradientFrom: Color({ label: "🎨 Background — Gradient From" }),
      gradientTo: Color({ label: "🎨 Background — Gradient To" }),
      gradientDirection: Select({
        label: "🎨 Background — Gradient Direction",
        options: [
          { value: "to bottom", label: "Top to Bottom" },
          { value: "to top", label: "Bottom to Top" },
          { value: "to right", label: "Left to Right" },
          { value: "to left", label: "Right to Left" },
          { value: "135deg", label: "Diagonal" },
        ],
        defaultValue: "to bottom",
      }),

      // 📸 Media
      image: Image({ label: "📸 Media — Hero Background Image" }),

      // ✏️ Content
      overline: TextInput({ label: "✏️ Content — Overline", defaultValue: "Section Label" }),
      heading: TextInput({ label: "✏️ Content — Heading", defaultValue: "Heading Goes Here" }),
      subheading: TextInput({ label: "✏️ Content — Subheading", defaultValue: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt." }),

      // 📋 Form
      formHeading: TextInput({ label: "📋 Form — Heading", defaultValue: "Form Heading Here" }),
      submitButtonText: TextInput({ label: "📋 Form — Submit Button Text", defaultValue: "Submit" }),
    },
  }
)
