export class BooksPage {
    static render() {
        return `
            <div class="page" id="booksPage">
                <h2 class="section-title">Books & Stories Shared by Users</h2>
                <div class="media-gallery" id="booksGallery">
                    <div style="text-align: center; padding: 40px; color: var(--text-muted);">
                        <i class="fas fa-book" style="font-size: 48px; margin-bottom: 16px;"></i>
                        <p>No books or stories shared yet</p>
                    </div>
                </div>
            </div>
        `;
    }
}