import { lazy } from "react"
import { Style, TextInput, TextArea, Color, Checkbox, Number as NumberControl} from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./RichTextSection")),
  {
    type: "cast-rich-text",
    label: "Sections / Rich Text",
    props: {
      className: Style({ properties: [Style.Padding, Style.Margin] }),

      // 🎨 Background
      bgColor: Color({ label: "🎨 Background — Color", defaultValue: "#f5f5f5" }),

      // ✏️ Content
      heading: TextInput({ label: "✏️ Content — Heading", defaultValue: "Terms & Conditions" }),
      headingAccent: TextInput({ label: "✏️ Content — Heading Accent", defaultValue: "" }),
      lastUpdated: TextInput({ label: "✏️ Content — Last Updated Date", defaultValue: "January 1, 2026" }),
      content: TextArea({ label: "✏️ Content — Content (paragraphs separated by blank lines)", defaultValue: "Enter your document content here. Separate paragraphs with a blank line.\n\nEach paragraph will be rendered separately. You can include numbered sections like:\n\n1. SECTION TITLE\n\nFollowed by body text for that section." }),

      // 🔗 Links — PDF
      pdfLabel: TextInput({ label: "🔗 Links — PDF Button Label", defaultValue: "Download PDF Version" }),
      pdfUrl: TextInput({ label: "🔗 Links — PDF URL", defaultValue: "" }),
      showPdf: Checkbox({ label: "🔗 Links — Show PDF Download Button", defaultValue: false }) } }
)
