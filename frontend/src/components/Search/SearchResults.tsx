import SearchResult from "./SearchResult";

interface SearchResultsPropType {
  results: any[]; //todo
}

export default function SearchResults({ results }: SearchResultsPropType) {
  return (
    <div className="pt-8 flex flex-col gap-3 items-center w-full">
      {results.map((result, index) => (
        <SearchResult key={index} result={result} />
      ))}
    </div>
  );
}
