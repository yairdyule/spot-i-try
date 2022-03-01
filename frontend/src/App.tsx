import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { trpc } from "./utilities/trpc";

function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      url: "http://localhost:8000/trpc",
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <Navbar />
          <Outlet />
        </div>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
