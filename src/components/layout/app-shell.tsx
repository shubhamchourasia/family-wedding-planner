import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-rose-50 via-rose-100/30 to-pink-50 ">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1">
        <div className="mx-auto w-full max-w-7xl px-8 py-8">
          {children}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}