import style from "./Spinner.module.css"

export function Spinner() {
  return <div className={style["lds-ring"]}><div></div><div></div><div></div><div></div></div>
}
