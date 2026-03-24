import { lazy } from "react"
import { Style, TextInput, List, Shape, Image, Color, Number as NumberControl, Select } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./PartsGrid")),
  {
    type: "site-parts-grid",
    label: "Product / Parts Grid",
    props: {
      className: Style(),
      sectionStyle: Style({ properties: [Style.Padding, Style.Margin] }),
      bgColor: Color({ label: "Background Color", defaultValue: "#25262d" }),
      bgImage: Image({ label: 'Background Image' }),
      bgOpacity: NumberControl({ label: 'Background Opacity', defaultValue: 85, min: 0, max: 100, step: 1, suffix: '%' }),
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
      overline: TextInput({ label: "Overline", defaultValue: "Need Parts?" }),
      heading: TextInput({ label: "Heading", defaultValue: "Parts For This Product" }),
      parts: List({
        label: "Parts",
        type: Shape({
          type: {
            image: Image({ label: "Part Image" }),
            name: TextInput({ label: "Part Name", defaultValue: "Part Name" }),
            partNumber: TextInput({ label: "Part Number", defaultValue: "PART-001" }),
            price: TextInput({ label: "Price", defaultValue: "$9.99" }),
            href: TextInput({ label: "Product URL", defaultValue: "#" }),
          },
        }),
        getItemLabel(item) { return item?.name || "Part"; },
      }),
    },
  }
)
