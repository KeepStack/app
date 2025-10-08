import AppSidebar from "@/components/Sidebar/app-sidebar";
import SiteHeader from "@/components/Navbar/site-header";
import PageList from "@/components/PageList/page-list";
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
            <div className="flex flex-1 flex-col gap-4 p-4">
              <div className="bg-muted/50 flex-1 rounded-xl md:min-h-min" />
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Dashboard;