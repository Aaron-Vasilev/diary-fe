interface Props {
  handler: Function
  outterRef: any
}

export function InputArea({ handler, outterRef } : Props) {
  return (
    <div 
      ref={outterRef}
      className="col-span-2 resize-none border-8 border-solid border-primary bg-emerald-50 p-4 shadow-xl outline-none" 
      onInput={e => handler(e)}
      contentEditable
    />
  )
}
