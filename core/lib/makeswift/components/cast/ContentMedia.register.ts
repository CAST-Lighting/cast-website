import { lazy } from "react"
import { Style, Color, Image, Number as NumberControl, Select, TextInput, List, Shape } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./ContentMedia")),
  {
    type: "site-content-media",
    label: "Sections / Content + Video",
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
      heading: TextInput({ label: 'Heading', defaultValue: 'Unmatched Quality, Technology &' }),
      headingAccent: TextInput({ label: 'Heading Accent', defaultValue: 'Durability' }),
      bodyText: TextInput({ label: 'Body Text', defaultValue: 'Every CAST fixture is made from solid brass and copper alloys that will never rust or corrode. Our proprietary LED technology delivers superior color rendering and energy efficiency.' }),
      features: List({
        label: 'Features',
        type: Shape({
          type: {
            title: TextInput({ label: 'Title', defaultValue: '' }),
            desc: TextInput({ label: 'Description', defaultValue: '' }),
          },
        }),
        getItemLabel(item) { return item?.title || 'Feature' },
      }),
      btn1Label: TextInput({ label: 'Button 1 Label', defaultValue: 'Shop Products' }),
      btn1Href: TextInput({ label: 'Button 1 Href', defaultValue: '/shop' }),
      btn2Label: TextInput({ label: 'Button 2 Label', defaultValue: 'Learn More →' }),
      btn2Href: TextInput({ label: 'Button 2 Href', defaultValue: '/about' }),
      videoUrl: TextInput({ label: 'Video URL (YouTube embed)', defaultValue: '' }),
      stat: TextInput({ label: 'Stat Number', defaultValue: '25+' }),
      statLabel: TextInput({ label: 'Stat Label', defaultValue: 'Years of Excellence' }),
    },
  }
)
