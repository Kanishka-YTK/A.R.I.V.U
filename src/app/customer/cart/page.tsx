'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ShoppingCart, ArrowRight, ArrowLeft, CheckCircle2, MapPin, CreditCard, ShoppingBag, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMockDb } from '@/store/mockDb';
import { useTranslation } from '@/store/languageStore';

export default function CustomerCart() {
    const router = useRouter();
    const { t } = useTranslation();
    const [step, setStep] = useState(1); // 1: Cart, 2: Shipping, 3: Success

    const cart = useMockDb(state => state.cart);
    const removeFromCart = useMockDb(state => state.removeFromCart);
    const updateCartItemQty = useMockDb(state => state.updateCartItemQty);
    const updateCartItemType = useMockDb(state => state.updateCartItemType);
    const clearCart = useMockDb(state => state.clearCart);

    const farmers = useMockDb(state => state.farmers);

    const getPrice = (item: any) => item.purchaseType === 'Wholesale' ? item.wholesalePrice : item.retailPrice;
    
    const total = cart.reduce((acc, item) => acc + (getPrice(item) * item.qty), 0);

    const completeCheckout = (e: React.FormEvent) => {
        e.preventDefault();
        setStep(3);
        setTimeout(() => clearCart(), 1000);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-12 w-full pt-8 px-4">
            
            {/* Checkout Steps Header */}
            <div className="flex justify-between items-center mb-12 relative">
                <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-[#D1D5DB] -z-10"></div>
                {[
                    { num: 1, label: t('cart.review'), i18n: 'cart.review', icon: ShoppingCart },
                    { num: 2, label: t('cart.shipping'), i18n: 'cart.shipping', icon: MapPin },
                    { num: 3, label: t('cart.confirm'), i18n: 'cart.confirm', icon: CheckCircle2 }
                ].map((s) => (
                    <div key={s.num} className="flex flex-col items-center gap-2 bg-[#F0FAF0] px-2 shadow-sm">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors duration-500 ${step >= s.num ? 'bg-[#16A34A] border-[#16A34A] text-[#FFFFFF] shadow-sm' : 'bg-[#FFFFFF] border-[#D1D5DB] text-[#6B7280]'}`}>
                            <s.icon className="w-5 h-5" />
                        </div>
                        <span className={`text-xs uppercase font-rajdhani font-bold tracking-widest ${step >= s.num ? 'text-[#16A34A]' : 'text-[#6B7280]'}`} data-i18n={s.i18n}>{s.label}</span>
                    </div>
                ))}
            </div>

            <AnimatePresence mode="wait">
                {step === 1 && (
                    <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="bg-[#FFFFFF] rounded-[24px] p-8 shadow-sm border border-[#16A34A]">
                        <h2 className="font-cinzel text-3xl font-bold text-[#1A1A1A] mb-6" data-i18n="cart.title">{t('cart.title')}</h2>
                        
                        {cart.length === 0 ? (
                            <div className="py-12 flex flex-col items-center justify-center text-[#6B7280]">
                                <ShoppingBag className="w-16 h-16 mb-4 opacity-50" />
                                <p className="font-lato text-lg" data-i18n="cart.empty">{t('cart.empty')}</p>
                                <button onClick={() => router.push('/customer/shop')} className="mt-6 text-[#16A34A] uppercase tracking-widest font-rajdhani font-bold border-b-2 border-[#16A34A]" data-i18n="cart.continue">{t('cart.continue')}</button>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {cart.map(item => {
                                    const farmer = farmers.find(f => f.id === item.farmerId);
                                    return (
                                    <div key={item.cartId} className="flex flex-col md:flex-row items-start md:items-center gap-6 p-4 rounded-2xl bg-[#F0FAF0] border border-[#D1D5DB] relative group">
                                        <div className="w-full md:w-24 h-48 md:h-24 rounded-xl overflow-hidden shrink-0">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 flex flex-col w-full">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="font-rajdhani text-xl font-bold text-[#1A1A1A] mt-1" data-i18n={item.name}>{t(item.name)}</h3>
                                                    {farmer && (
                                                        <div className="text-xs text-[#6B7280] font-lato mb-2 mt-1">
                                                            <span data-i18n="cart.farmer">{t('cart.farmer')}</span>: <span className="font-bold underline decoration-dashed underline-offset-2">{farmer.name}</span> <span className="text-[#D97706]">({farmer.location})</span>
                                                        </div>
                                                    )}
                                                    
                                                    {/* Purchase Type Toggle */}
                                                    <div className="flex items-center gap-2 mt-2 bg-[#FFFFFF] w-fit p-1 rounded-lg border border-[#D1D5DB]">
                                                         <button 
                                                            onClick={() => updateCartItemType(item.cartId, 'Retail')}
                                                            className={`px-3 py-1 text-[10px] uppercase font-bold tracking-widest rounded-md transition-colors ${item.purchaseType === 'Retail' ? 'bg-[#16A34A] text-[#FFFFFF]' : 'text-[#6B7280] hover:bg-[#F3F4F6]'}`}
                                                        >
                                                            <span data-i18n="cart.retail">{t('cart.retail')}</span> (${item.retailPrice})
                                                        </button>
                                                        <button 
                                                            onClick={() => updateCartItemType(item.cartId, 'Wholesale')}
                                                            className={`px-3 py-1 text-[10px] uppercase font-bold tracking-widest rounded-md transition-colors ${item.purchaseType === 'Wholesale' ? 'bg-[#D97706] text-[#FFFFFF]' : 'text-[#6B7280] hover:bg-[#F3F4F6]'}`}
                                                        >
                                                            <span data-i18n="cart.wholesale">{t('cart.wholesale')}</span> (${item.wholesalePrice})
                                                        </button>
                                                    </div>
                                                </div>
                                                <button onClick={() => {
                                                    if (window.confirm(t('cart.remove_confirm') || 'Are you sure you want to remove this item?')) {
                                                        removeFromCart(item.cartId);
                                                    }
                                                }} className="text-[#DC2626] hover:text-[#B91C1C] p-2 bg-[#FEE2E2] rounded-full transition-colors hidden md:block group-hover:block absolute top-4 right-4 md:static">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>

                                            <div className="flex justify-between items-center mt-6 md:mt-auto pt-4 border-t md:border-t-0 border-[#D1D5DB]">
                                                <div className="flex items-center gap-4 bg-[#FFFFFF] rounded-lg p-1 border border-[#D1D5DB]">
                                                    <button onClick={() => updateCartItemQty(item.cartId, item.qty - 1)} className="w-8 h-8 flex items-center justify-center text-[#1A1A1A] hover:bg-[#F0FAF0] rounded-md font-bold">-</button>
                                                    <span className="font-lato font-bold">{item.qty}</span>
                                                    <button onClick={() => updateCartItemQty(item.cartId, item.qty + 1)} className="w-8 h-8 flex items-center justify-center text-[#1A1A1A] hover:bg-[#F0FAF0] rounded-md font-bold">+</button>
                                                </div>
                                                <div className="text-right">
                                                    <span className="text-xs text-[#6B7280] hidden md:block" data-i18n="cart.subtotal">{t('cart.subtotal')}</span>
                                                    <span className="font-rajdhani font-bold text-2xl text-[#16A34A]">${(getPrice(item) * item.qty).toFixed(2)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )})}

                                <div className="border-t border-[#D1D5DB] pt-6 flex justify-between items-center bg-[#F0FAF0] p-6 rounded-2xl border">
                                    <div className="text-[#374151] font-lato bg-[#FFFFFF] px-4 justify-center items-center py-2 rounded-lg border border-[#D1D5DB]">
                                        <span data-i18n="cart.total_items">{t('cart.total_items')}</span>: <span className="font-bold text-[#1A1A1A] ml-2">{cart.reduce((acc, item) => acc + item.qty, 0)}</span>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className="text-sm uppercase font-rajdhani tracking-widest text-[#6B7280] mb-1" data-i18n="cart.grand_total">{t('cart.grand_total')}</span>
                                        <span className="font-cinzel text-4xl font-bold text-[#16A34A]">${total.toFixed(2)}</span>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center pt-4">
                                    <button onClick={() => router.push('/customer/shop')} className="hidden md:block text-[#6B7280] font-bold font-rajdhani hover:text-[#16A34A] tracking-widest uppercase transition-colors border-b border-transparent hover:border-[#16A34A]">
                                        <span data-i18n="cart.view_more">{t('cart.view_more')}</span>
                                    </button>
                                    <button onClick={() => setStep(2)} className="w-full md:w-auto bg-[#1A1A1A] text-[#FFFFFF] px-8 py-4 rounded-xl font-rajdhani font-bold uppercase tracking-widest text-lg hover:bg-[#374151] transition-all shadow-sm flex items-center justify-center gap-2">
                                        <span data-i18n="cart.checkout">{t('cart.checkout')}</span> <ArrowRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div key="step2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="bg-[#FFFFFF] rounded-[24px] p-8 shadow-sm border border-[#16A34A]">
                        <div className="flex items-center gap-4 mb-8 border-b border-[#D1D5DB] pb-4">
                            <button onClick={() => setStep(1)} className="p-2 rounded-full hover:bg-[#F0FAF0] text-[#16A34A] transition-colors"><ArrowLeft className="w-6 h-6" /></button>
                            <h2 className="font-cinzel text-3xl font-bold text-[#1A1A1A]" data-i18n="ship.title">{t('ship.title')}</h2>
                        </div>
                        
                        <form onSubmit={completeCheckout} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <input type="text" placeholder={t('ship.name_label') || "Full Name"} data-i18n="ship.name_label" required className="w-full px-4 py-3 rounded-xl bg-[#F9FAFB] border border-[#D1D5DB] text-[#374151] focus:outline-none focus:border-[#16A34A] focus:ring-1 focus:ring-[#16A34A]" />
                                <input type="email" placeholder={t('ship.email_label') || "Email Address"} data-i18n="ship.email_label" required className="w-full px-4 py-3 rounded-xl bg-[#F9FAFB] border border-[#D1D5DB] text-[#374151] focus:outline-none focus:border-[#16A34A] focus:ring-1 focus:ring-[#16A34A]" />
                            </div>
                            
                            <input type="text" placeholder={t('ship.address_label') || "Street Address"} data-i18n="ship.address_label" required className="w-full px-4 py-3 rounded-xl bg-[#F9FAFB] border border-[#D1D5DB] text-[#374151] focus:outline-none focus:border-[#16A34A] focus:ring-1 focus:ring-[#16A34A]" />
                            
                             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                <input type="text" placeholder={t('ship.city_label') || "City"} data-i18n="ship.city_label" required className="col-span-2 md:col-span-1 w-full px-4 py-3 rounded-xl bg-[#F9FAFB] border border-[#D1D5DB] text-[#374151] focus:outline-none focus:border-[#16A34A] focus:ring-1 focus:ring-[#16A34A]" />
                                <input type="text" placeholder={t('ship.state_label') || "State/Province"} data-i18n="ship.state_label" required className="col-span-2 md:col-span-1 w-full px-4 py-3 rounded-xl bg-[#F9FAFB] border border-[#D1D5DB] text-[#374151] focus:outline-none focus:border-[#16A34A] focus:ring-1 focus:ring-[#16A34A]" />
                                <input type="text" placeholder={t('ship.zip_label') || "ZIP/Postal Code"} data-i18n="ship.zip_label" required className="col-span-2 md:col-span-1 w-full px-4 py-3 rounded-xl bg-[#F9FAFB] border border-[#D1D5DB] text-[#374151] focus:outline-none focus:border-[#16A34A] focus:ring-1 focus:ring-[#16A34A]" />
                                <select required className="col-span-2 md:col-span-1 w-full px-4 py-3 rounded-xl bg-[#F9FAFB] border border-[#D1D5DB] text-[#374151] focus:outline-none focus:border-[#16A34A] focus:ring-1 focus:ring-[#16A34A]">
                                    <option value="" data-i18n="ship.country_label">{t('ship.country_label') || 'Country'}</option>
                                    <option value="US">United States</option>
                                    <option value="UK">United Kingdom</option>
                                    <option value="IN">India</option>
                                    <option value="UAE">UAE</option>
                                </select>
                            </div>

                            {/* Payment Box */}
                             <div className="bg-[#1A1A1A] rounded-2xl p-6 border-2 border-[#16A34A] mt-8 flex flex-col md:flex-row justify-between items-center gap-6 shadow-xl">
                                <div className="flex flex-col gap-2 w-full md:w-auto text-[#FFFFFF]">
                                    <h3 className="font-rajdhani uppercase tracking-widest text-sm text-[#86EFAC] mb-2" data-i18n="ship.summary">{t('ship.summary')}</h3>
                                    <div className="flex justify-between md:justify-start gap-12 font-lato text-sm opacity-80"><span data-i18n="cart.subtotal">{t('cart.subtotal')}</span> <span>${total.toFixed(2)}</span></div>
                                    <div className="flex justify-between md:justify-start gap-12 font-lato text-sm opacity-80"><span data-i18n="ship.fee">{t('ship.fee')}</span> <span>$25.00</span></div>
                                    <div className="flex justify-between md:justify-start gap-12 font-rajdhani font-bold text-2xl text-[#4ADE80] pt-3 mt-1 border-t border-[#FFFFFF]/20"><span data-i18n="cart.total">{t('cart.total') || 'Total'}</span> <span className="neon-text-green">${(total + 25).toFixed(2)}</span></div>
                                </div>
                                <button type="submit" className="w-full md:w-[300px] bg-[#16A34A] text-[#FFFFFF] px-10 py-5 rounded-xl font-rajdhani font-bold uppercase tracking-widest text-lg hover:bg-[#4ADE80] hover:text-[#1A1A1A] transition-colors shadow-[0_0_20px_rgba(22,163,74,0.4)] hover:shadow-[0_0_30px_rgba(74,222,128,0.6)] flex justify-center items-center gap-3">
                                    <CreditCard className="w-6 h-6" /> <span data-i18n="ship.complete">{t('ship.complete')}</span>
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}

                {step === 3 && (
                    <motion.div key="step3" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#FFFFFF] rounded-[24px] p-12 text-center shadow-md border border-[#16A34A] flex flex-col items-center">
                        <motion.div 
                            initial={{ scale: 0 }} 
                            animate={{ scale: 1 }} 
                            transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}
                            className="w-24 h-24 bg-[#F0FAF0] rounded-full flex items-center justify-center mb-6 border-4 border-[#16A34A] relative"
                        >
                            <div className="absolute inset-0 rounded-full border-4 border-[#16A34A] animate-ping opacity-20"></div>
                            <CheckCircle2 className="w-12 h-12 text-[#16A34A]" />
                        </motion.div>
                        
                        <h2 className="font-cinzel text-4xl font-bold text-[#1A1A1A] mb-2" data-i18n="conf.verified">{t('conf.verified')}</h2>
                        <h3 className="font-rajdhani text-2xl font-bold text-[#16A34A] mb-4" data-i18n="conf.success">{t('conf.success')}</h3>
                        <p className="font-lato text-[#374151] text-lg mb-8 max-w-md" data-i18n="conf.desc">{t('conf.desc')}</p>
                        
                        <div className="bg-[#F0FAF0] rounded-xl p-4 font-mono text-[#16A34A] mb-8 border border-[#16A34A] inline-block font-bold shadow-sm">
                            TxID: 0x{Math.random().toString(16).substring(2, 10)}...{Math.random().toString(16).substring(2, 6)}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button onClick={() => router.push('/customer/orders')} className="bg-[#1A4731] text-[#FFFFFF] px-8 py-3 rounded-[8px] font-rajdhani font-bold uppercase tracking-widest hover:bg-[#16A34A] transition-colors shadow-sm">
                                <span data-i18n="conf.track">{t('conf.track')}</span>
                            </button>
                            <button onClick={() => router.push('/customer/shop')} className="bg-[#FFFFFF] text-[#1A1A1A] border border-[#1A1A1A] px-8 py-3 rounded-[8px] font-rajdhani font-bold uppercase tracking-widest hover:bg-[#F3F4F6] transition-colors">
                                <span data-i18n="conf.market">{t('conf.market')}</span>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
