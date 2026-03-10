import { lazy } from "react"
import { List, Shape, TextInput, Image, Color, Number, Style } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./SiteFooter")),
  {
    type: "site-footer",
    label: "Site / Footer",
    props: {
      logoText: TextInput({ label: "Logo Text", defaultValue: "CAST LIGHTING" }),
      logoImage: Image({ label: "Logo Image" }),
      bgImage: Image({ label: "Background Image" }),
      bgColor: Color({ label: "Background Color", defaultValue: "#111827" }),
      overlayColor: Color({ label: "Overlay Color" }),
      overlayOpacity: Number({ label: "Overlay Opacity %", defaultValue: 0, min: 0, max: 100, step: 5 }),
      phone: TextInput({ label: "Phone", defaultValue: "(973) 423-2303" }),
      email: TextInput({ label: "Email", defaultValue: "info@castlighting.com" }),
      address: TextInput({ label: "Address", defaultValue: "Serving Contractors Nationwide" }),
      linkGroups: List({
        label: "Link Groups",
        type: Shape({
          type: {
            title: TextInput({ label: "Group Title", defaultValue: "Links" }),
            links: List({
              label: "Links",
              type: Shape({
                type: {
                  text: TextInput({ label: "Text", defaultValue: "Link" }),
                  url: TextInput({ label: "URL", defaultValue: "/" }),
                },
              }),
              getItemLabel: (item) => item?.text || "Link",
            }),
          },
        }),
        getItemLabel: (item) => item?.title || "Group",
      }),
      facebookUrl: TextInput({ label: "Facebook URL", defaultValue: "#" }),
      instagramUrl: TextInput({ label: "Instagram URL", defaultValue: "#" }),
      linkedinUrl: TextInput({ label: "LinkedIn URL", defaultValue: "#" }),
      youtubeUrl: TextInput({ label: "YouTube URL", defaultValue: "#" }),
      copyrightText: TextInput({ label: "Copyright Text", defaultValue: "\u00a9 2026 CAST Lighting. All rights reserved." }),
    },
  }
)
