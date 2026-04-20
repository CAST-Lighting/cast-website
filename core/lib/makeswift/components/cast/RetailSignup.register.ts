import { lazy } from "react"
import { Style, Color, TextInput, TextArea, List, Shape } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./RetailSignup")),
  {
    type: "cast-retail-signup",
    label: "Forms / Retail Signup",
    props: {
      className: Style({ properties: [Style.Padding, Style.Margin] }),
      lightMode: Checkbox({ label: '💡 Light Mode', defaultValue: false }),

      // ✏️ Content — Hero
      badgeText: TextInput({ label: "✏️ Content — Badge Text", defaultValue: "Account Application" }),
      heading: TextInput({ label: "✏️ Content — Heading", defaultValue: "Retail Store Account" }),
      description: TextArea({ label: "✏️ Content — Description", defaultValue: "First-time users, register for an account below" }),

      // ✏️ Content — Sidebar
      sidebarHeading: TextInput({ label: "✏️ Content — Sidebar Heading", defaultValue: "Retail Store Account" }),
      sidebarBody: TextArea({
        label: "✏️ Content — Sidebar Body",
        defaultValue:
          "The CAST Retail Store is a resource for repair parts, lamps and accessories to help our customers maintain their lighting systems." }),

      // 📦 Items — Benefits
      benefits: List({
        label: "📦 Items — Benefits",
        type: Shape({
          type: {
            text: TextInput({ label: "Benefit Text", defaultValue: "Benefit goes here." }) } }),
        getItemLabel(item) {
          return item?.text || "Benefit"
        } }),

      // 🔗 Links
      loginHref: TextInput({ label: "🔗 Links — Login Page Link", defaultValue: "/login" }),

      // 📋 Form
      submitLabel: TextInput({ label: "📋 Form — Submit Button Label", defaultValue: "Register & Continue to Checkout →" }),

      // 🎨 Background
      bgColor: Color({ label: "🎨 Background — Color", defaultValue: "#f5f5f5" }) } }
)
