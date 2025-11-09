export class PicturesPage {
    static render() {
        return `
            <div class="page" id="picturesPage">
                <h2 class="section-title">Pictures Shared by Users</h2>
                <div class="media-gallery" id="picturesGallery">
                    <div style="text-align: center; padding: 40px; color: var(--text-muted);">
                        <i class="fas fa-image" style="font-size: 48px; margin-bottom: 16px;"></i>
                        <p>No pictures shared yet</p>
                    </div>
                </div>
            </div>
        `;
    }
}