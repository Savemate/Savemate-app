import { PostCard } from '.PostCard.js';
import { Helpers } from '.helpers.js';

export class UniversePage {
    static render(currentUserId) {
        return `
            <div class="page" id="universePage">
                <div class="universe-header">
                    <span class="universe-title">SHOPPING</span>
                    <i class="fas fa-globe-americas globe-icon"></i>
                    <span class="universe-title">UNIVERSE</span>
                </div>
                
                <div class="media-categories">
                    <button class="media-category-btn active" data-type="all" onclick="App.filterPosts('all')">
                        <i class="fas fa-globe"></i> All
                    </button>
                    <button class="media-category-btn" data-type="music" onclick="App.switchPage('music')">
                        <i class="fas fa-music"></i> Music
                    </button>
                    <button class="media-category-btn" data-type="videos" onclick="App.switchPage('videos')">
                        <i class="fas fa-video"></i> Videos
                    </button>
                    <button class="media-category-btn" data-type="pictures" onclick="App.switchPage('pictures')">
                        <i class="fas fa-image"></i> Pictures
                    </button>
                    <button class="media-category-btn" data-type="books" onclick="App.switchPage('books')">
                        <i class="fas fa-book"></i> Books
                    </button>
                </div>
                
                <div class="post-creator">
                    <div class="post-input-container">
                        <div class="post-avatar" id="userAvatarInitial">${Helpers.getInitials('Current User')}</div>
                        <input type="text" class="post-input" id="postInput" 
                               placeholder="Share a deal or shopping tip...">
                        <button class="attachment-btn" onclick="App.attachMedia()">
                            <i class="fas fa-image"></i>
                        </button>
                        <button class="post-submit-btn" onclick="App.createPost()">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </div>
                </div>

                <div id="universePosts">
                    ${PostCard.renderSkeleton()}
                </div>
            </div>
        `;
    }
}