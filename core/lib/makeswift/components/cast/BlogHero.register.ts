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
      overline: TextInput({ label: "Overline", defaultValue: "Section Label" }),
      heading: TextInput({ label: "Heading", defaultValue: "Heading Goes Here" }),
      headingAccent: TextInput({ label: "Heading Accent (gold)", defaultValue: "Accent" }),
      description: TextInput({ label: "Description", defaultValue: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." }),
    },
  }
)
