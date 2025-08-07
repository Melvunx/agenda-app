import { ModeToggle } from "@/src/components/ModeToggle";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <div className="flex justify-between mt-5 items-center p-4">
        <h1 className="mx-auto w-max text-3xl">Agenda Manager</h1>
        <span className="flex items-center gap-2">
          Thèmes <ModeToggle />
        </span>
      </div>
      {children}
    </section>
  );
}
