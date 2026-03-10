import { lazy } from "react"
import { Style, TextInput, TextArea, List, Shape, Image, Color, Number } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./NewsletterCta")),
  {
    type: "site-newsletter-cta",
    label: "Site / Newsletter CTA",
    props: {
      className: Style(),
      sectionStyle: Style({ properties: [Style.Padding, Style.Margin] }),
      bgImage: Image({ label: "Background Image" }),
      bgColor: Color({ label: "Background Color" }),
      overlayColor: Color({ label: "Overlay Color" }),
      overlayOpacity: Number({ label: "Overlay Opacity %", defaultValue: 0, min: 0, max: 100, step: 5 }),
      containerBgColor: Color({ label: "Card Background Color", defaultValue: "#111827" }),
      heading: TextInput({ label: "Heading", defaultValue: "Stay in the Loop" }),
      description: TextArea({
        label: "Description",
        defaultValue: "Get the latest on new products, contractor resources, and exclusive offers delivered straight to your inbox.",
      }),
      buttonText: TextInput({ label: "Button Text", defaultValue: "Subscribe" }),
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
