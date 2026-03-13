import { lazy } from "react"
import { Style, Color, Image, Number as NumberControl, Select, TextInput } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./HeroBanner")),
  {
    type: "site-hero-banner",
    label: "Site / Hero Banner",
    props: {
      className: Style(),

      // ── Slides ──────────────────────────────────────────────
      slide1Image: Image({ label: 'Slide 1 Image' }),
      slide2Image: Image({ label: 'Slide 2 Image' }),
      slide3Image: Image({ label: 'Slide 3 Image' }),
      slide4Image: Image({ label: 'Slide 4 Image' }),
      slide5Image: Image({ label: 'Slide 5 Image' }),

      // ── Rotating Phrases ────────────────────────────────────
      phrase1: TextInput({ label: 'Phrase 1', defaultValue: 'Built to Last Forever' }),
      phrase2: TextInput({ label: 'Phrase 2', defaultValue: 'Designed for Contractors' }),
      phrase3: TextInput({ label: 'Phrase 3', defaultValue: 'Loved by Homeowners' }),

      // ── Badge ───────────────────────────────────────────────
      badgeText: TextInput({ label: 'Badge Text', defaultValue: 'New 2026 Product Catalog Now Available' }),

      // ── Heading ─────────────────────────────────────────────
      headingLine1: TextInput({ label: 'Heading', defaultValue: 'Premium Landscape Lighting' }),

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
