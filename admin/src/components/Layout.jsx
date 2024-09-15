import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <section>
      <Navbar />
      <hr />
      <div className="flex">
        <Sidebar />
        {children}
      </div>
    </section>
  );
}
