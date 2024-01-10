"use client"

import { MouseEventHandler } from "react"

interface PropType {
  label: string
  handler?: MouseEventHandler<HTMLButtonElement>
  size?: 'S' | 'M' | 'L'
  type?: 'primary' | 'secondary'
}

export function Button({label, handler = () => {}, size = 'S', type = 'primary'}: PropType) {
  let style = size === 'S' ? "h-8 min-w-[7rem] text-xl " : 
    size === 'M' ? "h-14 min-w-24 text-3xl " : 
      size === 'L' && "h-18 min-w-32 text-5xl "

  style += type === 'primary' ? 'bg-secondary ' : 'bg-tri'
    
  return (
    <button
      className={style + " px-1 border-2 border-black font-Lilita text-white shadow-m outline-primary"}
      onClick={handler}
    >
      {label}
    </button>
  )
}
