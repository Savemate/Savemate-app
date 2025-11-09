export class SettingsPage {
    static render() {
        return `
            <div class="page" id="settingsPage">
                <div class="settings-container">
                    <h2 class="section-title">Settings</h2>
                    
                    <div class="settings-section">
                        <h3>Account Settings</h3>
                        <div class="form-group">
                            <label for="changeDisplayName">Display Name</label>
                            <input type="text" id="changeDisplayName" class="form-control" value="Current User">
                        </div>
                        <button class="btn btn-primary" style="width: auto; margin-top: 10px;" onclick="App.updateDisplayName()">Update Display Name</button>
                    </div>
                    
                    <div class="settings-section">
                        <h3>Change Password</h3>
                        <div class="form-group">
                            <label for="currentPassword">Current Password</label>
                            <input type="password" id="currentPassword" class="form-control" placeholder="Enter current password">
                        </div>
                        <div class="form-group">
                            <label for="newPassword">New Password</label>
                            <input type="password" id="newPassword" class="form-control" placeholder="Enter new password">
                        </div>
                        <div class="form-group">
                            <label for="confirmPassword">Confirm New Password</label>
                            <input type="password" id="confirmPassword" class="form-control" placeholder="Confirm new password">
                        </div>
                        <button class="btn btn-primary" style="width: auto;" onclick="App.changePassword()">Change Password</button>
                    </div>
                    
                    <div class="settings-section">
                        <h3>Privacy & Security</h3>
                        <div class="settings-dropdown-item">
                            <span>Private Account</span>
                            <label class="theme-toggle-switch">
                                <input type="checkbox" id="privateAccount">
                                <span class="theme-toggle-slider"></span>
                            </label>
                        </div>
                        <div class="settings-dropdown-item">
                            <span>Allow Messages</span>
                            <label class="theme-toggle-switch">
                                <input type="checkbox" id="allowMessages" checked>
                                <span class="theme-toggle-slider"></span>
                            </label>
                        </div>
                    </div>

                    <div class="settings-section">
                        <h3>Theme</h3>
                        <div class="settings-dropdown-item">
                            <span>Dark Mode</span>
                            <label class="theme-toggle-switch">
                                <input type="checkbox" id="darkModeToggle" onchange="App.toggleDarkMode()">
                                <span class="theme-toggle-slider"></span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}