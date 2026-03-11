'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Star, ShieldCheck, Leaf, Tag, Wheat, Tent, Search, MapPin, X, Sprout, Bug } from 'lucide-react';
import { useMockDb, Product, User } from '@/store/mockDb';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';
import { useTranslation } from '@/store/languageStore';

export default function CustomerShop() {
    const products = useMockDb((state) => state.products);
    const farmers = useMockDb((state) => state.farmers);
    const addToCart = useMockDb((state) => state.addToCart);
    const router = useRouter();
    const { t } = useTranslation();

    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [selectedFarmer, setSelectedFarmer] = useState<User | null>(null);
    const [toastMsg, setToastMsg] = useState('');

    const categories = [
        { name: t('cat.vegetables'), i18nKey: 'cat.vegetables', icon: Leaf, id: 'Vegetables' },
        { name: t('cat.fruits'), i18nKey: 'cat.fruits', icon: Tag, id: 'Fruits' },
        { name: t('cat.grains'), i18nKey: 'cat.grains', icon: Wheat, id: 'Grains' },
        { name: t('cat.seeds'), i18nKey: 'cat.seeds', icon: Tent, id: 'Seeds' },
        { name: t('cat.fertilizers'), i18nKey: 'cat.fertilizers', icon: Sprout, id: 'Fertilizers' },
        { name: t('cat.pesticides'), i18nKey: 'cat.pesticides', icon: Bug, id: 'Pesticides' },
    ];

    const getFarmer = (id: string) => farmers.find(f => f.id === id);

    const filteredProducts = products.filter(p => {
        const farmer = getFarmer(p.farmerId);
        const term = searchTerm.toLowerCase();
        
        const matchesCategory = activeCategory ? p.category === activeCategory : true;
        const matchesSearch = p.name.toLowerCase().includes(term) || 
                              p.category.toLowerCase().includes(term) || 
                              (farmer && farmer.name.toLowerCase().includes(term));
                              
        return matchesCategory && matchesSearch;
    });

    const handleAddToCart = (e: React.MouseEvent, p: Product) => {
        e.stopPropagation();
        addToCart({
            ...p,
            cartId: Math.random().toString(36).substring(7),
            qty: 1,
            purchaseType: 'Retail'
        });
        setToastMsg(t('shop.added') || 'Added to Cart!');
        setTimeout(() => setToastMsg(''), 2000);
    };

    return (
        <div className="space-y-12 pb-12 relative">
            
            {/* Custom Toast */}
            <AnimatePresence>
                {toastMsg && (
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed top-24 right-8 bg-[#16A34A] text-[#FFFFFF] px-6 py-4 rounded-xl shadow-2xl z-50 font-rajdhani font-bold tracking-widest text-sm"
                    >
                        <span data-i18n="shop.added">{toastMsg}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Farmer Profile Popup */}
            <AnimatePresence>
                {selectedFarmer && (
                    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedFarmer(null)}>
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-[#FFFFFF] rounded-[24px] p-6 max-w-sm w-full shadow-2xl border border-[#16A34A]"
                        >
                             <div className="flex justify-between items-start mb-4">
                                <h3 className="font-cinzel text-subheading-fixed font-bold text-[#1A1A1A]" data-i18n="farm.farmer_profile">{t('farm.farmer_profile')}</h3>
                                <button onClick={() => setSelectedFarmer(null)} className="text-[#6B7280] hover:text-[#1A1A1A]"><X className="w-5 h-5"/></button>
                            </div>
                            <div className="flex items-center gap-4 mb-4">
                                <img src={selectedFarmer.avatar || 'https://via.placeholder.com/150'} alt={selectedFarmer.name} className="w-16 h-16 rounded-full object-cover border-2 border-[#16A34A]" />
                                <div>
                                    <h4 className="font-rajdhani text-subheading-fixed font-bold text-[#1A1A1A]">{selectedFarmer.name}</h4>
                                    <div className="flex items-center gap-1 text-[#6B7280] text-muted-fixed"><MapPin className="w-3 h-3"/> {selectedFarmer.location || 'India'}</div>
                                </div>
                            </div>
                            <div className="bg-[#F0FAF0] p-4 rounded-xl border border-[#D1D5DB] text-label-fixed text-[#374151] font-lato">
                                <strong><span data-i18n="farm.farm_size">{t('farm.farm_size')}</span>:</strong> {selectedFarmer.farmSize || 'Not specified'}<br/>
                                <strong><span data-i18n="farm.verification">{t('farm.verification')}</span>:</strong> S.H.I.E.L.D Verified<br/>
                                <strong><span data-i18n="farm.rating">{t('farm.rating')}</span>:</strong> 4.9/5 <Star className="inline w-3 h-3 text-[#D97706] fill-[#D97706]"/>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Hero Banner Area */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full h-80 lg:h-96 rounded-3xl overflow-hidden relative group shadow-[0_0_30px_rgba(0,255,136,0.15)]"
            >
                <img
                    src="https://images.unsplash.com/photo-1595853035070-59a39fe84de3?auto=format&fit=crop&q=80"
                    alt="Fresh Farm"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bio-black via-bio-black/40 to-transparent"></div>
                <div className="absolute inset-0 bg-bio-green/10 mix-blend-overlay"></div>

                 <div className="absolute bottom-10 left-10 right-10 flex flex-col items-start space-y-4">
                    <span className="px-3 py-1 bg-bio-gold text-bio-black font-rajdhani font-bold uppercase tracking-widest text-xs rounded-full" data-i18n="shop.offer">
                        {t('shop.offer') || 'Seasonal Offer'}
                    </span>
                    <h1 className="font-cinzel text-4xl lg:text-6xl text-white drop-shadow-lg neon-text-green" data-i18n="shop.hero_title">
                        {t('shop.hero_title') || 'Monsoon Harvest Festival'}
                    </h1>
                    <p className="font-lato text-bio-cream/80 max-w-xl text-lg" data-i18n="shop.hero_desc">
                        {t('shop.hero_desc') || 'Directly source premium heirloom tomatoes, organic fertilizers, and country seeds with full blockchain traceability.'}
                    </p>
                </div>
            </motion.section>

            {/* Search Bar */}
            <section className="max-w-3xl mx-auto">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#16A34A] w-6 h-6" />
                    <input 
                        type="text" 
                        placeholder={t('shop.search')} 
                        data-i18n="shop.search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-[#FFFFFF] border-2 border-[#16A34A] text-[#1A1A1A] px-12 py-4 rounded-full focus:outline-none focus:ring-4 focus:ring-[#16A34A]/20 font-lato text-body-fixed shadow-sm"
                    />
                </div>
            </section>

            {/* Category Strip */}
            <section className="w-full overflow-x-auto pb-4 hide-scrollbar">
                <div className="flex space-x-6 min-w-max px-2">
                    {categories.map((cat, i) => {
                        const isActive = activeCategory === cat.id;
                        return (
                            <motion.button
                                key={i}
                                onClick={() => setActiveCategory(isActive ? null : cat.id)}
                                whileHover={{ y: -5, scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`px-6 py-4 rounded-2xl flex items-center space-x-4 border shadow-sm min-w-[200px] transition-colors ${
                                    isActive 
                                        ? 'bg-[#1A4731] border-[#16A34A] shadow-[0_4px_20px_rgba(22,163,74,0.3)]' 
                                        : 'bg-[#FFFFFF] border-[#16A34A]/30 hover:border-[#16A34A] hover:bg-[#F0FAF0]'
                                }`}
                            >
                                <div className={`p-3 rounded-xl transition-colors ${isActive ? 'bg-[#FFFFFF] text-[#1A4731]' : 'bg-[#1A4731] text-[#FFFFFF]'}`}>
                                    <cat.icon className="w-6 h-6" />
                                </div>
                                <span className={`font-rajdhani text-button-fixed font-bold uppercase tracking-wide ${isActive ? 'text-[#FFFFFF]' : 'text-[#1A1A1A]'}`} data-i18n={cat.i18nKey}>
                                    {cat.name}
                                </span>
                            </motion.button>
                        );
                    })}
                </div>
            </section>

            {/* Product Grid */}
            <section>
                <div className="flex items-center justify-between mb-8">
                    <h2 className="font-cinzel text-heading-fixed text-[#1A1A1A] font-bold tracking-wide" data-i18n="shop.featured_origins">{t('shop.featured_origins')}</h2>
                    <span className="text-[#6B7280] font-lato text-muted-fixed">{filteredProducts.length} <span data-i18n="shop.items_found">{t('shop.items_found')}</span></span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProducts.map((product, i) => {
                        const farmer = getFarmer(product.farmerId);
                        return (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            onClick={() => router.push(`/customer/product/${product.id}`)}
                            className="bg-[#FFFFFF] border border-[#16A34A]/20 rounded-2xl overflow-hidden cursor-pointer group hover:shadow-[0_10px_40px_rgba(22,163,74,0.15)] hover:border-[#16A34A] flex flex-col transition-all"
                        >
                            {/* Product Image */}
                            <div className="w-full h-64 relative overflow-hidden">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />

                                {/* Badges */}
                                <div className="absolute top-4 left-4 flex flex-row flex-wrap gap-2">
                                    <span className="px-3 py-1 bg-[#1A1A1A]/90 text-[#86EFAC] rounded-full font-rajdhani text-[10px] uppercase tracking-widest border border-[#16A34A]/50 flex items-center space-x-1 backdrop-blur-md whitespace-nowrap">
                                        <ShieldCheck className="w-3 h-3" />
                                        <span data-i18n="cust.verified">{t('cust.verified')}</span>
                                    </span>
                                    {product.organic && (
                                        <span className="px-3 py-1 bg-[#16A34A]/90 text-[#FFFFFF] rounded-full font-rajdhani text-[10px] uppercase tracking-widest shadow-lg flex items-center space-x-1 w-fit backdrop-blur-md whitespace-nowrap">
                                            <Leaf className="w-3 h-3" />
                                            <span data-i18n="shop.organic">{t('shop.organic')}</span>
                                        </span>
                                    )}
                                </div>

                                 <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#1A1A1A] to-transparent">
                                    <p className="font-lato text-label-fixed text-[#FFFFFF]/90 line-clamp-1 font-bold whitespace-nowrap overflow-hidden text-ellipsis" data-i18n={`cat.${product.category.toLowerCase().replace(/ /g, '_')}`}>{t(`cat.${product.category.toLowerCase().replace(/ /g, '_')}`)}</p>
                                </div>
                            </div>

                            {/* Product Content */}
                            <div className="p-6 flex-1 flex flex-col">
                                <h3 className="font-rajdhani text-subheading-fixed font-bold text-[#1A1A1A] mb-1 line-clamp-1 group-hover:text-[#16A34A] transition-colors" data-i18n={product.name}>
                                    {t(product.name)}
                                </h3>
                                
                                {/* Farmer Tag */}
                                {farmer && (
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); setSelectedFarmer(farmer); }} 
                                        className="text-left flex flex-col items-start hover:bg-[#F0FAF0] p-1.5 -ml-1.5 rounded-lg transition-colors mb-3"
                                    >
                                        <div className="text-muted-fixed text-[#6B7280] font-lato underline decoration-dashed underline-offset-2"><span data-i18n="shop.grown_by">{t('shop.grown_by')}</span> {farmer.name}</div>
                                        <div className="text-muted-fixed text-[#D97706] font-bold flex items-center gap-1"><MapPin className="w-3 h-3"/> {farmer.location}</div>
                                    </button>
                                )}

                                {/* Rating */}
                                <div className="flex items-center space-x-1 mb-4">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star key={star} className={`w-4 h-4 ${star <= 4 ? 'text-[#D97706] fill-[#D97706]' : 'text-[#D1D5DB]'}`} />
                                    ))}
                                    <span className="text-xs text-[#6B7280] ml-2 font-lato">(128)</span>
                                </div>

                                <div className="flex-1"></div>

                                {/* Pricing Block */}
                                <div className="flex items-center justify-between mb-6 bg-[#F0FAF0] rounded-xl p-3 border border-[#16A34A]/20">
                                    <div className="flex flex-col">
                                        <span className="text-muted-fixed uppercase font-rajdhani text-[#16A34A] tracking-widest font-bold" data-i18n="shop.retail">{t('shop.retail')}</span>
                                        <span className="font-rajdhani text-subheading-fixed text-[#1A1A1A] font-bold">${product.retailPrice.toFixed(2)} <span className="text-muted-fixed text-[#6B7280] font-normal" data-i18n="shop.unit">{t('shop.unit')}</span></span>
                                    </div>
                                    <div className="w-px h-8 bg-[#D1D5DB] mx-2"></div>
                                    <div className="flex flex-col items-end">
                                        <span className="text-muted-fixed uppercase font-rajdhani text-[#D97706] tracking-widest font-bold" data-i18n="shop.wholesale">{t('shop.wholesale')}</span>
                                        <span className="font-rajdhani text-subheading-fixed text-[#1A1A1A] font-bold">${product.wholesalePrice.toFixed(2)} <span className="text-muted-fixed text-[#6B7280] font-normal" data-i18n="shop.bulk">{t('shop.bulk')}</span></span>
                                    </div>
                                </div>

                                <Button variant="primary" className="w-full flex items-center justify-center space-x-2 bg-[#16A34A] hover:bg-[#1A4731]" onClick={(e) => handleAddToCart(e, product)}>
                                    <ShoppingCart className="w-5 h-5" />
                                    <span data-i18n="shop.add_to_cart">{t('shop.add_to_cart')}</span>
                                </Button>
                            </div>
                        </motion.div>
                    )})}
                </div>
            </section>

        </div>
    );
}
