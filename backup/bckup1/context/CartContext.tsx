"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '@/lib/mock-data';

interface CartItem extends Product {
    quantity: number;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: Product) => void;
    decreaseQuantity: (productId: string) => void;
    removeFromCart: (productId: string) => void;
    clearCart: () => void;
    totalPrice: number;
    totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);

    // Hydrate cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('nexus_cart');
        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart));
            } catch (e) {
                console.error('Failed to parse cart', e);
            }
        }
        setIsInitialized(true);
    }, []);

    // Persist cart to localStorage
    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem('nexus_cart', JSON.stringify(cart));
        }
    }, [cart, isInitialized]);

    const addToCart = (product: Product) => {
        setCart(current => {
            const existing = current.find(item => item.id === product.id);
            if (existing) {
                // Increment quantity (optional for keys, but standard practice)
                return current.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...current, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId: string) => {
        setCart(current => current.filter(item => item.id !== productId));
    };

    const decreaseQuantity = (productId: string) => {
        setCart(current => {
            const existing = current.find(item => item.id === productId);
            if (existing && existing.quantity > 1) {
                return current.map(item =>
                    item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
                );
            }
            return current;
        });
    };

    const clearCart = () => setCart([]);

    const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, decreaseQuantity, removeFromCart, clearCart, totalPrice, totalItems }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
