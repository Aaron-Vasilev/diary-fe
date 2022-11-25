export function Layout({ children }) {
  return (
    <>
      <header className="bg-sky-400 h-20 text-center">
        <h1 className="text-5xl">My Diary</h1>
      </header>
      <main className="grid">
        {children}
      </main>    
    </>
  )
}