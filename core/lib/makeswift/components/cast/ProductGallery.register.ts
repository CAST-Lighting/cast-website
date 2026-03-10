import { lazy } from "react"
import { Style, TextInput, TextArea, List, Shape, Image, Color, Number } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./ProductGallery")),
  {
    type: "site-product-gallery",
    label: "Site / Product Gallery",
    props: {
      className: Style(),
      sectionStyle: Style({ properties: [Style.Padding, Style.Margin] }),
      bgImage: Image({ label: "Background Image" }),
      bgColor: Color({ label: "Background Color" }),
      overlayColor: Color({ label: "Overlay Color" }),
      overlayOpacity: Number({ label: "Overlay Opacity %", defaultValue: 0, min: 0, max: 100, step: 5 }),
      title: TextInput({ label: "Title", defaultValue: "Our Favorite Picks" }),
      description: TextArea({
        label: "Description",
        defaultValue: "Explore our most popular landscape lighting fixtures trusted by contractors nationwide.",
      }),
      items: List({
        label: "Products",
        type: Shape({
          type: {
            category: TextInput({ label: "Category", defaultValue: "Path Lights" }),
            image: Image({ label: "Product Image" }),
            name: TextInput({ label: "Product Name", defaultValue: "Product Name" }),
            price: TextInput({ label: "Price", defaultValue: "$0.00" }),
            href: TextInput({ label: "Link URL", defaultValue: "#" }),
          },
        }),
        getItemLabel: (item) => item?.name || "Product",
      }),
    },
  }
)
