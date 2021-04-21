import Header from "./Header";

export default function Page({ children }) {
  return (
    <div>
      <Header />
      <h1>Page Layout</h1>
      {children}
    </div>
  );
}
