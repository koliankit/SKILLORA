import AppShell from "@/components/AppShell";
import PageTransition from "@/components/motion/PageTransition";

/** Mounted once for every workspace page, so the header, nav and copilot keep their state between routes. */
export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell>
      <PageTransition>{children}</PageTransition>
    </AppShell>
  );
}
