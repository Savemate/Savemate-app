import { Helpers } from '.helpers.js';

export class PostCard {
    static render(post, currentUserId) {
        const user = post.users || {};
        const store = post.stores || {};
        
        return `
            <div class="post-card">
                <div class="post-header">
                    <div class="post-avatar" style="${user.avatar_url ? `background-image: url('${user.avatar_url}')` : ''}">
                        ${user.avatar_url ? '' : Helpers.getInitials(user.full_name || user.username || 'U')}
                    </div>
                    <div>
                        <div class="post-user">${user.full_name || user.username || 'User'}</div>
                        <div class="post-time">
                            ${Helpers.formatDate(post.created_at)}
                            ${store.name ? `• ${store.name}` : ''}
                        </div>
                    </div>
                </div>
                <div class="post-content">
                    ${post.content}
                </div>
                ${post.media_urls && post.media_urls.length > 0 ? `
                    <div class="post-image" style="background-image: url('${post.media_urls[0]}')">
                        ${post.media_urls.length > 1 ? `<div class="media-count">+${post.media_urls.length - 1}</div>` : ''}
                    </div>
                ` : ''}
                <div class="post-actions">
                    <div class="post-action" onclick="App.likePost('${post.id}')">
                        <i class="far fa-heart"></i>
                        <span>${post.like_count || 0}</span>
                    </div>
                    <div class="post-action" onclick="App.showComments('${post.id}')">
                        <i class="far fa-comment"></i>
                        <span>${post.comment_count || 0}</span>
                    </div>
                    <div class="post-action" onclick="App.sharePost('${post.id}')">
                        <i class="fas fa-share-alt"></i>
                        <span>${post.share_count || 0}</span>
                    </div>
                </div>
            </div>
        `;
    }

    static renderSkeleton(count = 3) {
        return Array(count).fill(0).map(() => `
            <div class="post-card">
                <div class="post-header">
                    <div class="post-avatar" style="background: var(--secondary-bg);"></div>
                    <div style="flex: 1;">
                        <div style="height: 16px; background: var(--secondary-bg); margin-bottom: 5px; width: 80px;"></div>
                        <div style="height: 12px; background: var(--secondary-bg); width: 120px;"></div>
                    </div>
                </div>
                <div style="height: 16px; background: var(--secondary-bg); margin: 10px 0;"></div>
                <div style="height: 16px; background: var(--secondary-bg); margin-bottom: 10px; width: 90%;"></div>
                <div class="post-actions">
                    <div style="height: 20px; background: var(--secondary-bg); flex: 1;"></div>
                    <div style="height: 20px; background: var(--secondary-bg); flex: 1;"></div>
                    <div style="height: 20px; background: var(--secondary-bg); flex: 1;"></div>
                </div>
            </div>
        `).join('');
    }
}