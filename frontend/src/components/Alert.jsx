export default function Alert({ success, action }) {
  return (
    <div
      className={
        success ? "text-emerald-100 bg-emerald-700" : "text-red-100 bg-red-700"
      }
    >
      <h1>
        {success
          ? "Congrats! You've " + action + "!"
          : "Crap, you're not " + action}
      </h1>
    </div>
  );
}
