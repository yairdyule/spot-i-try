import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Navbar />
        <Outlet />
      </div>
    </QueryClientProvider>
  );
}

export default App;
