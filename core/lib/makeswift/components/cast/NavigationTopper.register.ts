import { lazy } from "react"
import { Style, TextInput, Color, Checkbox } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./NavigationTopper")),
  {
    type: "site-navigation-topper",
    label: "Site / Navigation Topper",
    props: {
      className: Style(),
      sectionStyle: Style({ properties: [Style.Padding, Style.Margin] }),
      bgColor: Color({ label: "Background Color", defaultValue: "#003344" }),
      leftLink1Text: TextInput({ label: "Left Link 1 Text", defaultValue: "EASY CONTRACTOR PRICING" }),
      leftLink1Href: TextInput({ label: "Left Link 1 URL", defaultValue: "/contractor-pricing" }),
      leftLink2Text: TextInput({ label: "Left Link 2 Text", defaultValue: "BECOME A TRADE PRO" }),
      leftLink2Href: TextInput({ label: "Left Link 2 URL", defaultValue: "/trade-pro" }),
      leftLink2IsButton: Checkbox({ label: "Style Link 2 as Button", defaultValue: false }),
      leftLink2ButtonBgColor: Color({ label: "Link 2 Button BG Color", defaultValue: "#ffffff" }),
      leftLink2ButtonTextColor: Color({ label: "Link 2 Button Text Color", defaultValue: "#004960" }),
      phone: TextInput({ label: "Phone Number", defaultValue: "(973) 423-2303" }),
      rightLinkText: TextInput({ label: "Right Link Text", defaultValue: "Contact Us" }),
      rightLinkHref: TextInput({ label: "Right Link URL", defaultValue: "/contact" }),
    },
  }
)
