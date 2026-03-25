import { lazy } from "react"
import { Style, TextInput, TextArea, List, Shape, Color, Image, Number as NumberControl, Select } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./ProductFAQ")),
  {
    type: "site-product-faq",
    label: "Product / FAQ",
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
      heading: TextInput({ label: "Heading", defaultValue: "Frequently Asked Questions" }),
      faqs: List({
        label: "FAQs",
        type: Shape({
          type: {
            question: TextInput({ label: "Question", defaultValue: "Question goes here?" }),
            answer: TextArea({ label: "Answer", defaultValue: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." }),
          },
        }),
        getItemLabel(item) { return item?.question?.slice(0, 50) || "FAQ"; },
      }),
    },
  }
)
