import style from "./Dialog.module.css"
import { ReactNode, RefObject, createRef, useEffect } from "react"
import { Button } from "@/components/Button"

interface Props {
  isShown: boolean
  acceptHandler: Function
  rejectHandler: Function
  children?: ReactNode
}

export function Dialog({ isShown, acceptHandler, rejectHandler, children }: Props) {
  const dialogRef: RefObject<HTMLDialogElement> = createRef()

  useEffect(() => {
    if (isShown) dialogRef.current.showModal()
    else dialogRef.current.close()
  }, [isShown])

  return (
      <dialog
        className={style.dialog + " p-6 min-h-[30vh] min-w-[50vw] backdrop:bg-neutral-200 backdrop:opacity-75"}
        ref={dialogRef}
      >
        <div
          className="grid gap-4"
        >
          {children}
          <div className="flex justify-center gap-4">
            <Button
              label="Yes"
              handler={() => acceptHandler()}
              size="M"
            />
            <Button
              label="No"
              handler={() => rejectHandler()}
              size="M"
            />
          </div>
        </div>
      </dialog>
  )
}
