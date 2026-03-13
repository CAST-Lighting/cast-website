import { lazy } from "react"
import { Style, Color, Image, Number as NumberControl, Select, TextInput, List, Shape } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./TradeProSection")),
  {
    type: "site-trade-pro",
    label: "Site / TradePro Section",
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
      overline: TextInput({ label: 'Overline', defaultValue: 'Benefits for Contractors & Installers' }),
      heading: TextInput({ label: 'Heading', defaultValue: 'The TradePro' }),
      headingAccent: TextInput({ label: 'Heading Accent', defaultValue: 'Advantage' }),
      description: TextInput({ label: 'Description', defaultValue: 'Access professional products with lifetime warranties that give you design control in the field.' }),
      benefits: List({
        label: 'Benefits',
        type: Shape({
          type: {
            title: TextInput({ label: 'Title', defaultValue: '' }),
            desc: TextInput({ label: 'Description', defaultValue: '' }),
          },
        }),
        getItemLabel(item) { return item?.title || 'Benefit' },
      }),
      btnLabel: TextInput({ label: 'Button Label', defaultValue: 'Learn More About TradePro' }),
      btnHref: TextInput({ label: 'Button Href', defaultValue: '/trade-pro' }),
    },
  }
)
