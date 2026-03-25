import { lazy } from "react"
import { Style, Color, Image, Number as NumberControl, Select, TextInput } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./SubPageHeroStatic")),
  {
    type: "cast-subpage-hero-static",
    label: "Hero / Sub Page Hero (Static)",
    props: {
      className: Style(),

      // ── Background ──────────────────────────────────────────
      bgImage: Image({ label: 'Background Image' }),
      bgColor: Color({ label: 'Overlay Color', defaultValue: '#25262d' }),
      bgOpacity: NumberControl({ label: 'Overlay Opacity', defaultValue: 60, min: 0, max: 100, step: 1, suffix: '%' }),
      gradientFrom: Color({ label: 'Gradient From', defaultValue: '#25262d' }),
      gradientTo: Color({ label: 'Gradient To', defaultValue: '#25262d' }),
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
        defaultValue: '135deg',
      }),

      // ── Content ─────────────────────────────────────────────
      badgeText: TextInput({ label: 'Badge Text', defaultValue: 'Section Label' }),
      headingLine1: TextInput({ label: 'Heading', defaultValue: 'Heading Goes Here' }),
      headingAccent: TextInput({ label: 'Heading Accent (blue)', defaultValue: 'Accent' }),
      description: TextInput({ label: 'Description', defaultValue: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' }),

      // ── Buttons ─────────────────────────────────────────────
      btn1Label: TextInput({ label: 'Button 1 Label', defaultValue: 'Button Here' }),
      btn1Href: TextInput({ label: 'Button 1 Link', defaultValue: '#' }),
      btn2Label: TextInput({ label: 'Button 2 Label', defaultValue: '' }),
      btn2Href: TextInput({ label: 'Button 2 Link', defaultValue: '#' }),

      // ── Layout ──────────────────────────────────────────────
      lineHeight: NumberControl({ label: 'Text Line Height', defaultValue: 1.6, min: 1, max: 3, step: 0.05 }),
      paddingTop: NumberControl({ label: 'Padding Top', defaultValue: 64, min: 0, max: 400, step: 8, suffix: 'px' }),
      paddingBottom: NumberControl({ label: 'Padding Bottom', defaultValue: 64, min: 0, max: 400, step: 8, suffix: 'px' }),
    },
  }
)
