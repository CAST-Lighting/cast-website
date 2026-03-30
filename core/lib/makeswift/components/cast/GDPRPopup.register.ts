import { lazy } from "react"
import { Style, TextInput, TextArea, Color, Checkbox } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./GDPRPopup")),
  {
    type: "cast-gdpr-popup",
    label: "Utilities / GDPR Cookie Popup",
    props: {
      className: Style(),

      // ✏️ Content
      heading: TextInput({ label: "✏️ Content — Heading", defaultValue: "We Value Your Privacy" }),
      body: TextArea({ label: "✏️ Content — Body Text", defaultValue: "We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. By clicking \"Accept All\", you consent to our use of cookies." }),

      // 🔘 Buttons
      acceptLabel: TextInput({ label: "🔘 Buttons — Accept Label", defaultValue: "Accept All" }),
      declineLabel: TextInput({ label: "🔘 Buttons — Decline Label", defaultValue: "Decline" }),

      // 🔗 Links
      privacyLabel: TextInput({ label: "🔗 Links — Privacy Link Label", defaultValue: "Privacy Policy" }),
      privacyHref: TextInput({ label: "🔗 Links — Privacy Link URL", defaultValue: "/privacy" }),

      // 🎨 Background
      bgColor: Color({ label: "🎨 Background — Card Color", defaultValue: "#2d353c" }),
    },
  }
)
