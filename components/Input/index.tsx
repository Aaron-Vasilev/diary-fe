interface PropType {
  value: string
  hander: Function
}


export function Input({value, hander}: PropType) {
  return (
    <input 
      type="text" 
      value={value}
      onChange={e => hander(e.target.value)}
      className="border-2 border-sky-400"
    />
  )
}