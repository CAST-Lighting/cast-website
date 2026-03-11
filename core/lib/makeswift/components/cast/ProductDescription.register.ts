import { lazy } from "react"
import { Style, TextInput, TextArea, List, Shape, Color } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./ProductDescription")),
  {
    type: "site-product-description",
    label: "Product / Description",
    props: {
      className: Style(),
      sectionStyle: Style({ properties: [Style.Padding, Style.Margin] }),
      bgColor: Color({ label: "Background Color", defaultValue: "#ffffff" }),
      heading: TextInput({ label: "Heading", defaultValue: "Product Description" }),
      description: TextArea({ label: "Description", defaultValue: "" }),
      bulletPoints: List({
        label: "Bullet Points",
        type: Shape({
          type: {
            text: TextInput({ label: "Bullet Text", defaultValue: "Feature or specification" }),
          },
        }),
        getItemLabel(item) { return item?.text?.slice(0, 40) || "Bullet"; },
      }),
    },
  }
)
