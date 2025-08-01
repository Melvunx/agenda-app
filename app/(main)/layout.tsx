import { Footer } from "@/src/components/layout/footer";
import { Header } from "@/src/components/layout/header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <Header />
      {children}
      <Footer />
    </section>
  );
}
