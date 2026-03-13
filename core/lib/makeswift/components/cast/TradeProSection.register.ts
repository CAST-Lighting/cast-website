import { lazy } from "react"
import { Style, TextInput, TextArea, List, Shape, Image, Color, Number } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./TradeProSection")),
  {
    type: "site-trade-pro-section",
    label: "Site / TradePro Section",
    props: {
      className: Style(),
      sectionStyle: Style({ properties: [Style.Padding, Style.Margin] }),
      bgImage: Image({ label: "Background Image" }),
      bgColor: Color({ label: "Background Color", defaultValue: "#2d353c" }),
      overlayColor: Color({ label: "Overlay Color" }),
      overlayOpacity: Number({ label: "Overlay Opacity %", defaultValue: 0, min: 0, max: 100, step: 5 }),
      subtitle: TextInput({ label: "Subtitle", defaultValue: "Benefits for Contractors & Installers" }),
      heading: TextInput({ label: "Heading", defaultValue: "The TradePro Advantage" }),
      description: TextArea({
        label: "Description",
        defaultValue: "Access professional products with lifetime warranties that give you design control in the field.",
      }),
      cards: List({
        label: "Benefit Cards",
        type: Shape({
          type: {
            icon: TextArea({ label: "Icon SVG", defaultValue: "" }),
            title: TextInput({ label: "Title", defaultValue: "Benefit Title" }),
            description: TextArea({ label: "Description", defaultValue: "Benefit description goes here." }),
          },
        }),
        getItemLabel(item) { return item?.title || "Benefit Card"; },
      }),
      buttonText: TextInput({ label: "Button Text", defaultValue: "Learn More About TradePro" }),
      buttonHref: TextInput({ label: "Button URL", defaultValue: "#" }),
    },
  }
)
