import { lazy } from "react"
import { Style, Color, Image, Number as NumberControl, TextInput } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./BlogHero")),
  {
    type: "cast-blog-hero",
    label: "Hero / Blog Hero",
    props: {
      className: Style(),
      bgColor: Color({ label: "Background Color", defaultValue: "#0d1620" }),
      bgImage: Image({ label: "Background Image" }),
      bgOpacity: NumberControl({ label: "Overlay Opacity %", defaultValue: 92, min: 0, max: 100, step: 1 }),
      paddingTop: NumberControl({ label: "Padding Top", defaultValue: 80, min: 0, max: 400, step: 8, suffix: "px" }),
      paddingBottom: NumberControl({ label: "Padding Bottom", defaultValue: 64, min: 0, max: 400, step: 8, suffix: "px" }),
      overline: TextInput({ label: "Overline", defaultValue: "Expert Lighting Knowledge" }),
      heading: TextInput({ label: "Heading", defaultValue: "CAST" }),
      headingAccent: TextInput({ label: "Heading Accent (gold)", defaultValue: "Insights" }),
      description: TextInput({ label: "Description", defaultValue: "Installation guides, design tips, product updates, and industry news from the CAST Lighting team." }),
    },
  }
)
