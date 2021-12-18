export function Homepage() {
  return (
    <div className="bg-slate-900 min-h-screen w-screen grid grid-cols-5 gap-20 py-20 justify-between">
      <nav className="col-span-1 my-4 bg-slate-800 rounded-r-xl">
        <ul className="text-slate-300 font-medium  flex flex-col w-full gap-1 pl-4 justify-start">
          <li>Home</li>
          <li>Queues</li>
          <li>Profile</li>
          <li>Settings</li>
        </ul>
      </nav>
      <main className="col-start-2 col-end-5 my-4 bg-slate-800 mx-2 rounded-xl">
        <ul>
          <li>arsnteio</li>
          <li>oientsar</li>
          <li>seainrs</li>
        </ul>
      </main>

      <aside className="col-start-5 flex flex-col items-end gap-1 my-4 bg-slate-800 rounded-l-xl">
        <ul className="text-left font-medium pr-4 text-slate-300">
          <li>arsnteio</li>
          <li>oientsar</li>
          <li>seainrs</li>
        </ul>
      </aside>
    </div>
  );
}
