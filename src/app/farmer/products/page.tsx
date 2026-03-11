'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Plus, Edit2, Trash2, X, AlertTriangle } from 'lucide-react';
import { useMockDb, Product } from '@/store/mockDb';
import { useTranslation } from '@/store/languageStore';

export default function FarmerProducts() {
    const products = useMockDb((state) => state.products);
    const currentUser = useMockDb((state) => state.currentUser);
    const addProduct = useMockDb((state) => state.addProduct);
    const updateProduct = useMockDb((state) => state.updateProduct);
    const deleteProduct = useMockDb((state) => state.deleteProduct);

    const farmerProducts = useMemo(() => {
        // If logged in as specific farmer, show only theirs, else show mock fallback f1
        const fId = currentUser?.id || 'f1';
        return products.filter(p => p.farmerId === fId);
    }, [products, currentUser]);

    const { t } = useTranslation();

    const categories = ['All', 'Vegetables', 'Fruits', 'Grains', 'Seeds', 'Fertilizers', 'Pesticides'];
    const categoryKeys = {
        'All': 'shop.all',
        'Vegetables': 'cat.vegetables',
        'Fruits': 'cat.fruits',
        'Grains': 'cat.grains',
        'Seeds': 'cat.seeds',
        'Fertilizers': 'cat.fertilizers',
        'Pesticides': 'cat.pesticides'
    };

    const [activeTab, setActiveTab] = useState('All');

    const filteredProducts = useMemo(() => {
        if (activeTab === 'All') return farmerProducts;
        return farmerProducts.filter(p => p.category === activeTab);
    }, [farmerProducts, activeTab]);

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalStep, setModalStep] = useState(1);
    const [editingId, setEditingId] = useState<string | null>(null);

    // Form state
    const [formData, setFormData] = useState({
        name: '', category: 'Vegetables', description: '',
        image: '', stock: 0, harvestDate: '', expiryDate: '',
        retailPrice: 0, wholesalePrice: 0, minWholesaleQty: 0, origin: ''
    });

    const resetForm = () => {
        setFormData({
            name: '', category: 'Vegetables', description: '',
            image: '', stock: 0, harvestDate: '', expiryDate: '',
            retailPrice: 0, wholesalePrice: 0, minWholesaleQty: 0, origin: ''
        });
        setModalStep(1);
        setEditingId(null);
    };

    const handleOpenAdd = () => {
        resetForm();
        setIsModalOpen(true);
    };

    const handleOpenEdit = (product: Product) => {
        resetForm();
        setFormData({
            name: product.name,
            category: product.category,
            description: product.description,
            image: product.image,
            stock: product.stock,
            harvestDate: '', // mock feature
            expiryDate: '',  // mock feature
            retailPrice: product.retailPrice,
            wholesalePrice: product.wholesalePrice,
            minWholesaleQty: product.minWholesaleQty,
            origin: 'My Farm'
        });
        setEditingId(product.id);
        setModalStep(1);
        setIsModalOpen(true);
    };

    const handleSaveProduct = () => {
        const payload = {
            name: formData.name,
            category: formData.category,
            description: formData.description,
            image: formData.image || 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80',
            stock: Number(formData.stock) || 0,
            retailPrice: Number(formData.retailPrice) || 0,
            wholesalePrice: Number(formData.wholesalePrice) || 0,
            minWholesaleQty: Number(formData.minWholesaleQty) || 0,
            organic: true
        };

        if (editingId) {
            updateProduct(editingId, payload);
        } else {
            addProduct({
                farmerId: currentUser?.id || 'f1',
                ...payload
            });
        }
        setIsModalOpen(false);
    };

    // Delete Modal
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const confirmDelete = (id: string) => {
        setDeletingId(id);
        setIsDeleteModalOpen(true);
    };

    const executeDelete = () => {
        if (deletingId) {
            deleteProduct(deletingId);
        }
        setIsDeleteModalOpen(false);
        setDeletingId(null);
    };

    return (
        <div className="space-y-8 pb-12 w-full max-w-7xl mx-auto pt-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#D1D5DB] pb-6"
            >
                <div>
                    <h1 className="font-cinzel text-heading-fixed text-[#1A1A1A] font-bold tracking-wider uppercase mb-2" data-i18n="prod.title">
                        {t('prod.title')}
                    </h1>
                    <p className="font-lato text-body-fixed text-[#374151]" data-i18n="prod.desc">{t('prod.desc')}</p>
                </div>
                <button onClick={handleOpenAdd} className="flex items-center gap-2 bg-[#16A34A] text-[#FFFFFF] px-6 py-3 rounded-[8px] font-rajdhani font-bold uppercase tracking-widest hover:bg-[#1A4731] transition-colors shadow-sm hover:-translate-y-1 duration-300 text-button-fixed">
                    <Plus className="w-5 h-5" /> <span data-i18n="prod.add_btn">{t('prod.add_btn')}</span>
                </button>
            </motion.div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 mb-6">
                {categories.map((cat, i) => (
                    <button
                        key={i}
                        onClick={() => setActiveTab(cat)}
                        className={`px-6 py-2 rounded-full font-rajdhani uppercase tracking-widest text-button-fixed font-bold transition-colors border ${activeTab === cat ? 'bg-[#1A4731] text-[#FFFFFF] border-[#1A4731]' : 'bg-[#FFFFFF] text-[#374151] border-[#D1D5DB] hover:border-[#16A34A] hover:text-[#16A34A]'}`}
                        data-i18n={(categoryKeys as any)[cat]}
                    >
                        {t((categoryKeys as any)[cat])}
                    </button>
                ))}
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <AnimatePresence>
                    {filteredProducts.map((product, i) => (
                        <motion.div
                            key={product.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ delay: i * 0.05 }}
                            className="bg-[#FFFFFF] rounded-[16px] overflow-hidden shadow-sm border border-[#D1D5DB] hover:border-[#16A34A] group flex flex-col transition-all duration-300 hover:shadow-[0_4px_20px_rgba(22,163,74,0.15)] hover:-translate-y-1"
                        >
                            {/* Image */}
                            <div className="w-full h-48 relative overflow-hidden bg-[#F0FAF0]">
                                {product.image ? (
                                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 rounded-t-[16px]" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-[#16A34A]/20">
                                        <Package className="w-16 h-16" />
                                    </div>
                                )}
                                <div className="absolute top-2 right-2 flex gap-2">
                                    <button onClick={() => handleOpenEdit(product)} className="p-2 bg-[#FFFFFF] text-[#1A4731] shadow border border-[#1A4731] rounded-[8px] hover:bg-[#1A4731] hover:text-[#FFFFFF] transition-colors">
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button onClick={() => confirmDelete(product.id)} className="p-2 bg-[#FFFFFF] text-[#DC2626] shadow border border-[#DC2626] rounded-[8px] hover:bg-[#DC2626] hover:text-[#FFFFFF] transition-colors">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-5 flex flex-col flex-1">
                                <span className="text-muted-fixed font-rajdhani font-bold text-[#FFFFFF] bg-[#16A34A] px-2 py-1 rounded-full w-fit whitespace-nowrap uppercase tracking-widest mb-2" data-i18n={categoryKeys[product.category as keyof typeof categoryKeys] || 'shop.all'}>
                                    {t(categoryKeys[product.category as keyof typeof categoryKeys] || 'shop.all')}
                                </span>
                                <h3 className="font-rajdhani text-subheading-fixed font-bold text-[#1A1A1A] mb-3 line-clamp-1" data-i18n={product.name}>{t(product.name)}</h3>
                                
                                <div className="flex-1"></div>
                                
                                <div className="mb-4">
                                    <div className="flex justify-between text-xs font-lato text-[#6B7280] mb-1">
                                        <span data-i18n="prod.th.stock">{t('prod.th.stock')}</span>
                                        <span className={product.stock < 20 ? 'text-[#F59E0B] font-bold' : ''}>{product.stock} <span data-i18n="farm.stats.units">{t('farm.stats.units')}</span></span>
                                    </div>
                                    <div className="w-full h-2 bg-[#D1D5DB] rounded-full overflow-hidden">
                                        <div className={`h-full rounded-full ${product.stock < 20 ? 'bg-[#F59E0B]' : 'bg-[#16A34A]'}`} style={{ width: `${Math.min(100, (product.stock / 200) * 100)}%` }}></div>
                                    </div>
                                </div>

                                <div className="flex justify-between items-end pt-3 border-t border-[#D1D5DB] mt-auto">
                                    <div>
                                        <span className="text-muted-fixed font-rajdhani uppercase text-[#6B7280] block" data-i18n="shop.retail">{t('shop.retail')}</span>
                                        <span className="font-rajdhani font-bold text-subheading-fixed text-[#16A34A]">${product.retailPrice.toFixed(2)}</span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-muted-fixed font-rajdhani uppercase text-[#6B7280] block"><span data-i18n="shop.wholesale">{t('shop.wholesale')}</span> (&gt;{product.minWholesaleQty})</span>
                                        <span className="font-rajdhani font-bold text-subheading-fixed text-[#D97706]">${product.wholesalePrice.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
                {filteredProducts.length === 0 && (
                    <div className="col-span-full py-20 flex flex-col items-center justify-center text-[#6B7280]">
                        <Package className="w-16 h-16 mb-4 opacity-50" />
                        <p className="font-lato" data-i18n="prod.no_products">{t('prod.no_products')}</p>
                    </div>
                )}
            </div>

            {/* Product Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-[#1A1A1A]/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
                        
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-[#FFFFFF] w-full max-w-2xl rounded-[24px] shadow-2xl overflow-hidden relative z-10 border border-[#16A34A]"
                        >
                            <div className="p-6 border-b border-[#D1D5DB] flex justify-between items-center bg-[#F0FAF0]">
                                <h2 className="font-cinzel text-xl font-bold text-[#1A1A1A]" data-i18n={editingId ? 'form.edit_title' : 'form.add_title'}>
                                    {editingId ? t('form.edit_title') : t('form.add_title')}
                                </h2>
                                <button onClick={() => setIsModalOpen(false)} className="p-2 text-[#6B7280] hover:bg-[#D1D5DB]/30 rounded-full transition-colors"><X className="w-5 h-5"/></button>
                            </div>
                            
                            <div className="p-6">
                                {/* Wizard Steps Indicator */}
                                <div className="flex justify-between items-center mb-8 relative">
                                    <div className="absolute left-0 top-1/2 w-full h-[2px] bg-[#D1D5DB] -z-10 transform -translate-y-1/2"></div>
                                    {[1, 2, 3, 4].map((step) => (
                                        <div key={step} className={`w-8 h-8 rounded-full flex items-center justify-center font-rajdhani font-bold text-sm border-2 transition-colors ${modalStep >= step ? 'bg-[#16A34A] border-[#16A34A] text-[#FFFFFF]' : 'bg-[#FFFFFF] border-[#D1D5DB] text-[#6B7280]'}`}>
                                            {step}
                                        </div>
                                    ))}
                                </div>

                                <div className="min-h-[250px]">
                                    {modalStep === 1 && (
                                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                                            <div className="space-y-2">
                                                <label className="text-xs font-rajdhani font-bold uppercase tracking-widest text-[#6B7280]" data-i18n="form.label.name">{t('form.label.name')}</label>
                                                <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-[#F0FAF0] border border-[#D1D5DB] px-4 py-2 rounded-[8px] focus:outline-none focus:border-[#16A34A] text-[#1A1A1A]" data-i18n="form.placeholder.name" placeholder={t('form.placeholder.name')} />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-rajdhani font-bold uppercase tracking-widest text-[#6B7280]" data-i18n="form.label.category">{t('form.label.category')}</label>
                                                <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-[#F0FAF0] border border-[#D1D5DB] px-4 py-2 rounded-[8px] focus:outline-none focus:border-[#16A34A] text-[#1A1A1A]">
                                                    {categories.filter(c => c !== 'All').map(c => <option key={c} value={c} data-i18n={(categoryKeys as any)[c]}>{t((categoryKeys as any)[c])}</option>)}
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-rajdhani font-bold uppercase tracking-widest text-[#6B7280]" data-i18n="form.label.desc">{t('form.label.desc')}</label>
                                                <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows={3} className="w-full bg-[#F0FAF0] border border-[#D1D5DB] px-4 py-2 rounded-[8px] focus:outline-none focus:border-[#16A34A] text-[#1A1A1A] resize-none" data-i18n="form.placeholder.desc" placeholder={t('form.placeholder.desc')}></textarea>
                                            </div>
                                        </motion.div>
                                    )}

                                    {modalStep === 2 && (
                                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                                            <div className="space-y-2">
                                                <label className="text-xs font-rajdhani font-bold uppercase tracking-widest text-[#6B7280]" data-i18n="form.label.image">{t('form.label.image')}</label>
                                                <input type="text" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="w-full bg-[#F0FAF0] border border-[#D1D5DB] px-4 py-2 rounded-[8px] focus:outline-none focus:border-[#16A34A] text-[#1A1A1A]" data-i18n="form.placeholder.image" placeholder={t('form.placeholder.image')} />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-rajdhani font-bold uppercase tracking-widest text-[#6B7280]" data-i18n="form.label.quantity">{t('form.label.quantity')}</label>
                                                <input type="number" value={formData.stock} onChange={e => setFormData({...formData, stock: Number(e.target.value)})} className="w-full bg-[#F0FAF0] border border-[#D1D5DB] px-4 py-2 rounded-[8px] focus:outline-none focus:border-[#16A34A] text-[#1A1A1A]" />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <label className="text-xs font-rajdhani font-bold uppercase tracking-widest text-[#6B7280]" data-i18n="form.label.harvest_date">{t('form.label.harvest_date')}</label>
                                                    <input type="date" value={formData.harvestDate} onChange={e => setFormData({...formData, harvestDate: e.target.value})} className="w-full bg-[#F0FAF0] border border-[#D1D5DB] px-4 py-2 rounded-[8px] focus:outline-none focus:border-[#16A34A] text-[#1A1A1A]" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-rajdhani font-bold uppercase tracking-widest text-[#6B7280]" data-i18n="form.label.expiry_date">{t('form.label.expiry_date')}</label>
                                                    <input type="date" value={formData.expiryDate} onChange={e => setFormData({...formData, expiryDate: e.target.value})} className="w-full bg-[#F0FAF0] border border-[#D1D5DB] px-4 py-2 rounded-[8px] focus:outline-none focus:border-[#16A34A] text-[#1A1A1A]" />
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {modalStep === 3 && (
                                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <label className="text-xs font-rajdhani font-bold uppercase tracking-widest text-[#6B7280]" data-i18n="form.label.retail_price">{t('form.label.retail_price')}</label>
                                                    <input type="number" step="0.01" value={formData.retailPrice} onChange={e => setFormData({...formData, retailPrice: Number(e.target.value)})} className="w-full bg-[#F0FAF0] border border-[#D1D5DB] px-4 py-2 rounded-[8px] focus:outline-none focus:border-[#16A34A] text-[#1A1A1A]" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-rajdhani font-bold uppercase tracking-widest text-[#6B7280]" data-i18n="form.label.wholesale_price">{t('form.label.wholesale_price')}</label>
                                                    <input type="number" step="0.01" value={formData.wholesalePrice} onChange={e => setFormData({...formData, wholesalePrice: Number(e.target.value)})} className="w-full bg-[#F0FAF0] border border-[#D1D5DB] px-4 py-2 rounded-[8px] focus:outline-none focus:border-[#16A34A] text-[#1A1A1A]" />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-rajdhani font-bold uppercase tracking-widest text-[#6B7280]" data-i18n="form.label.min_wholesale_qty">{t('form.label.min_wholesale_qty')}</label>
                                                <input type="number" value={formData.minWholesaleQty} onChange={e => setFormData({...formData, minWholesaleQty: Number(e.target.value)})} className="w-full bg-[#F0FAF0] border border-[#D1D5DB] px-4 py-2 rounded-[8px] focus:outline-none focus:border-[#16A34A] text-[#1A1A1A]" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-rajdhani font-bold uppercase tracking-widest text-[#6B7280]" data-i18n="form.label.origin">{t('form.label.origin')}</label>
                                                <input type="text" value={formData.origin} onChange={e => setFormData({...formData, origin: e.target.value})} className="w-full bg-[#F0FAF0] border border-[#D1D5DB] px-4 py-2 rounded-[8px] focus:outline-none focus:border-[#16A34A] text-[#1A1A1A]" data-i18n="form.placeholder.origin" placeholder={t('form.placeholder.origin')} />
                                            </div>
                                        </motion.div>
                                    )}

                                    {modalStep === 4 && (
                                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center space-y-4 py-8 text-center bg-[#F0FAF0] rounded-[16px] border border-[#D1D5DB]">
                                            <Package className="w-16 h-16 text-[#16A34A]" />
                                            <h3 className="font-cinzel font-bold text-xl text-[#1A1A1A]" data-i18n="form.review_title">{t('form.review_title')}</h3>
                                            <p className="font-lato text-sm text-[#374151] max-w-sm" data-i18n="form.review_desc">
                                                {t('form.review_desc', {
                                                    action: editingId ? t('form.action.update') : t('form.action.publish'),
                                                    product: formData.name || t('form.this_product')
                                                })}
                                            </p>
                                        </motion.div>
                                    )}
                                </div>
                            </div>
                            
                            <div className="p-6 border-t border-[#D1D5DB] flex justify-between bg-[#F9FAFB]">
                                <button 
                                    onClick={() => setModalStep(Math.max(1, modalStep - 1))}
                                    disabled={modalStep === 1}
                                    className={`px-6 py-2 rounded-[8px] font-rajdhani font-bold uppercase tracking-widest text-sm transition-colors ${modalStep === 1 ? 'text-[#D1D5DB] bg-transparent cursor-not-allowed' : 'text-[#374151] hover:bg-[#D1D5DB]/30'}`}
                                    data-i18n="auth.back"
                                >
                                    {t('auth.back')}
                                </button>
                                
                                {modalStep < 4 ? (
                                    <button 
                                        onClick={() => setModalStep(modalStep + 1)}
                                        className="bg-[#16A34A] text-[#FFFFFF] px-6 py-2 rounded-[8px] font-rajdhani font-bold uppercase tracking-widest text-sm hover:bg-[#1A4731] transition-colors shadow-sm"
                                        data-i18n="auth.next"
                                    >
                                        {t('auth.next')}
                                    </button>
                                ) : (
                                    <button 
                                        onClick={handleSaveProduct}
                                        className="bg-[#D97706] text-[#FFFFFF] px-6 py-2 rounded-[8px] font-rajdhani font-bold uppercase tracking-widest text-sm hover:bg-[#B45309] transition-colors shadow-sm"
                                        data-i18n="form.btn.submit"
                                    >
                                        {t('form.btn.submit')}
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Delete Confirmation Modal */}
            <AnimatePresence>
                {isDeleteModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-[#1A1A1A]/60 backdrop-blur-sm" onClick={() => setIsDeleteModalOpen(false)} />
                        
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-[#FFFFFF] w-full max-w-md rounded-[24px] shadow-2xl overflow-hidden relative z-10 p-8 text-center border border-[#DC2626]"
                        >
                            <AlertTriangle className="w-16 h-16 text-[#DC2626] mx-auto mb-4" />
                            <h2 className="font-cinzel text-2xl font-bold text-[#1A1A1A] mb-2" data-i18n="form.confirm_delete_title">{t('form.confirm_delete_title') || 'Are you sure?'}</h2>
                            <p className="font-lato text-[#374151] mb-8" data-i18n="form.confirm_delete_desc">{t('form.confirm_delete_desc') || 'This action cannot be undone. This product will be permanently removed from the marketplace.'}</p>
                            
                            <div className="flex gap-4">
                                <button onClick={() => setIsDeleteModalOpen(false)} className="flex-1 px-4 py-3 border border-[#D1D5DB] rounded-[12px] font-rajdhani font-bold uppercase tracking-widest text-[#374151] hover:bg-[#F9FAFB] transition-colors" data-i18n="auth.back">
                                    {t('auth.back')}
                                </button>
                                <button onClick={executeDelete} className="flex-1 px-4 py-3 bg-[#DC2626] rounded-[12px] font-rajdhani font-bold uppercase tracking-widest text-[#FFFFFF] hover:bg-[#B91C1C] transition-colors shadow-sm" data-i18n="prod.delete">
                                    {t('prod.delete')}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

        </div>
    );
}
