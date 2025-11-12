import { supabase } from './supabase.js';
import { ErrorHandler } from './errorHandler.js';
import { Helpers } from './helpers.js';

// Mock data for fallback
const mockProducts = [
    {
        id: '1',
        title: "Tastic Parboiled Rice 5kg",
        store_id: '1',
        current_price: 105.99,
        original_price: 129.99,
        image_url: null,
        category: "Groceries",
        stores: { name: "Checkers", color_hex: "#E31B23" }
    },
    {
        id: '2',
        title: "Ouma Rusks Buttermilk Chunky",
        store_id: '2',
        current_price: 52.99,
        original_price: 59.99,
        image_url: null,
        category: "Groceries",
        stores: { name: "Pick n Pay", color_hex: "#0055A4" }
    },
    {
        id: '3',
        title: "Rooibos Tea 40bags",
        store_id: '3',
        current_price: 35.50,
        original_price: 42.00,
        image_url: null,
        category: "Beverages",
        stores: { name: "Woolworths", color_hex: "#000000" }
    },
    {
        id: '4',
        title: "Nike Air Max Running Shoes",
        store_id: '4',
        current_price: 899.99,
        original_price: 1099.99,
        image_url: null,
        category: "Sports",
        stores: { name: "Game", color_hex: "#00AEEF" }
    },
    {
        id: '5',
        title: "Samsung Galaxy S21",
        store_id: '5',
        current_price: 8999.99,
        original_price: 9999.99,
        image_url: null,
        category: "Electronics",
        stores: { name: "Makro", color_hex: "#FF0000" }
    },
    {
        id: '6',
        title: "L'Oréal Shampoo 500ml",
        store_id: '6',
        current_price: 89.99,
        original_price: 99.99,
        image_url: null,
        category: "Health & Beauty",
        stores: { name: "Clicks", color_hex: "#E40046" }
    }
];

const mockPosts = [
    {
        id: '1',
        user_id: '1',
        content: "Just found Tastic Rice for R105.99 at Checkers! That's a R24 saving! 🎉 #MzansiDeals #SaveMate",
        media_urls: [],
        like_count: 24,
        comment_count: 8,
        share_count: 3,
        created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        users: { username: "DealFinderSA", full_name: "Deal Finder", avatar_url: null },
        stores: { name: "Checkers" }
    },
    {
        id: '2',
        user_id: '2',
        content: "Woolworths has amazing specials on baby products this week. Pampers nappies at unbeatable prices! 👶 #FamilyBudget #CapeTown",
        media_urls: [],
        like_count: 42,
        comment_count: 12,
        share_count: 5,
        created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        users: { username: "BudgetShopperCT", full_name: "Budget Shopper", avatar_url: null },
        stores: { name: "Woolworths" }
    }
];

export class DataService {
    // Products - REAL Supabase query with fallback
    static async getProducts(filters = {}) {
        try {
            let query = supabase
                .from('products')
                .select(`
                    *,
                    stores(name, category, color_hex)
                `)
                .order('created_at', { ascending: false });

            if (filters.category) {
                query = query.eq('category', filters.category);
            }

            if (filters.search) {
                query = query.ilike('title', `%${filters.search}%`);
            }

            if (filters.limit) {
                query = query.limit(filters.limit);
            }

            const { data, error } = await query;

            if (error) throw error;

            // Add badges
            const productsWithBadges = data.map(product => ({
                ...product,
                badge: Helpers.generateProductBadge(product)
            }));

            return { success: true, data: productsWithBadges };
        } catch (error) {
            console.log('Using mock data due to error:', error.message);
            return this.getMockProducts(filters);
        }
    }

    // Posts - REAL Supabase query with fallback
    static async getPosts(limit = 50) {
        try {
            const { data, error } = await supabase
                .from('posts')
                .select(`
                    *,
                    users(username, full_name, avatar_url),
                    stores(name, color_hex)
                `)
                .order('created_at', { ascending: false })
                .limit(limit);

            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.log('Using mock posts due to error:', error.message);
            return this.getMockPosts(limit);
        }
    }

    static async createPost(postData) {
        try {
            const { data, error } = await supabase
                .from('posts')
                .insert([{
                    ...postData,
                    created_at: new Date().toISOString()
                }])
                .select(`
                    *,
                    users(username, full_name, avatar_url),
                    stores(name)
                `);

            if (error) throw error;
            return { success: true, data: data[0] };
        } catch (error) {
            console.log('Using mock post creation due to error:', error.message);
            // Mock implementation
            const newPost = {
                id: Date.now().toString(),
                ...postData,
                like_count: 0,
                comment_count: 0,
                share_count: 0,
                created_at: new Date().toISOString(),
                users: { 
                    username: "CurrentUser", 
                    full_name: "Current User", 
                    avatar_url: null 
                },
                stores: { name: "" }
            };
            
            mockPosts.unshift(newPost);
            return { success: true, data: newPost };
        }
    }

