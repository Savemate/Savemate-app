import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// Supabase configuration
const supabaseUrl = 'https://ykgtjyleyuxgwdmaduzs.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlrZ3RqeWxleXV4Z3dkbWFkdXpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIzNDE1OTksImV4cCI6MjA3NzkxNzU5OX0.XsqpRrql4dT34meefxiKVOwECXlqm4ynDXRcedvgYq0'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Mock data
const mockProducts = [
    {
        id: '1',
        title: "Tastic Parboiled Rice 5kg",
        current_price: 105.99,
        original_price: 129.99,
        category: "Groceries",
        store: { name: "Checkers", color_hex: "#E31B23" }
    },
    {
        id: '2', 
        title: "Ouma Rusks Buttermilk Chunky",
        current_price: 52.99,
        original_price: 59.99,
        category: "Groceries",
        store: { name: "Pick n Pay", color_hex: "#0055A4" }
    },
    {
        id: '3',
        title: "Rooibos Tea 40bags",
        current_price: 35.50,
        original_price: 42.00,
        category: "Beverages", 
        store: { name: "Woolworths", color_hex: "#000000" }
    }
]

const mockPosts = [
    {
        id: '1',
        user: "DealFinderSA",
        content: "Just found Tastic Rice for R105.99 at Checkers! That's a R24 saving! 🎉",
        time: "2 hours ago",
        likes: 24,
        comments: 8,
        store: "Checkers"
    }
]

class SaveMateApp {
    constructor() {
        this.currentUser = null
        this.currentPage = 'home'
        this.init()
    }

    async init() {
        await this.checkAuth()
        this.renderApp()
    }

    async checkAuth() {
        const { data: { user } } = await supabase.auth.getUser()
        this.currentUser = user
    }

    renderApp() {
        const app = document.getElementById('app')
        
        if (!this.currentUser) {
            app.innerHTML = this.renderAuthPage()
            return
        }

        app.innerHTML = `
            <div class="app-header">
                <div class="logo" onclick="app.switchPage('home')">
                    <i class="fas fa-shopping-bag"></i>
                    <span>SaveMate</span>
                </div>
                <div class="header-actions">
                    <button class="header-btn" onclick="app.switchPage('profile')">
                        <i class="fas fa-user"></i>
                    </button>
                    <button class="header-btn" onclick="app.logout()">
                        <i class="fas fa-sign-out-alt"></i>
                    </button>
                </div>
            </div>

            <main class="main-content">
                ${this.renderHomePage()}
            </main>

            <div class="bottom-nav">
                <div class="nav-item active" onclick="app.switchPage('home')">
                    <i class="fas fa-home"></i>
                    <span>Home</span>
                </div>
                <div class="nav-item" onclick="app.switchPage('explore')">
                    <i class="fas fa-compass"></i>
                    <span>Explore</span>
                </div>
                <div class="nav-item" onclick="app.switchPage('universe')">
                    <i class="fas fa-users"></i>
                    <span>Universe</span>
                </div>
                <div class="nav-item" onclick="app.switchPage('scanner')">
                    <i class="fas fa-camera"></i>
                    <span>Scan</span>
                </div>
                <div class="nav-item" onclick="app.switchPage('shopping-list')">
                    <i class="fas fa-list"></i>
                    <span>List</span>
                </div>
            </div>
        `

        this.loadHomeData()
    }

    renderAuthPage() {
        return `
            <div class="auth-container">
                <div class="auth-card">
                    <h2>Welcome to SaveMate</h2>
                    <div id="loginForm">
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" id="email" class="form-control" placeholder="Enter your email">
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input type="password" id="password" class="form-control" placeholder="Enter your password">
                        </div>
                        <button class="btn btn-primary" onclick="app.handleLogin()">Log In</button>
                        <div class="auth-switch">
                            Don't have an account? <a href="#" onclick="app.showSignup()">Sign Up</a>
                        </div>
                    </div>
                    <div id="signupForm" style="display: none;">
                        <div class="form-group">
                            <label for="signupName">Full Name</label>
                            <input type="text" id="signupName" class="form-control" placeholder="Enter your full name">
                        </div>
                        <div class="form-group">
                            <label for="signupEmail">Email</label>
                            <input type="email" id="signupEmail" class="form-control" placeholder="Enter your email">
                        </div>
                        <div class="form-group">
                            <label for="signupPassword">Password</label>
                            <input type="password" id="signupPassword" class="form-control" placeholder="Create a password">
                        </div>
                        <button class="btn btn-primary" onclick="app.handleSignup()">Sign Up</button>
                        <div class="auth-switch">
                            Already have an account? <a href="#" onclick="app.showLogin()">Log In</a>
                        </div>
                    </div>
                </div>
            </div>
        `
    }

