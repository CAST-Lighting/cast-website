import { lazy } from "react"
import { Style, TextInput, List, Shape, Image, Select, Color } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./MediaGallery")),
  {
    type: "site-media-gallery",
    label: "Product / Media Gallery",
    props: {
      className: Style(),
      sectionStyle: Style({ properties: [Style.Padding, Style.Margin] }),
      bgColor: Color({ label: "Background Color", defaultValue: "#f6f7f8" }),
      heading: TextInput({ label: "Heading", defaultValue: "Photos & Videos" }),
      items: List({
        label: "Media Items",
        type: Shape({
          type: {
            type: Select({
              label: "Type",
              options: [
                { label: "Image", value: "image" },
                { label: "Video", value: "video" },
              ],
              defaultValue: "image",
            }),
            src: Image({ label: "Image / Video Thumbnail" }),
            caption: TextInput({ label: "Caption", defaultValue: "Image caption" }),
          },
        }),
        getItemLabel(item) { return item?.caption || "Media Item"; },
      }),
    },
  }
)
