import { lazy } from "react"
import { Style, TextInput, List, Shape, Color, Number, Image, Select, Checkbox} from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./ReviewsCarousel")),
  {
    type: "site-reviews-carousel",
    label: "Sections / Reviews Carousel",
    props: {
      className: Style({ properties: [Style.Padding, Style.Margin] }),
      lightMode: Checkbox({ label: '💡 Light Mode', defaultValue: false }),

      // 🌓 Theme
      mode: Select({ label: "🌓 Theme", options: [{ value: "dark", label: "Dark" }, { value: "light", label: "Light" }], defaultValue: "dark" }),

      // 🎨 Background
      bgColor: Color({ label: "🎨 Background — Color", defaultValue: "#141e27" }),

      // ✏️ Content
      overline: TextInput({ label: "✏️ Content — Label over Title", defaultValue: "Testimonials" }),
      heading: TextInput({ label: "✏️ Content — Heading", defaultValue: "Our Raving Reviews" }),
      headingAccent: TextInput({ label: "✏️ Content — Heading Accent (gold)", defaultValue: "Accent" }),

      // 🃏 Cards — Reviews
      reviews: List({
        label: "🃏 Cards — Reviews",
        type: Shape({
          type: {
            name: TextInput({ label: "Reviewer Name", defaultValue: "Reviewer Name" }),
            role: TextInput({ label: "Role / Title", defaultValue: "Role / Title" }),
            location: TextInput({ label: "Location", defaultValue: "City, ST" }),
            rating: Number({ label: "Rating (1–5)", defaultValue: 5, min: 1, max: 5, step: 1 }),
            quote: TextInput({ label: "Review Text", defaultValue: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore." }),
            avatar: Image({ label: "Reviewer Photo" }) }