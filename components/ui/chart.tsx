"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const chartVariants = cva("flex flex-col", {
  variants: {
    type: {
      bar: "",
      line: "",
    },
  },
  defaultVariants: {
    type: "bar",
  },
})

const chartContainerVariants = cva("relative", {
  variants: {
    orientation: {
      horizontal: "",
      vertical: "",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
})

const chartBarVariants = cva("rounded-sm", {
  variants: {
    name: {
      default: "",
    },
  },
  defaultVariants: {
    name: "default",
  },
})

const chartGroupVariants = cva("", {
  variants: {
    name: {
      default: "",
    },
  },
  defaultVariants: {
    name: "default",
  },
})

const chartTooltipVariants = cva(
  "peer-[.chart-tooltip-trigger]:group-hover:block hidden absolute z-10 rounded-md border bg-popover p-2 text-popover-foreground shadow-md animate-in fade-in-50 data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
  {
    variants: {
      side: {
        top: "",
        right: "",
        bottom: "",
        left: "",
      },
    },
    defaultVariants: {
      side: "top",
    },
  },
)

const chartTooltipContentVariants = cva("", {
  variants: {
    name: {
      default: "",
    },
  },
  defaultVariants: {
    name: "default",
  },
})

const chartTooltipTriggerVariants = cva("group relative", {
  variants: {
    name: {
      default: "",
    },
  },
  defaultVariants: {
    name: "default",
  },
})

const Chart = React.forwardRef<
  React.ElementRef<"div">,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof chartVariants>
>(({ className, type, ...props }, ref) => {
  return <div className={cn(chartVariants({ type, className }))} ref={ref} {...props} />
})
Chart.displayName = "Chart"

const ChartContainer = React.forwardRef<
  React.ElementRef<"div">,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof chartContainerVariants>
>(({ className, orientation, ...props }, ref) => {
  return <div className={cn(chartContainerVariants({ orientation, className }))} ref={ref} {...props} />
})
ChartContainer.displayName = "ChartContainer"

const ChartBar = React.forwardRef<
  React.ElementRef<"div">,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof chartBarVariants>
>(({ className, name, ...props }, ref) => {
  return <div className={cn(chartBarVariants({ name, className }))} ref={ref} {...props} />
})
ChartBar.displayName = "ChartBar"

const ChartGroup = React.forwardRef<
  React.ElementRef<"div">,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof chartGroupVariants>
>(({ className, name, ...props }, ref) => {
  return <div className={cn(chartGroupVariants({ name, className }))} ref={ref} {...props} />
})
ChartGroup.displayName = "ChartGroup"

const ChartTooltip = React.forwardRef<
  React.ElementRef<"div">,
  React.HTMLAttributes<HTMLDivElement> & { children: React.ReactNode }
>(({ className, children, ...props }, ref) => {
  return <div className="relative">{children}</div>
})
ChartTooltip.displayName = "ChartTooltip"

const ChartTooltipContent = React.forwardRef<
  React.ElementRef<"div">,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof chartTooltipContentVariants>
>(({ className, name, ...props }, ref) => {
  return <div className={cn(chartTooltipVariants({ className }))} ref={ref} {...props} />
})
ChartTooltipContent.displayName = "ChartTooltipContent"

const ChartTooltipTrigger = React.forwardRef<
  React.ElementRef<"div">,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof chartTooltipTriggerVariants>
>(({ className, name, ...props }, ref) => {
  return <div className={cn(chartTooltipTriggerVariants({ name, className }))} ref={ref} {...props} />
})
ChartTooltipTrigger.displayName = "ChartTooltipTrigger"

export { Chart, ChartContainer, ChartBar, ChartGroup, ChartTooltip, ChartTooltipContent, ChartTooltipTrigger }

