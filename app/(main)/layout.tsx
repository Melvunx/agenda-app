import { Footer } from "@/src/components/layout/Footer";
import { Header } from "@/src/components/layout/Header";
import { isAuthenticated } from "@/src/server/session";
import { redirect } from "next/navigation";
import { Suspense } from "react";

function LoadingScreen() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
    </div>
  );
}

async function AuthChecker({ children }: { children: React.ReactNode }) {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    redirect("/signin");
  }

  return <>{children}</>;
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <AuthChecker>
        <section>
          <Header />
          {children}
          <Footer />
        </section>
      </AuthChecker>
    </Suspense>
  );
}
