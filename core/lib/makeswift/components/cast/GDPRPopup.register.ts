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
      heading: TextInput({ label: "Heading", defaultValue: "We Value Your Privacy" }),
      body: TextArea({ label: "Body Text", defaultValue: "We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. By clicking \"Accept All\", you consent to our use of cookies." }),
      acceptLabel: TextInput({ label: "Accept Button Label", defaultValue: "Accept All" }),
      declineLabel: TextInput({ label: "Decline Button Label", defaultValue: "Decline" }),
      privacyLabel: TextInput({ label: "Privacy Link Label", defaultValue: "Privacy Policy" }),
      privacyHref: TextInput({ label: "Privacy Link URL", defaultValue: "/privacy" }),
      bgColor: Color({ label: "Card Background Color", defaultValue: "#2d353c" }),
    },
  }
)
