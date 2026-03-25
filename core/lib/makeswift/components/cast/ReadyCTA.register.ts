import { lazy } from "react"
import { Style, TextInput, TextArea, Image, Color, Number } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./ReadyCTA")),
  {
    type: "site-ready-cta",
    label: "CTA / Ready CTA",
    props: {
      className: Style(),
      bgColor: Color({ label: "Background Color", defaultValue: "#004960" }),
      bgImage: Image({ label: "Background Image" }),
      bgOpacity: Number({ label: "Overlay Opacity %", defaultValue: 88, min: 0, max: 100, step: 5 }),
      paddingTop: Number({ label: "Padding Top (px)", defaultValue: 96 }),
      paddingBottom: Number({ label: "Padding Bottom (px)", defaultValue: 96 }),
      overline: TextInput({ label: "Overline", defaultValue: "Section Label" }),
      heading: TextInput({ label: "Heading", defaultValue: "Heading Goes Here" }),
      headingAccent: TextInput({ label: "Heading Accent (gold)", defaultValue: "Accent" }),
      body: TextArea({ label: "Body Text", defaultValue: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." }),
      btn1Label: TextInput({ label: "Button 1 Label", defaultValue: "Button Here" }),
      btn1Href: TextInput({ label: "Button 1 URL", defaultValue: "#" }),
      btn2Label: TextInput({ label: "Button 2 Label", defaultValue: "Button Here" }),
      btn2Href: TextInput({ label: "Button 2 URL", defaultValue: "#" }),
    },
  }
)
