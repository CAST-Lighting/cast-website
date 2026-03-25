import { lazy } from "react"
import { Style, Color, Image, Number as NumberControl, Select, TextInput, List, Shape } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./ComparisonSection")),
  {
    type: "site-comparison",
    label: "Sections / Brand Comparison",
    props: {
      className: Style(),
      bgImage: Image({ label: 'Background Image' }),
      bgColor: Color({ label: 'Background Color' }),
      bgOpacity: NumberControl({ label: 'Background Opacity', defaultValue: 85, min: 0, max: 100, step: 1, suffix: '%' }),
      gradientFrom: Color({ label: 'Gradient From' }),
      gradientTo: Color({ label: 'Gradient To' }),
      gradientDirection: Select({
        label: 'Gradient Direction',
        options: [
          { value: 'to bottom', label: '↓ Top to Bottom' },
          { value: 'to top', label: '↑ Bottom to Top' },
          { value: 'to right', label: '→ Left to Right' },
          { value: 'to left', label: '← Right to Left' },
          { value: '135deg', label: '↘ Diagonal ↘' },
          { value: '225deg', label: '↙ Diagonal ↙' },
        ],
        defaultValue: 'to bottom',
      }),
      lineHeight: NumberControl({ label: 'Text Line Height', defaultValue: 1.6, min: 1, max: 3, step: 0.05 }),
      paddingTop: NumberControl({ label: 'Padding Top', defaultValue: 96, min: 0, max: 400, step: 8, suffix: 'px' }),
      paddingBottom: NumberControl({ label: 'Padding Bottom', defaultValue: 96, min: 0, max: 400, step: 8, suffix: 'px' }),
      overline: TextInput({ label: 'Overline', defaultValue: 'CAST vs Other Brands' }),
      heading: TextInput({ label: 'Heading', defaultValue: 'Why Contractors Choose' }),
      headingAccent: TextInput({ label: 'Heading Accent', defaultValue: 'CAST' }),
      description: TextInput({ label: 'Description', defaultValue: 'See how CAST Lighting compares to other landscape lighting brands.' }),
      castTitle: TextInput({ label: 'CAST Column Title', defaultValue: 'CAST Advantages' }),
      othersTitle: TextInput({ label: 'Others Column Title', defaultValue: 'Other Lighting Brands' }),
      castPoints: List({
        label: 'CAST Points',
        type: Shape({
          type: {
            text: TextInput({ label: 'Point', defaultValue: '' }),
          },
        }),
        getItemLabel(item) { return item?.text || 'Point' },
      }),
      otherPoints: List({
        label: 'Other Brand Points',
        type: Shape({
          type: {
            text: TextInput({ label: 'Point', defaultValue: '' }),
          },
        }),
        getItemLabel(item) { return item?.text || 'Point' },
      }),
    },
  }
)
