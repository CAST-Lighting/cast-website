import { lazy } from "react"
import { Style, Color, TextInput, TextArea, List, Shape } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./RetailSignup")),
  {
    type: "cast-retail-signup",
    label: "Forms / Retail Signup",
    props: {
      className: Style(),

      // ── Hero ────────────────────────────────────────────────
      badgeText: TextInput({ label: "Badge Text", defaultValue: "Account Application" }),
      heading: TextInput({ label: "Heading", defaultValue: "Retail Store Registration" }),
      description: TextArea({ label: "Description", defaultValue: "First-time users, register for an account below" }),

      // ── Sidebar ─────────────────────────────────────────────
      sidebarHeading: TextInput({ label: "Sidebar Heading", defaultValue: "Retail Store Account" }),
      sidebarBody: TextArea({
        label: "Sidebar Body",
        defaultValue:
          "The CAST Retail Store is a resource for repair parts, lamps and accessories to help our customers maintain their lighting systems.",
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
      submitLabel: TextInput({ label: "Submit Button Label", defaultValue: "Register & Continue to Checkout →" }),

      // ── Layout ──────────────────────────────────────────────
      bgColor: Color({ label: "Background Color", defaultValue: "#0f1923" }),
    },
  }
)
