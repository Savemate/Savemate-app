export class VideosPage {
    static render() {
        return `
            <div class="page" id="videosPage">
                <h2 class="section-title">Videos Shared by Users</h2>
                <div class="media-gallery" id="videosGallery">
                    <div style="text-align: center; padding: 40px; color: var(--text-muted);">
                        <i class="fas fa-video" style="font-size: 48px; margin-bottom: 16px;"></i>
                        <p>No videos shared yet</p>
                    </div>
                </div>
            </div>
        `;
    }
}