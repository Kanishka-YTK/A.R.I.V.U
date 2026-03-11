import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Role = 'FARMER' | 'CUSTOMER' | 'EXPORT_BUYER' | 'ADMIN';

export interface User {
    id: string;
    name: string;
    role: Role;
    email: string;
    location?: string;
    farmSize?: string;
    avatar?: string;
}

export interface Product {
    id: string;
    farmerId: string;
    name: string;
    category: string;
    description: string;
    retailPrice: number;
    wholesalePrice: number;
    minWholesaleQty: number;
    stock: number;
    image: string;
    organic: boolean;
    blockchainHash: string;
    createdAt: string;
}

export interface SensorData {
    moisture: number;
    temperature: number;
    humidity: number;
    pestAlerts: number;
    waterUsed: number;
}

export interface CartItem extends Product {
    cartId: string;
    qty: number;
    purchaseType: 'Retail' | 'Wholesale';
}

export interface Review {
    id: string;
    productId: string;
    customerId: string;
    customerName: string;
    rating: number;
    text: string;
    date: string;
}

interface AppState {
    currentUser: User | null;
    farmers: User[];
    products: Product[];
    login: (user: User) => void;
    logout: () => void;
    addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'blockchainHash'>) => void;
    updateProduct: (id: string, updates: Partial<Product>) => void;
    deleteProduct: (id: string) => void;
    updateUser: (id: string, updates: Partial<User>) => void;
    sensorData: SensorData;
    updateSensorData: (data: Partial<SensorData>) => void;
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (cartId: string) => void;
    updateCartItemQty: (cartId: string, qty: number) => void;
    updateCartItemType: (cartId: string, type: 'Retail' | 'Wholesale') => void;
    clearCart: () => void;
    reviews: Review[];
    addReview: (review: Omit<Review, 'id' | 'date'>) => void;
    updateReview: (id: string, text: string, rating: number) => void;
    deleteReview: (id: string) => void;
}

const mockFarmers: User[] = [
    { id: 'f1', name: 'Kamalesh', role: 'FARMER', email: 'kamalesh@example.com', location: 'Tamil Nadu, India', farmSize: '15 Acres' },
    { id: 'f2', name: 'Abishek', role: 'FARMER', email: 'abishek@example.com', location: 'Kerala, India', farmSize: '22 Acres' },
    { id: 'f3', name: 'Kanishka', role: 'FARMER', email: 'kanishka@example.com', location: 'Karnataka, India', farmSize: '8 Acres' },
    { id: 'f4', name: 'Veeraragavan', role: 'FARMER', email: 'veeraragavan@example.com', location: 'Tamil Nadu, India', farmSize: '12 Acres' },
    { id: 'f5', name: 'Shyam Sharan', role: 'FARMER', email: 'shyam@example.com', location: 'Andhra Pradesh, India', farmSize: '30 Acres' },
    { id: 'f6', name: 'Mohit', role: 'FARMER', email: 'mohit@example.com', location: 'Punjab, India', farmSize: '5 Acres' },
    { id: 'f7', name: 'Balakrishnan', role: 'FARMER', email: 'bala@example.com', location: 'Tamil Nadu, India', farmSize: '18 Acres' },
    { id: 'f8', name: 'Ricky', role: 'FARMER', email: 'ricky@example.com', location: 'Maharashtra, India', farmSize: '10 Acres' },
    { id: 'f9', name: 'Husmatth', role: 'FARMER', email: 'husmatth@example.com', location: 'Gujarat, India', farmSize: '14 Acres' },
    { id: 'f10', name: 'Sujith', role: 'FARMER', email: 'sujith@example.com', location: 'Kerala, India', farmSize: '7 Acres' },
    { id: 'f11', name: 'Dhigesh', role: 'FARMER', email: 'dhigesh@example.com', location: 'Tamil Nadu, India', farmSize: '9 Acres' },
    { id: 'f12', name: 'Dinesh', role: 'FARMER', email: 'dinesh@example.com', location: 'Karnataka, India', farmSize: '11 Acres' },
    { id: 'f13', name: 'Siva', role: 'FARMER', email: 'siva@example.com', location: 'Tamil Nadu, India', farmSize: '20 Acres' },
];

