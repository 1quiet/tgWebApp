function App() {
  window.Telegram?.WebApp?.ready();

  const user = window.Telegram?.WebApp?.initDataUnsafe?.user;

  return (
    <>
      <div className="text-large border p-10">
        Hello world {user?.first_name} {user?.last_name}!
      </div>
    </>
  )
}

export default App
