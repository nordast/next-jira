import Logo from "@/components/logo";
import Navigation from "@/components/navigation";
import Projects from "@/components/projects";
import { Separator } from "@/components/ui/separator";
import WorkspaceSwitcher from "@/components/workspace-switcher";

const Sidebar = () => {
  return (
    <aside className="h-full w-full bg-neutral-100 p-4 dark:bg-muted">
      <Logo />

      <Separator className="my-4" />

      <WorkspaceSwitcher />

      <Separator className="my-4" />

      <Navigation />

      <Separator className="my-4" />

      <Projects />
    </aside>
  );
};

export default Sidebar;
