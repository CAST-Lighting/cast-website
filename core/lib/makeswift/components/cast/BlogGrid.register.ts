import { lazy } from "react"
import { Style, Color, Number as NumberControl, TextInput, List, Shape } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./BlogGrid")),
  {
    type: "cast-blog-grid",
    label: "Sections / Blog Grid",
    props: {
      className: Style({ properties: [Style.Padding, Style.Margin] }),

      // 🎨 Background
      bgColor: Color({ label: "🎨 Background — Color", defaultValue: "#0f1923" }),

      // 📐 Layout
      postsPerPage: NumberControl({ label: "📐 Layout — Posts Per Page", defaultValue: 9, min: 3, max: 24, step: 3 }),

      // 📦 Items — Category Filter
      categoryTags: List({
        label: "📦 Items — Category Tags",
        type: Shape({
          type: {
            label: TextInput({ label: "Label", defaultValue: "Category" }),
            value: TextInput({ label: "Tag Value (exact match)", defaultValue: "" }),
          },
        }),
        getItemLabel(item) {
          return item?.label || "Tag"
        },
      }),

      // ✏️ Content
      emptyMessage: TextInput({ label: "✏️ Content — Empty State Message", defaultValue: "No posts found." }),
    },
  }
)
