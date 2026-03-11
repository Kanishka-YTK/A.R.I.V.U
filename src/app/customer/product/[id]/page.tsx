'use client';

import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useMockDb } from '@/store/mockDb';
import { ArrowLeft, Star, QrCode, ShieldCheck, ShoppingCart, Info, CheckCircle2, MessageSquare, Leaf, Edit3, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';
import { useTranslation } from '@/store/languageStore';

export default function ProductDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const { t } = useTranslation();
    
    const product = useMockDb((state) => state.products).find(p => p.id === id);
    const user = useMockDb(state => state.currentUser);
    const reviews = useMockDb(state => state.reviews).filter(r => r.productId === id);
    const addReview = useMockDb(state => state.addReview);
    const updateReview = useMockDb(state => state.updateReview);
    const deleteReview = useMockDb(state => state.deleteReview);
    const addToCart = useMockDb(state => state.addToCart);

    const [purchaseType, setPurchaseType] = useState<'RETAIL' | 'WHOLESALE'>('RETAIL');
    const [qty, setQty] = useState<number>(1);
    const [showQr, setShowQr] = useState(false);
    
    // Review form state
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [showToast, setShowToast] = useState(false);

    const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
    const [editRating, setEditRating] = useState(0);
    const [editHoverRating, setEditHoverRating] = useState(0);
    const [editReviewText, setEditReviewText] = useState('');

    if (!product) return <div className="p-12 text-center text-[#1A1A1A] font-cinzel text-2xl font-bold">Product not found.</div>;

    const currentPrice = purchaseType === 'RETAIL' ? product.retailPrice : product.wholesalePrice;
    const currentTotal = currentPrice * qty;

    const hasReviewed = reviews.some(r => r.customerId === user?.id);
    const avgRating = reviews.length > 0 ? (reviews.reduce((a, b) => a + b.rating, 0) / reviews.length).toFixed(1) : '5.0';

    const handleAddToCart = () => {
        addToCart({
            ...product,
            cartId: Math.random().toString(36).substring(7),
            qty: qty,
            purchaseType: purchaseType === 'RETAIL' ? 'Retail' : 'Wholesale'
        });
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
    };

    const handleSubmitReview = () => {
        if (rating === 0) return alert('Please select a star rating.');
        if (!user) return alert('Please log in to review.');
        addReview({
            productId: product.id,
            customerId: user.id || 'cust',
            customerName: user.name || 'Anonymous',
            rating,
            text: reviewText
        });
        setRating(0);
        setReviewText('');
    };

    const handleUpdateReview = (reviewId: string) => {
        if (editRating === 0) return alert('Please select a star rating.');
        updateReview(reviewId, editReviewText, editRating);
        setEditingReviewId(null);
    };

    const handleDeleteReview = (reviewId: string) => {
        if (confirm('Are you sure you want to delete this review?')) {
            deleteReview(reviewId);
        }
    };

    const traceSteps = [
        { date: '2023-11-04', title: 'Seed Sourced', desc: 'Traditional A-grade seeds verified.', hash: '0x3a...2f14' },
        { date: '2023-12-19', title: 'Organic Fertilizer Applied', desc: 'Neem-based organic compound.', hash: '0x8f...1a2c' },
        { date: '2024-02-10', title: 'Harvested', desc: 'Peak ripeness detected via IoT.', hash: '0x9b...4e5f' },
        { date: '2024-02-12', title: 'Quality Graded', desc: 'Export quality approved. Node 4.', hash: product.blockchainHash },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-700 pb-12">

            <AnimatePresence>
                {showToast && (
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed top-24 right-8 bg-[#16A34A] text-[#FFFFFF] px-6 py-4 rounded-xl shadow-2xl z-50 font-rajdhani font-bold tracking-widest text-sm flex items-center gap-2"
                    >
                        <ShoppingCart className="w-5 h-5"/> Added to Cart Successfully!
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Back Button */}
            <button
                onClick={() => router.back()}
                className="flex items-center space-x-2 text-[#16A34A] hover:text-[#1A4731] font-rajdhani uppercase tracking-widest font-bold transition-colors"
            >
                <ArrowLeft className="w-5 h-5" />
                <span data-i18n="prod.return">{t('prod.return')}</span>
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                {/* Left Column: Media & Blockchain */}
                <div className="space-y-8">

                    {/* Main Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="w-full h-96 lg:h-[500px] rounded-[32px] overflow-hidden bg-[#FFFFFF] border border-[#D1D5DB] shadow-sm relative group"
                    >
                        <img
                            src={product.image}
                            alt={t(product.name)}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        {product.organic && (
                            <div className="absolute top-6 left-6 px-4 py-2 bg-[#16A34A] text-white rounded-full font-rajdhani font-bold text-sm uppercase tracking-widest shadow-xl flex items-center gap-2">
                                <Leaf className="w-4 h-4"/> <span data-i18n="prod.organic_desc">{t('prod.organic_desc')}</span>
                            </div>
                        )}

                        {/* Blockchain QR Overlay */}
                        <AnimatePresence>
                            {showQr && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    className="absolute inset-0 bg-[#000000]/80 backdrop-blur-md flex flex-col items-center justify-center p-8 z-20"
                                >
                                    <div className="w-48 h-48 bg-white p-4 rounded-2xl mb-6 shadow-[0_0_30px_rgba(22,163,74,0.4)]">
                                        <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${product.blockchainHash}&color=1A4731&bgcolor=FFFFFF`} alt="Traceability QR" className="w-full h-full" />
                                    </div>
                                    <p className="font-mono text-[#86EFAC] bg-[#16A34A]/20 border border-[#4ADE80]/30 px-4 py-2 rounded-lg text-sm mb-4 tracking-wider">
                                        {product.blockchainHash}
                                    </p>
                                    <Button variant="secondary" className="text-[#1A1A1A] border-[#FFFFFF] hover:bg-[#FFFFFF]/90" onClick={() => setShowQr(false)}>Close Scanner</Button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    {/* Traceability Timeline */}
                    <div className="bg-[#FFFFFF] border border-[#16A34A] p-8 rounded-[32px] shadow-sm">
                        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#D1D5DB]">
                            <h3 className="font-cinzel text-xl text-[#1A1A1A] font-bold tracking-wide uppercase flex items-center gap-3">
                                <ShieldCheck className="w-6 h-6 text-[#16A34A]" />
                                <span data-i18n="prod.ledger">{t('prod.ledger')}</span>
                            </h3>
                            <button className="bg-[#F0FAF0] text-[#16A34A] border border-[#16A34A] px-4 py-2 rounded-lg text-sm font-rajdhani font-bold hover:bg-[#16A34A] hover:text-[#FFFFFF] flex items-center gap-2 transition-colors uppercase tracking-widest" onClick={() => setShowQr(true)}>
                                <QrCode className="w-4 h-4" /> <span data-i18n="prod.verify">{t('prod.verify')}</span>
                            </button>
                        </div>

                        <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[11px] before:h-full before:w-0.5 before:bg-[#D1D5DB]">
                            {traceSteps.map((step, i) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    key={i} className="relative flex items-start gap-6 group pl-[34px]"
                                >
                                    {/* Timeline Dot */}
                                    <div className="absolute left-0 top-1 flex items-center justify-center w-6 h-6 rounded-full border-2 border-[#16A34A] bg-[#FFFFFF] z-10">
                                        {i === traceSteps.length - 1 && <div className="w-2 h-2 bg-[#16A34A] rounded-full animate-ping"></div>}
                                    </div>

                                    {/* Content Box */}
                                    <div className="flex-1 p-4 rounded-2xl border border-[#D1D5DB] bg-[#F9FAFB] group-hover:border-[#16A34A] group-hover:bg-[#F0FAF0] transition-colors">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="font-mono text-[10px] text-[#16A34A] bg-[#16A34A]/10 px-2 py-0.5 rounded font-bold">{step.date}</span>
                                            <span className="font-mono text-[9px] text-[#6B7280]">{step.hash}</span>
                                        </div>
                                        <h4 className="font-rajdhani font-bold text-[#1A1A1A] tracking-wider uppercase text-sm mb-1">{step.title}</h4>
                                        <p className="font-lato text-xs text-[#374151]">{step.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Pricing & Details */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-8"
                >
                    {/* Header */}
                    <div>
                        <h1 className="text-4xl lg:text-5xl font-cinzel font-bold text-[#1A1A1A] tracking-wide mb-4 leading-tight" data-i18n={product.name}>
                            {t(product.name)}
                        </h1>
                        <div className="flex items-center space-x-4 mb-4">
                            <span className="px-4 py-1.5 bg-[#F0FAF0] border border-[#16A34A]/30 rounded-full font-rajdhani text-sm text-[#1A4731] font-bold uppercase tracking-widest" data-i18n={`cat.${product.category.toLowerCase().replace(/ /g, '_')}`}>
                                {t(`cat.${product.category.toLowerCase().replace(/ /g, '_')}`)}
                            </span>
                            <div className="flex items-center space-x-1 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors border border-transparent hover:border-gray-200" onClick={() => document.getElementById('reviews-section')?.scrollIntoView({ behavior: 'smooth'})}>
                                <Star className="w-5 h-5 text-[#D97706] fill-[#D97706]" />
                                <span className="text-sm font-bold text-[#1A1A1A] font-lato ml-1">{avgRating}</span>
                                <span className="text-sm text-[#6B7280] ml-1 font-lato">({reviews.length} <span data-i18n="prod.reviews_caps">{t('prod.reviews_caps') || 'Reviews'}</span>)</span>
                            </div>
                        </div>
                    </div>

                    <p className="font-lato text-lg text-[#374151] leading-relaxed py-4 border-y border-[#D1D5DB]" data-i18n={product.description}>
                        {t(product.description)}
                    </p>

                    {/* Pricing Toggles */}
                    <div className="bg-[#F9FAFB] p-2 rounded-2xl flex relative w-full border border-[#D1D5DB]">
                        {/* Active Highlight Background */}
                        <div
                            className={`absolute inset-y-2 w-[calc(50%-10px)] rounded-[14px] transition-all duration-300 ease-out shadow-sm ${purchaseType === 'RETAIL' ? 'bg-[#FFFFFF] border border-[#16A34A] left-2' : 'bg-[#FFFFFF] border border-[#D97706] left-[calc(50%+2px)]'}`}
                        ></div>

                         <button
                            onClick={() => { setPurchaseType('RETAIL'); setQty(1); }}
                            className={`flex-1 py-4 text-center rounded-[14px] font-rajdhani uppercase tracking-widest transition-colors relative z-10 ${purchaseType === 'RETAIL' ? 'text-[#16A34A] font-bold text-xl' : 'text-[#6B7280] hover:text-[#1A1A1A]'}`}
                        >
                            <span data-i18n="prod.retail_title">{t('prod.retail_title')}</span>
                            <div className={`text-xs font-lato mt-1 normal-case ${purchaseType === 'RETAIL' ? 'text-[#1A4731]' : 'text-[#9CA3AF]'}`} data-i18n="prod.retail_desc">{t('prod.retail_desc')}</div>
                        </button>
                        <button
                            onClick={() => { setPurchaseType('WHOLESALE'); setQty(Math.max(product.minWholesaleQty, qty)); }}
                            className={`flex-1 py-4 text-center rounded-[14px] font-rajdhani uppercase tracking-widest transition-colors relative z-10 ${purchaseType === 'WHOLESALE' ? 'text-[#D97706] font-bold text-xl' : 'text-[#6B7280] hover:text-[#1A1A1A]'}`}
                        >
                            <span data-i18n="prod.wholesale_title">{t('prod.wholesale_title')}</span>
                            <div className={`text-xs font-lato mt-1 normal-case ${purchaseType === 'WHOLESALE' ? 'text-[#B45309]' : 'text-[#9CA3AF]'}`} data-i18n="prod.wholesale_desc">
                                {t('prod.wholesale_desc', { min: product.minWholesaleQty })}
                            </div>
                        </button>
                    </div>

                    {/* Checkout Box */}
                    <div className="rounded-[32px] p-8 bg-[#F0FAF0] border border-[#16A34A]">
                        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
                             <div>
                                <p className="font-rajdhani text-sm text-[#1A4731] font-bold uppercase tracking-widest mb-2" data-i18n="prod.price_unit">{t('prod.price_unit')}</p>
                                <span className={`font-cinzel text-5xl font-bold ${purchaseType === 'RETAIL' ? 'text-[#16A34A]' : 'text-[#D97706]'}`}>
                                    ${currentPrice.toFixed(2)}
                                </span>
                            </div>
                            <div className="text-left sm:text-right bg-[#FFFFFF] px-4 py-2 rounded-xl border border-[#D1D5DB] shadow-sm">
                                <p className="font-rajdhani text-xs text-[#6B7280] uppercase tracking-widest mb-1" data-i18n="prod.stock_level">{t('prod.stock_level') || 'Stock Level'}</p>
                                <span className="font-lato font-bold text-[#1A1A1A] flex items-center justify-start sm:justify-end gap-2" data-i18n="prod.stock_avail">
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#16A34A] animate-pulse"></div>
                                    {t('prod.stock_avail', { stock: product.stock })}
                                </span>
                            </div>
                        </div>

                        <div className="space-y-6">
                             <div className="flex items-center justify-between bg-[#FFFFFF] p-3 rounded-2xl border border-[#D1D5DB]">
                                <span className="font-rajdhani uppercase tracking-widest font-bold text-[#1A1A1A] ml-2" data-i18n="prod.qty">{t('prod.qty')}</span>
                                <div className="flex items-center space-x-4 bg-[#F9FAFB] rounded-xl p-1 border border-[#D1D5DB]">
                                    <button
                                        onClick={() => setQty(Math.max(purchaseType === 'WHOLESALE' ? product.minWholesaleQty : 1, qty - 1))}
                                        className="w-10 h-10 flex items-center justify-center text-[#1A1A1A] hover:bg-[#E5E7EB] rounded-lg font-bold text-xl transition-colors"
                                    >-</button>
                                    <span className="font-rajdhani text-2xl font-bold w-12 text-center text-[#1A1A1A]">{qty}</span>
                                    <button
                                        onClick={() => setQty(Math.min(product.stock, qty + 1))}
                                        className="w-10 h-10 flex items-center justify-center text-[#1A1A1A] hover:bg-[#E5E7EB] rounded-lg font-bold text-xl transition-colors"
                                    >+</button>
                                </div>
                            </div>

                            {purchaseType === 'WHOLESALE' && qty < product.minWholesaleQty && (
                                <div className="p-4 bg-[#FEF2F2] border border-[#FCA5A5] rounded-2xl flex items-start gap-3">
                                    <Info className="w-5 h-5 text-[#DC2626] shrink-0 mt-0.5" />
                                    <p className="font-lato text-sm text-[#991B1B] font-bold" data-i18n="prod.min_warn">
                                        {t('prod.min_warn', { min: product.minWholesaleQty })}
                                    </p>
                                </div>
                            )}

                            <div className="pt-6 border-t border-[#D1D5DB] flex flex-col items-center justify-between mb-8">
                                <span className="font-rajdhani text-sm uppercase tracking-widest font-bold text-[#6B7280] mb-2" data-i18n="prod.total_est">{t('prod.total_est')}</span>
                                <span className="font-cinzel text-4xl font-bold text-[#1A1A1A]">${currentTotal.toFixed(2)}</span>
                            </div>

                            <button
                                onClick={handleAddToCart}
                                disabled={purchaseType === 'WHOLESALE' && qty < product.minWholesaleQty}
                                className={`w-full py-5 rounded-2xl font-rajdhani font-bold uppercase tracking-widest text-lg text-[#FFFFFF] shadow-lg flex items-center justify-center gap-3 transition-transform hover:-translate-y-1 ${purchaseType === 'WHOLESALE' && qty < product.minWholesaleQty ? 'bg-[#9CA3AF] cursor-not-allowed hidden' : 'bg-[#1A1A1A] hover:bg-[#374151]'}`}
                            >
                                <ShoppingCart className="w-6 h-6" /> <span data-i18n="shop.add_to_cart">{t('shop.add_to_cart')}</span>
                            </button>

                            <p className="text-center font-lato text-xs text-[#6B7280] font-bold flex items-center justify-center gap-2 mt-4" data-i18n="prod.secure_msg">
                                <ShieldCheck className="w-4 h-4 text-[#16A34A]" /> {t('prod.secure_msg')}
                            </p>
                        </div>
                    </div>

                </motion.div>
            </div>

            {/* CUSTOMER REVIEWS SECTION */}
            <div id="reviews-section" className="mt-16 pt-12 border-t border-[#D1D5DB] max-w-4xl">
                <h2 className="font-cinzel text-3xl font-bold text-[#1A1A1A] mb-8 flex items-center gap-4">
                    <MessageSquare className="w-8 h-8 text-[#16A34A]" /> <span data-i18n="prod.reviews">{t('prod.reviews')}</span>
                </h2>

                {/* Write Review Form */}
                <div className="bg-[#FFFFFF] rounded-3xl p-8 border border-[#D1D5DB] shadow-sm mb-12">
                    {hasReviewed ? (
                        <div className="text-center py-8">
                            <CheckCircle2 className="w-12 h-12 text-[#16A34A] mx-auto mb-4" />
                            <h3 className="font-rajdhani text-xl font-bold text-[#1A1A1A] uppercase tracking-widest" data-i18n="prod.already_reviewed">{t('prod.already_reviewed')}</h3>
                            <p className="font-lato text-[#6B7280] mt-2" data-i18n="prod.review_thanks">{t('prod.review_thanks')}</p>
                        </div>
                    ) : (
                        <div>
                            <h3 className="font-rajdhani text-xl font-bold text-[#1A1A1A] uppercase tracking-widest border-b border-[#D1D5DB] pb-4 mb-6" data-i18n="prod.write_review">{t('prod.write_review')}</h3>
                            
                            <div className="mb-6">
                                <label className="block font-rajdhani text-sm font-bold uppercase tracking-widest text-[#6B7280] mb-2" data-i18n="prod.rate_label">{t('prod.rate_label')}</label>
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button 
                                            key={star}
                                            onMouseEnter={() => setHoverRating(star)}
                                            onMouseLeave={() => setHoverRating(0)}
                                            onClick={() => setRating(star)}
                                            className="focus:outline-none"
                                        >
                                            <Star className={`w-8 h-8 transition-colors ${(hoverRating || rating) >= star ? 'text-[#D97706] fill-[#D97706]' : 'text-[#D1D5DB]'}`} />
                                        </button>
                                    ))}
                                </div>
                            </div>

                             <div className="mb-8">
                                <label className="block font-rajdhani text-sm font-bold uppercase tracking-widest text-[#6B7280] mb-2" data-i18n="prod.exp_label">{t('prod.exp_label')}</label>
                                <textarea 
                                    rows={4} 
                                    className="w-full bg-[#F9FAFB] border border-[#D1D5DB] rounded-xl p-4 text-[#1A1A1A] focus:outline-none focus:border-[#16A34A] focus:ring-1 focus:ring-[#16A34A] font-lato" 
                                    placeholder={t('prod.exp_placeholder') || "Tell us about the quality, taste, and packaging..."}
                                    data-i18n="prod.exp_placeholder"
                                    value={reviewText}
                                    onChange={(e) => setReviewText(e.target.value)}
                                ></textarea>
                            </div>

                            <button onClick={handleSubmitReview} className="bg-[#16A34A] text-[#FFFFFF] px-8 py-3 rounded-xl font-rajdhani font-bold uppercase tracking-widest hover:bg-[#1A4731] transition-colors shadow-sm">
                                <span data-i18n="prod.submit">{t('prod.submit')}</span>
                            </button>
                        </div>
                    )}
                </div>

                {/* Reviews List */}
                <div className="space-y-6">
                    <h3 className="font-rajdhani text-xl font-bold text-[#1A1A1A] uppercase tracking-widest" data-i18n="prod.recent">
                        {t('prod.recent')} ({reviews.length})
                    </h3>
                    {reviews.length === 0 ? (
                        <p className="font-lato text-[#6B7280]" data-i18n="prod.no_reviews">{t('prod.no_reviews')}</p>
                    ) : (
                        reviews.map(review => (
                            <div key={review.id} className="bg-[#F9FAFB] rounded-2xl p-6 border border-[#D1D5DB]">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-[#16A34A] text-[#FFFFFF] flex items-center justify-center font-cinzel font-bold text-lg">
                                            {review.customerName.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <h4 className="font-rajdhani font-bold text-[#1A1A1A]">{review.customerName}</h4>
                                            <p className="font-mono text-xs text-[#6B7280]">{new Date(review.date).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-1">
                                        {[1,2,3,4,5].map(star => (
                                            <Star key={star} className={`w-4 h-4 ${star <= review.rating ? 'text-[#D97706] fill-[#D97706]' : 'text-[#D1D5DB]'}`} />
                                        ))}
                                    </div>
                                </div>
                                {editingReviewId === review.id ? (
                                    <div className="mt-4">
                                        <div className="flex gap-2 mb-2">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button 
                                                    key={star}
                                                    onMouseEnter={() => setEditHoverRating(star)}
                                                    onMouseLeave={() => setEditHoverRating(0)}
                                                    onClick={() => setEditRating(star)}
                                                    className="focus:outline-none"
                                                >
                                                    <Star className={`w-6 h-6 transition-colors ${(editHoverRating || editRating) >= star ? 'text-[#D97706] fill-[#D97706]' : 'text-[#D1D5DB]'}`} />
                                                </button>
                                            ))}
                                        </div>
                                        <textarea 
                                            rows={3} 
                                            className="w-full bg-[#FFFFFF] border border-[#D1D5DB] rounded-xl p-3 text-[#1A1A1A] focus:outline-none focus:border-[#16A34A] focus:ring-1 focus:ring-[#16A34A] font-lato mb-3" 
                                            value={editReviewText}
                                            onChange={(e) => setEditReviewText(e.target.value)}
                                        ></textarea>
                                        <div className="flex gap-2">
                                            <button onClick={() => handleUpdateReview(review.id)} className="bg-[#16A34A] text-[#FFFFFF] px-4 py-2 rounded-lg font-rajdhani font-bold uppercase tracking-widest hover:bg-[#1A4731] transition-colors text-xs">
                                                Save
                                            </button>
                                            <button onClick={() => setEditingReviewId(null)} className="bg-[#E5E7EB] text-[#374151] px-4 py-2 rounded-lg font-rajdhani font-bold uppercase tracking-widest hover:bg-[#D1D5DB] transition-colors text-xs">
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <p className="font-lato text-[#374151]">{review.text}</p>
                                        {user && review.customerId === user.id && (
                                            <div className="mt-4 flex gap-4 border-t border-[#D1D5DB] pt-3">
                                                <button 
                                                    onClick={() => {
                                                        setEditingReviewId(review.id);
                                                        setEditRating(review.rating);
                                                        setEditReviewText(review.text);
                                                    }} 
                                                    className="text-[#16A34A] text-xs font-bold font-rajdhani uppercase tracking-widest hover:underline flex items-center gap-1"
                                                >
                                                    <Edit3 className="w-3 h-3" /> Edit
                                                </button>
                                                <button 
                                                    onClick={() => handleDeleteReview(review.id)} 
                                                    className="text-[#DC2626] text-xs font-bold font-rajdhani uppercase tracking-widest hover:underline flex items-center gap-1"
                                                >
                                                    <Trash2 className="w-3 h-3" /> Delete
                                                </button>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>

        </div>
    );
}
