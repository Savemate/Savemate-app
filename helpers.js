export const APP_NAME = 'SaveMate';

export const STORE_CATEGORIES = [
    'Groceries',
    'Fashion',
    'Electronics',
    'Home & Garden',
    'Health & Beauty',
    'Sports',
    'Automotive',
    'Other'
];

export const JOB_TYPES = [
    { value: 'job-seeking', label: 'Job Seeking' },
    { value: 'job-offering', label: 'Job Offering' },
    { value: 'services', label: 'Services' },
    { value: 'products', label: 'Products' }
];

export const MEDIA_TYPES = {
    IMAGE: 'image',
    VIDEO: 'video',
    AUDIO: 'audio',
    PDF: 'pdf'
};

export const SOUTH_AFRICAN_CITIES = [
    'Johannesburg',
    'Cape Town',
    'Durban',
    'Pretoria',
    'Port Elizabeth',
    'Bloemfontein',
    'East London',
    'Pietermaritzburg'
];import { APP_NAME } from './constants.js';

export class Helpers {
    static formatPrice(price) {
        return new Intl.NumberFormat('en-ZA', {
            style: 'currency',
            currency: 'ZAR'
        }).format(price);
    }

    static formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);

        if (diffInSeconds < 60) return 'Just now';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
        if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
        
        return date.toLocaleDateString('en-ZA');
    }

    static getInitials(name) {
        if (!name) return 'U';
        return name
            .split(' ')
            .map(word => word.charAt(0).toUpperCase())
            .join('')
            .slice(0, 2);
    }

    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    static generateProductBadge(product) {
        if (!product.original_price) return null;
        
        const discount = ((product.original_price - product.current_price) / product.original_price) * 100;
        
        if (discount >= 50) return 'HOT DEAL';
        if (discount >= 30) return 'GREAT DEAL';
        if (discount >= 10) return 'SAVING';
        
        return 'ON SALE';
    }
}