import { lazy } from "react"
import { Style, TextInput, List, Shape, Image, Color } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./BundleProducts")),
  {
    type: "site-bundle-products",
    label: "Product / Bundle Products",
    props: {
      className: Style(),
      sectionStyle: Style({ properties: [Style.Padding, Style.Margin] }),
      bgColor: Color({ label: "Background Color", defaultValue: "#f6f7f8" }),
      overline: TextInput({ label: "Overline", defaultValue: "Frequently Bought Together" }),
      heading: TextInput({ label: "Heading", defaultValue: "Bundle These Products" }),
      buttonText: TextInput({ label: "Button Text", defaultValue: "Add All To Cart" }),
      items: List({
        label: "Bundle Items",
        type: Shape({
          type: {
            image: Image({ label: "Product Image" }),
            name: TextInput({ label: "Product Name", defaultValue: "Accessory Name" }),
            price: TextInput({ label: "Price", defaultValue: "$19.99" }),
            badge: TextInput({ label: "Badge (optional)", defaultValue: "ACCESSORY" }),
          },
        }),
        getItemLabel(item) { return item?.name || "Item"; },
      }),
    },
  }
)
