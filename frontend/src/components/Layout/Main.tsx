interface MainProps {
  children: React.ReactNode;
}

export default function Main(props: MainProps) {
  return (
    <main className="p-2 flex flex-col items-center justify-center">
      {props.children}
    </main>
  );
}
