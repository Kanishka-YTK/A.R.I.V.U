'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useTranslation } from '@/store/languageStore';
import { Radio, Droplet, Wind, Vibrate, ThermometerSun, AlertCircle, Play, Square, Settings2, Bell, Download, Calendar } from 'lucide-react';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

ChartJS.defaults.color = '#86EFAC';
ChartJS.defaults.borderColor = 'rgba(74,222,128,0.1)';

export default function CropMonitor() {
    const { t } = useTranslation();
    const [distance, setDistance] = useState(150);
    const [moisture, setMoisture] = useState(42);
    const [motorOn, setMotorOn] = useState(false);
    const [fanSpeed, setFanSpeed] = useState(0);
    const [vibrationOn, setVibrationOn] = useState(false);

    // Simulate Real-time Data
    useEffect(() => {
        const interval = setInterval(() => {
            setDistance(prev => {
                const newDist = prev + (Math.random() * 20 - 10);
                return Math.max(10, Math.min(400, newDist));
            });
            setMoisture(prev => Math.max(0, Math.min(100, prev + (motorOn ? 2 : -0.5))));
        }, 2000);
        return () => clearInterval(interval);
    }, [motorOn]);

    const intruderDetected = distance < 50;
    const moistureCritical = moisture < 30;

    // Chart Options Factory
    const getChartOptions = (yLabelKey: string, xLabelKey: string = 'monitor.chart.date') => ({
        responsive: true,
        plugins: {
            legend: { position: 'top' as const, labels: { color: '#FCD34D' } },
            tooltip: { backgroundColor: '#0F2D1F', titleColor: '#4ADE80', bodyColor: '#FFFFFF', borderColor: '#4ADE80', borderWidth: 1 }
        },
        scales: {
            y: { title: { display: true, text: t(yLabelKey), color: '#86EFAC' }, beginAtZero: true },
            x: { title: { display: true, text: t(xLabelKey), color: '#86EFAC' } }
        }
    });

    const getDualAxisOptions = () => ({
        responsive: true,
        plugins: { legend: { position: 'top' as const, labels: { color: '#FCD34D' } } },
        scales: {
            y: { type: 'linear' as const, display: true, position: 'left' as const, title: { display: true, text: t('monitor.chart.temp') } },
            y1: { type: 'linear' as const, display: true, position: 'right' as const, grid: { drawOnChartArea: false }, title: { display: true, text: t('monitor.chart.hum') } },
            x: { title: { display: true, text: t('monitor.chart.time'), color: '#86EFAC' } }
        }
    });

    return (
        <div className="relative overflow-hidden bg-[#0F2D1F] text-[#86EFAC] font-mono rounded-3xl p-6 lg:p-8 shadow-2xl border border-[#4ADE80]/20">
            {/* Immersive Circuit Background */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(74, 222, 128, 0.2) 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

            {/* Header */}
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 mb-8 border-b border-[#4ADE80]/30 pb-4">
                <h1 className="font-cinzel text-heading-fixed font-bold uppercase tracking-[0.2em] text-[#FFFFFF] drop-shadow-[0_0_15px_rgba(74,222,128,0.8)] flex items-center gap-4">
                    <Radio className="w-10 h-10 animate-pulse text-[#4ADE80]" />
                    <span data-i18n="monitor.title">{t('monitor.title') || 'Live Crop Monitoring'}</span>
                </h1>
                <p className="font-rajdhani text-body-fixed text-[#86EFAC] uppercase tracking-widest mt-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#DC2626] animate-ping"></span> <span data-i18n="monitor.desc">{t('monitor.desc') || 'Real-Time Hardware & Software Integration Panel'}</span>
                </p>
            </motion.div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* 1. Ultrasonic Sensor */}
                <div className={`col-span-1 rounded-2xl p-6 border transition-all duration-300 bg-[#1A3D2B] ${intruderDetected ? 'border-[#DC2626] shadow-[0_0_30px_rgba(220,38,38,0.4)]' : 'border-[rgba(74,222,128,0.3)] hover:shadow-[0_0_20px_rgba(74,222,128,0.1)]'}`}>
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="uppercase tracking-widest text-[#FCD34D] font-bold text-subheading-fixed" data-i18n="monitor.ultrasonic">{t('monitor.ultrasonic') || 'Ultrasonic Radar'}</h3>
                        <span className={`px-2 py-0.5 rounded text-muted-fixed font-bold text-[#FFFFFF] ${intruderDetected ? 'bg-[#DC2626] animate-pulse' : 'bg-[#22C55E]'}`}>
                            {intruderDetected ? <span data-i18n="monitor.intruder">{t('monitor.intruder') || 'INTRUDER DETECTED'}</span> : <span data-i18n="monitor.clear">{t('monitor.clear') || 'CLEAR'}</span>}
                        </span>
                    </div>
                    
                    <div className="flex flex-col items-center justify-center py-6 relative">
                        <div className="relative w-32 h-32 flex items-center justify-center">
                            <div className="absolute w-full h-full border border-[#4ADE80]/30 rounded-full"></div>
                            <div className="absolute w-[66%] h-[66%] border border-[#4ADE80]/50 rounded-full"></div>
                            <div className="absolute w-[33%] h-[33%] border border-[#4ADE80]/80 rounded-full"></div>
                            <div className={`absolute w-full h-full rounded-full border-t-2 ${intruderDetected ? 'border-[#DC2626] animate-spin-fast' : 'border-[#4ADE80] animate-spin-slow'}`}></div>
                            <span className={`text-5xl font-bold ${intruderDetected ? 'text-[#DC2626] drop-shadow-[0_0_10px_rgba(220,38,38,0.8)]' : 'text-[#4ADE80]'}`}>{Math.round(distance)}</span>
                            <span className="absolute bottom-2 text-xs text-[#86EFAC]">cm</span>
                        </div>
                    </div>
                    
                    <div className="mt-4 border-t border-[rgba(74,222,128,0.3)] pt-4">
                        <label className="text-label-fixed text-[#86EFAC] uppercase mb-2 block" data-i18n="monitor.threshold">{t('monitor.threshold')}</label>
                        <input type="range" min="10" max="400" defaultValue="50" className="w-full h-1 bg-[#16A34A] rounded-lg appearance-none cursor-pointer custom-slider-gold" />
                    </div>
                </div>

                {/* 2. Soil Moisture Sensor */}
                <div className={`col-span-1 rounded-2xl p-6 border transition-all duration-300 bg-[#1A3D2B] ${moistureCritical ? 'border-[#DC2626] shadow-[0_0_30px_rgba(220,38,38,0.4)]' : 'border-[rgba(74,222,128,0.3)] hover:shadow-[0_0_20px_rgba(74,222,128,0.1)]'}`}>
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="uppercase tracking-widest text-[#FCD34D] font-bold text-subheading-fixed" data-i18n="monitor.soil">{t('monitor.soil') || 'Soil Moisture'}</h3>
                        <span className={`px-2 py-0.5 rounded text-muted-fixed font-bold text-[#FFFFFF] ${moistureCritical ? 'bg-[#DC2626] animate-pulse' : moisture > 60 ? 'bg-[#4ADE80]' : 'bg-[#F59E0B]'}`}>
                            {moistureCritical ? <span data-i18n="monitor.dry">{t('monitor.dry') || 'DRY - CRITICAL'}</span> : moisture > 60 ? <span data-i18n="monitor.optimal">{t('monitor.optimal') || 'OPTIMAL'}</span> : <span data-i18n="monitor.moderate">{t('monitor.moderate') || 'MODERATE'}</span>}
                        </span>
                    </div>

                    <div className="flex flex-col items-center justify-center py-4 relative">
                        <svg className="w-32 h-32 transform -rotate-90">
                            <circle cx="64" cy="64" r="50" fill="transparent" stroke="rgba(74,222,128,0.1)" strokeWidth="12" />
                            <circle cx="64" cy="64" r="50" fill="transparent" stroke={moistureCritical ? '#DC2626' : moisture > 60 ? '#4ADE80' : '#F59E0B'} strokeWidth="12" strokeDasharray="314" strokeDashoffset={314 - (314 * moisture) / 100} className="transition-all duration-500" strokeLinecap="round" />
                        </svg>
                        <div className="absolute flex flex-col items-center">
                            <span className="text-4xl font-bold text-[#FFFFFF]">{Math.round(moisture)}%</span>
                        </div>
                    </div>

                    <div className="mt-4 flex gap-2">
                        {['Zone A', 'Zone B', 'Zone C'].map((zone, i) => (
                            <button key={i} className={`flex-1 py-1 text-button-fixed uppercase border-b-2 rounded-t ${i === 0 ? 'bg-transparent border-[#FCD34D] text-[#86EFAC]' : 'border-transparent text-[#6B7280]'}`} data-i18n={`monitor.zone_${i+1}`}>{t(`monitor.zone_${i+1}`)}</button>
                        ))}
                    </div>
                </div>

                {/* 3. Motor Control Panel */}
                <div className="col-span-1 rounded-2xl p-6 border border-[rgba(74,222,128,0.3)] bg-[#1A3D2B] hover:shadow-[0_0_20px_rgba(74,222,128,0.1)] transition-all">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="uppercase tracking-widest text-[#FCD34D] font-bold text-subheading-fixed" data-i18n="monitor.irrigation">{t('monitor.irrigation') || 'Irrigation Motor'}</h3>
                        <Droplet className={`w-5 h-5 ${motorOn ? 'text-[#4ADE80] animate-pulse' : 'text-[#6B7280]'}`} />
                    </div>

                    <div className="flex items-center justify-between py-6">
                        <div className="flex flex-col">
                            <span className="text-muted-fixed text-[#86EFAC] uppercase mb-1" data-i18n="monitor.status">{t('monitor.status') || 'Status'}</span>
                             <span className={`text-subheading-fixed font-bold ${motorOn ? 'text-[#4ADE80]' : 'text-[#DC2626]'}`}>{motorOn ? <span data-i18n="monitor.running">{t('monitor.running') || 'RUNNING'}</span> : <span data-i18n="monitor.stopped">{t('monitor.stopped') || 'STOPPED'}</span>}</span>
                             <span className="text-muted-fixed text-[#FFFFFF] uppercase mt-2" data-i18n="monitor.power_val" data-i18n-params={JSON.stringify({ val: motorOn ? '1450 W' : '0 W' })}>{t('monitor.power_val', { val: motorOn ? '1450 W' : '0 W' })}</span>
                             <span className="text-muted-fixed text-[#FFFFFF] uppercase mt-1" data-i18n="monitor.water_val" data-i18n-params={JSON.stringify({ val: motorOn ? '12.4 L/m' : '0.0 L/m' })}>{t('monitor.water_val', { val: motorOn ? '12.4 L/m' : '0.0 L/m' })}</span>
                        </div>
                        
                        <button onClick={() => setMotorOn(!motorOn)} className={`w-24 h-40 rounded-xl relative border flex flex-col justify-between p-2 shadow-inner transition-colors duration-300 ${motorOn ? 'bg-[#0F2D1F] border-[#4ADE80] shadow-[0_0_20px_rgba(74,222,128,0.3)_inset]' : 'bg-[#0F2D1F] border-[#DC2626]/50 shadow-none'}`}>
                            <span className={`text-center font-bold text-subheading-fixed ${motorOn ? 'text-[#4ADE80] drop-shadow-[0_0_5px_#4ADE80]' : 'text-[#6B7280]'}`} data-i18n="monitor.on">{t('monitor.on')}</span>
                            <div className={`w-full h-16 rounded-lg transition-transform duration-300 ${motorOn ? 'bg-[#4ADE80] translate-y-0 shadow-[0_0_15px_#4ADE80]' : 'bg-[#DC2626] translate-y-16'}`}></div>
                            <span className={`text-center font-bold text-subheading-fixed ${!motorOn ? 'text-[#DC2626]' : 'text-[#6B7280]'}`} data-i18n="monitor.off">{t('monitor.off')}</span>
                        </button>
                    </div>
                    
                    <div className="mt-2 flex items-center justify-between border-t border-[rgba(74,222,128,0.3)] pt-4">
                        <span className="text-label-fixed text-[#86EFAC] uppercase" data-i18n="monitor.auto_mode">{t('monitor.auto_mode') || 'Auto Mode (Moisture Based)'}</span>
                        <input type="checkbox" defaultChecked className="toggle-checkbox-gold" />
                    </div>
                </div>

            </div>

            {/* Second Row Grid: Fan & Pest */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                
                {/* 4. Fan Control Module */}
                <div className="col-span-1 border border-[rgba(74,222,128,0.3)] bg-[#1A3D2B] rounded-2xl p-5 hover:shadow-[0_0_20px_rgba(74,222,128,0.1)] text-center flex flex-col">
                    <h3 className="uppercase tracking-widest text-[#FCD34D] font-bold text-subheading-fixed mb-4 text-left" data-i18n="monitor.fan">{t('monitor.fan') || 'Ventilation Fan'}</h3>
                    
                    <div className="flex-1 flex flex-col items-center justify-center">
                        <Wind className={`w-16 h-16 mb-4 ${fanSpeed > 0 ? 'text-[#4ADE80]' : 'text-[#6B7280]'} ${fanSpeed > 0 ? (fanSpeed > 2 ? 'animate-spin-fast' : 'animate-spin-slow') : ''}`} style={{ animationDuration: fanSpeed > 0 ? `${1.5 / fanSpeed}s` : '0s' }} />
                        <span className="text-xl font-bold text-[#FFFFFF] mb-2 uppercase" data-i18n={fanSpeed === 0 ? 'monitor.off' : fanSpeed === 1 ? 'monitor.low' : fanSpeed === 2 ? 'monitor.med' : 'monitor.max'}>
                            {fanSpeed === 0 ? t('monitor.off') : fanSpeed === 1 ? t('monitor.low') : fanSpeed === 2 ? t('monitor.med') : t('monitor.max')} 
                        </span>
                        <span className="text-sm font-bold text-[#4ADE80] mb-4">({(fanSpeed * 1200).toFixed(0)} RPM)</span>
                    </div>

                    <div className="flex gap-2 mb-4 justify-center">
                        {['Auto', 'Manual'].map((mode, i) => (
                            <button key={i} className={`px-2 py-1 text-button-fixed uppercase border-b-2 rounded-t ${i === 1 ? 'bg-transparent border-[#FCD34D] text-[#86EFAC]' : 'border-transparent text-[#6B7280]'}`} data-i18n={i === 0 ? 'monitor.auto' : 'monitor.manual'}>{i === 0 ? t('monitor.auto') : t('monitor.manual')}</button>
                        ))}
                    </div>
                    <input type="range" min="0" max="3" value={fanSpeed} onChange={(e) => setFanSpeed(Number(e.target.value))} className="w-full h-1 bg-[#16A34A] rounded-lg appearance-none cursor-pointer custom-slider-gold" />
                </div>

                {/* 5. Pest Deterrence (Vibration) */}
                <div className="col-span-1 border border-[rgba(74,222,128,0.3)] bg-[#1A3D2B] rounded-2xl p-5 hover:shadow-[0_0_20px_rgba(74,222,128,0.1)] text-center flex flex-col">
                    <h3 className="uppercase tracking-widest text-[#FCD34D] font-bold text-subheading-fixed mb-4 text-left" data-i18n="monitor.pest">{t('monitor.pest') || 'Pest Deterrence (Vibration)'}</h3>
                    
                    <div className="flex-1 flex flex-col items-center justify-center">
                        <Vibrate className={`w-16 h-16 mb-4 ${vibrationOn ? 'text-[#4ADE80] animate-pulse' : 'text-[#6B7280]'}`} />
                        <button 
                            onClick={() => setVibrationOn(!vibrationOn)}
                            className={`px-6 py-2 rounded font-bold uppercase tracking-widest transition-all ${vibrationOn ? 'bg-transparent border border-[#FCD34D] text-[#FCD34D] shadow-[0_0_10px_rgba(252,211,77,0.2)]' : 'bg-transparent border border-[#FCD34D] text-[#FCD34D] opacity-70 hover:opacity-100'}`}
                            data-i18n={vibrationOn ? 'monitor.active' : 'monitor.arm'}
                        >
                            {vibrationOn ? t('monitor.active') : t('monitor.arm')}
                        </button>
                    </div>

                    <div className="mt-4 flex gap-2 mb-2">
                        {['Continuous', 'Pulse', 'Random'].map((pattern, i) => (
                            <button key={i} className={`flex-1 py-1 text-xs uppercase border rounded ${i === 1 ? 'border-[#FCD34D] text-[#FCD34D]' : 'border-[#6B7280] text-[#6B7280]'}`} data-i18n={`monitor.pattern_${i+1}`}>{t(`monitor.pattern_${i+1}`)}</button>
                        ))}
                    </div>
                    <label className="text-xs text-[#86EFAC] uppercase mb-1 mt-2 text-left block" data-i18n="monitor.intensity">{t('monitor.intensity')}</label>
                    <input type="range" min="0" max="5" defaultValue="3" className="w-full h-1 mb-4 bg-[#16A34A] rounded-lg appearance-none cursor-pointer custom-slider-gold" />
                    <div className="text-[10px] text-left text-[#4ADE80] opacity-80 mt-2">Last Activation: 14 Mins Ago (Pattern: Pulse)</div>
                </div>
            </div>

            {/* Rules & Alerts */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                <div className="border border-[rgba(74,222,128,0.3)] bg-[#1A3D2B] rounded-2xl p-5 flex-1 panel-container">
                    <h3 className="uppercase tracking-widest text-[#FCD34D] font-bold text-label-fixed mb-4 flex items-center gap-2" data-i18n="monitor.rules"><Settings2 className="w-4 h-4"/> {t('monitor.rules') || 'Smart Rules Engine'}</h3>
                    <div className="space-y-3">
                        <div className="bg-[#0F2D1F] border border-[rgba(74,222,128,0.2)] p-3 rounded text-xs flex justify-between items-center text-[#FFFFFF]">
                            <span><span className="text-[#86EFAC]">IF</span> Moisture &lt; 30% <span className="text-[#4ADE80] font-bold">→ Motor ON</span></span>
                            <input type="checkbox" defaultChecked className="toggle-checkbox-gold" />
                        </div>
                        <div className="bg-[#0F2D1F] border border-[rgba(74,222,128,0.2)] p-3 rounded text-xs flex justify-between items-center text-[#FFFFFF] gap-2">
                            <span><span className="text-[#86EFAC]">IF</span> Distance &lt; 50cm <span className="text-[#DC2626] font-bold">→ Alarm ON</span></span>
                            <input type="checkbox" defaultChecked className="toggle-checkbox-gold" />
                        </div>
                    </div>
                </div>

                <div className="border border-red-500/30 bg-[#1A3D2B] rounded-2xl p-5 flex-1 overflow-hidden">
                    <h3 className="uppercase tracking-widest text-[#DC2626] font-bold text-sm mb-4 flex items-center gap-2"><Bell className="w-4 h-4"/> <span data-i18n="monitor.log">{t('monitor.log')}</span></h3>
                    <div className="space-y-2 h-24 overflow-y-auto text-[10px] font-mono text-[#86EFAC]">
                        {intruderDetected && <div className="text-[#DC2626]">[{new Date().toLocaleTimeString()}] <span data-i18n="monitor.critical_msg">{t('monitor.critical_msg')}</span></div>}
                        {motorOn && <div className="text-[#4ADE80]">[{new Date().toLocaleTimeString()}] <span data-i18n="monitor.info_msg">{t('monitor.info_msg')}</span></div>}
                        {moistureCritical && <div className="text-[#F59E0B]">[{new Date().toLocaleTimeString()}] <span data-i18n="monitor.warn_msg">{t('monitor.warn_msg')}</span></div>}
                        <div className="text-[#86EFAC]">[{new Date().toLocaleTimeString()}] <span data-i18n="monitor.heartbeat">{t('monitor.heartbeat')}</span></div>
                    </div>
                </div>
            </div>

            {/* Enhanced Analytics Section */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 mt-12 border-t border-[#4ADE80]/30 pt-8">
                <h2 className="font-cinzel text-subheading-fixed font-bold uppercase tracking-[0.2em] text-[#FFFFFF] drop-shadow-[0_0_10px_rgba(74,222,128,0.6)] mb-6" data-i18n="monitor.historical">
                    {t('monitor.historical') || 'Historical Analytics'}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Soil Moisture Trend */}
                    <div className="border border-[rgba(74,222,128,0.3)] bg-[#1A3D2B] rounded-2xl p-4 hover:shadow-[0_0_20px_rgba(74,222,128,0.1)]">
                        <div className="flex justify-between items-center mb-4 border-b border-[#4ADE80]/20 pb-2">
                            <h3 className="uppercase tracking-widest text-[#FCD34D] font-bold text-label-fixed" data-i18n="monitor.chart.soil">{t('monitor.chart.soil') || 'Soil Moisture (7 Days)'}</h3>
                            <div className="flex gap-2 text-[#4ADE80]">
                                <Calendar className="w-4 h-4 cursor-pointer hover:text-[#FFFFFF]" />
                                <Download className="w-4 h-4 cursor-pointer hover:text-[#FFFFFF]" />
                            </div>
                        </div>
                        <div className="h-48">
                            <Line options={getChartOptions('monitor.chart.moisture')} data={{
                                labels: [t('common.mon'), t('common.tue'), t('common.wed'), t('common.thu'), t('common.fri'), t('common.sat'), t('common.sun')],
                                datasets: [
                                    { label: t('monitor.zone_1'), data: [45, 42, 38, 55, 60, 58, 48], borderColor: '#4ADE80', backgroundColor: '#4ADE80' },
                                    { label: t('monitor.zone_2'), data: [50, 48, 45, 60, 65, 62, 55], borderColor: '#D97706', backgroundColor: '#D97706' },
                                ]
                            }} />
                        </div>
                    </div>

                    {/* Water Usage */}
                    <div className="border border-[rgba(74,222,128,0.3)] bg-[#1A3D2B] rounded-2xl p-4 hover:shadow-[0_0_20px_rgba(74,222,128,0.1)]">
                        <div className="flex justify-between items-center mb-4 border-b border-[#4ADE80]/20 pb-2">
                            <h3 className="uppercase tracking-widest text-[#FCD34D] font-bold text-xs" data-i18n="monitor.chart.water">{t('monitor.chart.water') || 'Water Usage (Weekly)'}</h3>
                            <div className="flex gap-2 text-[#4ADE80]">
                                <Calendar className="w-4 h-4 cursor-pointer hover:text-[#FFFFFF]" />
                                <Download className="w-4 h-4 cursor-pointer hover:text-[#FFFFFF]" />
                            </div>
                        </div>
                        <div className="h-48">
                            <Bar options={getChartOptions('monitor.chart.liters', 'monitor.chart.week')} data={{
                                labels: [t('common.week_1'), t('common.week_2'), t('common.week_3'), t('common.week_4')],
                                datasets: [{ label: t('monitor.chart.water_dataset'), data: [1200, 1450, 1100, 1300], backgroundColor: '#3B82F6' }]
                            }} />
                        </div>
                    </div>

                    {/* Motor Runtime */}
                    <div className="border border-[rgba(74,222,128,0.3)] bg-[#1A3D2B] rounded-2xl p-4 hover:shadow-[0_0_20px_rgba(74,222,128,0.1)]">
                        <div className="flex justify-between items-center mb-4 border-b border-[#4ADE80]/20 pb-2">
                            <h3 className="uppercase tracking-widest text-[#FCD34D] font-bold text-xs" data-i18n="monitor.chart.runtime">{t('monitor.chart.runtime') || 'Motor Runtime (Daily)'}</h3>
                            <div className="flex gap-2 text-[#4ADE80]">
                                <Calendar className="w-4 h-4 cursor-pointer hover:text-[#FFFFFF]" />
                                <Download className="w-4 h-4 cursor-pointer hover:text-[#FFFFFF]" />
                            </div>
                        </div>
                        <div className="h-48">
                            <Bar options={getChartOptions('monitor.chart.hours')} data={{
                                labels: [t('common.mon'), t('common.tue'), t('common.wed'), t('common.thu'), t('common.fri'), t('common.sat'), t('common.sun')],
                                datasets: [{ label: t('monitor.chart.runtime_dataset'), data: [2.5, 3.1, 1.8, 4.0, 3.5, 2.0, 2.8], backgroundColor: '#10B981' }]
                            }} />
                        </div>
                    </div>

                    {/* Dual Axis Temp Hum */}
                    <div className="border border-[rgba(74,222,128,0.3)] bg-[#1A3D2B] rounded-2xl p-4 hover:shadow-[0_0_20px_rgba(74,222,128,0.1)]">
                        <div className="flex justify-between items-center mb-4 border-b border-[#4ADE80]/20 pb-2">
                            <h3 className="uppercase tracking-widest text-[#FCD34D] font-bold text-xs" data-i18n="monitor.chart.temp_hum">{t('monitor.chart.temp_hum') || 'Temp & Humidity (48h)'}</h3>
                            <div className="flex gap-2 text-[#4ADE80]">
                                <Calendar className="w-4 h-4 cursor-pointer hover:text-[#FFFFFF]" />
                                <Download className="w-4 h-4 cursor-pointer hover:text-[#FFFFFF]" />
                            </div>
                        </div>
                        <div className="h-48">
                            <Line options={getDualAxisOptions()} data={{
                                labels: ['0h', '8h', '16h', '24h', '32h', '40h', '48h'],
                                datasets: [
                                    { label: t('monitor.chart.temp_dataset'), data: [22, 28, 32, 26, 21, 29, 31], borderColor: '#EF4444', backgroundColor: '#EF4444', yAxisID: 'y' },
                                    { label: t('monitor.chart.hum_dataset'), data: [65, 50, 40, 55, 70, 45, 42], borderColor: '#3B82F6', backgroundColor: '#3B82F6', yAxisID: 'y1' }
                                ]
                            }} />
                        </div>
                    </div>

                    {/* Intrusion Events */}
                    <div className="border border-[rgba(74,222,128,0.3)] bg-[#1A3D2B] rounded-2xl p-4 hover:shadow-[0_0_20px_rgba(74,222,128,0.1)]">
                        <div className="flex justify-between items-center mb-4 border-b border-[#4ADE80]/20 pb-2">
                            <h3 className="uppercase tracking-widest text-[#FCD34D] font-bold text-xs" data-i18n="monitor.chart.pest">{t('monitor.chart.pest') || 'Intrusion Detections (14D)'}</h3>
                            <div className="flex gap-2 text-[#4ADE80]">
                                <Calendar className="w-4 h-4 cursor-pointer hover:text-[#FFFFFF]" />
                                <Download className="w-4 h-4 cursor-pointer hover:text-[#FFFFFF]" />
                            </div>
                        </div>
                        <div className="h-48">
                            <Bar options={getChartOptions('monitor.chart.events', 'monitor.chart.day')} data={{
                                labels: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14'],
                                datasets: [{ label: t('monitor.chart.pest_dataset'), data: [0, 2, 0, 0, 5, 0, 1, 0, 0, 0, 3, 0, 0, 1], backgroundColor: '#DC2626' }]
                            }} />
                        </div>
                    </div>

                    {/* Pest Vibration */}
                    <div className="border border-[rgba(74,222,128,0.3)] bg-[#1A3D2B] rounded-2xl p-4 hover:shadow-[0_0_20px_rgba(74,222,128,0.1)]">
                        <div className="flex justify-between items-center mb-4 border-b border-[#4ADE80]/20 pb-2">
                            <h3 className="uppercase tracking-widest text-[#FCD34D] font-bold text-xs" data-i18n="monitor.chart.vibration">{t('monitor.chart.vibration') || 'Vibration Activations'}</h3>
                            <div className="flex gap-2 text-[#4ADE80]">
                                <Calendar className="w-4 h-4 cursor-pointer hover:text-[#FFFFFF]" />
                                <Download className="w-4 h-4 cursor-pointer hover:text-[#FFFFFF]" />
                            </div>
                        </div>
                        <div className="h-48">
                            <Line options={getChartOptions('monitor.chart.count')} data={{
                                labels: [t('common.mon'), t('common.tue'), t('common.wed'), t('common.thu'), t('common.fri'), t('common.sat'), t('common.sun')],
                                datasets: [{ label: t('monitor.chart.vibration_dataset'), data: [12, 10, 25, 8, 5, 15, 6], borderColor: '#FCD34D', backgroundColor: '#FCD34D' }]
                            }} />
                        </div>
                    </div>

                </div>
            </motion.div>

        </div>
    );
}
