import { lazy } from "react"
import { Style, TextInput, List, Shape, Color, Number, Image } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./ReviewsCarousel")),
  {
    type: "site-reviews-carousel",
    label: "Sections / Reviews Carousel",
    props: {
      className: Style(),
      bgColor: Color({ label: "Background Color", defaultValue: "#141e27" }),
      paddingTop: Number({ label: "Padding Top (px)", defaultValue: 96 }),
      paddingBottom: Number({ label: "Padding Bottom (px)", defaultValue: 96 }),
      overline: TextInput({ label: "Overline", defaultValue: "Trusted By Contractors" }),
      heading: TextInput({ label: "Heading", defaultValue: "Hear From The" }),
      headingAccent: TextInput({ label: "Heading Accent (gold)", defaultValue: "Field" }),
      reviews: List({
        label: "Reviews",
        type: Shape({
          type: {
            name: TextInput({ label: "Reviewer Name", defaultValue: "John Smith" }),
            role: TextInput({ label: "Role / Title", defaultValue: "Landscape Contractor" }),
            location: TextInput({ label: "Location", defaultValue: "Austin, TX" }),
            rating: Number({ label: "Rating (1–5)", defaultValue: 5, min: 1, max: 5, step: 1 }),
            quote: TextInput({ label: "Review Text", defaultValue: "Incredible fixtures that last a lifetime." }),
            avatar: Image({ label: "Reviewer Photo" }),
          },
        }),
        getItemLabel(item) { return item?.name || "Review"; },
      }),
    },
  }
)
