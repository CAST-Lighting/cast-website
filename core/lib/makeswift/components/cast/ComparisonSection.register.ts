import { lazy } from "react"
import { Style, Color, Image, Number as NumberControl, Select, TextInput } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./ComparisonSection")),
  {
    type: "site-comparison",
    label: "Site / Comparison Section",
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
      cast1: TextInput({ label: 'CAST Point 1', defaultValue: 'Solid brass & copper construction' }),
      cast2: TextInput({ label: 'CAST Point 2', defaultValue: 'Lifetime warranty on all fixtures' }),
      cast3: TextInput({ label: 'CAST Point 3', defaultValue: 'Field-serviceable LED modules' }),
      cast4: TextInput({ label: 'CAST Point 4', defaultValue: 'Interchangeable optics system' }),
      cast5: TextInput({ label: 'CAST Point 5', defaultValue: 'Direct contractor support line' }),
      other1: TextInput({ label: 'Others Point 1', defaultValue: 'Aluminum or plastic housings' }),
      other2: TextInput({ label: 'Others Point 2', defaultValue: 'Limited 5-10 year warranties' }),
      other3: TextInput({ label: 'Others Point 3', defaultValue: 'Sealed, non-serviceable units' }),
      other4: TextInput({ label: 'Others Point 4', defaultValue: 'Fixed beam angles only' }),
      other5: TextInput({ label: 'Others Point 5', defaultValue: 'Generic customer support' }),
    },
  }
)
