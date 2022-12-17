interface PropType {
  value: string
  hander: Function
  type?: string
  isValid?: boolean
}


export function Input({ 
  value, hander, type= 'text', isValid = true,
}: PropType) {

  return (
    <input 
      className="h-4 border-4 border-solid border-primary bg-emerald-50 p-4 shadow-xl outline-none required:border-red-500" 
      type={type} 
      value={value}
      required={!isValid}
      onChange={e => hander(e.target.value)}
    />
  )
}