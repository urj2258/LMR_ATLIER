
import CategoriesClient from "./CategoriesClient";

export const dynamic = "force-dynamic";

export default function CategoriesPage() {
    return (
        <>
            <header className="flex justify-between items-end mb-12">
                <div>
                    <nav className="text-[10px] uppercase tracking-widest text-black/40 mb-2">
                        Portal / Architecture
                    </nav>
                    <h1 className="text-3xl font-serif font-light tracking-tight">Manage Categories</h1>
                </div>
            </header>
            <CategoriesClient />
        </>
    );
}
