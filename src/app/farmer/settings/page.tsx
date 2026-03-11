'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { User, Bell, Shield, Wallet, Save, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { useMockDb } from '@/store/mockDb';
import { useState, useEffect } from 'react';
import { useTranslation } from '@/store/languageStore';

export default function FarmerSettings() {
    const { t } = useTranslation();
    const user = useMockDb((state) => state.currentUser);
    const updateUser = useMockDb((state) => state.updateUser);
    
    const [activeTab, setActiveTab] = useState('profile');
    const [showToast, setShowToast] = useState(false);
    
    // Profile states
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [location, setLocation] = useState('');
    const [farmSize, setFarmSize] = useState('');

    useEffect(() => {
        if (user) {
            setName(user.name || '');
            setEmail(user.email || '');
            setLocation(user.location || 'Punjab, India');
            setFarmSize(user.farmSize?.replace(' Acres', '') || '15');
        }
    }, [user]);
    
    // Security tab state
    const [showPass1, setShowPass1] = useState(false);
    const [showPass2, setShowPass2] = useState(false);
    const [showPass3, setShowPass3] = useState(false);

    // Notifications state
    const [notifications, setNotifications] = useState({
        email: true, sms: true, whatsapp: false, pest: true, moisture: true, orders: true
    });

    const sections = [
        { id: 'profile', icon: User, title: t('settings.profile'), i18n: 'settings.profile' },
        { id: 'security', icon: Shield, title: t('settings.security'), i18n: 'settings.security' },
        { id: 'payment', icon: Wallet, title: t('settings.payment'), i18n: 'settings.payment' },
        { id: 'notifications', icon: Bell, title: t('settings.notifications'), i18n: 'settings.notifications' },
    ];

    const handleSave = () => {
        if (user) {
            updateUser(user.id, {
                name,
                email,
                location,
                farmSize: `${farmSize} Acres`
            });
        }
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    return (
        <div className="space-y-8 pb-12 w-full pt-8 max-w-5xl mx-auto px-4 relative">
            
            <AnimatePresence>
                {showToast && (
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed top-24 right-8 bg-[#16A34A] text-[#FFFFFF] px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 z-50 font-rajdhani font-bold tracking-widest text-sm"
                    >
                        <CheckCircle2 className="w-5 h-5" /> <span data-i18n="settings.saved">{t('settings.saved')}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#D1D5DB] pb-6"
            >
                <div>
                    <h1 className="font-cinzel text-3xl md:text-4xl text-[#1A1A1A] font-bold tracking-wider uppercase mb-2" data-i18n="settings.title">
                        {t('settings.title')}
                    </h1>
                    <p className="font-lato text-[#374151]" data-i18n="settings.desc">{t('settings.desc')}</p>
                </div>
                <button onClick={handleSave} className="bg-[#16A34A] text-[#FFFFFF] px-8 py-3 rounded-[8px] font-rajdhani font-bold uppercase tracking-widest text-sm hover:bg-[#1A4731] transition-all shadow-sm hover:translate-y-[-2px] flex items-center justify-center gap-2">
                    <Save className="w-4 h-4" /> <span data-i18n="settings.save">{t('settings.save')}</span>
                </button>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Sidebar Navigation */}
                <div className="md:col-span-1 space-y-2">
                    {sections.map((section, idx) => (
                        <motion.button
                            key={section.id}
                            onClick={() => setActiveTab(section.id)}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * idx }}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-[12px] font-rajdhani font-bold uppercase tracking-widest text-left transition-all ${activeTab === section.id ? 'bg-[#1A4731] text-[#FFFFFF] shadow-sm' : 'text-[#374151] bg-[#FFFFFF] border border-[#D1D5DB] hover:border-[#16A34A] hover:text-[#16A34A]'}`}
                        >
                            <section.icon className="w-4 h-4" />
                            <span className="text-sm" data-i18n={section.i18n}>{section.title}</span>
                        </motion.button>
                    ))}
                </div>

                {/* Main Settings Panel */}
                <div className="md:col-span-3 min-h-[500px]">
                    <AnimatePresence mode="wait">
                        
                        {/* PROFILE TAB */}
                        {activeTab === 'profile' && (
                            <motion.div key="profile" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                                <div className="bg-[#FFFFFF] border border-[#D1D5DB] rounded-[24px] p-8 shadow-sm">
                                    <h2 className="font-cinzel text-xl font-bold text-[#1A1A1A] mb-6 flex items-center gap-3 border-b border-[#D1D5DB] pb-4">
                                        <User className="text-[#16A34A] w-5 h-5" /> <span data-i18n="settings.personal_info">{t('settings.personal_info')}</span>
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="font-rajdhani uppercase tracking-widest text-xs font-bold text-[#6B7280]" data-i18n="settings.full_name">{t('settings.full_name')}</label>
                                            <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full bg-[#F0FAF0] border border-[#D1D5DB] text-[#1A1A1A] px-4 py-3 rounded-[8px] focus:outline-none focus:border-[#16A34A]" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="font-rajdhani uppercase tracking-widest text-xs font-bold text-[#6B7280]" data-i18n="settings.email">{t('settings.email')}</label>
                                            <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-[#F0FAF0] border border-[#D1D5DB] text-[#1A1A1A] px-4 py-3 rounded-[8px] focus:outline-none focus:border-[#16A34A]" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="font-rajdhani uppercase tracking-widest text-xs font-bold text-[#6B7280]" data-i18n="settings.phone">{t('settings.phone')}</label>
                                            <input type="tel" defaultValue="+91 98765 43210" className="w-full bg-[#F0FAF0] border border-[#D1D5DB] text-[#1A1A1A] px-4 py-3 rounded-[8px] focus:outline-none focus:border-[#16A34A]" />
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-[#FFFFFF] border border-[#D1D5DB] rounded-[24px] p-8 shadow-sm">
                                    <h2 className="font-cinzel text-xl font-bold text-[#1A1A1A] mb-6 flex items-center gap-3 border-b border-[#D1D5DB] pb-4" data-i18n="settings.farm_details">
                                        {t('settings.farm_details')}
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="font-rajdhani uppercase tracking-widest text-xs font-bold text-[#6B7280]" data-i18n="settings.farm_name">{t('settings.farm_name')}</label>
                                            <input type="text" defaultValue="Green Valley Acres" className="w-full bg-[#F0FAF0] border border-[#D1D5DB] text-[#1A1A1A] px-4 py-3 rounded-[8px] focus:outline-none focus:border-[#16A34A]" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="font-rajdhani uppercase tracking-widest text-xs font-bold text-[#6B7280]" data-i18n="settings.size">{t('settings.size')}</label>
                                            <input type="text" value={farmSize} onChange={e => setFarmSize(e.target.value)} className="w-full bg-[#F0FAF0] border border-[#D1D5DB] text-[#1A1A1A] px-4 py-3 rounded-[8px] focus:outline-none focus:border-[#16A34A]" />
                                        </div>
                                        <div className="space-y-2 md:col-span-2">
                                            <label className="font-rajdhani uppercase tracking-widest text-xs font-bold text-[#6B7280]" data-i18n="settings.location">{t('settings.location')}</label>
                                            <input type="text" value={location} onChange={e => setLocation(e.target.value)} className="w-full bg-[#F0FAF0] border border-[#D1D5DB] text-[#1A1A1A] px-4 py-3 rounded-[8px] focus:outline-none focus:border-[#16A34A]" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="font-rajdhani uppercase tracking-widest text-xs font-bold text-[#6B7280]" data-i18n="settings.crop_types">{t('settings.crop_types')}</label>
                                            <input type="text" defaultValue="Wheat, Tomatoes, Maize" className="w-full bg-[#F0FAF0] border border-[#D1D5DB] text-[#1A1A1A] px-4 py-3 rounded-[8px] focus:outline-none focus:border-[#16A34A]" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="font-rajdhani uppercase tracking-widest text-xs font-bold text-[#6B7280]" data-i18n="settings.irrigation">{t('settings.irrigation')}</label>
                                            <select className="w-full bg-[#F0FAF0] border border-[#D1D5DB] text-[#1A1A1A] px-4 py-3 rounded-[8px] focus:outline-none focus:border-[#16A34A]">
                                                <option data-i18n="monitor.drip">{t('monitor.drip') || 'Drip Irrigation'}</option>
                                                <option data-i18n="monitor.sprinkler">{t('monitor.sprinkler') || 'Sprinkler System'}</option>
                                                <option data-i18n="monitor.surface">{t('monitor.surface') || 'Surface Irrigation'}</option>
                                                <option data-i18n="monitor.manual_watering">{t('monitor.manual_watering') || 'Manual Watering'}</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* SECURITY TAB */}
                        {activeTab === 'security' && (
                            <motion.div key="security" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                                <div className="bg-[#FFFFFF] border border-[#D1D5DB] rounded-[24px] p-8 shadow-sm">
                                    <h2 className="font-cinzel text-xl font-bold text-[#1A1A1A] mb-6 flex items-center gap-3 border-b border-[#D1D5DB] pb-4">
                                        <Shield className="text-[#D97706] w-5 h-5" /> <span data-i18n="settings.change_pass">{t('settings.change_pass')}</span>
                                    </h2>
                                    <div className="max-w-md space-y-6">
                                        <div className="space-y-2 relative">
                                            <label className="font-rajdhani uppercase tracking-widest text-xs font-bold text-[#6B7280]" data-i18n="settings.cur_pass">{t('settings.cur_pass')}</label>
                                            <div className="relative">
                                                <input type={showPass1 ? "text" : "password"} className="w-full bg-[#F0FAF0] border border-[#D1D5DB] text-[#1A1A1A] px-4 py-3 rounded-[8px] focus:outline-none focus:border-[#16A34A] pr-10" />
                                                <button onClick={()=>setShowPass1(!showPass1)} className="absolute right-3 top-3 text-[#6B7280] hover:text-[#16A34A]"><span className="w-5 h-5">{showPass1 ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}</span></button>
                                            </div>
                                        </div>
                                        <div className="space-y-2 relative">
                                            <label className="font-rajdhani uppercase tracking-widest text-xs font-bold text-[#6B7280]" data-i18n="settings.new_pass">{t('settings.new_pass')}</label>
                                            <div className="relative">
                                                <input type={showPass2 ? "text" : "password"} className="w-full bg-[#F0FAF0] border border-[#D1D5DB] text-[#1A1A1A] px-4 py-3 rounded-[8px] focus:outline-none focus:border-[#16A34A] pr-10" />
                                                <button onClick={()=>setShowPass2(!showPass2)} className="absolute right-3 top-3 text-[#6B7280] hover:text-[#16A34A]"><span className="w-5 h-5">{showPass2 ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}</span></button>
                                            </div>
                                        </div>
                                        <div className="space-y-2 relative">
                                            <label className="font-rajdhani uppercase tracking-widest text-xs font-bold text-[#6B7280]" data-i18n="settings.conf_pass">{t('settings.conf_pass')}</label>
                                            <div className="relative">
                                                <input type={showPass3 ? "text" : "password"} className="w-full bg-[#F0FAF0] border border-[#D1D5DB] text-[#1A1A1A] px-4 py-3 rounded-[8px] focus:outline-none focus:border-[#16A34A] pr-10" />
                                                <button onClick={()=>setShowPass3(!showPass3)} className="absolute right-3 top-3 text-[#6B7280] hover:text-[#16A34A]"><span className="w-5 h-5">{showPass3 ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}</span></button>
                                            </div>
                                        </div>
                                        <button onClick={handleSave} className="bg-[#1A1A1A] text-[#FFFFFF] w-full py-3 rounded-[8px] font-rajdhani font-bold uppercase tracking-widest hover:bg-[#374151] transition-colors" data-i18n="settings.update_pass">{t('settings.update_pass')}</button>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* PAYMENT TAB */}
                        {activeTab === 'payment' && (
                            <motion.div key="payment" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                                <div className="bg-[#FFFFFF] border border-[#D1D5DB] rounded-[24px] p-8 shadow-sm">
                                    <h2 className="font-cinzel text-xl font-bold text-[#1A1A1A] mb-6 flex items-center gap-3 border-b border-[#D1D5DB] pb-4">
                                        <Wallet className="text-[#16A34A] w-5 h-5" /> <span data-i18n="settings.bank_details">{t('settings.bank_details')}</span>
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2 md:col-span-2">
                                            <label className="font-rajdhani uppercase tracking-widest text-xs font-bold text-[#6B7280]" data-i18n="settings.acc_holder">{t('settings.acc_holder')}</label>
                                            <input type="text" defaultValue={user?.name} className="w-full bg-[#F0FAF0] border border-[#D1D5DB] text-[#1A1A1A] px-4 py-3 rounded-[8px] focus:outline-none focus:border-[#16A34A]" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="font-rajdhani uppercase tracking-widest text-xs font-bold text-[#6B7280]" data-i18n="settings.bank_name">{t('settings.bank_name')}</label>
                                            <input type="text" placeholder="State Bank of India" className="w-full bg-[#F0FAF0] border border-[#D1D5DB] text-[#1A1A1A] px-4 py-3 rounded-[8px] focus:outline-none focus:border-[#16A34A]" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="font-rajdhani uppercase tracking-widest text-xs font-bold text-[#6B7280]" data-i18n="settings.acc_num">{t('settings.acc_num')}</label>
                                            <input type="password" placeholder="••••••••4567" className="w-full bg-[#F0FAF0] border border-[#D1D5DB] text-[#1A1A1A] px-4 py-3 rounded-[8px] focus:outline-none focus:border-[#16A34A]" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="font-rajdhani uppercase tracking-widest text-xs font-bold text-[#6B7280]" data-i18n="settings.ifsc">{t('settings.ifsc')}</label>
                                            <input type="text" placeholder="SBIN0001234" className="w-full bg-[#F0FAF0] border border-[#D1D5DB] text-[#1A1A1A] px-4 py-3 rounded-[8px] focus:outline-none focus:border-[#16A34A]" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="font-rajdhani uppercase tracking-widest text-xs font-bold text-[#6B7280]" data-i18n="settings.upi">{t('settings.upi')}</label>
                                            <input type="text" placeholder="farmer@upi" className="w-full bg-[#F0FAF0] border border-[#D1D5DB] text-[#1A1A1A] px-4 py-3 rounded-[8px] focus:outline-none focus:border-[#16A34A]" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* NOTIFICATIONS TAB */}
                        {activeTab === 'notifications' && (
                            <motion.div key="notifications" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                                <div className="bg-[#FFFFFF] border border-[#D1D5DB] rounded-[24px] p-8 shadow-sm">
                                    <h2 className="font-cinzel text-xl font-bold text-[#1A1A1A] mb-6 flex items-center gap-3 border-b border-[#D1D5DB] pb-4">
                                        <Bell className="text-[#D97706] w-5 h-5" /> <span data-i18n="settings.notif_pref">{t('settings.notif_pref')}</span>
                                    </h2>
                                    
                                    <div className="space-y-6 max-w-2xl">
                                        {[
                                            { id: 'email', label: t('settings.email_alerts'), i18n: 'settings.email_alerts', desc: 'Receive daily summaries and critical alerts via email.' },
                                            { id: 'sms', label: t('settings.sms_alerts'), i18n: 'settings.sms_alerts', desc: 'Get direct text messages for high-priority farm alerts.' },
                                            { id: 'whatsapp', label: t('settings.whatsapp_alerts'), i18n: 'settings.whatsapp_alerts', desc: 'Receive automated messages and reports on WhatsApp.' },
                                            { id: 'pest', label: t('settings.pest_alerts'), i18n: 'settings.pest_alerts', desc: 'Immediate notification when the vibration sensor triggers.' },
                                            { id: 'moisture', label: t('settings.moisture_alerts'), i18n: 'settings.moisture_alerts', desc: 'Alerts when soil moisture drops below critical levels.' },
                                            { id: 'orders', label: t('settings.order_alerts'), i18n: 'settings.order_alerts', desc: 'Notifications for new wholesale or retail purchases.' },
                                        ].map((setting) => (
                                            <div key={setting.id} className="flex items-center justify-between p-4 bg-[#F0FAF0] rounded-[12px] border border-[#D1D5DB]">
                                                <div>
                                                    <h3 className="font-rajdhani font-bold text-[#1A1A1A]" data-i18n={setting.i18n}>{setting.label}</h3>
                                                    <p className="text-xs font-lato text-[#6B7280]">{setting.desc}</p>
                                                </div>
                                                <button 
                                                    onClick={() => setNotifications({...notifications, [setting.id as keyof typeof notifications]: !notifications[setting.id as keyof typeof notifications]})}
                                                    className={`w-12 h-6 rounded-full p-1 transition-colors ${notifications[setting.id as keyof typeof notifications] ? 'bg-[#16A34A]' : 'bg-[#D1D5DB]'}`}
                                                >
                                                    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${notifications[setting.id as keyof typeof notifications] ? 'translate-x-6' : 'translate-x-0'}`}></div>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
