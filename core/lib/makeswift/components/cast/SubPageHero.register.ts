import { lazy } from "react"
import { Style, Color, Image, Number as NumberControl, Select, TextInput } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./SubPageHero")),
  {
    type: "cast-subpage-hero",
    label: "Hero / Sub Page Hero (Carousel)",
    props: {
      className: Style(),

      // ── Slides ──────────────────────────────────────────────
      slide1Image: Image({ label: 'Slide 1 Image' }),
      slide2Image: Image({ label: 'Slide 2 Image' }),
      slide3Image: Image({ label: 'Slide 3 Image' }),
      slide4Image: Image({ label: 'Slide 4 Image' }),
      slide5Image: Image({ label: 'Slide 5 Image' }),

      // ── Rotating Phrases ────────────────────────────────────
      phrase1: TextInput({ label: 'Phrase 1', defaultValue: 'Lorem Ipsum Dolor' }),
      phrase2: TextInput({ label: 'Phrase 2', defaultValue: 'Consectetur Adipiscing' }),
      phrase3: TextInput({ label: 'Phrase 3', defaultValue: 'Sed Do Eiusmod' }),

      // ── Badge ───────────────────────────────────────────────
      badgeText: TextInput({ label: 'Badge Text', defaultValue: '' }),

      // ── Heading ─────────────────────────────────────────────
      headingLine1: TextInput({ label: 'Heading', defaultValue: 'Heading Goes Here' }),

      // ── Description ─────────────────────────────────────────
      description: TextInput({
        label: 'Description',
        defaultValue: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      }),

      // ── Buttons ─────────────────────────────────────────────
      btn1Label: TextInput({ label: 'Button 1 Label', defaultValue: 'Button Here' }),
      btn1Href: TextInput({ label: 'Button 1 Link', defaultValue: '#' }),
      btn2Label: TextInput({ label: 'Button 2 Label', defaultValue: '' }),
      btn2Href: TextInput({ label: 'Button 2 Link', defaultValue: '#' }),

      // ── Background ──────────────────────────────────────────
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

      // ── Layout ──────────────────────────────────────────────
      lineHeight: NumberControl({ label: 'Text Line Height', defaultValue: 1.6, min: 1, max: 3, step: 0.05 }),
      paddingTop: NumberControl({ label: 'Padding Top', defaultValue: 175, min: 0, max: 400, step: 1, suffix: 'px' }),
      paddingBottom: NumberControl({ label: 'Padding Bottom', defaultValue: 112, min: 0, max: 400, step: 8, suffix: 'px' }),
    },
  }
)
