import { Navigation } from '../Navigation'
import styles from './Layout.module.css'

export function Layout({ children }) {
  return (
    <>
      <header className={styles.header + " py-3 px-4 mx-auto items-center grid grid-cols-2 h-fit bg-primary font-Lilita shadow-xl"}>
        <h1 className="text-5xl">One Day One Question</h1>
        <Navigation />
      </header>
      <main className="p-6 selection:bg-secondary selection:text-white">
        {children}
      </main> 
    </>
  )
}
