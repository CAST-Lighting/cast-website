import { lazy } from "react"
import { Style, TextInput, TextArea, Color, Number } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./NotFoundHero")),
  {
    type: "cast-not-found-hero",
    label: "404 / Not Found Hero",
    props: {
      className: Style({ properties: [Style.Padding, Style.Margin] }),
      paddingTop: Number({ label: "📐 Layout — Padding Top (px)", defaultValue: 80 }),
      paddingBottom: Number({ label: "📐 Layout — Padding Bottom (px)", defaultValue: 80 }),

      // 🎨 Background
      bgColor: Color({ label: "🎨 Background — Color", defaultValue: "#0f1923" }),

      // ✏️ Content
      errorCode: TextInput({ label: "✏️ Content — Error Code", defaultValue: "404" }),
      heading: TextInput({ label: "✏️ Content — Heading", defaultValue: "Page Not" }),
      headingAccent: TextInput({ label: "✏️ Content — Heading Accent", defaultValue: "Found" }),
      body: TextArea({ label: "✏️ Content — Body Text", defaultValue: "The page you're looking for doesn't exist or has been moved. Try searching or head back to the homepage." }),
      searchPlaceholder: TextInput({ label: "✏️ Content — Search Placeholder", defaultValue: "Search products, guides, resources..." }),

      // 🔘 Buttons
      btnLabel: TextInput({ label: "🔘 Buttons — Button Label", defaultValue: "Back to Home" }),
      btnHref: TextInput({ label: "🔘 Buttons — Button URL", defaultValue: "/" }) } }
)
