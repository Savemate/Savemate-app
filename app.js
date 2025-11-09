import { Navigation } from './components/Navigation.js';
import { AuthPage } from './pages/AuthPage.js';
import { HomePage } from './pages/HomePage.js';
import { ExplorePage } from './pages/ExplorePage.js';
import { UniversePage } from './pages/UniversePage.js';
import { ScannerPage } from './pages/ScannerPage.js';
import { ShoppingListPage } from './pages/ShoppingListPage.js';
import { ProfilePage } from './pages/ProfilePage.js';
import { BlackMarketPage } from './pages/BlackMarketPage.js';
import { MessagesPage } from './pages/MessagesPage.js';
import { SettingsPage } from './pages/SettingsPage.js';
import { MusicPage } from './pages/MusicPage.js';
import { VideosPage } from './pages/VideosPage.js';
import { PicturesPage } from './pages/PicturesPage.js';
import { BooksPage } from './pages/BooksPage.js';
import { AuthService } from './services/auth.js';
import { DataService } from './services/data.js';
import { StorageService } from './services/storage.js';
import { ErrorHandler } from './utils/errorHandler.js';
import { Helpers } from './utils/helpers.js';
import { DealCard } from './components/DealCard.js';
import { PostCard } from './components/PostCard.js';
import { ShoppingList } from './components/ShoppingList.js';

class SaveMateApp {
    constructor() {
        this.currentUser = null;
        this.currentPage = 'home';
        this.savedDeals = new Set();
        this.darkMode = localStorage.getItem('darkMode') === 'true';
        this.userProfile = null;
        
        this.init();
    }

    async init() {
        // Set initial theme
        if (this.darkMode) {
            document.body.classList.add('dark-mode');
        }

        // Check authentication
        await this.checkAuth();
        this.setupEventListeners();
        this.renderApp();
    }

    async checkAuth() {
        const result = await AuthService.getCurrentUser();
        if (result.success) {
            this.currentUser = result.user;
            // Load user profile
            if (this.currentUser) {
                const profileResult = await AuthService.getUserProfile(this.currentUser.id);
                if (profileResult.success) {
                    this.userProfile = profileResult.data;
                }
            }
        }
    }

