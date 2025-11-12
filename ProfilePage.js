import { PostCard } from '.PostCard.js';
import { Helpers } from '.helpers.js';

export class ProfilePage {
    static render(user, isOwnProfile = false) {
        return `
            <div class="page" id="profilePage">
                <div class="profile-container">
                    <div class="profile-header">
                        <div class="cover-photo" id="coverPhoto" style="${user.cover_photo_url ? `background-image: url('${user.cover_photo_url}')` : ''}">
                            ${isOwnProfile ? `
                                <button class="cover-upload-btn" onclick="document.getElementById('coverUpload').click()">
                                    <i class="fas fa-camera"></i>
                                </button>
                                <input type="file" id="coverUpload" accept="image/*" style="display: none;" onchange="App.uploadCoverPhoto(event)">
                            ` : ''}
                        </div>
                        <div class="profile-avatar-container">
                            <div class="profile-avatar" id="profileAvatar" style="${user.avatar_url ? `background-image: url('${user.avatar_url}')` : ''}">
                                ${user.avatar_url ? '' : Helpers.getInitials(user.full_name || 'U')}
                            </div>
                            ${isOwnProfile ? `
                                <button class="avatar-upload-btn" onclick="document.getElementById('avatarUpload').click()">
                                    <i class="fas fa-camera"></i> Change Photo
                                </button>
                                <input type="file" id="avatarUpload" accept="image/*" style="display: none;" onchange="App.uploadAvatar(event)">
                            ` : ''}
                        </div>
                    </div>
                    
                    <div class="profile-info">
                        <h2 id="profileName">${user.full_name || 'User'}</h2>
                        <p id="profileBio">${user.bio || 'No bio yet'}</p>
                        
                        <div class="profile-stats">
                            <div class="stat">
                                <div class="stat-value" id="postCount">${user.post_count || 0}</div>
                                <div class="stat-label">Posts</div>
                            </div>
                            <div class="stat">
                                <div class="stat-value" id="followerCount">${user.follower_count || 0}</div>
                                <div class="stat-label">Followers</div>
                            </div>
                            <div class="stat">
                                <div class="stat-value" id="followingCount">${user.following_count || 0}</div>
                                <div class="stat-label">Following</div>
                            </div>
                        </div>
                        
                        ${!isOwnProfile ? `
                            <button class="follow-btn" id="followButton" onclick="App.toggleFollow('${user.id}')">
                                ${user.is_following ? 'Following' : 'Follow'}
                            </button>
                        ` : `
                            <button class="follow-btn" style="background: var(--navy-blue); color: white; margin-left: 10px;" onclick="App.toggleEditProfile()">
                                <i class="fas fa-edit"></i> Edit Profile
                            </button>
                        `}
                    </div>
                    
                    ${isOwnProfile ? `
                        <div class="profile-form" id="profileForm" style="display: none;">
                            <h3>Edit Profile</h3>
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="editName">Full Name</label>
                                    <input type="text" id="editName" class="form-control" value="${user.full_name || ''}">
                                </div>
                                <div class="form-group">
                                    <label for="editEmail">Email</label>
                                    <input type="email" id="editEmail" class="form-control" value="${user.email || ''}" disabled>
                                </div>
                            </div>
                            
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="editUsername">Username</label>
                                    <input type="text" id="editUsername" class="form-control" value="${user.username || ''}">
                                </div>
                                <div class="form-group">
                                    <label for="editLocation">Location</label>
                                    <input type="text" id="editLocation" class="form-control" value="${user.location || ''}">
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <label for="editBio">Bio</label>
                                <textarea id="editBio" class="form-control" rows="3">${user.bio || ''}</textarea>
                            </div>
                            
                            <button class="btn btn-primary" onclick="App.saveProfile()">Save Changes</button>
                        </div>

                        <div class="post-creator" style="margin-top: 20px;">
                            <div class="post-input-container">
                                <div class="post-avatar" id="profileUserAvatar" style="${user.avatar_url ? `background-image: url('${user.avatar_url}')` : ''}">
                                    ${user.avatar_url ? '' : Helpers.getInitials(user.full_name || 'U')}
                                </div>
                                <input type="text" class="post-input" id="profilePostInput" placeholder="Share something from your profile...">
                                <button class="attachment-btn" onclick="App.attachMediaToProfilePost()">
                                    <i class="fas fa-image"></i>
                                </button>
                                <button class="post-submit-btn" onclick="App.createProfilePost()">
                                    <i class="fas fa-paper-plane"></i>
                                </button>
                            </div>
                        </div>
                    ` : ''}

                    <div class="profile-posts">
                        <h3>${isOwnProfile ? 'My Posts' : 'Posts'}</h3>
                        <div id="userPostsContainer">
                            ${PostCard.renderSkeleton(2)}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}