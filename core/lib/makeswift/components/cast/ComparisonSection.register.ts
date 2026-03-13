import { lazy } from "react"
import { Style, TextInput, TextArea, List, Shape, Image, Color, Number } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./ComparisonSection")),
  {
    type: "site-comparison-section",
    label: "Site / Comparison Section",
    props: {
      className: Style(),
      sectionStyle: Style({ properties: [Style.Padding, Style.Margin] }),
      bgImage: Image({ label: "Background Image" }),
      bgColor: Color({ label: "Background Color", defaultValue: "#2d353c" }),
      overlayColor: Color({ label: "Overlay Color" }),
      overlayOpacity: Number({ label: "Overlay Opacity %", defaultValue: 0, min: 0, max: 100, step: 5 }),
      castCardBgColor: Color({ label: "CAST Card Background", defaultValue: "#37474f" }),
      otherCardBgColor: Color({ label: "Other Card Background", defaultValue: "#2d353c" }),
      subtitle: TextInput({ label: "Subtitle", defaultValue: "CAST vs Other Brands" }),
      heading: TextInput({ label: "Heading", defaultValue: "Why Contractors Choose CAST Lighting" }),
      description: TextArea({
        label: "Description",
        defaultValue: "CAST Lighting is a professional landscape lighting manufacturer specializing in contractor-grade outdoor lighting systems.",
      }),
      castHeading: TextInput({ label: "CAST Card Heading", defaultValue: "CAST Advantages" }),
      castItems: List({
        label: "CAST Advantages",
        type: Shape({
          type: {
            title: TextInput({ label: "Title", defaultValue: "Advantage" }),
            description: TextArea({ label: "Description", defaultValue: "Description of this advantage." }),
          },
        }),
        getItemLabel(item) { return item?.title || "Advantage"; },
      }),
      otherHeading: TextInput({ label: "Others Card Heading", defaultValue: "Other Lighting Brands" }),
      otherItems: List({
        label: "Other Brands Drawbacks",
        type: Shape({
          type: {
            title: TextInput({ label: "Title", defaultValue: "Drawback" }),
            description: TextArea({ label: "Description", defaultValue: "Description of this drawback." }),
          },
        }),
        getItemLabel(item) { return item?.title || "Drawback"; },
      }),
    },
  }
)
