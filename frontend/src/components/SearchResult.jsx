import { BiDotsVerticalRounded } from "react-icons/bi";
import { useState } from "react";

export default function SearchResult({ result }) {
  const [hover, setHover] = useState(false);
  const [open, setOpen] = useState(false);
  return (
    <div
      className="flex flex-row gap-2 justify-start w-96 group hover:bg-slate-800 p-1"
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
          className=" relative text-lg mt-1 hover:cursor-pointer"
          onClick={() => setOpen(!open)}
        />
      )}
      {open && <p>arstneio</p>}
    </div>
  );
}
