
const RadioGroupItem = ({ id, value, ...props }) => {
    return (
      <input
        type="radio"
        id={id}
        value={value}
        className="h-4 w-4 text-gebum-violet border-gray-300 focus:ring-gebum-violet"
        {...props}
      />
    )
  }

export default RadioGroupItem