import { lazy } from "react"
import { Style, TextInput, TextArea, List, Shape, Image, Color, Checkbox, Number as NumberControl, Select } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./ProductHero")),
  {
    type: "site-product-hero",
    label: "Hero / Product Hero",
    props: {
      className: Style(),
      sectionStyle: Style({ properties: [Style.Padding, Style.Margin] }),
      bgColor: Color({ label: "Background Color", defaultValue: "#25262d" }),
      bgImage: Image({ label: 'Background Image' }),
      bgOpacity: NumberControl({ label: 'Background Opacity', defaultValue: 85, min: 0, max: 100, step: 1, suffix: '%' }),
      gradientFrom: Color({ label: 'Gradient From' }),
      gradientTo: Color({ label: 'Gradient To' }),
      gradientDirection: Select({
        label: 'Gradient Direction',
        options: [
          { value: 'to bottom', label: 'Top to Bottom' },
          { value: 'to top', label: 'Bottom to Top' },
          { value: 'to right', label: 'Left to Right' },
          { value: 'to left', label: 'Right to Left' },
          { value: '135deg', label: 'Diagonal' },
        ],
        defaultValue: 'to bottom',
      }),
      paddingTop: NumberControl({ label: 'Padding Top', defaultValue: 96, min: 0, max: 400, step: 8, suffix: 'px' }),
      paddingBottom: NumberControl({ label: 'Padding Bottom', defaultValue: 96, min: 0, max: 400, step: 8, suffix: 'px' }),
      productName: TextInput({ label: "Product Name", defaultValue: "Product Name" }),
      modelNumber: TextInput({ label: "Model Number", defaultValue: "MODEL-001" }),
      rating: TextInput({ label: "Star Rating (1–5)", defaultValue: "4.9" }),
      reviewCount: TextInput({ label: "Review Count", defaultValue: "128" }),
      shortDescription: TextArea({ label: "Short Description", defaultValue: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor." }),
      price: TextInput({ label: "Price", defaultValue: "$0.00" }),
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
      bodyText: TextArea({
        label: "Product Description",
        defaultValue: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed enim fringilla, suscipit felis eget, euismod nisi. Vestibulum ac fermentum ex, ac cursus sem. Nam vel bibendum erat. Pellentesque blandit viverra viverra. Nullam vestibulum ex eget gravida volutpat.\n\nPhasellus laoreet gravida libero, at porttitor diam fringilla at. Sed ac orci facilisis, placerat augue a, pulvinar enim. Integer volutpat velit nulla, vel varius purus elementum at. Cras euismod semper mi, at bibendum odio tincidunt vitae.\n\nPellentesque blandit viverra viverra. Nullam vestibulum ex eget gravida volutpat. Phasellus laoreet gravida libero, at porttitor diam fringilla at.",
      }),
      bulletPoints: List({
        label: "Feature Bullet Points",
        type: Shape({
          type: {
            text: TextInput({ label: "Bullet Text", defaultValue: "Feature description goes here" }),
          },
        }),
        getItemLabel(item) { return item?.text || "Bullet"; },
      }),
    },
  }
)
