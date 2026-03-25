import { lazy } from "react"
import { Style, Color, Image, Number as NumberControl, Select, TextInput, List, Shape } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./CategoryGrid")),
  {
    type: "site-category-grid",
    label: "Sections / Category Grid",
    props: {
      className: Style(),
      bgImage: Image({ label: 'Background Image' }),
      bgColor: Color({ label: 'Background Color', defaultValue: '#27474f' }),
      bgOpacity: NumberControl({ label: 'Background Opacity', defaultValue: 100, min: 0, max: 100, step: 1, suffix: '%' }),
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
      sectionTitle: TextInput({ label: 'Section Title', defaultValue: 'Product' }),
      sectionTitleAccent: TextInput({ label: 'Section Title Accent', defaultValue: 'Categories' }),
      sectionDescription: TextInput({ label: 'Section Description', defaultValue: 'Explore our full range of professional landscape lighting solutions.' }),
      categories: List({
        label: 'Categories',
        type: Shape({
          type: {
            name: TextInput({ label: 'Name', defaultValue: '' }),
            href: TextInput({ label: 'Link', defaultValue: '' }),
          },
        }),
        getItemLabel(item) { return item?.name || 'Category' },
      }),
    },
  }
)
