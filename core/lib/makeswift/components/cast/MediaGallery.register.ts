import { lazy } from "react"
import { Style, TextInput, List, Shape, Image, Select, Color } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./MediaGallery")),
  {
    type: "site-media-gallery",
    label: "Product / Media Gallery",
    props: {
      className: Style({ properties: [Style.Padding, Style.Margin] }),
      sectionStyle: Style({ properties: [Style.Padding, Style.Margin] }),

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

      // 🌓 Theme
      mode: Select({ label: "🌓 Theme", options: [{ value: "dark", label: "Dark" }, { value: "light", label: "Light" }], defaultValue: "dark" }),

      // ✏️ Content
      heading: TextInput({ label: "✏️ Content — Heading", defaultValue: "Heading Goes Here" }),
      headingAccent: TextInput({ label: "✏️ Content — Heading Accent (gradient)", defaultValue: "" }),

      // 📸 Media — Items
      items: List({
        label: "📸 Media — Items",
        type: Shape({
          type: {
            type: Select({
              label: "Type",
              options: [
                { label: "Image", value: "image" },
                { label: "Video", value: "video" },
              ],
              defaultValue: "image" }),
            src: Image({ label: "Image / Video Thumbnail" }),
            caption: TextInput({ label: "Caption", defaultValue: "Media caption" }) } }),
        getItemLabel(item) { return item?.caption || "Media Item"; } }) } }
)
