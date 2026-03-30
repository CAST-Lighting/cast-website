import { lazy } from "react"
import { Style, Color, Image, Number as NumberControl, Select, TextInput, List, Shape } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./SiteFooter")),
  {
    type: "site-footer",
    label: "Footer / Site Footer",
    props: {
      className: Style(),
      bgImage: Image({ label: 'Background Image' }),
      bgColor: Color({ label: 'Background Color' }),
      bgOpacity: NumberControl({ label: 'Background Opacity', defaultValue: 85, min: 0, max: 100, step: 1, suffix: '%' }),
      gradientFrom: Color({ label: 'Gradient From' }),
      gradientTo: Color({ label: 'Gradient To' }),
      gradientDirection: Select({
        label: 'Gradient Direction',
        options: [
          { value: 'to bottom', label: '↓ Top to Bottom' },
          { value: 'to top', label: '↑ Bottom to Top' },
          { value: 'to right', label: '→ Left to Right' },
          { value: 'to left', label: '← Right to Left' },
          { value: '135deg', label: '↘ Diagonal ↘' },
          { value: '225deg', label: '↙ Diagonal ↙' },
        ],
        defaultValue: 'to bottom',
      }),
      lineHeight: NumberControl({ label: 'Text Line Height', defaultValue: 1.6, min: 1, max: 3, step: 0.05 }),
      paddingTop: NumberControl({ label: 'Padding Top', defaultValue: 64, min: 0, max: 400, step: 8, suffix: 'px' }),
      paddingBottom: NumberControl({ label: 'Padding Bottom', defaultValue: 64, min: 0, max: 400, step: 8, suffix: 'px' }),
      tagline: TextInput({ label: 'Tagline', defaultValue: 'Professional-grade landscape lighting trusted by contractors since 2001.' }),
      phone: TextInput({ label: 'Phone', defaultValue: '(800) 555-CAST' }),
      address: TextInput({ label: 'Address', defaultValue: 'Pine Brook, NJ 07058' }),
      copyright: TextInput({ label: 'Copyright', defaultValue: '© 2026 CAST Lighting. All rights reserved.' }),
      facebookHref: TextInput({ label: 'Facebook URL', defaultValue: '#' }),
      instagramHref: TextInput({ label: 'Instagram URL', defaultValue: '#' }),
      youtubeHref: TextInput({ label: 'YouTube URL', defaultValue: '#' }),
      linkedinHref: TextInput({ label: 'LinkedIn URL', defaultValue: '#' }),
      xHref: TextInput({ label: 'X (Twitter) URL', defaultValue: '#' }),
      pinterestHref: TextInput({ label: 'Pinterest URL', defaultValue: '#' }),
      col1Title: TextInput({ label: 'Column 1 Title', defaultValue: 'Products' }),
      col1Links: List({
        label: 'Column 1 Links',
        type: Shape({
          type: {
            label: TextInput({ label: 'Label', defaultValue: '' }),
            href: TextInput({ label: 'URL', defaultValue: '#' }),
          },
        }),
        getItemLabel(item) { return item?.label || 'Link' },
      }),
      col2Title: TextInput({ label: 'Column 2 Title', defaultValue: 'Resources' }),
      col2Links: List({
        label: 'Column 2 Links',
        type: Shape({
          type: {
            label: TextInput({ label: 'Label', defaultValue: '' }),
            href: TextInput({ label: 'URL', defaultValue: '#' }),
          },
        }),
        getItemLabel(item) { return item?.label || 'Link' },
      }),
      col3Title: TextInput({ label: 'Column 3 Title', defaultValue: 'Company' }),
      col3Links: List({
        label: 'Column 3 Links',
        type: Shape({
          type: {
            label: TextInput({ label: 'Label', defaultValue: '' }),
            href: TextInput({ label: 'URL', defaultValue: '#' }),
          },
        }),
        getItemLabel(item) { return item?.label || 'Link' },
      }),
      col4Title: TextInput({ label: 'Column 4 Title', defaultValue: 'Support' }),
      col4Links: List({
        label: 'Column 4 Links',
        type: Shape({
          type: {
            label: TextInput({ label: 'Label', defaultValue: '' }),
            href: TextInput({ label: 'URL', defaultValue: '#' }),
          },
        }),
        getItemLabel(item) { return item?.label || 'Link' },
      }),
    },
  }
)
