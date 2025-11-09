import { Helpers } from '../utils/helpers.js';

export class ShoppingList {
    static render(list) {
        return `
            <div class="list-category">
                <h3>${list.name} 
                    <span style="font-size: 12px; color: var(--text-muted);">
                        (${list.shopping_list_items ? list.shopping_list_items.length : 0} items)
                    </span>
                    <button onclick="App.deleteList('${list.id}')" style="background: none; border: none; color: var(--danger); cursor: pointer; float: right;">
                        <i class="fas fa-trash"></i>
                    </button>
                </h3>
                ${list.shopping_list_items && list.shopping_list_items.length > 0 ? 
                    list.shopping_list_items.map(item => this.renderListItem(item)).join('') :
                    '<p style="text-align: center; color: var(--text-muted); padding: 20px;">This list is empty. Add some items!</p>'
                }
            </div>
        `;
    }

    static renderListItem(item) {
        const product = item.products || {};
        
        return `
            <div class="list-item">
                <div style="width: 60px; height: 60px; background: var(--secondary-bg); border-radius: 8px; display: flex;