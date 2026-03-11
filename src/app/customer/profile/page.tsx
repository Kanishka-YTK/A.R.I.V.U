'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { UserCircle, ShieldCheck, Mail, MapPin, Edit3, Save, CheckCircle2, History, Package } from 'lucide-react';
import { useMockDb } from '@/store/mockDb';
import { useState, useEffect } from 'react';
import { useTranslation } from '@/store/languageStore';

export default function CustomerProfile() {
    const { t } = useTranslation();
    const user = useMockDb((state) => state.currentUser);
    const updateUser = useMockDb((state) => state.updateUser);
    
    const [activeTab, setActiveTab] = useState('account'); // account, orders
    const [showToast, setShowToast] = useState(false);

    const [name, setName] = useState('');

    useEffect(() => {
        if (user) {
            setName(user.name || '');
        }
    }, [user]);

    const handleSave = () => {
        if (user) {
            updateUser(user.id, { name });
        }
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8 pb-12 w-full pt-8 px-4 relative">
            
            <AnimatePresence>
                {showToast && (
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed top-24 right-8 bg-[#16A34A] text-[#FFFFFF] px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 z-50 font-rajdhani font-bold tracking-widest text-sm"
                    >
                        <CheckCircle2 className="w-5 h-5" /> 
                        <span data-i18n="prof.toast_success">{t('prof.toast_success')}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Profile Header Block */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#FFFFFF] border border-[#16A34A]/30 shadow-md rounded-[32px] p-8 md:p-12 relative overflow-hidden"
            >
                {/* Background Decor */}
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-[#1A4731] to-[#0F2D1F]"></div>

                <div className="relative pt-8 flex flex-col md:flex-row items-center md:items-end gap-6 mb-8">
                    <div className="w-32 h-32 rounded-full border-4 border-[#FFFFFF] bg-[#F0FAF0] flex items-center justify-center shadow-lg relative shrink-0">
                        <span className="text-[#1A4731] font-cinzel text-6xl font-bold mb-2">{user?.name?.charAt(0).toUpperCase() || 'C'}</span>
                    </div>
                    <div className="text-center md:text-left flex-1">
                        <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                            <h1 className="font-cinzel text-3xl font-bold text-[#1A1A1A]">{user?.name}</h1>
                            <ShieldCheck className="w-6 h-6 text-[#16A34A]" />
                        </div>
                        <p className="font-rajdhani uppercase tracking-widest text-[#D97706] font-bold text-sm bg-[#FEF3C7] px-3 py-1 rounded-full inline-block" data-i18n="prof.verified_buyer">
                            {t('prof.verified_buyer')}
                        </p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap gap-2 border-b border-[#D1D5DB] pb-4 mt-8">
                    <button 
                        onClick={() => setActiveTab('account')}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-rajdhani uppercase tracking-widest font-bold transition-all ${activeTab === 'account' ? 'bg-[#16A34A] text-[#FFFFFF]' : 'text-[#6B7280] hover:bg-[#F3F4F6] hover:text-[#1A1A1A]'}`}
                    >
                        <UserCircle className="w-5 h-5"/> 
                        <span data-i18n="prof.tab_account">{t('prof.tab_account')}</span>
                    </button>
                    <button 
                        onClick={() => setActiveTab('orders')}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-rajdhani uppercase tracking-widest font-bold transition-all ${activeTab === 'orders' ? 'bg-[#1A4731] text-[#FFFFFF]' : 'text-[#6B7280] hover:bg-[#F3F4F6] hover:text-[#1A1A1A]'}`}
                    >
                        <History className="w-5 h-5"/> 
                        <span data-i18n="prof.tab_history">{t('prof.tab_history')}</span>
                    </button>
                </div>
                
                <AnimatePresence mode="wait">
                    {/* ACCOUNT TAB */}
                    {activeTab === 'account' && (
                        <motion.div key="account" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-8 grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="space-y-6">
                                <h3 className="font-rajdhani font-bold text-xl uppercase tracking-widest text-[#1A1A1A] border-b border-[#D1D5DB] pb-3" data-i18n="prof.edit_title">{t('prof.edit_title')}</h3>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="font-rajdhani uppercase tracking-widest text-xs font-bold text-[#6B7280]" data-i18n="prof.name_label">{t('prof.name_label')}</label>
                                        <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full bg-[#F9FAFB] border border-[#D1D5DB] text-[#1A1A1A] px-4 py-3 rounded-xl focus:outline-none focus:border-[#16A34A]" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="font-rajdhani uppercase tracking-widest text-xs font-bold text-[#6B7280]" data-i18n="prof.email_label">{t('prof.email_label')}</label>
                                        <div className="relative">
                                            <Mail className="w-5 h-5 text-[#9CA3AF] absolute left-4 top-1/2 -translate-y-1/2" />
                                            <input type="email" defaultValue={user?.email || 'customer@example.com'} disabled className="w-full bg-[#E5E7EB] border border-[#D1D5DB] text-[#6B7280] pl-12 pr-4 py-3 rounded-xl cursor-not-allowed" />
                                        </div>
                                        <span className="text-[10px] text-[#6B7280] font-lato" data-i18n="prof.email_note">{t('prof.email_note')}</span>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="font-rajdhani uppercase tracking-widest text-xs font-bold text-[#6B7280]" data-i18n="prof.phone_label">{t('prof.phone_label')}</label>
                                        <input type="tel" defaultValue="+1 (555) 987-6543" className="w-full bg-[#F9FAFB] border border-[#D1D5DB] text-[#1A1A1A] px-4 py-3 rounded-xl focus:outline-none focus:border-[#16A34A]" />
                                    </div>
                                </div>
                                <button onClick={handleSave} className="bg-[#16A34A] text-[#FFFFFF] w-full py-4 rounded-xl font-rajdhani font-bold uppercase tracking-widest hover:bg-[#1A4731] transition-colors shadow-md flex justify-center items-center gap-2">
                                    <Save className="w-4 h-4"/> 
                                    <span data-i18n="prof.save_btn">{t('prof.save_btn')}</span>
                                </button>
                            </div>

                            <div className="space-y-6">
                                <div className="flex justify-between items-center border-b border-[#D1D5DB] pb-3">
                                    <h3 className="font-rajdhani font-bold text-xl uppercase tracking-widest text-[#1A1A1A]" data-i18n="prof.addr_title">{t('prof.addr_title')}</h3>
                                    <button className="text-xs font-rajdhani font-bold uppercase tracking-widest text-[#16A34A] hover:underline" data-i18n="prof.addr_add">{t('prof.addr_add')}</button>
                                </div>
                                                                <div className="bg-[#F0FAF0] border border-[#16A34A]/30 rounded-2xl p-5 flex gap-4 relative hover:border-[#16A34A] transition-colors">
                                    <div className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-widest bg-[#16A34A]/20 text-[#1A4731] px-2 py-1 rounded-md" data-i18n="prof.addr_default">{t('prof.addr_default')}</div>
                                    <MapPin className="w-6 h-6 text-[#16A34A] shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-rajdhani font-bold text-[#1A1A1A] text-lg mb-1" data-i18n="prof.addr_home">{t('prof.addr_home')}</h4>
                                        <p className="font-lato text-sm text-[#374151] leading-relaxed">123 Green Valley Road<br/>Eco District, EC 90210<br/>United States</p>
                                        <div className="flex gap-4 mt-4">
                                            <button className="text-[#16A34A] text-xs font-bold font-rajdhani uppercase tracking-widest hover:underline uppercase flex items-center gap-1">
                                                <Edit3 className="w-3 h-3"/> 
                                                <span data-i18n="prof.edit">{t('prof.edit')}</span>
                                            </button>
                                            <button className="text-[#DC2626] text-xs font-bold font-rajdhani uppercase tracking-widest hover:underline uppercase" data-i18n="prof.delete">
                                                {t('prof.delete')}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* ORDERS TAB */}
                    {activeTab === 'orders' && (
                        <motion.div key="orders" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-8">
                            <h3 className="font-rajdhani font-bold text-xl uppercase tracking-widest text-[#1A1A1A] border-b border-[#D1D5DB] pb-3 mb-6" data-i18n="prof.recent_title">{t('prof.recent_title')}</h3>
                            <div className="space-y-4">
                                {[
                                    { id: 'ORD-9482', date: '2024-03-05', total: 45.00, status: 'Processing', items: 2 },
                                    { id: 'ORD-8173', date: '2024-02-28', total: 120.50, status: 'Delivered', items: 5 },
                                    { id: 'ORD-7564', date: '2024-02-15', total: 34.00, status: 'Delivered', items: 1 }
                                ].map((order, idx) => (
                                    <div key={idx} className="border border-[#D1D5DB] rounded-2xl p-6 bg-[#F9FAFB] hover:border-[#16A34A] transition-colors flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-full bg-[#E5E7EB] flex items-center justify-center text-[#6B7280]">
                                                <Package className="w-6 h-6" />
                                            </div>
                                             <div>
                                                <h4 className="font-rajdhani font-bold text-[#1A1A1A] text-lg">{order.id}</h4>
                                                <p className="font-mono text-xs text-[#6B7280] mt-1">
                                                    {order.date} • {order.items} <span data-i18n="prof.items">{t('prof.items')}</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col md:items-end w-full md:w-auto mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-[#D1D5DB]">
                                            <span className="font-cinzel text-xl font-bold text-[#1A1A1A]">${order.total.toFixed(2)}</span>
                                            <span 
                                                className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded w-fit mt-2 ${order.status === 'Delivered' ? 'bg-[#D1FAE5] text-[#059669]' : 'bg-[#FEF3C7] text-[#D97706]'}`}
                                                data-i18n={order.status === 'Processing' ? 'farm.status.processing' : 'farm.status.delivered'}
                                            >
                                                {t(order.status === 'Processing' ? 'farm.status.processing' : 'farm.status.delivered')}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
