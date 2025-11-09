export class BlackMarketPage {
    static render() {
        return `
            <div class="page" id="blackMarketPage">
                <div class="black-market-header">
                    <h2 class="section-title" style="margin: 0;">Black Market</h2>
                    <button class="btn btn-secondary" style="width: auto; padding: 8px 16px;" onclick="App.showCreateJobModal()">
                        <i class="fas fa-plus"></i> New Listing
                    </button>
                </div>

                <div class="job-type-selector">
                    <button class="job-type-btn active" data-type="all" onclick="App.filterListings('all')">All Listings</button>
                    <button class="job-type-btn" data-type="job-seeking" onclick="App.filterListings('job-seeking')">Job Seeking</button>
                    <button class="job-type-btn" data-type="job-offering" onclick="App.filterListings('job-offering')">Job Offering</button>
                    <button class="job-type-btn" data-type="services" onclick="App.filterListings('services')">Services</button>
                    <button class="job-type-btn" data-type="products" onclick="App.filterListings('products')">Products</button>
                </div>

                <div id="blackMarketListings">
                    <div style="text-align: center; padding: 40px; color: var(--text-muted);">
                        <i class="fas fa-store" style="font-size: 48px; margin-bottom: 16px;"></i>
                        <p>No listings yet. Be the first to create one!</p>
                    </div>
                </div>
            </div>
        `;
    }
}