import { lazy } from "react"
import { Style, TextInput, TextArea, List, Shape, Image, Color, Number as NumberControl, Select } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./NewsletterCtaFull")),
  {
    type: "site-newsletter-cta-full",
    label: "CTA / Newsletter Full",
    props: {
      className: Style(),
      sectionStyle: Style({ properties: [Style.Padding, Style.Margin] }),
      bgImage: Image({ label: "Background Image" }),
      bgColor: Color({ label: "Background Color", defaultValue: "#25262d" }),
      overlayColor: Color({ label: "Overlay Color" }),
      overlayOpacity: NumberControl({ label: "Overlay Opacity %", defaultValue: 0, min: 0, max: 100, step: 5 }),
      containerBgColor: Color({ label: "Container Background Color", defaultValue: "#111827" }),
      gradientFrom: Color({ label: 'Gradient From' }),
      gradientTo: Color({ label: 'Gradient To' }),
      gradientDirection: Select({
        label: 'Gradient Direction',
        options: [
          { value: 'to bottom', label: 'Top to Bottom' },
          { value: 'to top', label: 'Bottom to Top' },
          { value: 'to right', label: 'Left to Right' },
          { value: 'to left', label: 'Right to Left' },
          { value: '135deg', label: 'Diagonal' },
        ],
        defaultValue: 'to bottom',
      }),
      paddingTop: NumberControl({ label: 'Padding Top', defaultValue: 96, min: 0, max: 400, step: 8, suffix: 'px' }),
      paddingBottom: NumberControl({ label: 'Padding Bottom', defaultValue: 96, min: 0, max: 400, step: 8, suffix: 'px' }),
      heading: TextInput({ label: "Heading", defaultValue: "Heading Goes Here" }),
      description: TextArea({
        label: "Description",
        defaultValue: "Get the latest on new products, contractor resources, and exclusive offers delivered straight to your inbox.",
      }),
      buttonText: TextInput({ label: "Button Text", defaultValue: "Submit" }),
      items: List({
        label: "Benefit Items",
        type: Shape({
          type: {
            text: TextInput({ label: "Text", defaultValue: "Benefit item" }),
          },
        }),
        getItemLabel(item) { return item?.text || "Item"; },
      }),
    },
  }
)
