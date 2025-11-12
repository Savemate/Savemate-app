import { DealCard } from '.DealCard.js';

export class HomePage {
    static async render() {
        return `
            <div class="page active" id="homePage">
                <div class="welcome-banner">
                    <h2>Hello, Shopper!</h2>
                    <p>Discover the best deals from South African retailers</p>
                </div>

                <div class="search-container">
                    <div class="search-box">
                        <i class="fas fa-search"></i>
                        <input type="text" id="homeSearch" class="form-control" 
                               placeholder="Search products, stores, or deals..." 
                               oninput="App.searchDeals(this.value)">
                    </div>
                </div>

                <h2 class="section-title">Trending Deals</h2>
                <div class="deals-grid" id="dealsContainer">
                    ${DealCard.renderSkeleton()}
                </div>

                <h2 class="section-title">Recently Added</h2>
                <div class="deals-grid" id="recentDealsContainer">
                    ${DealCard.renderSkeleton()}
                </div>
            </div>
        `;
    }
}