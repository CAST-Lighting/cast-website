import { lazy } from "react"
import { Style, Color, Image, Number as NumberControl, Select, TextInput } from "@makeswift/runtime/controls"
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
      benefit1Title: TextInput({ label: 'Benefit 1 Title', defaultValue: 'Exclusive Contractor Pricing' }),
      benefit1Desc: TextInput({ label: 'Benefit 1 Description', defaultValue: 'Access wholesale pricing with volume discounts that improve your margins on every project.' }),
      benefit2Title: TextInput({ label: 'Benefit 2 Title', defaultValue: 'Design Control in the Field' }),
      benefit2Desc: TextInput({ label: 'Benefit 2 Description', defaultValue: 'Interchangeable optics and adjustable fixtures let you fine-tune lighting on-site.' }),
      benefit3Title: TextInput({ label: 'Benefit 3 Title', defaultValue: 'Lifetime Product Warranty' }),
      benefit3Desc: TextInput({ label: 'Benefit 3 Description', defaultValue: 'Every CAST product is backed by our industry-leading lifetime warranty—no questions asked.' }),
      benefit4Title: TextInput({ label: 'Benefit 4 Title', defaultValue: 'Dedicated Support Team' }),
      benefit4Desc: TextInput({ label: 'Benefit 4 Description', defaultValue: 'Get direct access to our expert lighting designers for project planning and troubleshooting.' }),
      btnLabel: TextInput({ label: 'Button Label', defaultValue: 'Learn More About TradePro' }),
      btnHref: TextInput({ label: 'Button Href', defaultValue: '/trade-pro' }),
    },
  }
)
