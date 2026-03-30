import { lazy } from "react"
import { Style, Color, Image, Number as NumberControl, Select, TextInput, Checkbox, List, Shape } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./HeroBanner")),
  {
    type: "site-hero-banner",
    label: "Hero / Universal Hero",
    props: {

      className: Style(),
      // ─── LAYOUT ──────────────────────────────────────────────────────
      paddingTop:    NumberControl({ label: '📐 Layout — Padding Top',    defaultValue: 136, min: 0, max: 400, step: 8, suffix: 'px' }),
      paddingBottom: NumberControl({ label: '📐 Layout — Padding Bottom', defaultValue: 112, min: 0, max: 400, step: 8, suffix: 'px' }),
      lineHeight:    NumberControl({ label: '📐 Layout — Line Height',    defaultValue: 1.6, min: 1, max: 3,   step: 0.05 }),

      // ─── BACKGROUND ──────────────────────────────────────────────────
      slides: List({
        label: '📸 Slides — Background Images',
        type: Image(),
        getItemLabel: (_, index) => `Slide ${(index ?? 0) + 1}`,
      }),
      staticImage: Checkbox({ label: '📸 Static Image — Use Single Image (Slide 1)', defaultValue: false }),
      gradientFrom: Color({ label: '🎨 Background — Gradient From', defaultValue: '#25262d' }),
      gradientTo:   Color({ label: '🎨 Background — Gradient To',   defaultValue: '#25262d' }),
      gradientDirection: Select({
        label: '🎨 Background — Gradient Direction',
        options: [
          { value: 'to bottom', label: '↓ Top to Bottom' },
          { value: 'to top',    label: '↑ Bottom to Top' },
          { value: 'to right',  label: '→ Left to Right' },
          { value: 'to left',   label: '← Right to Left' },
          { value: '135deg',    label: '↘ Diagonal' },
          { value: '225deg',    label: '↙ Diagonal' },
        ],
        defaultValue: '135deg',
      }),

      // ─── CONTENT ─────────────────────────────────────────────────────
      badgeText:    TextInput({ label: '✏️ Content — Badge Text',    defaultValue: 'New 2026 Product Catalog Now Available' }),
      headingLine1: TextInput({ label: '✏️ Content — Heading',       defaultValue: 'Premium Landscape Lighting' }),
      staticAccentText: Checkbox({ label: '✏️ Content — Static Accent Text', defaultValue: false }),
      headingAccent: TextInput({ label: '✏️ Content — Accent Text (or static phrase)', defaultValue: '' }),
      phrases: List({
        label: '✏️ Content — Rotating Phrases',
        type: Shape({ type: { text: TextInput({ label: 'Phrase', defaultValue: '' }) } }),
        getItemLabel: (item) => item?.text || 'Phrase',
      }),
      description: TextInput({ label: '✏️ Content — Description', defaultValue: 'Professional-grade brass and copper fixtures trusted by contractors nationwide. Lifetime warranty on every product.' }),

      // ─── BUTTONS ─────────────────────────────────────────────────────
      buttons: List({
        label: '🔘 Buttons',
        type: Shape({
          type: {
            label: TextInput({ label: 'Label', defaultValue: 'Button' }),
            href:  TextInput({ label: 'Link',  defaultValue: '#' }),
          },
        }),
        getItemLabel: (item) => item?.label || 'Button',
      }),

      // ─── FORM ────────────────────────────────────────────────────────
      showForm:         Checkbox({ label: '📋 Form — Show Form',             defaultValue: false }),
      formTitle:        TextInput({ label: '📋 Form — Title',                defaultValue: 'Become a TradePro' }),
      formSubtitle:     TextInput({ label: '📋 Form — Subtitle',             defaultValue: "Apply for exclusive contractor pricing, training, and dedicated support." }),
      formSubmitLabel:  TextInput({ label: '📋 Form — Submit Button Label',  defaultValue: 'Submit Application' }),
      formWidth:        NumberControl({ label: '📋 Form — Width (px)',        defaultValue: 472, min: 280, max: 800, step: 8, suffix: 'px' }),
      formOffsetBottom: NumberControl({ label: '📋 Form — Overlap Below (px)', defaultValue: 32,  min: 0,   max: 400, step: 8, suffix: 'px' }),
    },
  }
)
