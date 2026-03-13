import { lazy } from "react"
import { Style, TextInput, Color } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./DistributorFinder")),
  {
    type: "site-distributor-finder",
    label: "Site / Distributor Finder",
    props: {
      className: Style(),
      sectionStyle: Style({ properties: [Style.Padding, Style.Margin] }),
      bgColor: Color({ label: "Background Color", defaultValue: "#25262d" }),
      overline: TextInput({ label: "Overline", defaultValue: "Find Or Become A Distributor" }),
      heading: TextInput({ label: "Heading", defaultValue: "CAST Distribution Partners" }),
      subheading: TextInput({ label: "Subheading", defaultValue: "CAST Lighting works with a select network of professional landscape supply distributors." }),
      formHeading: TextInput({ label: "Form Heading", defaultValue: "Apply To Become A CAST Distributor" }),
    },
  }
)
