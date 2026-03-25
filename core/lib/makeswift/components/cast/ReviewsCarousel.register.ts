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
      overline: TextInput({ label: "Overline", defaultValue: "Section Label" }),
      heading: TextInput({ label: "Heading", defaultValue: "Heading Goes Here" }),
      headingAccent: TextInput({ label: "Heading Accent (gold)", defaultValue: "Accent" }),
      reviews: List({
        label: "Reviews",
        type: Shape({
          type: {
            name: TextInput({ label: "Reviewer Name", defaultValue: "Reviewer Name" }),
            role: TextInput({ label: "Role / Title", defaultValue: "Role / Title" }),
            location: TextInput({ label: "Location", defaultValue: "City, ST" }),
            rating: Number({ label: "Rating (1–5)", defaultValue: 5, min: 1, max: 5, step: 1 }),
            quote: TextInput({ label: "Review Text", defaultValue: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore." }),
            avatar: Image({ label: "Reviewer Photo" }),
          },
        }),
        getItemLabel(item) { return item?.name || "Review"; },
      }),
    },
  }
)
