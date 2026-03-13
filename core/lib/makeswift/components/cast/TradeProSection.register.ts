import { lazy } from "react"
import { Style } from "@makeswift/runtime/controls"
import { runtime } from "~/lib/makeswift/runtime"

runtime.registerComponent(
  lazy(() => import("./TradeProSection")),
  {
    type: "site-trade-pro",
    label: "Site / TradePro Section",
    props: {
      className: Style(),
    },
  }
)
