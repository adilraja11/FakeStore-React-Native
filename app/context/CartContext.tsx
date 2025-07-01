import { createContext, ReactNode, useContext, useState } from "react";

export interface CartItem {
    id: number;
    title: string;
    category: string;
    price: number;
    image: string;
    quantity: number;
}

interface CartContextType {
    cartItems: CartItem[],
    addToCart: (item: CartItem) => void;
    updateQuantity: (id: number, change: number) => void;
    removeItem: (id: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within CartProvider');
    return context;
}

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const addToCart = (item: CartItem) => {
        setCartItems(prev => {
            const exist = prev.find(i => i.id === item.id);
            if (exist) {
                return prev.map(i =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1} : i
                );
            }

            return [...prev, {...item, quantity: 1}];
        })
    };

    const updateQuantity = (id: number, change: number) => {
        setCartItems(prev =>
            prev.map(item =>
                item.id === id
                    ? {...item, quantity: Math.max(1, item.quantity + change)}
                    : item
            )
        )
    }

    const removeItem = (id: number) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    }

    return (
        <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeItem }}>
            {children}
        </CartContext.Provider>
    )
}