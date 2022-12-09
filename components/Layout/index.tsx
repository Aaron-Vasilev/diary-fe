export function Layout({ children }) {
  return (
    <>
      <header className="grid h-20 place-items-center bg-primary text-center font-Lilita">
        <h1 className="text-5xl">My Diary</h1>
      </header>
      <main className="p-6">
        {children}
      </main>    
    </>
  )
}