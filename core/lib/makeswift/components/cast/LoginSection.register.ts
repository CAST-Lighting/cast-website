import { lazy } from "react"
import { Style, TextInput, TextArea, Color, Number } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

// @ts-expect-error Makeswift control types vs optional props
runtime.registerComponent(
  lazy(() => import("./LoginSection")),
  {
    type: "cast-login-section",
    label: "Forms / Login & Sign Up",
    props: {
      className: Style({ properties: [Style.Padding, Style.Margin] }),
      lightMode: Checkbox({ label: '💡 Light Mode', defaultValue: false }),

      // 🎨 Background
      bgColor: Color({ label: "🎨 Background — Color", defaultValue: "#0f1923" }),

      // ✏️ Content — Login
      loginHeading: TextInput({ label: "✏️ Content — Login Heading", defaultValue: "Welcome Back" }),
      loginSubheading: TextInput({ label: "✏️ Content — Login Subheading", defaultValue: "Sign in to your CAST Lighting account" }),

      // 🔘 Buttons — Login
      loginBtnLabel: TextInput({ label: "🔘 Buttons — Sign In Label", defaultValue: "Sign In" }),
      forgotPasswordLabel: TextInput({ label: "🔗 Links — Forgot Password Label", defaultValue: "Forgot Password?" }),
      forgotPasswordHref: TextInput({ label: "🔗 Links — Forgot Password URL", defaultValue: "/login/forgot-password" }),

      // ✏️ Content — Signup Sidebar
      dividerLabel: TextInput({ label: "✏️ Content — Right Side Label", defaultValue: "New to CAST Lighting?" }),

      // ✏️ Content — TradePro
      tradeProHeading: TextInput({ label: "✏️ Content — TradePro Heading", defaultValue: "Become a TradePro" }),
      tradeProDescription: TextArea({ label: "✏️ Content — TradePro Description", defaultValue: "Apply for exclusive contractor pricing, training resources, and dedicated support." }),
      tradeProBtnLabel: TextInput({ label: "🔘 Buttons — TradePro Button Label", defaultValue: "Apply for TradePro" }),
      tradeProBtnHref: TextInput({ label: "🔘 Buttons — TradePro Button URL", defaultValue: "/trade-pro" }),

      // ✏️ Content — Retail
      retailHeading: TextInput({ label: "✏️ Content — Retail Heading", defaultValue: "Create a Retail Account" }),
      retailDescription: TextArea({ label: "✏️ Content — Retail Description", defaultValue: "Carry CAST Lighting in your store. Access co-op marketing, protected territories, and full distributor support." }),
      retailBtnLabel: TextInput({ label: "🔘 Buttons — Retail Button Label", defaultValue: "Open a Retail Account" }),
      retailBtnHref: TextInput({ label: "🔘 Buttons — Retail Button URL", defaultValue: "/retail-signup" }) } }
)
