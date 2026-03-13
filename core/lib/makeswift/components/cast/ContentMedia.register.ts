import { lazy } from "react"
import { Style, TextInput, TextArea, Image, Select, Color, Number } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./ContentMedia")),
  {
    type: "site-content-media",
    label: "Site / Content + Media",
    props: {
      className: Style(),
      sectionStyle: Style({ properties: [Style.Padding, Style.Margin] }),
      bgImage: Image({ label: "Background Image" }),
      bgColor: Color({ label: "Background Color", defaultValue: "#25262d" }),
      overlayColor: Color({ label: "Overlay Color" }),
      overlayOpacity: Number({ label: "Overlay Opacity %", defaultValue: 0, min: 0, max: 100, step: 5 }),
      mediaType: Select({
        label: "Media Type",
        options: [
          { label: "Video", value: "video" },
          { label: "Image", value: "image" },
        ],
        defaultValue: "video",
      }),
      mediaSrc: Image({ label: "Image / Video Thumbnail" }),
      videoUrl: TextInput({ label: "Video Embed URL", defaultValue: "https://www.youtube.com/embed/dQw4w9WgXcQ" }),
      mediaPosition: Select({
        label: "Media Position",
        options: [
          { label: "Right", value: "right" },
          { label: "Left", value: "left" },
        ],
        defaultValue: "right",
      }),
      mediaStyle: Style({ properties: [Style.Margin] }),
      heading: TextInput({ label: "Heading", defaultValue: "Unmatched Quality, Technology & Durability" }),
      description: TextArea({
        label: "Description",
        defaultValue: "Every CAST fixture is made from solid brass and copper alloys that will never rust or corrode.",
      }),
      primaryButtonText: TextInput({ label: "Primary Button Text", defaultValue: "Shop Products" }),
      primaryButtonHref: TextInput({ label: "Primary Button URL", defaultValue: "#" }),
      secondaryButtonText: TextInput({ label: "Secondary Button Text", defaultValue: "Learn More" }),
      secondaryButtonHref: TextInput({ label: "Secondary Button URL", defaultValue: "#" }),
    },
  }
)
