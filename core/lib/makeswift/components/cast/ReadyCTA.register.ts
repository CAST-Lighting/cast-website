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
      overline: TextInput({ label: "Overline", defaultValue: "Get Started Today" }),
      heading: TextInput({ label: "Heading", defaultValue: "Ready to Upgrade Your" }),
      headingAccent: TextInput({ label: "Heading Accent (gold)", defaultValue: "Outdoor Lighting?" }),
      body: TextArea({ label: "Body Text", defaultValue: "Join thousands of contractors and homeowners who trust CAST Lighting for professional-grade outdoor fixtures." }),
      btn1Label: TextInput({ label: "Button 1 Label", defaultValue: "Shop Products" }),
      btn1Href: TextInput({ label: "Button 1 URL", defaultValue: "/shop" }),
      btn2Label: TextInput({ label: "Button 2 Label", defaultValue: "Join TradePro" }),
      btn2Href: TextInput({ label: "Button 2 URL", defaultValue: "/trade-pro" }),
    },
  }
)
