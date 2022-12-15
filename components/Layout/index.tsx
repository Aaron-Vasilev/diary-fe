import styles from './Layout.module.css'

export function Layout({ children }) {
  return (
    <>
      <header className={styles.header + " mx-auto grid h-20 place-items-center bg-primary text-center font-Lilita shadow-xl"}>
        <h1 className="text-5xl">One day One question Diary</h1>
      </header>
      <main className="p-6">
        {children}
      </main>    
    </>
  )
}