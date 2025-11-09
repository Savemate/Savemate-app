export class MusicPage {
    static render() {
        return `
            <div class="page" id="musicPage">
                <h2 class="section-title">Music Shared by Users</h2>
                <div class="media-gallery" id="musicGallery">
                    <div style="text-align: center; padding: 40px; color: var(--text-muted);">
                        <i class="fas fa-music" style="font-size: 48px; margin-bottom: 16px;"></i>
                        <p>No music shared yet</p>
                    </div>
                </div>
            </div>
        `;
    }
}