import styles from './styles.module.css'

export default function Loading() {
  return (
    <div className='flex justify-center'>
      <div className={styles["lds-ring"]}><div></div><div></div><div></div><div></div></div>
    </div>
  )
}
