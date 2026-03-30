import { lazy } from "react"
import { Style, Color, TextInput, TextArea, List, Shape } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./TradeProSignup")),
  {
    type: "cast-tradepro-signup",
    label: "Forms / TradePro Signup",
    props: {
      className: Style(),

      // ── Hero ────────────────────────────────────────────────
      badgeText: TextInput({ label: "Badge Text", defaultValue: "Account Application" }),
      heading: TextInput({ label: "Heading", defaultValue: "Trade Professional Registration" }),
      description: TextArea({ label: "Description", defaultValue: "Application for a Landscape Account" }),

      // ── Sidebar ─────────────────────────────────────────────
      sidebarHeading: TextInput({ label: "Sidebar Heading", defaultValue: "Landscape Account" }),
      sidebarBody: TextArea({
        label: "Sidebar Body",
        defaultValue:
          "If you are a contractor or landscape architect without a Distributor or Specification Sales Agency in your area, you can apply to have your own CAST online ordering account.",
      }),
      sidebarNote: TextArea({
        label: "Sidebar Note",
        defaultValue:
          "Application may take between 2–5 business days to be approved and we may contact you with questions after an application has been submitted.",
      }),
      benefits: List({
        label: "Benefits / Highlights",
        type: Shape({
          type: {
            text: TextInput({ label: "Benefit Text", defaultValue: "Benefit goes here." }),
          },
        }),
        getItemLabel(item) {
          return item?.text || "Benefit"
        },
      }),
      loginHref: TextInput({ label: "Login Page Link", defaultValue: "/login" }),

      // ── Form ─────────────────────────────────────────────────
      submitLabel: TextInput({ label: "Submit Button Label", defaultValue: "Submit Application →" }),

      // ── Layout ──────────────────────────────────────────────
      bgColor: Color({ label: "Background Color", defaultValue: "#0f1923" }),
    },
  }
)
