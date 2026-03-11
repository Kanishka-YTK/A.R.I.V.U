'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { CheckCircle, Globe, ShieldCheck, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useTranslation } from '@/store/languageStore';

export default function CheckoutPage() {
    const router = useRouter();
    const { t } = useTranslation();
    const [step, setStep] = useState(1);
    const [isProcessing, setIsProcessing] = useState(false);

    const countries = [
        "United States", "India", "United Kingdom", "Australia", "Canada",
        "Germany", "France", "Japan", "Brazil", "South Africa", "United Arab Emirates"
    ];

    const handleConfirm = (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            setStep(3); // success screen
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-bio-black flex flex-col items-center justify-center py-12 px-4 sm:px-6 relative overflow-hidden">
            {/* Bio background */}
            <div className="fixed inset-0 pointer-events-none z-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>

            <div className="w-full max-w-4xl relative z-10">

                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="font-cinzel text-4xl text-bio-cream tracking-widest neon-text-green mb-2">Secure Checkout</h1>
                    <p className="font-lato text-bio-cream/50 flex items-center justify-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-bio-green" /> End-to-End AES-256 Encrypted
                    </p>
                </div>

                {/* Stepper */}
                <div className="flex items-center justify-center mb-12">
                    <div className={`flex items-center ${step >= 1 ? 'text-bio-green' : 'text-white/20'}`}>
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center font-rajdhani font-bold border-2 ${step >= 1 ? 'border-bio-green shadow-[0_0_10px_rgba(0,255,136,0.5)]' : 'border-white/20'}`}>1</span>
                        <span className="ml-2 font-rajdhani uppercase tracking-widest text-sm hidden sm:block">Cart Review</span>
                    </div>
                    <div className={`w-16 h-[2px] mx-4 ${step >= 2 ? 'bg-bio-green' : 'bg-white/10'}`}></div>
                    <div className={`flex items-center ${step >= 2 ? 'text-bio-green' : 'text-white/20'}`}>
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center font-rajdhani font-bold border-2 ${step >= 2 ? 'border-bio-green shadow-[0_0_10px_rgba(0,255,136,0.5)]' : 'border-white/20'}`}>2</span>
                        <span className="ml-2 font-rajdhani uppercase tracking-widest text-sm hidden sm:block">Logistics</span>
                    </div>
                    <div className={`w-16 h-[2px] mx-4 ${step >= 3 ? 'bg-bio-green' : 'bg-white/10'}`}></div>
                    <div className={`flex items-center ${step >= 3 ? 'text-bio-green' : 'text-white/20'}`}>
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center font-rajdhani font-bold border-2 ${step >= 3 ? 'border-bio-green shadow-[0_0_10px_rgba(0,255,136,0.5)]' : 'border-white/20'}`}>3</span>
                        <span className="ml-2 font-rajdhani uppercase tracking-widest text-sm hidden sm:block">Confirmation</span>
                    </div>
                </div>

                {/* Content Wrapper */}
                <div className="glass-card rounded-3xl p-8 md:p-12 border border-bio-green/20 relative overflow-hidden">

                    {step === 1 && (
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                            <h2 className="font-rajdhani text-2xl font-bold uppercase tracking-widest text-bio-cream border-b border-white/10 pb-4" data-i18n="ship.summary">{t('ship.summary') || 'Order Summary'}</h2>
                            <div className="flex items-center justify-between pb-4 border-b border-white/10">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center">
                                        <img src="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=100" alt="Item" className="w-12 h-12 rounded object-cover" />
                                    </div>
                                    <div>
                                        <h3 className="font-rajdhani text-lg font-bold text-bio-cream" data-i18n="prod.heirloom_tomatoes">{t('prod.heirloom_tomatoes') || 'Organic Heirloom Tomatoes'}</h3>
                                        <p className="font-lato text-sm text-bio-green"><span data-i18n="shop.wholesale">{t('shop.wholesale')}</span> Batch (50 units)</p>
                                    </div>
                                </div>
                                <span className="font-cinzel text-2xl font-bold text-bio-cream">$150.00</span>
                            </div>
                            <div className="flex items-center justify-between font-rajdhani text-lg uppercase tracking-widest text-bio-cream/60">
                                <span>Logistics & Tax</span>
                                <span>Calculated next</span>
                            </div>
                            <div className="flex items-center justify-between font-rajdhani text-2xl font-bold uppercase tracking-widest text-bio-cream pt-4 border-t border-white/10">
                                <span>Subtotal</span>
                                <span>$150.00</span>
                            </div>
                            <div className="flex justify-end pt-4">
                                <Button onClick={() => setStep(2)}>Continue to Shipping <ChevronRight className="w-5 h-5 ml-2" /></Button>
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                            <form onSubmit={handleConfirm} className="space-y-8">
                                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                                    <h2 className="font-rajdhani text-2xl font-bold uppercase tracking-widest text-bio-cream flex items-center gap-2">
                                        <Globe className="w-6 h-6 text-bio-teal" /> International Logistics Detailing
                                    </h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="font-rajdhani text-sm uppercase tracking-widest text-bio-cream/60">Full Name</label>
                                        <input required type="text" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-bio-cream font-lato focus:outline-none focus:border-bio-green/50 neon-underline transition-colors" placeholder="e.g. John Doe" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="font-rajdhani text-sm uppercase tracking-widest text-bio-cream/60">Email Associated with Blockchain</label>
                                        <input required type="email" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-bio-cream font-lato focus:outline-none focus:border-bio-green/50 neon-underline transition-colors" placeholder="john@example.com" />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="font-rajdhani text-sm uppercase tracking-widest text-bio-cream/60">Address Line 1</label>
                                        <input required type="text" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-bio-cream font-lato focus:outline-none focus:border-bio-green/50 neon-underline transition-colors" placeholder="123 Export Avenue" />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="font-rajdhani text-sm uppercase tracking-widest text-bio-cream/60">Address Line 2 (Optional)</label>
                                        <input type="text" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-bio-cream font-lato focus:outline-none focus:border-bio-green/50 neon-underline transition-colors" placeholder="Suite 400" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="font-rajdhani text-sm uppercase tracking-widest text-bio-cream/60">City</label>
                                        <input required type="text" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-bio-cream font-lato focus:outline-none focus:border-bio-green/50 neon-underline transition-colors" placeholder="New York" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="font-rajdhani text-sm uppercase tracking-widest text-bio-cream/60">State / Province</label>
                                        <input required type="text" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-bio-cream font-lato focus:outline-none focus:border-bio-green/50 neon-underline transition-colors" placeholder="NY" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="font-rajdhani text-sm uppercase tracking-widest text-bio-cream/60">Pincode / ZIP</label>
                                        <input required type="text" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-bio-cream font-lato focus:outline-none focus:border-bio-green/50 neon-underline transition-colors" placeholder="10001" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="font-rajdhani text-sm uppercase tracking-widest text-bio-cream/60">Country</label>
                                        <select required defaultValue="" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-bio-cream font-lato focus:outline-none focus:border-bio-green/50 neon-underline transition-colors appearance-none">
                                            <option value="" disabled>Select Destination Country...</option>
                                            {countries.map(c => <option key={c} value={c} className="bg-bio-black">{c}</option>)}
                                        </select>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                                    <Button type="button" variant="ghost" onClick={() => setStep(1)}>Back</Button>
                                    <Button type="submit" variant="primary" size="lg" disabled={isProcessing} className="w-64">
                                        {isProcessing ? 'Encrypting & Confirming...' : 'Confirm Global Order'}
                                    </Button>
                                </div>
                            </form>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-12 text-center space-y-6">
                            <div className="relative">
                                <div className="absolute inset-0 bg-bio-green rounded-full blur-xl opacity-20 animate-pulse"></div>
                                <CheckCircle className="w-24 h-24 text-bio-green relative z-10" />
                            </div>
                            <h2 className="font-cinzel text-5xl font-bold text-bio-cream tracking-wide">Order Accepted</h2>
                            <p className="font-lato text-bio-cream/70 max-w-md mx-auto">
                                Your international shipment has been queued in the system. The transaction hash `0x98f...d3e1` has been recorded. Logistics operations will commence.
                            </p>
                            <div className="pt-8">
                                <Button onClick={() => router.push('/customer')} variant="glass">Return to Marketplace</Button>
                            </div>
                        </motion.div>
                    )}

                </div>
            </div>
        </div>
    );
}
