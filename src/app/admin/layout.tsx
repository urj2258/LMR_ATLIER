
import AdminSidebar from "@/components/admin/Sidebar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="bg-[#fcfaf7] text-[#121212] min-h-screen flex">
            <AdminSidebar />
            <main className="flex-grow ml-64 p-12">
                {children}
            </main>
        </div>
    );
}
