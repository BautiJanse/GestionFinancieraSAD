'use client';

import { usePathname } from "next/navigation";
import SideBar from "@/components/SideBar";

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const hideSidebar = pathname === "/login"; // Oculte el SideBar en /login

  return (
    <div className="flex">
      {!hideSidebar && <SideBar />}
      <main className="flex-1 transition-all duration-500 ease-in-out p-6">
        {children}
      </main>
    </div>
  );
};

export default LayoutWrapper;
