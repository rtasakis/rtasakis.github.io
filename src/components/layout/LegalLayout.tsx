import { Link } from "react-router-dom";
import logo from "@/assets/images/logo-dark.webp";
import { ArrowLeft } from "lucide-react";

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const goTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      {/* HEADER */}
      <header className="border-b border-black/10">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          {/* LOGO */}
          <Link to="/" onClick={goTop} className="inline-flex items-center">
            <img
              src={logo}
              alt="Tasakis Venture Strategy"
              className="h-20 w-auto"
            />
          </Link>

          {/* BACK TO HOME */}
          <Link
            to="/"
            onClick={goTop}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition"
          >
            <ArrowLeft size={16} strokeWidth={2} />
            <span>Back to home</span>
          </Link>
        </div>
      </header>

      {/* CONTENT */}
      <main>
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="max-w-3xl">{children}</div>
        </div>
      </main>
    </div>
  );
}
