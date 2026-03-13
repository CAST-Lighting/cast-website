import { lazy } from "react"
import { Style, Color, Image, Number as NumberControl, Select, TextInput } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./CategoryGrid")),
  {
    type: "site-category-grid",
    label: "Site / Category Grid",
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
      paddingTop: NumberControl({ label: 'Padding Top', defaultValue: 96, min: 0, max: 400, step: 8, suffix: 'px' }),
      paddingBottom: NumberControl({ label: 'Padding Bottom', defaultValue: 96, min: 0, max: 400, step: 8, suffix: 'px' }),
      sectionTitle: TextInput({ label: 'Section Title', defaultValue: 'Product' }),
      sectionTitleAccent: TextInput({ label: 'Section Title Accent', defaultValue: 'Categories' }),
      sectionDescription: TextInput({ label: 'Section Description', defaultValue: 'Explore our full range of professional landscape lighting solutions.' }),
      cat1Name: TextInput({ label: 'Category 1 Name', defaultValue: 'Path Lights' }),
      cat1Href: TextInput({ label: 'Category 1 Href', defaultValue: '/shop/path-lights' }),
      cat2Name: TextInput({ label: 'Category 2 Name', defaultValue: 'Spot Lights' }),
      cat2Href: TextInput({ label: 'Category 2 Href', defaultValue: '/shop/spot-lights' }),
      cat3Name: TextInput({ label: 'Category 3 Name', defaultValue: 'Wall Wash' }),
      cat3Href: TextInput({ label: 'Category 3 Href', defaultValue: '/shop/wall-wash' }),
      cat4Name: TextInput({ label: 'Category 4 Name', defaultValue: 'Well Lights' }),
      cat4Href: TextInput({ label: 'Category 4 Href', defaultValue: '/shop/well-lights' }),
      cat5Name: TextInput({ label: 'Category 5 Name', defaultValue: 'Deck Lights' }),
      cat5Href: TextInput({ label: 'Category 5 Href', defaultValue: '/shop/deck-lights' }),
      cat6Name: TextInput({ label: 'Category 6 Name', defaultValue: 'Flood Lights' }),
      cat6Href: TextInput({ label: 'Category 6 Href', defaultValue: '/shop/flood-lights' }),
      cat7Name: TextInput({ label: 'Category 7 Name', defaultValue: 'Accent Lights' }),
      cat7Href: TextInput({ label: 'Category 7 Href', defaultValue: '/shop/accent-lights' }),
      cat8Name: TextInput({ label: 'Category 8 Name', defaultValue: 'Transformers' }),
      cat8Href: TextInput({ label: 'Category 8 Href', defaultValue: '/shop/transformers' }),
    },
  }
)
