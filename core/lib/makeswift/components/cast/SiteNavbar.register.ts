import { lazy } from "react"
import { Style, Number as NumberControl, TextInput, Image, List, Shape, Checkbox } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./SiteNavbar")),
  {
    type: "site-navbar",
    label: "Navigation / Navbar",
    props: {
      className: Style({ properties: [Style.Padding, Style.Margin] }),
      lineHeight: NumberControl({ label: 'Text Line Height', defaultValue: 1.6, min: 1, max: 3, step: 0.05 }),

      // Logo
      logoSrc: Image({ label: "Logo Image" }),
      logoHref: TextInput({ label: "Logo Link", defaultValue: "/" }),

      // CTA Button
      ctaLabel: TextInput({ label: "CTA Button Text", defaultValue: "LOGIN / SIGNUP" }),
      ctaHref: TextInput({ label: "CTA Button Link", defaultValue: "#" }),

      // Nav Links — add links and dropdowns
      navLinks: List({
        label: "Nav Links",
        type: Shape({
          type: {
            label: TextInput({ label: "Link Label", defaultValue: "Link" }),
            href: TextInput({ label: "Link URL", defaultValue: "#" }),
            dropdown: List({
              label: "Dropdown Items",
              type: Shape({
                type: {
                  label: TextInput({ label: "Item Label", defaultValue: "Item" }),
                  href: TextInput({ label: "Item URL", defaultValue: "#" }),
                }
              }),
              getItemLabel(item) { return item?.label || "Item" },
            }),
          }
        }),
        getItemLabel(item) { return item?.label || "Link" },
      }),

      landingPageMode: Checkbox({ label: '🚀 Landing Page Nav (hide links & search)', defaultValue: false }),
    },
  }
)
