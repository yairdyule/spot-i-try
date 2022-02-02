import SearchResult from "./SearchResult";

export default function SearchResults({ results }) {
  return (
    <div className="pt-8 flex flex-col gap-3 items-center w-full">
      {results.map((result, index) => (
        <SearchResult key={index} result={result} />
      ))}
    </div>
  );
}
