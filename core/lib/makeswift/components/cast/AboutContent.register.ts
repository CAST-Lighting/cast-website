import { lazy } from "react"
import { Style, Color, Number as NumberControl, TextInput, TextArea, List, Shape } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./AboutContent")),
  {
    type: "cast-about-content",
    label: "Sections / About Content",
    props: {
      className: Style({ properties: [Style.Padding, Style.Margin] }),
      paddingTop: NumberControl({ label: "📐 Layout — Padding Top", defaultValue: 80, min: 0, max: 400, step: 8, suffix: "px" }),
      paddingBottom: NumberControl({ label: "📐 Layout — Padding Bottom", defaultValue: 80, min: 0, max: 400, step: 8, suffix: "px" }),

      // 🎨 Background
      bgColor: Color({ label: "🎨 Background — Color", defaultValue: "#0f1923" }),

      // ✏️ Content
      sectionHeading: TextInput({ label: "✏️ Content — Section Heading", defaultValue: "Built to Last. Built in America." }),
      sectionBody: TextArea({
        label: "✏️ Content — Section Body",
        defaultValue:
          "Since 2001, CAST Lighting has been designing and manufacturing professional-grade landscape lighting fixtures in the USA. Every product is crafted from solid brass or copper — materials chosen for their beauty and ability to withstand decades of outdoor exposure without corroding or deteriorating.",
      }),

      // 🃏 Cards — Feature Cards
      features: List({
        label: "🃏 Cards — Feature Cards",
        type: Shape({
          type: {
            title: TextInput({ label: "Title", defaultValue: "Feature Title" }),
            desc: TextArea({ label: "Description", defaultValue: "Feature description goes here." }),
          },
        }),
        getItemLabel(item) {
          return item?.title || "Feature"
        },
      }),

      // ✏️ Content — Mission
      missionHeading: TextInput({ label: "✏️ Content — Mission Heading", defaultValue: "Our Mission" }),
      missionBody: TextArea({
        label: "✏️ Content — Mission Body",
        defaultValue:
          "To provide landscape lighting professionals with the highest-quality fixtures available — products that are beautiful, durable, and easy to install. We believe outdoor lighting should enhance properties for a lifetime, and we build every product with that standard in mind.",
      }),

      // 🔘 Buttons
      btn1Label: TextInput({ label: "🔘 Buttons — Button 1 Label", defaultValue: "Shop Products" }),
      btn1Href: TextInput({ label: "🔘 Buttons — Button 1 Link", defaultValue: "/shop" }),
      btn2Label: TextInput({ label: "🔘 Buttons — Button 2 Label", defaultValue: "Contact Us" }),
      btn2Href: TextInput({ label: "🔘 Buttons — Button 2 Link", defaultValue: "/contact" }),
    },
  }
)