    renderHomePage() {
        return `
            <div class="page active">
                <div class="welcome-banner">
                    <h2>Hello, Shopper!</h2>
                    <p>Discover the best deals from South African retailers</p>
                </div>

                <div class="search-container">
                    <div class="search-box">
                        <i class="fas fa-search"></i>
                        <input type="text" placeholder="Search products, stores, or deals...">
                    </div>
                </div>

                <h2 class="section-title">Trending Deals</h2>
                <div class="deals-grid" id="dealsContainer">
                    ${this.renderDealsSkeleton()}
                </div>
            </div>
        `
    }

    renderDealsSkeleton() {
        return Array(3).fill(0).map(() => `
            <div class="deal-card">
                <div class="deal-image" style="background: #f0f0f0;"></div>
                <div class="deal-content">
                    <div class="deal-title" style="height: 20px; background: #f0f0f0; margin-bottom: 10px;"></div>
                    <div style="height: 16px; background: #f0f0f0; margin-bottom: 10px;"></div>
                    <div style="height: 24px; background: #f0f0f0; margin-bottom: 15px;"></div>
                    <div class="deal-actions">
                        <div style="height: 36px; background: #f0f0f0; flex: 1;"></div>
                        <div style="width: 10px;"></div>
                        <div style="height: 36px; background: #f0f0f0; flex: 1;"></div>
                    </div>
                </div>
            </div>
        `).join('')
    }

    async loadHomeData() {
        const dealsContainer = document.getElementById('dealsContainer')
        if (dealsContainer) {
            dealsContainer.innerHTML = mockProducts.map(product => `
                <div class="deal-card">
                    <div class="deal-image">
                        ${product.title}
                    </div>
                    <div class="deal-content">
                        <div class="deal-title">${product.title}</div>
                        <div class="deal-store">
                            <div style="width: 20px; height: 20px; border-radius: 4px; background: ${product.store.color_hex}; color: white; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: bold;">
                                ${product.store.name.charAt(0)}
                            </div>
                            <span>${product.store.name}</span>
                        </div>
                        <div class="deal-price">
                            R${product.current_price}
                            <span class="deal-original-price">R${product.original_price}</span>
                        </div>
                        <div class="deal-actions">
                            <button class="deal-btn" style="background: transparent; border: 1px solid #ddd; color: #666;">
                                <i class="far fa-bookmark"></i> Save
                            </button>
                            <button class="deal-btn" style="background: #13294b; color: white;">
                                <i class="fas fa-shopping-cart"></i> Buy
                            </button>
                        </div>
                    </div>
                </div>
            `).join('')
        }
    }

    async handleLogin() {
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value

        if (!email || !password) {
            this.showToast('Please enter both email and password')
            return
        }

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        })

        if (error) {
            this.showToast('Login failed: ' + error.message)
        } else {
            this.currentUser = data.user
            this.renderApp()
            this.showToast('Welcome back to SaveMate!')
        }
    }

    async handleSignup() {
        const name = document.getElementById('signupName').value
        const email = document.getElementById('signupEmail').value
        const password = document.getElementById('signupPassword').value

        if (!name || !email || !password) {
            this.showToast('Please fill in all fields')
            return
        }

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: name
                }
            }
        })

        if (error) {
            this.showToast('Signup failed: ' + error.message)
        } else {
            this.showToast('Account created! Check your email for verification.')
            this.showLogin()
        }
    }

    showSignup() {
        document.getElementById('loginForm').style.display = 'none'
        document.getElementById('signupForm').style.display = 'block'
    }

    showLogin() {
        document.getElementById('signupForm').style.display = 'none'
        document.getElementById('loginForm').style.display = 'block'
    }

    async logout() {
        await supabase.auth.signOut()
        this.currentUser = null
        this.renderApp()
        this.showToast('Logged out successfully')
    }

    switchPage(page) {
        this.currentPage = page
        this.renderApp()
    }

    showToast(message) {
        // Simple toast implementation
        alert(message) // Replace with proper toast in production
    }
}

// Initialize app
const app = new SaveMateApp()
window.app = app