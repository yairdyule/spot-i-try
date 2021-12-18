import { VscSymbolNamespace as Name } from "react-icons/vsc";
import { BiKey as Key } from "react-icons/bi";
import { Link } from "react-router-dom";

export function Index() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900">
      <h1 className="mx-auto font-bold text-lg pb-1 text-emerald-300">
        join us
      </h1>
      <main className="w-96 pt-1 pb-2 bg-slate-800 flex flex-col  rounded-md shadow-md">
        <form className="flex flex-col px-4 py-2">
          <label className="text-emerald-300 text-sm font-semibold mb-1">
            username
          </label>
          <span className="inline-flex items-center bg-slate-700 rounded-sm">
            <Name className="w-5 h-5 text-slate-400 mx-1" />
            <input
              className="w-11/12 text-slate-400  font-medium bg-slate-700 focus:outline-none"
              type="text"
              placeholder="co0l3stPer50n4r0und"
            />
          </span>
          <label className="text-emerald-300 text-sm font-semibold mb-1 mt-2">
            password
          </label>
          <span className="inline-flex items-center bg-slate-700 rounded-sm">
            <Key className="w-5 h-5 text-slate-400 mx-1" />
            <input
              type="password"
              className="w-11/12 text-slate-400  font-medium bg-slate-700 focus:outline-none"
              placeholder="p4s5w0rd"
            />
          </span>

          <Link
            className="w-24 mt-3 mx-auto font-semibold text-slate-400 bg-slate-700 rounded-md hover:bg-slate-900 "
            to="/homepage"
          >
            <button className="w-full inline-flex items-center justify-center text-center">
              sign in
            </button>
          </Link>
        </form>
      </main>
      <footer className="pt-2 text-sm font-medium text-slate-500">
        don't have an account yet?{" "}
        <span className="font-semibold text-emerald-300">
          <Link to="/SignUp" className="cursor-pointer">
            sign up
          </Link>
        </span>
      </footer>
    </div>
  );
}
