import { lazy } from "react"
import { Style, TextInput, TextArea, Color, Number as NumberControl, Checkbox } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./RichTextSection")),
  {
    type: "cast-rich-text",
    label: "Sections / Rich Text",
    props: {
      className: Style(),
      bgColor: Color({ label: "Background Color", defaultValue: "#0f1923" }),
      paddingTop: NumberControl({ label: "Padding Top (px)", defaultValue: 64, min: 0, max: 400, step: 8 }),
      paddingBottom: NumberControl({ label: "Padding Bottom (px)", defaultValue: 64, min: 0, max: 400, step: 8 }),
      heading: TextInput({ label: "Heading", defaultValue: "Terms & Conditions" }),
      headingAccent: TextInput({ label: "Heading Accent", defaultValue: "" }),
      lastUpdated: TextInput({ label: "Last Updated Date", defaultValue: "January 1, 2026" }),
      content: TextArea({ label: "Content (paragraphs separated by blank lines)", defaultValue: "Enter your document content here. Separate paragraphs with a blank line.\n\nEach paragraph will be rendered separately. You can include numbered sections like:\n\n1. SECTION TITLE\n\nFollowed by body text for that section." }),
      pdfLabel: TextInput({ label: "PDF Button Label", defaultValue: "Download PDF Version" }),
      pdfUrl: TextInput({ label: "PDF URL", defaultValue: "" }),
      showPdf: Checkbox({ label: "Show PDF Download Button", defaultValue: false }),
    },
  }
)
