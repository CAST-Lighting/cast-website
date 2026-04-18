import { lazy } from "react"
import { Style, Color, Image, Number as NumberControl, Select, TextInput } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./ProductGallery")),
  {
    type: "site-product-gallery",
    label: "Sections / Product Carousel",
    props: {
      className: Style(),

      // ✏️ Content
      sectionTitle: TextInput({ label: "✏️ Content — Section Title", defaultValue: "Our Favorite" }),
      sectionTitleAccent: TextInput({ label: "✏️ Content — Title Accent Word", defaultValue: "Picks" }),
      sectionDescription: TextInput({ label: "✏️ Content — Description", defaultValue: "Explore our most popular landscape lighting fixtures trusted by contractors nationwide." }),

      // 🔗 Links
      viewAllLabel: TextInput({ label: "🔗 Links — View All Label", defaultValue: "View All" }),
      viewAllHref: TextInput({ label: "🔗 Links — View All Link", defaultValue: "/shop" }),

      // 🎨 Background
      bgImage: Image({ label: "🎨 Background — Image" }),
      bgColor: Color({ label: "🎨 Background — Color" }),
      bgOpacity: NumberControl({ label: "🎨 Background — Opacity", defaultValue: 85, min: 0, max: 100, step: 1, suffix: "%" }),
      gradientFrom: Color({ label: "🎨 Background — Gradient From" }),
      gradientTo: Color({ label: "🎨 Background — Gradient To" }),
      gradientDirection: Select({
        label: "🎨 Background — Gradient Direction",
        options: [
          { value: "to bottom", label: "↓ Top to Bottom" },
          { value: "to top", label: "↑ Bottom to Top" },
          { value: "to right", label: "→ Left to Right" },
          { value: "to left", label: "← Right to Left" },
          { value: "135deg", label: "↘ Diagonal ↘" },
          { value: "225deg", label: "↙ Diagonal ↙" },
        ],
        defaultValue: "to bottom",
      }),

    },
  }
)
