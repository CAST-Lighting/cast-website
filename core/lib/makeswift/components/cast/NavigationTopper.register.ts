import { lazy } from "react"
import { Style, Color, TextInput, Checkbox } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./NavigationTopper")),
  {
    type: "cast-navigation-topper",
    label: "Navigation / Top Bar",
    props: {
      className: Style(),

      // 🎨 Background
      bgColor: Color({ label: "🎨 Background — Color" }),

      // 🔗 Links
      leftLink1Text: TextInput({ label: "🔗 Links — Left Link 1 Text", defaultValue: "EASY CONTRACTOR PRICING" }),
      leftLink1Href: TextInput({ label: "🔗 Links — Left Link 1 URL", defaultValue: "/trade-pro" }),
      leftLink2Text: TextInput({ label: "🔗 Links — Left Link 2 Text", defaultValue: "BECOME A TRADE PRO" }),
      leftLink2Href: TextInput({ label: "🔗 Links — Left Link 2 URL", defaultValue: "/trade-pro" }),
      phone: TextInput({ label: "✏️ Content — Phone Number", defaultValue: "(973) 423-2303" }),
      rightLinkText: TextInput({ label: "🔗 Links — Right Link Text", defaultValue: "Contact Us" }),
      rightLinkHref: TextInput({ label: "🔗 Links — Right Link URL", defaultValue: "/contact" }),
    },
  }
)
