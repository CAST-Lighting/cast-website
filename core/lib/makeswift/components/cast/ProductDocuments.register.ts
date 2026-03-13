import { lazy } from "react"
import { Style, TextInput, TextArea, List, Shape, Color } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./ProductDocuments")),
  {
    type: "site-product-documents",
    label: "Product / Documents",
    props: {
      className: Style(),
      sectionStyle: Style({ properties: [Style.Padding, Style.Margin] }),
      bgColor: Color({ label: "Background Color", defaultValue: "#2d353c" }),
      heading: TextInput({ label: "Heading", defaultValue: "Documents" }),
      documents: List({
        label: "Documents",
        type: Shape({
          type: {
            title: TextInput({ label: "Document Title", defaultValue: "Installation Guide" }),
            description: TextArea({ label: "Description", defaultValue: "Document description." }),
            fileUrl: TextInput({ label: "File URL", defaultValue: "#" }),
            fileType: TextInput({ label: "File Type (PDF, IES, DWG…)", defaultValue: "PDF" }),
          },
        }),
        getItemLabel(item) { return item?.title || "Document"; },
      }),
    },
  }
)
