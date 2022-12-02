export function Layout({ children }) {
  return (
    <>
      <header className="grid place-items-center bg-sky-400 h-20 text-center">
        <h1 className="text-5xl">My Diary</h1>
      </header>
      <main className="grid px-6 py-2">
        {children}
      </main>    
    </>
  )
}