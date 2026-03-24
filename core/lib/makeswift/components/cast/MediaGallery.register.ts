import { lazy } from "react"
import { Style, TextInput, List, Shape, Image, Select, Color, Number as NumberControl } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./MediaGallery")),
  {
    type: "site-media-gallery",
    label: "Product / Media Gallery",
    props: {
      className: Style(),
      sectionStyle: Style({ properties: [Style.Padding, Style.Margin] }),
      bgColor: Color({ label: "Background Color", defaultValue: "#2d353c" }),
      bgImage: Image({ label: 'Background Image' }),
      bgOpacity: NumberControl({ label: 'Background Opacity', defaultValue: 85, min: 0, max: 100, step: 1, suffix: '%' }),
      gradientFrom: Color({ label: 'Gradient From' }),
      gradientTo: Color({ label: 'Gradient To' }),
      gradientDirection: Select({
        label: 'Gradient Direction',
        options: [
          { value: 'to bottom', label: 'Top to Bottom' },
          { value: 'to top', label: 'Bottom to Top' },
          { value: 'to right', label: 'Left to Right' },
          { value: 'to left', label: 'Right to Left' },
          { value: '135deg', label: 'Diagonal' },
        ],
        defaultValue: 'to bottom',
      }),
      paddingTop: NumberControl({ label: 'Padding Top', defaultValue: 96, min: 0, max: 400, step: 8, suffix: 'px' }),
      paddingBottom: NumberControl({ label: 'Padding Bottom', defaultValue: 96, min: 0, max: 400, step: 8, suffix: 'px' }),
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
