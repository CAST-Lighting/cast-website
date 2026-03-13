import { lazy } from "react"
import { Style, TextInput, Image, Color } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./SignupHero")),
  {
    type: "site-signup-hero",
    label: "Site / Signup Hero",
    props: {
      className: Style(),
      sectionStyle: Style({ properties: [Style.Padding, Style.Margin] }),
      bgColor: Color({ label: "Background Color", defaultValue: "#25262d" }),
      image: Image({ label: "Hero Background Image" }),
      overline: TextInput({ label: "Overline", defaultValue: "Apply Today" }),
      heading: TextInput({ label: "Heading", defaultValue: "Join The CAST TradePro Program" }),
      subheading: TextInput({ label: "Subheading", defaultValue: "CAST Lighting's TradePro program gives professional landscape contractors access to exclusive pricing." }),
      formHeading: TextInput({ label: "Form Heading", defaultValue: "Start Your Application" }),
      submitButtonText: TextInput({ label: "Submit Button Text", defaultValue: "Submit Application" }),
    },
  }
)
