"use client"

import { MouseEventHandler } from "react"

interface PropType {
  label: string
  handler: MouseEventHandler<HTMLButtonElement>
  size?: 'S' | 'M' | 'L'
  type?: 'submit'
}

export function Button({label, handler, size = 'S'}: PropType) {
  const style = size === 'S' ? "h-8 min-w-[7rem] text-xl" : 
    size === 'M' ? "h-14 min-w-24 text-3xl" : 
      size === 'L' && "h-18 w-32 text-5xl"
    
  return (
    <button
      className={style + " px-1 border-2 border-black bg-secondary font-Lilita text-white shadow-m outline-primary"}
      onClick={handler}
    >
      {label}
    </button>
  )
}
