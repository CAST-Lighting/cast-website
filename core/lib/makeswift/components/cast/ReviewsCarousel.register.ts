import { lazy } from "react"
import { Style, TextInput, List, Shape, Color } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./ReviewsCarousel")),
  {
    type: "site-reviews-carousel",
    label: "Site / Reviews Carousel",
    props: {
      className: Style(),
      sectionStyle: Style({ properties: [Style.Padding, Style.Margin] }),
      bgColor: Color({ label: "Background Color", defaultValue: "#25262d" }),
      overline: TextInput({ label: "Overline", defaultValue: "What Our Customers Say" }),
      heading: TextInput({ label: "Heading", defaultValue: "Trusted By Thousands Of Professionals" }),
      reviews: List({
        label: "Reviews",
        type: Shape({
          type: {
            author: TextInput({ label: "Author Name", defaultValue: "John Smith" }),
            role: TextInput({ label: "Role / Title", defaultValue: "Landscape Contractor" }),
            rating: TextInput({ label: "Rating (1–5)", defaultValue: "5" }),
            text: TextInput({ label: "Review Text", defaultValue: "Incredible fixtures." }),
          },
        }),
        getItemLabel(item) { return item?.author || "Review"; },
      }),
    },
  }
)
