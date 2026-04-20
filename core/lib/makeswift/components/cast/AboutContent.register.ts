import { lazy } from "react"
import { Style, Color, TextInput, TextArea, List, Shape, Checkbox} from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./AboutContent")),
  {
    type: "cast-about-content",
    label: "Sections / About Content",
    props: {
      className: Style({ properties: [Style.Padding, Style.Margin] }),
      lightMode: Checkbox({ label: '💡 Light Mode', defaultValue: false }),

      // 🎨 Background
      bgColor: Color({ label: "🎨 Background — Color", defaultValue: "#0f1923" }),

      // ✏️ Content — Editorial Split
      overline: TextInput({ label: "✏️ Content — Overline Label", defaultValue: "About CAST Lighting" }),
      sectionHeading: TextInput({ label: "✏️ Content — Section Heading", defaultValue: "Built to Last. Built in America." }),
      sectionBody: TextArea({
        label: "✏️ Content — Section Body",
        defaultValue:
          "Since 2001, CAST Lighting has been designing and manufacturing professional-grade landscape lighting fixtures in the USA. Every product is crafted from solid brass or copper — materials chosen for their beauty and ability to withstand decades of outdoor exposure without corroding or deteriorating." }),

      // 📊 Stats — Callout Tiles (shown right of editorial copy)
      stats: List({
        label: "📊 Stats — Callout Tiles",
        type: Shape({
          type: {
            value: TextInput({ label: "Value", defaultValue: "2001" }),
            label: TextInput({ label: "Label", defaultValue: "Year Founded" }) } }),
        getItemLabel(item) {
          return item?.value || "Stat"
        } }),

      // 🃏 Cards — Feature Cards
      features: List({
        label: "🃏 Cards — Feature Cards",
        type: Shape({
          type: {
            title: TextInput({ label: "Title", defaultValue: "Feature Title" }),
            desc: TextArea({ label: "Description", defaultValue: "Feature description goes here." }) } }),
        getItemLabel(item) {
          return item?.title || "Feature"
        } }),

      // 🔘 Buttons
      btn1Label: TextInput({ label: "🔘 Buttons — Button 1 Label", defaultValue: "Shop Products" }),
      btn1Href: TextInput({ label: "🔘 Buttons — Button 1 Link", defaultValue: "/shop" }),
      btn2Label: TextInput({ label: "🔘 Buttons — Button 2 Label", defaultValue: "Contact Us" }),
      btn2Href: TextInput(