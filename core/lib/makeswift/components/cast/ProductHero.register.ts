import { lazy } from "react"
import {
  Style,
  TextInput,
  TextArea,
  Image,
  Color,
  Checkbox,
  Number as NumberControl,
  Select,
} from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./ProductHero")),
  {
    type: "cast-cms-product-content",
    label: "CMS Content / Product Details",
    props: {
      className: Style(),

      // ─── 📐 Layout ────────────────────────────────────────────────

      // ─── 🎨 Background ────────────────────────────────────────────
      bgColor: Color({
        label: "🎨 Background — Color",
        defaultValue: "#F5F5F5",
      }),
      bgImage: Image({ label: "🎨 Background — Image" }),
      bgOpacity: NumberControl({
        label: "🎨 Background — Opacity (image only)",
        defaultValue: 100,
        min: 0,
        max: 100,
        step: 1,
        suffix: "%",
      }),
      gradientFrom: Color({ label: "🎨 Background — Gradient From" }),
      gradientTo: Color({ label: "🎨 Background — Gradient To" }),
      gradientDirection: Select({
        label: "🎨 Background — Gradient Direction",
        options: [
          { value: "to bottom", label: "Top → Bottom" },
          { value: "to top", label: "Bottom → Top" },
          { value: "to right", label: "Left → Right" },
          { value: "to left", label: "Right → Left" },
          { value: "135deg", label: "Diagonal" },
        ],
        defaultValue: "to bottom",
      }),

      // ─── 🛒 Commerce ──────────────────────────────────────────────
      tradeProOnly: Checkbox({
        label: "🛒 Commerce — TradePro Only badge",
        defaultValue: false,
      }),
      hidePrice: Checkbox({
        label: "🛒 Commerce — Hide Price",
        defaultValue: false,
      }),

      // ─── ⚠️ Override — Editor preview only ───────────────────────
      // These values are only used in Makeswift editor when no BC product
      // is loaded. On the live site, BigCommerce data takes over entirely.
      productName: TextInput({
        label: "⚠️ Override — Product Name",
        defaultValue: "Classic Brass Path Light 5.5W",
      }),
      modelNumber: TextInput({
        label: "⚠️ Override — Model Number",
        defaultValue: "BPL-55-BR",
      }),
      shortDescription: TextArea({
        label: "⚠️ Override — Short Description",
        defaultValue: "A short product description goes here that is no more than 160 characters to ensure SEO compliance and clarity for the customer.",
      }),
      price: TextInput({
        label: "⚠️ Override — Price",
        defaultValue: "$89.99",
      }),
      inStock: Checkbox({
        label: "⚠️ Override — In Stock",
        defaultValue: true,
      }),
      rating: NumberControl({
        label: "⚠️ Override — Star Rating (1–5)",
        defaultValue: 4.7,
        min: 0,
        max: 5,
        step: 0.1,
      }),
      reviewCount: NumberControl({
        label: "⚠️ Override — Review Count",
        defaultValue: 520,
        min: 0,
        step: 1,
      }),
    },
  }
)
