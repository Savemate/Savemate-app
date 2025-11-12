import { ShoppingList } from '.ShoppingList.js';

export class ShoppingListPage {
    static async render() {
        return `
            <div class="page" id="shoppingListPage">
                <h2 class="section-title">My Shopping Lists</h2>
                
                ${ShoppingList.renderListCreator()}

                <div class="list-category">
                    <h3>My Shopping Lists</h3>
                    <div id="shoppingListContainer">
                        <div style="text-align: center; padding: 40px; color: var(--text-muted);">
                            <i class="fas fa-list" style="font-size: 48px; margin-bottom: 16px;"></i>
                            <p>No shopping lists yet. Create your first list!</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}