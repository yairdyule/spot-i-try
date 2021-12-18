import { Link } from "react-router-dom";
import { VscSymbolNamespace as Name } from "react-icons/vsc";
import { BiKey as Key } from "react-icons/bi";
import { MdOutlineAlternateEmail as At } from "react-icons/md";

export function SignUp() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900">
      <h1 className="mx-auto font-bold text-lg pb-1 text-emerald-300">
        sign up
      </h1>
      <main className="w-96 pt-1 pb-4 bg-slate-800 flex flex-col  rounded-md shadow-md">
        <form className="flex flex-col px-4 pt-2">
          <label className="text-slate-300 text-sm font-semibold mb-1">
            username
          </label>
          <span className="inline-flex items-center bg-slate-700 rounded-sm">
            <Name className="w-5 h-5 text-slate-400 mx-1" />
            <input
              className="w-11/12 text-slate-400  font-medium bg-slate-700 rounded-md"
              type="text"
              placeholder="co0l3stPer50n4r0und"
            />
          </span>
          <label className="text-slate-300 text-sm font-semibold mt-2 mb-1">
            email
          </label>
          <span className="inline-flex items-center bg-slate-700 rounded-sm">
            <At className="w-5 h-5 text-slate-400 mx-1" />
            <input
              className="w-11/12 text-slate-400  font-medium bg-slate-700 rounded-md"
              type="email"
              placeholder="pe3p@p0p.com"
            />
          </span>
          <label className="text-slate-300 text-sm font-semibold mb-1 mt-2">
            password
          </label>
          <span className="inline-flex items-center bg-slate-700 rounded-sm">
            <Key className="w-5 h-5 text-slate-400 mx-1" />
            <input
              type="password"
              className="w-11/12 text-slate-400  font-medium bg-slate-700 rounded-md"
              placeholder="co0l3stPer50n4r0und"
            />
          </span>
          <button className="inline-flex mt-3 mx-auto px-2 font-semibold text-slate-400 bg-slate-700 rounded-md hover:bg-slate-900 ">
            create account
          </button>
        </form>
      </main>
      <footer className="pt-2 text-xs font-medium text-slate-300">
        ur password is encrypted, dw
      </footer>
    </div>
  );
}
