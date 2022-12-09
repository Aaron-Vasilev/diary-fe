interface PropType {
  label: string
  handler: Function
  size?: 'S' | 'M' | 'L'
}

export function Button({label, handler, size = 'S'}: PropType) {
  return (
    <button
      className="h-14 w-24 border-2 border-black bg-secondary font-Lilita text-lg text-white shadow-m"
      onClick={() => handler}
    >
      {label}
    </button>
  )
}