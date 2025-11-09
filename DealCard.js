import { Helpers } from '../utils/helpers.js';

export class DealCard {
    static render(product, isSaved = false) {
        const store = product.stores || {};
        
        return `
            <div class="deal-card">
                <div class="deal-image">
                    ${product.image_url ? 
                        `<img src="${product.image_url}" alt="${product.title}" style="width: 100%; height: 100%; object-fit: cover;">` : 
                        `<div style="display: flex; align-items: center; justify-content: center; height: 100%; background: var(--secondary-bg); color: var(--text-muted); font-weight: 500;">
                            ${product.title}
                        </div>`
                    }
                    ${product.badge ? `<div class="deal-badge">${product.badge}</div>` : ''}
                </div>
                <div class="deal-content">
                    <div class="deal-title">${product.title}</div>
                    <div class="deal-store">
                        <div style="width: 20px; height: 20px; border-radius: 4px; background: ${store.color_hex || '#13294b'}; color: white; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: bold;">
                            ${store.name ? store.name.charAt(0) : 'S'}
                        </div>
                        <span>${store.name || 'Store'}</span>
                    </div>
                    <div class="deal-price">
                        ${Helpers.formatPrice(product.current_price)}
                        ${product.original_price ? 
                            `<span class="deal-original-price">${Helpers.formatPrice(product.original_price)}</span>` : 
                            ''
                        }
                    </div>
                    <div class="deal-actions">
                        <button class="deal-btn" style="background: transparent; border: 1px solid var(--border-color); color: var(--text-secondary);" 
                                onclick="App.toggleSaveDeal('${product.id}')">
                            <i class="far ${isSaved ? 'fa-bookmark' : 'fa-bookmark'}"></i> 
                            ${isSaved ? 'Saved' : 'Save'}
                        </button>
                        <button class="deal-btn" style="background: var(--navy-blue); color: white;" 
                                onclick="App.buyProduct('${product.id}')">
                            <i class="fas fa-shopping-cart"></i> Buy
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    static renderSkeleton(count = 6) {
        return Array(count).fill(0).map(() => `
            <div class="deal-card">
                <div class="deal-image" style="background: var(--secondary-bg);"></div>
                <div class="deal-content">
                    <div class="deal-title" style="height: 20px; background: var(--secondary-bg); margin-bottom: 10px;"></div>
                    <div style="height: 16px; background: var(--secondary-bg); margin-bottom: 10px;"></div>
                    <div style="height: 24px; background: var(--secondary-bg); margin-bottom: 15px;"></div>
                    <div class="deal-actions">
                        <div style="height: 36px; background: var(--secondary-bg); flex: 1;"></div>
                        <div style="width: 10px;"></div>
                        <div style="height: 36px; background: var(--secondary-bg); flex: 1;"></div>
                    </div>
                </div>
            </div>
        `).join('');
    }
}