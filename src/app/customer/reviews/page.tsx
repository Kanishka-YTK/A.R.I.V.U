'use client';

import { motion } from 'framer-motion';
import { Star, MessageCircle, ThumbsUp } from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from '@/store/languageStore';

export default function CustomerReviews() {
    const { t } = useTranslation();
    const reviews = [
        { id: 1, product: 'Organic Heirloom Tomatoes', rating: 5, date: 'Oct 10, 2026', text: 'These tomatoes are incredible! They actually taste like real tomatoes used to. Shipping was fast and packaging was fully biodegradable.', farmer: 'Green Acres Farm' },
        { id: 2, product: 'Country Wheat Seeds', rating: 4, date: 'Sep 28, 2026', text: 'Good germination rate so far. Excited to see the yield. Appreciate the blockchain traceability showing exactly where they came from.', farmer: 'Sunset Valley Ag' }
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-12 w-full pt-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#D1D5DB] pb-6"
            >
                <div>
                    <h1 className="font-cinzel text-3xl md:text-4xl text-[#1A1A1A] font-bold tracking-wider uppercase mb-2" data-i18n="rev.title">
                        {t('rev.title')}
                    </h1>
                    <p className="font-lato text-[#374151]" data-i18n="rev.subtitle">{t('rev.subtitle')}</p>
                </div>
            </motion.div>

            <div className="space-y-6">
                {reviews.map((review, i) => (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }}
                        key={review.id} 
                        className="bg-[#FFFFFF] border border-[#16A34A] shadow-sm p-6 rounded-[16px]"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="font-rajdhani font-bold text-xl text-[#1A1A1A]">{review.product}</h3>
                                <p className="text-sm font-lato text-[#6B7280] mt-1">
                                    <span data-i18n="rev.sold_by">{t('rev.sold_by')}</span> <span className="text-[#1A4731]">{review.farmer}</span>
                                </p>
                            </div>
                            <div className="text-right">
                                <div className="flex items-center gap-1 mb-1">
                                    {[...Array(5)].map((_, idx) => (
                                        <Star key={idx} className={`w-4 h-4 ${idx < review.rating ? 'fill-[#D97706] text-[#D97706]' : 'text-[#D1D5DB]'}`} />
                                    ))}
                                </div>
                                <span className="text-[10px] uppercase font-rajdhani tracking-widest text-[#6B7280]">{review.date}</span>
                            </div>
                        </div>
                        
                        <p className="font-lato text-[#374151] bg-[#F0FAF0] p-4 rounded-xl border border-[#D1D5DB] mb-4">"{review.text}"</p>
                        
                        <div className="flex gap-4 border-t border-[#D1D5DB] pt-4">
                            <button className="flex items-center gap-2 text-xs font-rajdhani font-bold uppercase tracking-widest text-[#16A34A] hover:bg-[#F0FAF0] px-3 py-1.5 rounded-[8px] transition-colors">
                                <MessageCircle className="w-3.5 h-3.5"/> 
                                <span data-i18n="rev.edit">{t('rev.edit')}</span>
                            </button>
                            <button className="flex items-center gap-2 text-xs font-rajdhani font-bold uppercase tracking-widest text-[#DC2626] hover:bg-[#FEE2E2] px-3 py-1.5 rounded-[8px] transition-colors" data-i18n="rev.delete">
                                {t('rev.delete')}
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="bg-[#F0FAF0] border border-[#16A34A] border-dashed rounded-[16px] p-8 text-center flex flex-col items-center justify-center">
                <ThumbsUp className="w-12 h-12 text-[#16A34A] mb-4" />
                <h3 className="font-cinzel text-xl font-bold text-[#1A1A1A] mb-2" data-i18n="rev.recent_title">{t('rev.recent_title')}</h3>
                <p className="font-lato text-[#374151] mb-6 max-w-sm" data-i18n="rev.recent_desc" data-i18n-params='{"count": 3}'>
                    {t('rev.recent_desc', { count: 3 })}
                </p>
                <Link href="/customer/orders">
                    <button className="bg-[#16A34A] text-[#FFFFFF] px-6 py-3 rounded-[8px] font-rajdhani font-bold uppercase tracking-widest text-sm hover:bg-[#1A4731] transition-colors shadow-sm" data-i18n="rev.write_btn">
                        {t('rev.write_btn')}
                    </button>
                </Link>
            </motion.div>
        </div>
    );
}
