import AppSidebar from "@/components/Sidebar/app-sidebar";
import SiteHeader from "@/components/Navbar/site-header";
import PageList from "@/components/PageList/page-list";
import Blank from "@/components/Viewer/blank";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

const Dashboard = () => {
  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col h-screen">
        <SiteHeader />
        <div className="flex flex-1 overflow-hidden">
          <AppSidebar />
          <PageList />
          <SidebarInset className="overflow-auto">
            <Blank /> {/* This will be replaced by the viewer component */}
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Dashboard;