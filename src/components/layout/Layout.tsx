import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";

export function Layout() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div>
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="lg:pl-72">
        <TopBar onMenuButtonClick={() => setSidebarOpen(true)} />

        <main className="py-10">
          <div className="mx-auto container px-4 ">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