    setupEventListeners() {
        // Auth state changes
        AuthService.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN') {
                this.currentUser = session.user;
                this.renderApp();
            } else if (event === 'SIGNED_OUT') {
                this.currentUser = null;
                this.userProfile = null;
                this.renderApp();
            }
        });
    }

    renderApp() {
        const app = document.getElementById('app');
        
        if (!this.currentUser) {
            app.innerHTML = AuthPage.render();
            return;
        }

        app.innerHTML = `
            ${Navigation.renderHeader(this.currentUser)}
            <main class="main-content">
                <!-- Pages will be rendered here -->
            </main>
            ${Navigation.renderBottomNav(this.currentPage)}
        `;

        this.switchPage(this.currentPage);
    }

    async switchPage(pageId) {
        this.currentPage = pageId;
        
        // Update navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-page') === pageId) {
                item.classList.add('active');
            }
        });

        const mainContent = document.querySelector('.main-content');
        
        switch (pageId) {
            case 'home':
                mainContent.innerHTML = await HomePage.render();
                await this.loadHomePageData();
                break;
            case 'explore':
                mainContent.innerHTML = await ExplorePage.render();
                await this.loadExplorePageData();
                break;
            case 'universe':
                mainContent.innerHTML = UniversePage.render(this.currentUser?.id);
                await this.loadUniversePageData();
                break;
            case 'scanner':
                mainContent.innerHTML = ScannerPage.render();
                break;
            case 'shopping-list':
                mainContent.innerHTML = await ShoppingListPage.render();
                await this.loadShoppingListData();
                break;
            case 'profile':
                mainContent.innerHTML = ProfilePage.render(
                    this.userProfile || this.currentUser, 
                    true
                );
                await this.loadProfilePageData();
                break;
            case 'black-market':
                mainContent.innerHTML = BlackMarketPage.render();
                await this.loadBlackMarketData();
                break;
            case 'messages':
                mainContent.innerHTML = MessagesPage.render();
                break;
            case 'settings':
                mainContent.innerHTML = SettingsPage.render();
                break;
            case 'music':
                mainContent.innerHTML = MusicPage.render();
                break;
            case 'videos':
                mainContent.innerHTML = VideosPage.render();
                break;
            case 'pictures':
                mainContent.innerHTML = PicturesPage.render();
                break;
            case 'books':
                mainContent.innerHTML = BooksPage.render();
                break;
            default:
                mainContent.innerHTML = await HomePage.render();
                await this.loadHomePageData();
        }
    }

    async loadHomePageData() {
        // Load trending deals
        const trendingResult = await DataService.getProducts({ limit: 6 });
        if (trendingResult.success) {
            const dealsContainer = document.getElementById('dealsContainer');
            dealsContainer.innerHTML = trendingResult.data.map(product => 
                DealCard.render(product, this.savedDeals.has(product.id))
            ).join('');
        }

        // Load recent deals
        const recentResult = await DataService.getProducts({ limit: 6 });
        if (recentResult.success) {
            const recentContainer = document.getElementById('recentDealsContainer');
            recentContainer.innerHTML = recentResult.data.map(product => 
                DealCard.render(product, this.savedDeals.has(product.id))
            ).join('');
        }
    }

    async loadExplorePageData() {
        // Load stores
        const storesResult = await DataService.getStores();
        if (storesResult.success) {
            const storesContainer = document.getElementById('storesContainer');
            storesContainer.innerHTML = storesResult.data.map(store => `
                <div class="deal-card" onclick="App.showStoreProducts('${store.id}')">
                    <div class="deal-image" style="background: ${store.color_hex}; color: white; font-weight: bold;">
                        ${store.name.toUpperCase()}
                    </div>
                    <div class="deal-content">
                        <div class="deal-title">${store.name}</div>
                        <div class="deal-store">
                            <span>${store.category}</span>
                        </div>
                        <div class="deal-actions">
                            <button class="deal-btn" style="width: 100%; background: var(--navy-blue); color: white;">
                                <i class="fas fa-store"></i> Browse Store
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        // Load all products
        const productsResult = await DataService.getProducts();
        if (productsResult.success) {
            const exploreContainer = document.getElementById('exploreDealsContainer');
            exploreContainer.innerHTML = productsResult.data.map(product => 
                DealCard.render(product, this.savedDeals.has(product.id))
            ).join('');
        }
    }

    async loadUniversePageData() {
        const postsResult = await DataService.getPosts();
        if (postsResult.success) {
            const postsContainer = document.getElementById('universePosts');
            postsContainer.innerHTML = postsResult.data.map(post => 
                PostCard.render(post, this.currentUser.id)
            ).join('');
        }
    }

    async loadProfilePageData() {
        // Load user posts
        const postsResult = await DataService.getPosts();
        if (postsResult.success) {
            const userPosts = postsResult.data.filter(post => 
                post.user_id === this.currentUser.id
            );
            const postsContainer = document.getElementById('userPostsContainer');
            postsContainer.innerHTML = userPosts.map(post => 
                PostCard.render(post, this.currentUser.id)
            ).join('');
        }
    }

    async loadShoppingListData() {
        const listsResult = await DataService.getShoppingLists(this.currentUser.id);
        if (listsResult.success) {
            const container = document.getElementById('shoppingListContainer');
            container.innerHTML = listsResult.data.length > 0 ? 
                listsResult.data.map(list => ShoppingList.render(list)).join('') :
                '<div style="text-align: center; padding: 40px; color: var(--text-muted);"><i class="fas fa-list" style="font-size: 48px; margin-bottom: 16px;"></i><p>No shopping lists yet. Create your first list!</p></div>';
        }
    }

    async loadBlackMarketData() {
        const listingsResult = await DataService.getListings();
        if (listingsResult.success) {
            const listingsContainer = document.getElementById('blackMarketListings');
            listingsContainer.innerHTML = listingsResult.data.length > 0 ? 
                listingsResult.data.map(listing => `
                    <div class="job-post">
                        <div class="job-post-header">
                            <div class="post-avatar" style="${listing.users.avatar_url ? `background-image: url('${listing.users.avatar_url}')` : ''}">
                                ${listing.users.avatar_url ? '' : Helpers.getInitials(listing.users.full_name || listing.users.username)}
                            </div>
                            <div>
                                <div class="job-post-user">${listing.users.full_name || listing.users.username}</div>
                                <div class="post-time">${Helpers.formatDate(listing.created_at)}</div>
                            </div>
                        </div>
                        <div class="job-post-title">${listing.title}</div>
                        <div class="job-post-desc">${listing.description}</div>
                        ${listing.tags && listing.tags.length > 0 ? `
                            <div class="job-post-tags">
                                ${listing.tags.map(tag => `<span class="job-tag">${tag}</span>`).join('')}
                            </div>
                        ` : ''}
                        <div class="job-post-actions">
                            <button class="deal-btn" style="background: transparent; border: 1px solid var(--border-color); color: var(--text-secondary);" 
                                    onclick="App.saveJobListing('${listing.id}')">
                                <i class="far fa-bookmark"></i> Save
                            </button>
                            <button class="deal-btn" style="background: var(--navy-blue); color: white;" 
                                    onclick="App.contactJobPoster('${listing.users.username}')">
                                <i class="fas fa-envelope"></i> Contact
                            </button>
                        </div>
                    </div>
                `).join('') :
                '<div style="text-align: center; padding: 40px; color: var(--text-muted);"><i class="fas fa-store" style="font-size: 48px; margin-bottom: 16px;"></i><p>No listings yet. Be the first to create one!</p></div>';
        }
    }

    // Authentication methods
    async handleLogin() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (!email || !password) {
            ErrorHandler.showToast('Please enter both email and password');
            return;
        }

        const result = await AuthService.signIn(email, password);
        if (result.success) {
            ErrorHandler.showToast('Welcome back to SaveMate!');
        }
    }

    async handleSignup() {
        const fullName = document.getElementById('signupName').value;
        const username = document.getElementById('signupUsername').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;

        if (!fullName || !username || !email || !password) {
            ErrorHandler.showToast('Please fill in all fields');
            return;
        }

        if (password.length < 6) {
            ErrorHandler.showToast('Password must be at least 6 characters long');
            return;
        }

        const result = await AuthService.signUp(email, password, {
            fullName,
            username
        });

        if (result.success) {
            ErrorHandler.showToast('Account created successfully! Check your email for verification.');
        }
    }

    showSignupForm() {
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('signupForm').style.display = 'block';
    }

    showLoginForm() {
        document.getElementById('signupForm').style.display = 'none';
        document.getElementById('loginForm').style.display = 'block';
    }

    async logout() {
        const result = await AuthService.signOut();
        if (result.success) {
            this.currentUser = null;
            this.userProfile = null;
            this.renderApp();
            ErrorHandler.showToast('Logged out successfully');
        }
    }

    // Product methods
    async searchDeals(query) {
        const debouncedSearch = Helpers.debounce(async (searchQuery) => {
            const result = await DataService.getProducts({ search: searchQuery });
            if (result.success) {
                const container = document.getElementById('dealsContainer');
                container.innerHTML = result.data.map(product => 
                    DealCard.render(product, this.savedDeals.has(product.id))
                ).join('');
            }
        }, 300);

        debouncedSearch(query);
    }

    async filterDeals(category) {
        const result = await DataService.getProducts({ category });
        if (result.success) {
            const container = document.getElementById('exploreDealsContainer');
            container.innerHTML = result.data.map(product => 
                DealCard.render(product, this.savedDeals.has(product.id))
            ).join('');
            ErrorHandler.showToast(`Showing ${category} deals`);
        }
    }

    async toggleSaveDeal(productId) {
        if (this.savedDeals.has(productId)) {
            this.savedDeals.delete(productId);
            ErrorHandler.showToast('Deal removed from saved items');
        } else {
            this.savedDeals.add(productId);
            ErrorHandler.showToast('Deal saved to your list');
        }
        this.renderApp();
    }

    async buyProduct(productId) {
        ErrorHandler.showToast('Redirecting to store...');
    }

    // Post methods
    async createPost() {
        const postInput = document.getElementById('postInput');
        const content = postInput.value.trim();

        if (!content) {
            ErrorHandler.showToast('Please enter some text for your post');
            return;
        }

        const result = await DataService.createPost({
            user_id: this.currentUser.id,
            content: content
        });

        if (result.success) {
            postInput.value = '';
            ErrorHandler.showToast('Post published!');
            await this.loadUniversePageData();
        }
    }

    async likePost(postId) {
        const result = await DataService.likePost(postId);
        if (result.success) {
            await this.loadUniversePageData();
        }
    }

    // Shopping list methods
    async searchProducts(query) {
        if (!query) {
            document.getElementById('searchResults').innerHTML = '';
            return;
        }

        const result = await DataService.getProducts({ search: query, limit: 5 });
        if (result.success) {
            const resultsContainer = document.getElementById('searchResults');
            resultsContainer.innerHTML = result.data.map(product => `
                <div class="search-result-item" onclick="App.addToShoppingList('${product.id}')">
                    <div style="width: 40px; height: 40px; background: var(--secondary-bg); border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-right: 10px;">
                        <i class="fas fa-barcode"></i>
                    </div>
                    <div>
                        <div style="font-weight: 500;">${product.title}</div>
                        <div style="color: var(--text-secondary); font-size: 12px;">${product.stores.name} - ${Helpers.formatPrice(product.current_price)}</div>
                    </div>
                </div>
            `).join('');
        }
    }

    async createNewList() {
        const listName = prompt('Enter a name for your new shopping list:');
        if (listName) {
            const result = await DataService.createShoppingList({
                user_id: this.currentUser.id,
                name: listName
            });

            if (result.success) {
                ErrorHandler.showToast(`New shopping list "${listName}" created!`);
                await this.switchPage('shopping-list');
            }
        }
    }

    async addToShoppingList(productId) {
        const listsResult = await DataService.getShoppingLists(this.currentUser.id);
        if (listsResult.success && listsResult.data.length > 0) {
            const listId = listsResult.data[0].id; // Add to first list
            const result = await DataService.addToList(listId, productId);
            if (result.success) {
                ErrorHandler.showToast('Product added to shopping list!');
                await this.loadShoppingListData();
            }
        } else {
            ErrorHandler.showToast('Please create a shopping list first');
        }
    }

    // Profile methods
    async uploadAvatar(event) {
        const file = event.target.files[0];
        if (file) {
            const result = await StorageService.uploadFile(file, 'avatars');
            if (result.success) {
                const updateResult = await AuthService.updateProfile(this.currentUser.id, {
                    avatar_url: result.url
                });
                if (updateResult.success) {
                    this.userProfile = updateResult.data;
                    ErrorHandler.showToast('Profile picture updated!');
                    this.renderApp();
                }
            }
        }
    }

    async uploadCoverPhoto(event) {
        const file = event.target.files[0];
        if (file) {
            const result = await StorageService.uploadFile(file, 'covers');
            if (result.success) {
                const updateResult = await AuthService.updateProfile(this.currentUser.id, {
                    cover_photo_url: result.url
                });
                if (updateResult.success) {
                    this.userProfile = updateResult.data;
                    ErrorHandler.showToast('Cover photo updated!');
                    this.renderApp();
                }
            }
        }
    }

    toggleEditProfile() {
        const form = document.getElementById('profileForm');
        if (form) {
            form.style.display = form.style.display === 'none' ? 'block' : 'none';
        }
    }

    async saveProfile() {
        const name = document.getElementById('editName').value;
        const username = document.getElementById('editUsername').value;
        const location = document.getElementById('editLocation').value;
        const bio = document.getElementById('editBio').value;

        const updates = {};
        if (name) updates.full_name = name;
        if (username) updates.username = username;
        if (location) updates.location = location;
        if (bio) updates.bio = bio;

        const result = await AuthService.updateProfile(this.currentUser.id, updates);
        if (result.success) {
            this.userProfile = result.data;
            this.toggleEditProfile();
            ErrorHandler.showToast('Profile updated successfully!');
            this.renderApp();
        }
    }

    // Black Market methods
    async filterListings(type) {
        // Update UI
        document.querySelectorAll('.job-type-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');

        // Reload data with filter
        await this.loadBlackMarketData();
    }

    showCreateJobModal() {
        ErrorHandler.showToast('Create job modal would open here');
    }

    contactJobPoster(username) {
        ErrorHandler.showToast(`Opening conversation with ${username}`);
    }

    // Utility methods
    showNotifications() {
        ErrorHandler.showToast('You have new notifications');
    }

    attachMedia() {
        ErrorHandler.showToast('Media attachment feature coming soon!');
    }

    createProfilePost() {
        ErrorHandler.showToast('Create profile post functionality');
    }

    attachMediaToProfilePost() {
        ErrorHandler.showToast('Media attachment feature coming soon!');
    }

    startScanner() {
        ErrorHandler.showToast('Scanner activated! Point your camera at a barcode.');
    }

    openConversation(user) {
        ErrorHandler.showToast(`Opening conversation with ${user}`);
    }

    toggleDarkMode() {
        this.darkMode = !this.darkMode;
        document.body.classList.toggle('dark-mode', this.darkMode);
        localStorage.setItem('darkMode', this.darkMode);
    }

    filterPosts(type) {
        ErrorHandler.showToast(`Showing ${type} posts`);
    }

    showStoreProducts(storeId) {
        ErrorHandler.showToast(`Showing products from store`);
    }

    sharePost(postId) {
        ErrorHandler.showToast('Share post functionality');
    }

    showComments(postId) {
        ErrorHandler.showToast('Show comments functionality');
    }

    deleteList(listId) {
        ErrorHandler.showToast('Delete list functionality');
    }

    removeFromList(listId, itemId) {
        ErrorHandler.showToast('Remove from list functionality');
    }

    saveJobListing(listingId) {
        ErrorHandler.showToast('Job listing saved!');
    }

    toggleFollow(userId) {
        ErrorHandler.showToast('Follow functionality');
    }

    updateDisplayName() {
        ErrorHandler.showToast('Display name updated!');
    }

    changePassword() {
        ErrorHandler.showToast('Password changed!');
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.App = new SaveMateApp();
});

export default SaveMateApp;