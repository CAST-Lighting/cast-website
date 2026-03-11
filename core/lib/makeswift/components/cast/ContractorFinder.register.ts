import { lazy } from "react"
import { Style, TextInput, Color } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./ContractorFinder")),
  {
    type: "site-contractor-finder",
    label: "Site / Contractor Finder",
    props: {
      className: Style(),
      sectionStyle: Style({ properties: [Style.Padding, Style.Margin] }),
      bgColor: Color({ label: "Background Color", defaultValue: "#f6f7f8" }),
      overline: TextInput({ label: "Overline", defaultValue: "Find A Professional" }),
      heading: TextInput({ label: "Heading", defaultValue: "Find A CAST Installer Near You" }),
      subheading: TextInput({ label: "Subheading", defaultValue: "Connect with CAST-certified landscape lighting contractors in your area." }),
    },
  }
)
