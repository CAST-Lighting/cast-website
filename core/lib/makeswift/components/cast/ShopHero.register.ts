import { lazy } from "react"
import { Style, TextInput, List, Shape, Image, Color, Number } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./ShopHero")),
  {
    type: "site-shop-hero",
    label: "Site / Shop Hero",
    props: {
      className: Style(),
      sectionStyle: Style({ properties: [Style.Padding, Style.Margin] }),
      bgColor: Color({ label: "Background Color", defaultValue: "#004960" }),
      overlayOpacity: Number({ label: "Overlay Opacity %", defaultValue: 50, min: 0, max: 100, step: 5 }),
      searchPlaceholder: TextInput({ label: "Search Placeholder", defaultValue: "Search fixtures, accessories, transformers..." }),
      slides: List({
        label: "Hero Slides",
        type: Shape({
          type: {
            image: Image({ label: "Background Image" }),
            heading: TextInput({ label: "Heading", defaultValue: "Shop CAST Lighting" }),
            subtitle: TextInput({ label: "Subtitle", defaultValue: "Professional outdoor lighting built to last a lifetime." }),
          },
        }),
        getItemLabel(item) { return item?.heading || "Slide"; },
      }),
    },
  }
)
