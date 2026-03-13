import { lazy } from "react"
import { Style, Color, Image, Number as NumberControl, Select, List, Shape, TextInput } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./HeroBanner")),
  {
    type: "site-hero-banner",
    label: "Site / Hero Banner",
    props: {
      className: Style(),

      // ── Slides ──────────────────────────────────────────────
      slides: List({
        type: Shape({
          type: {
            image: Image({ label: 'Slide Image' }),
          },
        }),
        label: 'Slides',
        getItemLabel: (_item: any, index: number) => `Slide ${(index ?? 0) + 1}`,
      }),

      // ── Badge ───────────────────────────────────────────────
      badgeText: TextInput({ label: 'Badge Text', defaultValue: 'New 2026 Product Catalog Now Available' }),

      // ── Heading ─────────────────────────────────────────────
      headingLine1: TextInput({ label: 'Heading', defaultValue: 'Premium Landscape Lighting' }),
      rotatingPhrasesList: List({
        type: Shape({
          type: {
            text: TextInput({ label: 'Phrase', defaultValue: 'Built to Last Forever' }),
          },
        }),
        label: 'Rotating Phrases',
        getItemLabel: (item: any) => item?.text || 'Phrase',
      }),

      // ── Description ─────────────────────────────────────────
      description: TextInput({
        label: 'Description',
        defaultValue: 'Professional-grade brass and copper fixtures trusted by contractors nationwide. Lifetime warranty on every product.',
      }),

      // ── Buttons ─────────────────────────────────────────────
      btn1Label: TextInput({ label: 'Button 1 Label', defaultValue: 'Shop Products' }),
      btn1Href: TextInput({ label: 'Button 1 Link', defaultValue: '#' }),
      btn2Label: TextInput({ label: 'Button 2 Label', defaultValue: 'Become a TradePro →' }),
      btn2Href: TextInput({ label: 'Button 2 Link', defaultValue: '#' }),

      // ── Form ────────────────────────────────────────────────
      formTitle: TextInput({ label: 'Form Title', defaultValue: 'Get An Easy, No-Pressure Quote' }),
      formSubtitle: TextInput({ label: 'Form Subtitle', defaultValue: "Tell us about your project and we'll get back to you within 24 hours." }),
      formSubmitLabel: TextInput({ label: 'Form Submit Button', defaultValue: 'Get A Free Quote' }),

      // ── Background ──────────────────────────────────────────
      bgColor: Color({ label: 'Overlay Color' }),
      bgOpacity: NumberControl({ label: 'Overlay Opacity', defaultValue: 70, min: 0, max: 100, step: 1, suffix: '%' }),
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

      // ── Layout ──────────────────────────────────────────────
      lineHeight: NumberControl({ label: 'Text Line Height', defaultValue: 1.6, min: 1, max: 3, step: 0.05 }),
      paddingTop: NumberControl({ label: 'Padding Top', defaultValue: 80, min: 0, max: 400, step: 8, suffix: 'px' }),
      paddingBottom: NumberControl({ label: 'Padding Bottom', defaultValue: 80, min: 0, max: 400, step: 8, suffix: 'px' }),
    },
  }
)
