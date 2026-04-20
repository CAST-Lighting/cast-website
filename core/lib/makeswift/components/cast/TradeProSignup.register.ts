import { lazy } from "react"
import { Style, Color, TextInput, TextArea, List, Shape } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./TradeProSignup")),
  {
    type: "cast-tradepro-signup",
    label: "Forms / TradePro Signup",
    props: {
      className: Style({ properties: [Style.Padding, Style.Margin] }),
      lightMode: Checkbox({ label: '💡 Light Mode', defaultValue: false }),

      // ✏️ Content — Hero
      badgeText: TextInput({ label: "✏️ Content — Badge Text", defaultValue: "Account Application" }),
      heading: TextInput({ label: "✏️ Content — Heading", defaultValue: "Landscape Account" }),
      description: TextArea({ label: "✏️ Content — Description", defaultValue: "Application for a Landscape Account" }),

      // ✏️ Content — Sidebar
      sidebarHeading: TextInput({ label: "✏️ Content — Sidebar Heading", defaultValue: "Landscape Account" }),
      sidebarBody: TextArea({
        label: "✏️ Content — Sidebar Body",
        defaultValue:
          "If you are a contractor or landscape architect without a Distributor or Specification Sales Agency in your area, you can apply to have your own CAST online ordering account." }),
      sidebarNote: TextArea({
        label: "✏️ Content — Sidebar Note",
        defaultValue:
          "Application may take between 2–5 business days to be approved and we may contact you with questions after an application has been submitted." }),

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
      submitLabel: TextInput({ label: "📋 Form — Submit Button Label", defaultValue: "Submit Application →" }),

      // 🎨 Background
      bgColor: Color({ label: "🎨 Background — Color", defaultValue: "#f5f5f5" }) } }
)
