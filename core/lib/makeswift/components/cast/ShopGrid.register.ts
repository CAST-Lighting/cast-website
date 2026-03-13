import { lazy } from "react"
import { Style, List, Shape, TextInput, Image, Color } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./ShopGrid")),
  {
    type: "site-shop-grid",
    label: "Site / Shop Grid",
    props: {
      className: Style(),
      sectionStyle: Style({ properties: [Style.Padding, Style.Margin] }),
      bgColor: Color({ label: "Background Color", defaultValue: "#25262d" }),
      products: List({
        label: "Products",
        type: Shape({
          type: {
            image: Image({ label: "Product Image" }),
            name: TextInput({ label: "Product Name", defaultValue: "Product Name" }),
            price: TextInput({ label: "Price", defaultValue: "$249.99" }),
            category: TextInput({ label: "Category", defaultValue: "Path Lights" }),
            badge: TextInput({ label: "Badge (optional)", defaultValue: "" }),
            href: TextInput({ label: "Product URL", defaultValue: "#" }),
          },
        }),
        getItemLabel(item) { return item?.name || "Product"; },
      }),
    },
  }
)