const mockProducts: Product[] = [
    // Vegetables
    { id: 'p1', farmerId: 'f1', name: 'prod.heirloom_tomatoes', category: 'Vegetables', description: 'prod.tomatoes_desc', retailPrice: 4.50, wholesalePrice: 3.00, minWholesaleQty: 50, stock: 200, image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80', organic: true, blockchainHash: '0x8f2a...b19c', createdAt: new Date().toISOString() },
    { id: 'p2', farmerId: 'f2', name: 'prod.spinach_bundle', category: 'Vegetables', description: 'prod.spinach_desc', retailPrice: 2.00, wholesalePrice: 1.20, minWholesaleQty: 100, stock: 300, image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80', organic: true, blockchainHash: '0x1a2b...3c4d', createdAt: new Date().toISOString() },
    { id: 'p3', farmerId: 'f3', name: 'prod.purple_brinjal', category: 'Vegetables', description: 'prod.brinjal_desc', retailPrice: 3.50, wholesalePrice: 2.50, minWholesaleQty: 40, stock: 150, image: 'https://placehold.co/600x400/1A4731/FFFFFF?text=Purple+Brinjal', organic: false, blockchainHash: '0x9d8e...7f6a', createdAt: new Date().toISOString() },
    { id: 'p4', farmerId: 'f4', name: 'prod.crunchy_carrots', category: 'Vegetables', description: 'prod.carrots_desc', retailPrice: 2.80, wholesalePrice: 1.80, minWholesaleQty: 60, stock: 400, image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&q=80', organic: true, blockchainHash: '0x2b3c...4d5e', createdAt: new Date().toISOString() },
    { id: 'p5', farmerId: 'f5', name: 'prod.green_beans', category: 'Vegetables', description: 'prod.beans_desc', retailPrice: 3.00, wholesalePrice: 2.00, minWholesaleQty: 30, stock: 120, image: 'https://placehold.co/600x400/1A4731/FFFFFF?text=Green+Beans', organic: true, blockchainHash: '0x3c4d...5e6f', createdAt: new Date().toISOString() },
    // Fruits
    { id: 'p6', farmerId: 'f6', name: 'prod.alphonso_mangoes', category: 'Fruits', description: 'prod.mangoes_desc', retailPrice: 12.00, wholesalePrice: 8.00, minWholesaleQty: 20, stock: 50, image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&q=80', organic: true, blockchainHash: '0x4d5e...6f7a', createdAt: new Date().toISOString() },
    { id: 'p7', farmerId: 'f7', name: 'prod.robusta_bananas', category: 'Fruits', description: 'prod.bananas_desc', retailPrice: 1.50, wholesalePrice: 0.90, minWholesaleQty: 100, stock: 500, image: 'https://placehold.co/600x400/1A4731/FFFFFF?text=Robusta+Bananas', organic: false, blockchainHash: '0x5e6f...7a8b', createdAt: new Date().toISOString() },
    { id: 'p8', farmerId: 'f8', name: 'prod.papaya', category: 'Fruits', description: 'prod.papaya_desc', retailPrice: 4.00, wholesalePrice: 2.50, minWholesaleQty: 30, stock: 80, image: 'https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?auto=format&fit=crop&q=80', organic: true, blockchainHash: '0x6f7a...8b9c', createdAt: new Date().toISOString() },
    { id: 'p9', farmerId: 'f1', name: 'prod.guava', category: 'Fruits', description: 'prod.guava_desc', retailPrice: 3.00, wholesalePrice: 1.80, minWholesaleQty: 40, stock: 100, image: 'https://images.unsplash.com/photo-1528821128474-27f963b062bf?auto=format&fit=crop&q=80', organic: true, blockchainHash: '0x7a8b...9c0d', createdAt: new Date().toISOString() },
    { id: 'p10', farmerId: 'f2', name: 'prod.watermelon', category: 'Fruits', description: 'prod.watermelon_desc', retailPrice: 5.00, wholesalePrice: 3.00, minWholesaleQty: 10, stock: 30, image: 'https://images.unsplash.com/photo-1589984662646-e7b2e4962f18?auto=format&fit=crop&q=80', organic: false, blockchainHash: '0x8b9c...0d1e', createdAt: new Date().toISOString() },
    // Grains
    { id: 'p11', farmerId: 'f3', name: 'prod.basmati_rice', category: 'Grains', description: 'prod.rice_desc', retailPrice: 8.00, wholesalePrice: 5.50, minWholesaleQty: 100, stock: 1000, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80', organic: true, blockchainHash: '0x9c0d...1e2f', createdAt: new Date().toISOString() },
    { id: 'p12', farmerId: 'f4', name: 'prod.whole_wheat', category: 'Grains', description: 'prod.wheat_desc', retailPrice: 6.00, wholesalePrice: 4.00, minWholesaleQty: 200, stock: 2000, image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80', organic: false, blockchainHash: '0x0d1e...2f3a', createdAt: new Date().toISOString() },
    { id: 'p13', farmerId: 'f5', name: 'prod.yellow_maize', category: 'Grains', description: 'prod.maize_desc', retailPrice: 4.00, wholesalePrice: 2.80, minWholesaleQty: 300, stock: 1500, image: 'https://images.unsplash.com/photo-1601648764658-cf37e8c89b70?auto=format&fit=crop&q=80', organic: true, blockchainHash: '0x1e2f...3a4b', createdAt: new Date().toISOString() },
    { id: 'p14', farmerId: 'f6', name: 'prod.pearl_millet', category: 'Grains', description: 'prod.millet_desc', retailPrice: 5.00, wholesalePrice: 3.50, minWholesaleQty: 50, stock: 400, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80', organic: true, blockchainHash: '0x2f3a...4b5c', createdAt: new Date().toISOString() },
    { id: 'p15', farmerId: 'f7', name: 'prod.sorghum', category: 'Grains', description: 'prod.sorghum_desc', retailPrice: 4.50, wholesalePrice: 3.20, minWholesaleQty: 50, stock: 500, image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80', organic: false, blockchainHash: '0x3a4b...5c6d', createdAt: new Date().toISOString() },
    // Seeds, Fertilizers, Pesticides
    { id: 'p16', farmerId: 'f8', name: 'prod.cotton_seeds', category: 'Seeds', description: 'prod.cotton_desc', retailPrice: 20.00, wholesalePrice: 16.00, minWholesaleQty: 20, stock: 100, image: 'https://placehold.co/600x400/1A4731/FFFFFF?text=Cotton+Seeds', organic: false, blockchainHash: '0x4b5c...6d7e', createdAt: new Date().toISOString() },
    { id: 'p17', farmerId: 'f1', name: 'prod.chilli_seeds', category: 'Seeds', description: 'prod.chilli_desc', retailPrice: 15.00, wholesalePrice: 12.00, minWholesaleQty: 10, stock: 200, image: 'https://placehold.co/600x400/1A4731/FFFFFF?text=Chilli+Seeds', organic: true, blockchainHash: '0x5c6d...7e8f', createdAt: new Date().toISOString() },
    { id: 'p18', farmerId: 'f2', name: 'prod.neem_pesticide', category: 'Pesticides', description: 'prod.neem_desc', retailPrice: 15.00, wholesalePrice: 10.00, minWholesaleQty: 20, stock: 50, image: 'https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?auto=format&fit=crop&q=80', organic: true, blockchainHash: '0x91d2...c10b', createdAt: new Date().toISOString() },
    { id: 'p19', farmerId: 'f3', name: 'prod.vermicompost', category: 'Fertilizers', description: 'prod.vermicompost_desc', retailPrice: 10.00, wholesalePrice: 7.00, minWholesaleQty: 50, stock: 300, image: 'https://images.unsplash.com/photo-1590682680695-43b964a3ae17?auto=format&fit=crop&q=80', organic: true, blockchainHash: '0x6d7e...8f9a', createdAt: new Date().toISOString() },
    { id: 'p20', farmerId: 'f4', name: 'prod.panchagavya', category: 'Fertilizers', description: 'prod.panchagavya_desc', retailPrice: 12.00, wholesalePrice: 9.00, minWholesaleQty: 20, stock: 150, image: 'https://placehold.co/600x400/1A4731/FFFFFF?text=Panchagavya', organic: true, blockchainHash: '0x7e8f...9a0b', createdAt: new Date().toISOString() },
];

export const useMockDb = create<AppState>()(
    persist(
        (set) => ({
            currentUser: null,
            farmers: mockFarmers,
            products: mockProducts,
            sensorData: {
                moisture: 65,
                temperature: 28,
                humidity: 60,
                pestAlerts: 0,
                waterUsed: 1250,
            },
            login: (user) => set((state) => {
                // Keep the farmer details from mock if they are logging in
                const existingFarmer = state.farmers.find(f => f.email === user.email || f.id === user.email);
                return { currentUser: existingFarmer || user };
            }),
            logout: () => set({ currentUser: null }),
            addProduct: (product) => set((state) => ({
                products: [{
                    ...product,
                    id: Math.random().toString(36).substring(7),
                    blockchainHash: '0x' + Math.random().toString(16).substring(2, 10),
                    createdAt: new Date().toISOString(),
                }, ...state.products]
            })),
            updateProduct: (id, updates) => set((state) => ({
                products: state.products.map(p => p.id === id ? { ...p, ...updates } : p)
            })),
            deleteProduct: (id) => set((state) => ({
                products: state.products.filter(p => p.id !== id)
            })),
            updateUser: (id, updates) => set((state) => {
                const newFarmers = state.farmers.map(f => f.id === id ? { ...f, ...updates } : f);
                const isCurrentUser = state.currentUser?.id === id;
                return {
                    farmers: newFarmers,
                    ...(isCurrentUser && { currentUser: { ...state.currentUser!, ...updates } })
                };
            }),
            updateSensorData: (data) => set((state) => ({
                sensorData: { ...state.sensorData, ...data }
            })),
            cart: [],
            addToCart: (item) => set((state) => ({ cart: [...state.cart, item] })),
            removeFromCart: (cartId) => set((state) => ({ cart: state.cart.filter(c => c.cartId !== cartId) })),
            updateCartItemQty: (cartId, qty) => set((state) => ({
                cart: state.cart.map(c => c.cartId === cartId ? { ...c, qty: Math.max(1, qty) } : c)
            })),
            updateCartItemType: (cartId, type) => set((state) => ({
                cart: state.cart.map(c => c.cartId === cartId ? { ...c, purchaseType: type } : c)
            })),
            clearCart: () => set({ cart: [] }),
            reviews: [
                { id: 'r1', productId: 'p1', customerId: 'cust1', customerName: 'Alice Smith', rating: 5, text: 'Absolutely the best tomatoes I have ever tasted! Perfect for salads.', date: new Date().toISOString() },
                { id: 'r2', productId: 'p1', customerId: 'cust2', customerName: 'Bob Johnson', rating: 4, text: 'Very fresh and good quality, slightly delayed delivery.', date: new Date().toISOString() }
            ],
            addReview: (review) => set((state) => {
                const currentUser = state.currentUser;
                const customerId = currentUser ? currentUser.id : review.customerId;
                const customerName = currentUser ? currentUser.name : review.customerName;

                return {
                    reviews: [
                        { 
                            ...review, 
                            customerId,
                            customerName,
                            id: Math.random().toString(36).substring(7), 
                            date: new Date().toISOString() 
                        }, 
                        ...state.reviews
                    ]
                };
            }),
            updateReview: (id, text, rating) => set((state) => ({
                reviews: state.reviews.map(r => r.id === id ? { ...r, text, rating, date: new Date().toISOString() } : r)
            })),
            deleteReview: (id) => set((state) => ({
                reviews: state.reviews.filter(r => r.id !== id)
            })),
        }),
        {
            name: 'arivu-shield-storage-v6', // Force refresh for new farmer names
        }
    )
);
