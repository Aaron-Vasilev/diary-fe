import { PLANS } from "@/utils/consts"
import Link from "next/link"

export default function Sub() {

  return (
    <div className="grid justify-center gap-3">
      <Link 
        href={PLANS['month']}
        className="leading-[3rem] h-14 min-w-24 text-3xl px-1 border-2 border-black bg-secondary font-Lilita text-white shadow-m outline-primary"
      >
        Buy a monthly subscription for 9₪
      </Link>
      <Link 
        href={PLANS['year']}
        className="leading-[3rem] h-14 min-w-24 text-3xl px-1 border-2 border-black bg-secondary font-Lilita text-white shadow-m outline-primary"
      >
        Buy a yearly subscription for 79₪
      </Link>
    </div>
  )
}
