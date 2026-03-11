import { lazy } from "react"
import { Style, TextInput, TextArea, Color } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./ReadyCTA")),
  {
    type: "site-ready-cta",
    label: "Site / Ready CTA",
    props: {
      className: Style(),
      sectionStyle: Style({ properties: [Style.Padding, Style.Margin] }),
      bgColor: Color({ label: "Background Color", defaultValue: "#004960" }),
      textColor: Color({ label: "Text Color", defaultValue: "#ffffff" }),
      overline: TextInput({ label: "Overline", defaultValue: "Get Started" }),
      heading: TextInput({ label: "Heading", defaultValue: "Ready To Become A TradePro?" }),
      subheading: TextArea({ label: "Subheading", defaultValue: "Join thousands of landscape professionals who trust CAST Lighting on every project." }),
      primaryButtonText: TextInput({ label: "Primary Button Text", defaultValue: "Apply For TradePro" }),
      primaryButtonHref: TextInput({ label: "Primary Button URL", defaultValue: "/trade-pro-signup" }),
      secondaryButtonText: TextInput({ label: "Secondary Button Text", defaultValue: "Learn More" }),
      secondaryButtonHref: TextInput({ label: "Secondary Button URL", defaultValue: "#" }),
    },
  }
)
