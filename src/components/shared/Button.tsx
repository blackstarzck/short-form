import * as React from "react"
import { cn } from "@/utils/cn"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'brand';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', asChild = false, ...props }, ref) => {
    // Basic styles
    const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
    
    // Variants
    const variants = {
      default: "bg-primary text-primary-foreground hover:bg-primary/90", // fallback if primary not defined, but I defined brand
      brand: "bg-brand text-brand-foreground hover:bg-brand/90 shadow-md",
      outline: "border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground",
      ghost: "hover:bg-accent hover:text-accent-foreground text-white",
    }
    
    // Sizes
    const sizes = {
      default: "h-9 px-4 py-2",
      sm: "h-8 rounded-md px-3 text-xs",
      lg: "h-10 rounded-md px-8",
      icon: "h-9 w-9",
    }

    // Since I don't have 'primary' defined in globals.css (I used 'brand'), let's map default to something safe or white.
    // Actually I defined --foreground. 
    // Let's use simple logic.
    
    const variantStyles = {
      default: "bg-white text-black hover:bg-gray-100",
      brand: "bg-[var(--color-brand)] text-white hover:opacity-90 shadow-md",
      outline: "border border-white/20 bg-transparent text-white hover:bg-white/10",
      ghost: "hover:bg-white/10 text-white",
    }[variant]
    
    const sizeStyles = sizes[size]

    return (
      <button
        className={cn(baseStyles, variantStyles, sizeStyles, className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
