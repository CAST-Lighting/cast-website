import { lazy } from "react"
import { Style, TextInput, TextArea, List, Shape, Color, Image, Select, Number as NumberControl, Checkbox} from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./ProductDocuments")),
  {
    type: "site-product-documents",
    label: "Product / Documents",
    props: {
      className: Style({ properties: [Style.Padding, Style.Margin] }),
      lightMode: Checkbox({ label: '💡 Light Mode', defaultValue: false }),

      // 🌓 Theme
      mode: Select({ label: "🌓 Theme", options: [{ value: "dark", label: "Dark" }, { value: "light", label: "Light" }], defaultValue: "dark" }),

      // 🎨 Background
      bgColor: Color({ label: "🎨 Background — Color", defaultValue: "#2d353c" }),
      bgImage: Image({ label: "🎨 Background — Image" }),
      bgOpacity: NumberControl({ label: "🎨 Background — Opacity", defaultValue: 85, min: 0, max: 100, step: 1, suffix: "%" }),
      gradientFrom: Color({ label: "🎨 Background — Gradient From" }),
      gradientTo: Color({ label: "🎨 Background — Gradient To" }),
      gradientDirection: Select({
        label: "🎨 Background — Gradient Direction",
        options: [
          { value: "to bottom", label: "Top to Bottom" },
          { value: "to top", label: "Bottom to Top" },
          { value: "to right", label: "Left to Right" },
          { value: "to left", label: "Right to Left" },
          { value: "135deg", label: "Diagonal" },
        ],
        defaultValue: "to bottom" }),

      // ✏️ Content
      heading: TextInput({ label: "✏️ Content — Heading", defaultValue: "Documents" }),
      headingAccent: TextInput({ label: "✏️ Content — Heading Accent (gradient)", defaultValue: "" }),

      // 📦 Items — Documents
      documents: List({
        label: "📦 Items — Documents",
        type: Shape({
          type: {
            title: TextInput({ label: "Document Title", defaultValue: "Document Title" }),
            description: TextArea({ label: "Description", defaultValue: "Document description." }),
            fileUrl: TextInput({ label: "File URL", defaultValue: "#" }),
            fileType: TextInput({ label: "File Type (PDF, IES, DWG…)", defaultValue: "PDF" }) } }),
        getItemLabel(item) { return item?.title || "Document"; } }) } }
)
