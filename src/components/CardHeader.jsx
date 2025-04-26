export default function CardHeader ({ className = "", children, ...props }) {
    return (
      <div className={`space-y-1.5 p-6 ${className}`} {...props}>
        {children}
      </div>
    )
  }