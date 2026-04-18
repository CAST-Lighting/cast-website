import { lazy } from "react"
import { Style, TextInput, TextArea, Color, Number as NumberControl } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./ContractorFinder")),
  {
    type: "site-contractor-finder",
    label: "Forms / Contractor Finder",
    props: {
      className: Style(),
      paddingTop: NumberControl({ label: "📐 Layout — Padding Top", defaultValue: 72, min: 0, max: 400, step: 8, suffix: "px" }),
      paddingBottom: NumberControl({ label: "📐 Layout — Padding Bottom", defaultValue: 72, min: 0, max: 400, step: 8, suffix: "px" }),
      bgColor: Color({ label: "🎨 Background — Color", defaultValue: "#0f1923" }),

      // ✏️ Content
      overline: TextInput({ label: "✏️ Content — Overline", defaultValue: "Find A Professional" }),
      heading: TextInput({ label: "✏️ Content — Heading", defaultValue: "Get Connected With a CAST Installer" }),
      subheading: TextArea({ label: "✏️ Content — Subheading", defaultValue: "Tell us a little about your project and we\'ll personally match you with a CAST-certified landscape lighting contractor in your area." }),

      // ✅ Success state
      successHeading: TextInput({ label: "✅ Success — Heading", defaultValue: "Thank You!" }),
      successBody: TextArea({ label: "✅ Success — Body", defaultValue: "We\'ve received your request and will reach out within 1–2 business days with a contractor recommendation in your area." }),
    },
  }
)
