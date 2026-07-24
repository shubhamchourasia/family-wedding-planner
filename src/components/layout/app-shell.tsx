import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({
  children,
}: AppShellProps) {

  return (

    <div
      className="
      relative
      flex
      min-h-screen
      flex-col
      bg-cover
      bg-center
      bg-fixed
      "
      style={{
        backgroundImage:
          "linear-gradient(rgba(251,247,237,0.82),rgba(251,247,237,0.82)), url('/images/wedding-bg.jpg')",
      }}
    >

      <Navbar />


      <main className="flex-1">

        <div className="mx-auto w-full max-w-7xl px-8 py-8">

          {children}

        </div>

      </main>


      <Footer />


    </div>

  );

}