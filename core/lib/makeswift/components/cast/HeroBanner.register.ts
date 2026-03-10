import { lazy } from "react"
import { Style, TextInput, TextArea, Image, Select, Number, Checkbox, Color, List, Shape } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./HeroBanner")),
  {
    type: "site-hero-banner",
    label: "Site / Hero Banner",
    props: {
      className: Style(),
      backgroundImage1: Image({ label: "Background Image 1" }),
      backgroundImage2: Image({ label: "Background Image 2" }),
      backgroundImage3: Image({ label: "Background Image 3" }),
      transitionMode: Select({
        label: "Transition Mode",
        options: [
          { label: "Crossfade", value: "crossfade" },
          { label: "Slide", value: "slide" },
        ],
        defaultValue: "crossfade",
      }),
      autoplaySpeed: Number({ label: "Autoplay Speed (ms)", defaultValue: 6000, min: 2000, max: 15000, step: 500 }),
      heroStyle: Style({ properties: [Style.Padding] }),
      bgImage: Image({ label: "Background Image" }),
      bgColor: Color({ label: "Background Color", defaultValue: "#111827" }),
      overlayColor: Color({ label: "Overlay Color" }),
      overlayOpacity: Number({ label: "Overlay Opacity %", defaultValue: 0, min: 0, max: 100, step: 5 }),
      heading: TextInput({ label: "Heading", defaultValue: "Premium Landscape Lighting Built to Last" }),
      subtitle: TextArea({
        label: "Subtitle",
        defaultValue: "Professional-grade brass and copper fixtures trusted by contractors nationwide.",
      }),
      showAnnouncement: Checkbox({ label: "Show Announcement", defaultValue: true }),
      announcementText: TextInput({ label: "Announcement Text", defaultValue: "New 2026 Product Catalog Now Available." }),
      announcementLinkText: TextInput({ label: "Announcement Link Text", defaultValue: "View catalog" }),
      announcementHref: TextInput({ label: "Announcement URL", defaultValue: "#" }),
      primaryButtonText: TextInput({ label: "Primary Button Text", defaultValue: "Shop Products" }),
      primaryButtonHref: TextInput({ label: "Primary Button URL", defaultValue: "/shop" }),
      primaryButtonBgColor: Color({ label: "Primary Button BG Color" }),
      primaryButtonHoverBgColor: Color({ label: "Primary Button Hover BG" }),
      secondaryButtonText: TextInput({ label: "Secondary Button Text", defaultValue: "Become a TradePro" }),
      secondaryButtonHref: TextInput({ label: "Secondary Button URL", defaultValue: "/tradepro" }),
      secondaryButtonBgColor: Color({ label: "Secondary Button BG Color" }),
      secondaryButtonHoverBgColor: Color({ label: "Secondary Button Hover BG" }),
      showForm: Checkbox({ label: "Show Quote Form", defaultValue: true }),
      formTitle: TextInput({ label: "Form Title", defaultValue: "Get An Easy, No-Pressure Quote" }),
      formSubmitText: TextInput({ label: "Form Button Text", defaultValue: "Get A Free Quote" }),
      formBackgroundColor: Color({ label: "Form Background Color", defaultValue: "rgba(0,73,96,0.85)" }),
      formBorderRadius: Number({ label: "Form Border Radius", defaultValue: 0, min: 0, max: 32, step: 2 }),
      formFieldBgColor: Color({ label: "Form Field BG Color" }),
      formFieldBorderColor: Color({ label: "Form Field Border Color" }),
      formStep1Title: TextInput({ label: "Step 1 Title", defaultValue: "Contact Info" }),
      formStep1Fields: List({
        label: "Step 1 Fields",
        type: Shape({
          type: {
            label: TextInput({ label: "Label", defaultValue: "Field" }),
            type: Select({
              label: "Type",
              options: [
                { label: "Text", value: "text" },
                { label: "Email", value: "email" },
                { label: "Phone", value: "tel" },
                { label: "Select", value: "select" },
                { label: "Textarea", value: "textarea" },
              ],
              defaultValue: "text",
            }),
            placeholder: TextInput({ label: "Placeholder", defaultValue: "" }),
            required: Checkbox({ label: "Required", defaultValue: false }),
          },
        }),
        getItemLabel(item) { return item?.label || "Field" },
      }),
      formStep2Title: TextInput({ label: "Step 2 Title", defaultValue: "Project Details" }),
      formStep2Fields: List({
        label: "Step 2 Fields",
        type: Shape({
          type: {
            label: TextInput({ label: "Label", defaultValue: "Field" }),
            type: Select({
              label: "Type",
              options: [
                { label: "Text", value: "text" },
                { label: "Email", value: "email" },
                { label: "Phone", value: "tel" },
                { label: "Select", value: "select" },
                { label: "Textarea", value: "textarea" },
              ],
              defaultValue: "text",
            }),
            placeholder: TextInput({ label: "Placeholder", defaultValue: "" }),
            required: Checkbox({ label: "Required", defaultValue: false }),
          },
        }),
        getItemLabel(item) { return item?.label || "Field" },
      }),
      formStep3Title: TextInput({ label: "Step 3 Title", defaultValue: "Additional Info" }),
      formStep3Fields: List({
        label: "Step 3 Fields",
        type: Shape({
          type: {
            label: TextInput({ label: "Label", defaultValue: "Field" }),
            type: Select({
              label: "Type",
              options: [
                { label: "Text", value: "text" },
                { label: "Email", value: "email" },
                { label: "Phone", value: "tel" },
                { label: "Select", value: "select" },
                { label: "Textarea", value: "textarea" },
              ],
              defaultValue: "text",
            }),
            placeholder: TextInput({ label: "Placeholder", defaultValue: "" }),
            required: Checkbox({ label: "Required", defaultValue: false }),
          },
        }),
        getItemLabel(item) { return item?.label || "Field" },
      }),
      formStyle: Style({ properties: [Style.Margin] }),
    },
  }
)
