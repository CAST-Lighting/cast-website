import { lazy } from "react"
import { Style, TextInput, TextArea, Color, Number } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./NotFoundHero")),
  {
    type: "cast-not-found-hero",
    label: "404 / Not Found Hero",
    props: {
      className: Style(),
      bgColor: Color({ label: "Background Color", defaultValue: "#0f1923" }),
      paddingTop: Number({ label: "Padding Top (px)", defaultValue: 80 }),
      paddingBottom: Number({ label: "Padding Bottom (px)", defaultValue: 80 }),
      errorCode: TextInput({ label: "Error Code", defaultValue: "404" }),
      heading: TextInput({ label: "Heading", defaultValue: "Page Not" }),
      headingAccent: TextInput({ label: "Heading Accent", defaultValue: "Found" }),
      body: TextArea({ label: "Body Text", defaultValue: "The page you're looking for doesn't exist or has been moved. Try searching or head back to the homepage." }),
      searchPlaceholder: TextInput({ label: "Search Placeholder", defaultValue: "Search products, guides, resources..." }),
      btnLabel: TextInput({ label: "Button Label", defaultValue: "Back to Home" }),
      btnHref: TextInput({ label: "Button URL", defaultValue: "/" }),
    },
  }
)
