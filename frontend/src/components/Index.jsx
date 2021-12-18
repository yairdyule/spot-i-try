import { VscSymbolNamespace as Name } from "react-icons/vsc";

export function Index() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900">
      <main className="w-96 pt-1 pb-4 bg-slate-800 flex flex-col  rounded-md shadow-md">
        <form className="flex flex-col px-4 py-2">
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
          <label className="text-slate-300 text-sm font-semibold mb-1">
            password
          </label>
          <span className="inline-flex items-center bg-slate-700 rounded-sm">
            <Name className="w-5 h-5 text-slate-400 mx-1" />
            <input
              type="password"
              className="w-11/12 text-slate-400  font-medium bg-slate-700 rounded-md"
              placeholder="co0l3stPer50n4r0und"
            />
          </span>
        </form>
      </main>
      <footer className="pt-2 text-sm font-medium text-slate-300">
        don't have an account yet?{" "}
        <span className="font-semibold text-emerald-300">
          <a className="cursor-pointer">sign up</a>
        </span>
      </footer>
    </div>
  );
}
