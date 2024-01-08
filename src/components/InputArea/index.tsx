interface Props {
  handler: Function
  outterRef: any
}

export function InputArea({ handler, outterRef } : Props) {
  return (
    <div 
      ref={outterRef}
      className="col-[1_/_-1] resize-none border-8 border-solid border-primary bg-transparent p-4 shadow-xl outline-none" 
      onInput={e => handler(e)}
      contentEditable
    />
  )
}
