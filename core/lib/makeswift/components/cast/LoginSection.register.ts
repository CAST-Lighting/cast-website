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
      className: Style(),
      bgColor: Color({ label: "Background Color", defaultValue: "#0f1923" }),
      paddingTop: Number({ label: "Padding Top (px)", defaultValue: 80 }),
      paddingBottom: Number({ label: "Padding Bottom (px)", defaultValue: 96 }),
      loginHeading: TextInput({ label: "Login Heading", defaultValue: "Welcome Back" }),
      loginSubheading: TextInput({ label: "Login Subheading", defaultValue: "Sign in to your CAST Lighting account" }),
      loginBtnLabel: TextInput({ label: "Sign In Button Label", defaultValue: "Sign In" }),
      forgotPasswordLabel: TextInput({ label: "Forgot Password Label", defaultValue: "Forgot Password?" }),
      forgotPasswordHref: TextInput({ label: "Forgot Password URL", defaultValue: "/login/forgot-password" }),
      dividerLabel: TextInput({ label: "Right Side Label", defaultValue: "New to CAST Lighting?" }),
      tradeProHeading: TextInput({ label: "TradePro Heading", defaultValue: "Become a TradePro" }),
      tradeProDescription: TextArea({ label: "TradePro Description", defaultValue: "Apply for exclusive contractor pricing, training resources, and dedicated support." }),
      tradeProBtnLabel: TextInput({ label: "TradePro Button Label", defaultValue: "Apply for TradePro" }),
      tradeProBtnHref: TextInput({ label: "TradePro Button URL", defaultValue: "/trade-pro" }),
      retailHeading: TextInput({ label: "Retail Heading", defaultValue: "Create a Retail Account" }),
      retailDescription: TextArea({ label: "Retail Description", defaultValue: "Carry CAST Lighting in your store. Access co-op marketing, protected territories, and full distributor support." }),
      retailBtnLabel: TextInput({ label: "Retail Button Label", defaultValue: "Open a Retail Account" }),
      retailBtnHref: TextInput({ label: "Retail Button URL", defaultValue: "/retail-signup" }),
    },
  }
)
