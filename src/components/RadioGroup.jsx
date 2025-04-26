
const RadioGroup = ({ children, value, onValueChange, className = "", ...props }) => {
    return (
      <div className={`grid gap-2 ${className}`} {...props}>
        {children}
      </div>
    )
  }

export default RadioGroup