import { lazy } from "react"
import { Style, Color, Number as NumberControl, TextInput, List, Shape } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./BlogGrid")),
  {
    type: "cast-blog-grid",
    label: "Sections / Blog Grid",
    props: {
      className: Style(),

      // ── Layout ──────────────────────────────────────────────
      bgColor: Color({ label: "Background Color", defaultValue: "#0f1923" }),
      paddingTop: NumberControl({ label: "Padding Top", defaultValue: 72, min: 0, max: 400, step: 8, suffix: "px" }),
      paddingBottom: NumberControl({ label: "Padding Bottom", defaultValue: 72, min: 0, max: 400, step: 8, suffix: "px" }),

      // ── Pagination ───────────────────────────────────────────
      postsPerPage: NumberControl({ label: "Posts Per Page", defaultValue: 9, min: 3, max: 24, step: 3 }),

      // ── Category Filter ──────────────────────────────────────
      categoryTags: List({
        label: "Category Tags",
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

      // ── Empty State ──────────────────────────────────────────
      emptyMessage: TextInput({ label: "Empty State Message", defaultValue: "No posts found." }),
    },
  }
)
