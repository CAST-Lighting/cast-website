import { lazy } from "react"
import { Style, TextInput, TextArea, List, Shape, Color } from "@makeswift/runtime/controls"
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
      heading: TextInput({ label: "Heading", defaultValue: "Frequently Asked Questions" }),
      faqs: List({
        label: "FAQs",
        type: Shape({
          type: {
            question: TextInput({ label: "Question", defaultValue: "Your question here?" }),
            answer: TextArea({ label: "Answer", defaultValue: "Your answer here." }),
          },
        }),
        getItemLabel(item) { return item?.question?.slice(0, 50) || "FAQ"; },
      }),
    },
  }
)
