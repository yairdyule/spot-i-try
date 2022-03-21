import { useState } from "react";
import axios from "axios";
import { SearchResults } from "../components/Search";
import { FaSpinner } from "react-icons/fa";

export default function Search() {
  const [q, setQ] = useState("");
  const [res, setRes] = useState([]);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8000/spotify/searchSong", {
  //       params: { query: q },
  //     })
  //     .then((data) => {
  //       setLoading(false);
  //       setRes(data.data);
  //     });
  //   return () => {
  //     setLoading(false);
  //     setRes([]);
  //     setQ("");
  //   };
  // }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .get("http://localhost:8000/spotify/searchSong", {
        params: { query: q },
      })
      .then((data) => {
        setLoading(false);
        setRes(data.data);
      });
  };

  return (
    <main className="p-2 flex flex-col items-center justify-center">
      <form
        className="flex flex-col gap-2"
        onSubmit={(e) => {
          submit(e);
        }}
      >
        <input
          className="bg-black rounded-md border-2 border-emerald-200"
          onChange={(e) => setQ(e.target.value)}
          value={q}
        />
        <button
          type="submit"
          className="bg-emerald-300 rounded-md font-medium text-sm text-center h-5"
        >
          {loading ? (
            <FaSpinner className="animate-spin duration-75 mx-auto h-5" />
          ) : (
            "search"
          )}
        </button>
      </form>
      <div>{loading ? undefined : <SearchResults results={res} />}</div>
    </main>
  );
}
