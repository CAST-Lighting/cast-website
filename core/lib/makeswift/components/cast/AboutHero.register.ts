import { lazy } from "react"
import { Style, Color, Image, Number as NumberControl, TextInput, TextArea } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./AboutHero")),
  {
    type: "cast-about-hero",
    label: "Hero / About Hero",
    props: {
      className: Style(),

      // ── Background ──────────────────────────────────────────
      bgImage: Image({ label: "Background Image" }),
      bgColor: Color({ label: "Overlay Color", defaultValue: "#25262d" }),
      bgOpacity: NumberControl({ label: "Overlay Opacity", defaultValue: 60, min: 0, max: 100, step: 1, suffix: "%" }),

      // ── Content ─────────────────────────────────────────────
      badgeText: TextInput({ label: "Badge Text", defaultValue: "Our Story" }),
      heading: TextInput({ label: "Heading", defaultValue: "About CAST Lighting" }),
      headingAccent: TextInput({ label: "Heading Accent (gradient)", defaultValue: "" }),
      description: TextArea({ label: "Description", defaultValue: "Professional-grade landscape lighting trusted by contractors since 2001." }),

      // ── Buttons ─────────────────────────────────────────────
      btn1Label: TextInput({ label: "Button 1 Label", defaultValue: "Shop Products" }),
      btn1Href: TextInput({ label: "Button 1 Link", defaultValue: "/shop" }),
      btn2Label: TextInput({ label: "Button 2 Label", defaultValue: "Contact Us" }),
      btn2Href: TextInput({ label: "Button 2 Link", defaultValue: "/contact" }),

      // ── Layout ──────────────────────────────────────────────
      paddingTop: NumberControl({ label: "Padding Top", defaultValue: 165, min: 0, max: 400, step: 1, suffix: "px" }),
      paddingBottom: NumberControl({ label: "Padding Bottom", defaultValue: 64, min: 0, max: 400, step: 8, suffix: "px" }),
    },
  }
)
