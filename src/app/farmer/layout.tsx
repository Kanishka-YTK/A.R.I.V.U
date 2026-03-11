export default function FarmerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-bio-black flex flex-col relative overflow-hidden">
            <FarmerNavbar />

            {/* Persistent particle background effect for the dashboard */}
            <div className="fixed inset-0 pointer-events-none opacity-20 z-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-bio-green/20 via-transparent to-transparent"></div>

            <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-28 relative z-10 transition-all duration-300">
                {children}
            </main>
        </div>
    );
}

// Client component wrapper
import FarmerNavbar from '@/components/layout/FarmerNavbar';
