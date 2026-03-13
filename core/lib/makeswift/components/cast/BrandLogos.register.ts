import { lazy } from "react"
import { Style, TextInput, List, Shape, Image, Color } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./BrandLogos")),
  {
    type: "site-brand-logos",
    label: "Site / Brand Logos",
    props: {
      className: Style(),
      sectionStyle: Style({ properties: [Style.Padding, Style.Margin] }),
      bgColor: Color({ label: "Background Color", defaultValue: "#2d353c" }),
      overline: TextInput({ label: "Overline", defaultValue: "Trusted By Thousands" }),
      heading: TextInput({ label: "Heading", defaultValue: "Used By The Best In The Industry" }),
      logos: List({
        label: "Brand Logos",
        type: Shape({
          type: {
            image: Image({ label: "Logo Image" }),
            name: TextInput({ label: "Brand Name", defaultValue: "Brand Name" }),
            url: TextInput({ label: "Link URL", defaultValue: "#" }),
          },
        }),
        getItemLabel(item) { return item?.name || "Brand"; },
      }),
    },
  }
)