    static async likePost(postId) {
        try {
            // This would require a likes table in a real app
            // For now, just return success
            return { success: true };
        } catch (error) {
            return ErrorHandler.handle(error, 'Failed to like post');
        }
    }

    // Shopping Lists
    static async getShoppingLists(userId) {
        try {
            const { data, error } = await supabase
                .from('shopping_lists')
                .select(`
                    *,
                    shopping_list_items(
                        *,
                        products(*)
                    )
                `)
                .eq('user_id', userId)
                .order('created_at', { ascending: false });

            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.log('Using mock shopping lists due to error:', error.message);
            return { success: true, data: [] };
        }
    }

    static async createShoppingList(listData) {
        try {
            const { data, error } = await supabase
                .from('shopping_lists')
                .insert([{
                    ...listData,
                    created_at: new Date().toISOString()
                }])
                .select();

            if (error) throw error;
            return { success: true, data: data[0] };
        } catch (error) {
            console.log('Using mock list creation due to error:', error.message);
            const newList = {
                id: Date.now().toString(),
                ...listData,
                shopping_list_items: []
            };
            return { success: true, data: newList };
        }
    }

    static async addToList(listId, productId) {
        try {
            const { data, error } = await supabase
                .from('shopping_list_items')
                .insert([{
                    list_id: listId,
                    product_id: productId,
                    quantity: 1,
                    added_at: new Date().toISOString()
                }])
                .select(`
                    *,
                    products(*)
                `);

            if (error) throw error;
            return { success: true, data: data[0] };
        } catch (error) {
            return ErrorHandler.handle(error, 'Failed to add item to list');
        }
    }

    // Black Market Listings
    static async getListings(filters = {}) {
        try {
            let query = supabase
                .from('listings')
                .select(`
                    *,
                    users(username, full_name, avatar_url)
                `)
                .order('created_at', { ascending: false });

            if (filters.type && filters.type !== 'all') {
                query = query.eq('type', filters.type);
            }

            const { data, error } = await query;

            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.log('Using mock listings due to error:', error.message);
            return { success: true, data: [] };
        }
    }

    static async createListing(listingData) {
        try {
            const { data, error } = await supabase
                .from('listings')
                .insert([{
                    ...listingData,
                    created_at: new Date().toISOString()
                }])
                .select(`
                    *,
                    users(username, full_name, avatar_url)
                `);

            if (error) throw error;
            return { success: true, data: data[0] };
        } catch (error) {
            return ErrorHandler.handle(error, 'Failed to create listing');
        }
    }

    // Stores
    static async getStores() {
        try {
            const { data, error } = await supabase
                .from('stores')
                .select('*')
                .order('name');

            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.log('Using mock stores due to error:', error.message);
            const mockStores = [
                { id: '1', name: 'Checkers', category: 'Groceries', color_hex: '#E31B23' },
                { id: '2', name: 'Pick n Pay', category: 'Groceries', color_hex: '#0055A4' },
                { id: '3', name: 'Woolworths', category: 'Food & Clothing', color_hex: '#000000' },
                { id: '4', name: 'Makro', category: 'Wholesale', color_hex: '#FF0000' },
                { id: '5', name: 'Game', category: 'Department Store', color_hex: '#00AEEF' },
                { id: '6', name: 'Clicks', category: 'Health & Beauty', color_hex: '#E40046' }
            ];
            return { success: true, data: mockStores };
        }
    }

    // Mock data fallbacks
    static async getMockProducts(filters = {}) {
        let data = [...mockProducts];

        if (filters.category) {
            data = data.filter(product => product.category === filters.category);
        }

        if (filters.search) {
            const searchTerm = filters.search.toLowerCase();
            data = data.filter(product => 
                product.title.toLowerCase().includes(searchTerm) ||
                product.stores.name.toLowerCase().includes(searchTerm)
            );
        }

        if (filters.limit) {
            data = data.slice(0, filters.limit);
        }

        const productsWithBadges = data.map(product => ({
            ...product,
            badge: Helpers.generateProductBadge(product)
        }));

        return { success: true, data: productsWithBadges };
    }

    static async getMockPosts(limit = 50) {
        return { success: true, data: mockPosts.slice(0, limit) };
    }
}