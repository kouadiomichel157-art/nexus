// Product Types
export type ProductPlatform = 'Steam' | 'PSN' | 'Xbox' | 'Nintendo' | 'Other';
export type ProductType = 'Key' | 'TopUp' | 'Subscription';

export interface Product {
    id: string;
    title: string;
    slug: string;
    price: number;
    compareAtPrice?: number;
    platform: ProductPlatform;
    type: ProductType;
    imageUrl: string;
    description?: string;
    isActive: boolean;
    stockCount?: number;
    createdAt?: string;
}

// User Types
export interface UserProfile {
    id: string;
    username: string;
    email: string;
    walletBalance: number;
    createdAt: string;
}

// Order Types
export type OrderStatus = 'pending' | 'completed' | 'failed' | 'refunded';

export interface Order {
    id: string;
    userId: string;
    totalAmount: number;
    status: OrderStatus;
    createdAt: string;
    items: OrderItem[];
}

export interface OrderItem {
    productId: string;
    productTitle: string;
    price: number;
    quantity: number;
    keyValue?: string;
}

// Cart Types
export interface CartItem {
    product: Product;
    quantity: number;
}
