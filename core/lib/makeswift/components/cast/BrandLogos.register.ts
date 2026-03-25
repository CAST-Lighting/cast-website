import { lazy } from "react"
import { Style, TextInput, List, Shape, Image, Color, Number as NumberControl, Select } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./BrandLogos")),
  {
    type: "site-brand-logos",
    label: "Sections / Brand Logos",
    props: {
      className: Style(),
      sectionStyle: Style({ properties: [Style.Padding, Style.Margin] }),
      bgColor: Color({ label: "Background Color", defaultValue: "#2d353c" }),
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
      overline: TextInput({ label: "Overline", defaultValue: "Trusted By Thousands" }),
      heading: TextInput({ label: "Heading", defaultValue: "Used By The Best In The Industry" }),
      logos: List({
        label: "Brand Logos",
        type: Shape({
          type: {
            image: Image({ label: "Logo Image" }),
            name: TextInput({ label: "Brand Name", defaultValue: "Brand Name" }),
            url: TextInput({ label: "Link URL", defaultValue: "#" }),
          },
        }),
        getItemLabel(item) { return item?.name || "Brand"; },
      }),
    },
  }
)
