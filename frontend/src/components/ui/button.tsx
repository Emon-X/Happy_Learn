import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  variant?: "default" | "secondary" | "success" | "danger" | "ghost" | "outline"
  size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    // HCI guidelines: large touch targets (min 48px), rounded full, heavy shadows for tactile feedback
    const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-full text-xl font-bold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95 shadow-md hover:shadow-lg"
    
    const variants = {
      default: "bg-[#60A5FA] text-white hover:bg-blue-500",
      secondary: "bg-[#FCD34D] text-yellow-950 hover:bg-yellow-400",
      success: "bg-[#34D399] text-green-950 hover:bg-green-400",
      danger: "bg-[#F87171] text-white hover:bg-red-500",
      ghost: "hover:bg-gray-100 text-gray-800 shadow-none hover:shadow-none",
      outline: "border-4 border-[#60A5FA] bg-white text-[#60A5FA] hover:bg-blue-50",
    }
    
    const sizes = {
      default: "h-16 px-8 py-4",
      sm: "h-12 px-6 text-lg",
      lg: "h-20 px-10 text-2xl",
      icon: "h-16 w-16",
    }
    
    return (
      <Comp
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
