import { BiDotsVerticalRounded } from "react-icons/bi";
import { useState } from "react";

interface SearchResultPropTypes {
  result: {
    img: string;
    name: string;
    artists: string[];
  };
}

enum Classnames {
  div = "flex flex-row gap-2 justify-start w-96 group hover:bg-slate-800 p-1",
  icon = "relative text-lg mt-1 hover:cursor-pointer",
}

export default function SearchResult({ result }: SearchResultPropTypes) {
  const [hover, setHover] = useState(false);
  const [open, setOpen] = useState(false);
  return (
    <div
      className={Classnames.div}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <img src={result.img} width="60px" />
      <div className="flex flex-col gap-1 text-left">
        <h3 className="font-semibold">{result.name}</h3>
        <h4>{result.artists[0]}</h4>
      </div>
      {hover && (
        <BiDotsVerticalRounded
          className={Classnames.icon}
          onClick={() => setOpen(!open)}
        />
      )}
      {open && <p>arstneio</p>}
    </div>
  );
}
