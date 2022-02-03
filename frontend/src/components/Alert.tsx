interface AlertProps {
  success: boolean;
  action: string;
}

export default function Alert({ success, action }: AlertProps) {
  return (
    <div
      className={
        success ? "text-emerald-100 bg-emerald-700" : "text-red-100 bg-red-700"
      }
    >
      <h1>
        {success
          ? `Congrats, you've ${action}!`
          : `Crap, you're not ${action}!`}
      </h1>
    </div>
  );
}
