import { lazy } from "react"
import { Style, Color, TextInput, List, Shape } from "@makeswift/runtime/controls"
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
      leftLinks: List({
        label: "🔗 Left Links",
        type: Shape({
          type: {
            label: TextInput({ label: "Label", defaultValue: "Link" }),
            href: TextInput({ label: "URL", defaultValue: "/trade-pro" }),
          },
        }),
        getItemLabel: (item) => item?.label || "Link",
        defaultValue: [
          { label: "EASY CONTRACTOR PRICING", href: "/trade-pro" },
          { label: "BECOME A TRADE PRO", href: "/trade-pro" },
        ],
      }),

      rightLinks: List({
        label: "🔗 Right Links",
        type: Shape({
          type: {
            label: TextInput({ label: "Label", defaultValue: "Link" }),
            href: TextInput({ label: "URL", defaultValue: "/contact" }),
          },
        }),
        getItemLabel: (item) => item?.label || "Link",
        defaultValue: [{ label: "Contact Us", href: "/contact" }],
      }),

      phoneNumber: TextInput({ label: "📞 Phone Number", defaultValue: "(973) 423-2303" }),
    },
  }
)
