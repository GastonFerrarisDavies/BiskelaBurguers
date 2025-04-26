export default function Button ({
    children,
    className = "",
    variant = "default",
    size = "default",
    type = "button",
    disabled = false,
    onClick,
    ...props
  }) {
    const baseStyles =
      "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
  
    const variantStyles = {
      default: "bg-gebum-violet text-white hover:bg-gebum-violet/90",
      ghost: "hover:bg-gray-100",
      icon: "p-0",
    }
  
    const sizeStyles = {
      default: "h-10 py-2 px-4",
      icon: "h-8 w-8",
    }
  
    return (
      <button
        type={type}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        disabled={disabled}
        onClick={onClick}
        {...props}
      >
        {children}
      </button>
    )
  }