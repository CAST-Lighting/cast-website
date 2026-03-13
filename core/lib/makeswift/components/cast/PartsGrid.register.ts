import { lazy } from "react"
import { Style, TextInput, List, Shape, Image, Color } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./PartsGrid")),
  {
    type: "site-parts-grid",
    label: "Product / Parts Grid",
    props: {
      className: Style(),
      sectionStyle: Style({ properties: [Style.Padding, Style.Margin] }),
      bgColor: Color({ label: "Background Color", defaultValue: "#25262d" }),
      overline: TextInput({ label: "Overline", defaultValue: "Need Parts?" }),
      heading: TextInput({ label: "Heading", defaultValue: "Parts For This Product" }),
      parts: List({
        label: "Parts",
        type: Shape({
          type: {
            image: Image({ label: "Part Image" }),
            name: TextInput({ label: "Part Name", defaultValue: "Part Name" }),
            partNumber: TextInput({ label: "Part Number", defaultValue: "PART-001" }),
            price: TextInput({ label: "Price", defaultValue: "$9.99" }),
            href: TextInput({ label: "Product URL", defaultValue: "#" }),
          },
        }),
        getItemLabel(item) { return item?.name || "Part"; },
      }),
    },
  }
)
