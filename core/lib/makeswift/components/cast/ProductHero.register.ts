import { lazy } from "react"
import { Style, TextInput, TextArea, List, Shape, Image, Color, Checkbox } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./ProductHero")),
  {
    type: "site-product-hero",
    label: "Product / Hero",
    props: {
      className: Style(),
      sectionStyle: Style({ properties: [Style.Padding, Style.Margin] }),
      bgColor: Color({ label: "Background Color", defaultValue: "#25262d" }),
      productName: TextInput({ label: "Product Name", defaultValue: "Brass Path Light" }),
      modelNumber: TextInput({ label: "Model Number", defaultValue: "BPL-55-BR" }),
      rating: TextInput({ label: "Star Rating (1–5)", defaultValue: "4.9" }),
      reviewCount: TextInput({ label: "Review Count", defaultValue: "128" }),
      shortDescription: TextArea({ label: "Short Description", defaultValue: "Solid brass construction with 5.5W LED module. Built to last a lifetime in any outdoor environment." }),
      price: TextInput({ label: "Price", defaultValue: "$249.99" }),
      inStock: Checkbox({ label: "In Stock", defaultValue: true }),
      tradeProOnly: Checkbox({ label: "TradePro Only", defaultValue: false }),
      images: List({
        label: "Product Images",
        type: Shape({
          type: {
            src: Image({ label: "Image" }),
            alt: TextInput({ label: "Alt Text", defaultValue: "Product image" }),
          },
        }),
        getItemLabel(item) { return item?.alt || "Image"; },
      }),
    },
  }
)
