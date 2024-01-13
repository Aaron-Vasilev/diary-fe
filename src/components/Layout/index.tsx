import { Navigation } from '../Navigation'
import styles from './Layout.module.css'

export function Layout({ children }) {
  return (
    <>
      <header className={styles.header + " py-3 px-4 mx-auto items-center flex justify-between h-fit bg-primary font-Lilita shadow-xl border-2 border-black"}>
        <h1 className={styles.name + " text-5xl"}>One Day One Question</h1>
        <Navigation />
      </header>
      <main className="p-6 selection:bg-secondary selection:text-white">
        {children}
      </main> 
    </>
  )
}
