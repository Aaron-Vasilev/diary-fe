export function Layout({ children }) {
  return (
    <>
      <header className="grid place-items-center bg-primary h-20 text-center font-Lilita">
        <h1 className="text-5xl">My Diary</h1>
      </header>
      <main className="grid px-6 py-6">
        {children}
      </main>    
    </>
  )
}