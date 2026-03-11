export default function CustomerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-bio-black flex flex-col overflow-x-hidden relative">
            <CustomerNavbar />

            <main className="flex-1 mt-20 relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-8">
                {children}
            </main>

            {/* Decorative gradient blobs for luxury bio feel */}
            <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-bio-green/10 blur-[150px] rounded-full pointer-events-none z-0"></div>
            <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-bio-gold/5 blur-[150px] rounded-full pointer-events-none z-0"></div>
        </div>
    );
}

// Inline for demo
import CustomerNavbar from '@/components/layout/CustomerNavbar';
