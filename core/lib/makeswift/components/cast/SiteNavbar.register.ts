import { lazy } from "react"
import { Style, TextInput, Checkbox, Color, Image } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./SiteNavbar")),
  {
    type: "site-navbar",
    label: "Site / Navbar",
    props: {
      className: Style(),
      transparentMode: Checkbox({ label: "Transparent Mode", defaultValue: true }),
      bgColor: Color({ label: "Background Color (Solid Mode)", defaultValue: "#005c7a" }),
      logoImage: Image({ label: "Logo Image" }),
      logoText: TextInput({ label: "Logo Text (Fallback)", defaultValue: "CAST LIGHTING" }),
      ctaText: TextInput({ label: "CTA Button Text", defaultValue: "LOGIN / SIGNUP" }),
      ctaHref: TextInput({ label: "CTA Button URL", defaultValue: "/account" }),
    },
  }
)
