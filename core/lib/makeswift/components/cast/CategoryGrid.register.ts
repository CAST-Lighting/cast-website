import { lazy } from "react"
import { Style, TextInput, TextArea, List, Shape, Image, Color, Number } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./CategoryGrid")),
  {
    type: "site-category-grid",
    label: "Site / Category Grid",
    props: {
      className: Style(),
      sectionStyle: Style({ properties: [Style.Padding, Style.Margin] }),
      bgImage: Image({ label: "Background Image" }),
      bgColor: Color({ label: "Background Color", defaultValue: "#ffffff" }),
      overlayColor: Color({ label: "Overlay Color" }),
      overlayOpacity: Number({ label: "Overlay Opacity %", defaultValue: 0, min: 0, max: 100, step: 5 }),
      title: TextInput({ label: "Title", defaultValue: "Product Categories" }),
      description: TextArea({
        label: "Description",
        defaultValue: "Explore our full range of professional landscape lighting solutions.",
      }),
      items: List({
        label: "Categories",
        type: Shape({
          type: {
            image: Image({ label: "Category Image" }),
            name: TextInput({ label: "Category Name", defaultValue: "Category" }),
            href: TextInput({ label: "Link URL", defaultValue: "#" }),
          },
        }),
        getItemLabel: (item) => item?.name || "Category",
      }),
    },
  }
)
