export class Navigation {
    static renderHeader(currentUser) {
        return `
            <header class="app-header">
                <div class="logo" onclick="App.switchPage('home')">
                    <i class="fas fa-shopping-bag"></i>
                    <span>SaveMate</span>
                </div>
                <div class="header-actions">
                    ${currentUser ? `
                        <button class="header-btn profile-btn" onclick="App.switchPage('profile')">
                            <i class="fas fa-user"></i>
                        </button>
                        <button class="header-btn messages-btn" style="position: relative;" onclick="App.switchPage('messages')">
                            <i class="fas fa-comments"></i>
                            <span class="notification-badge">3</span>
                        </button>
                        <button class="header-btn notifications-btn" style="position: relative;" onclick="App.showNotifications()">
                            <i class="fas fa-bell"></i>
                            <span class="notification-badge">3</span>
                        </button>
                        <button class="header-btn settings-btn" onclick="App.logout()">
                            <i class="fas fa-sign-out-alt"></i>
                        </button>
                    ` : ''}
                </div>
            </header>
        `;
    }

    static renderBottomNav(currentPage = 'home') {
        const pages = [
            { id: 'home', icon: 'fas fa-home', label: 'Home' },
            { id: 'explore', icon: 'fas fa-compass', label: 'Explore' },
            { id: 'universe', icon: 'fas fa-users', label: 'Universe' },
            { id: 'scanner', icon: 'fas fa-camera', label: 'Scan' },
            { id: 'shopping-list', icon: 'fas fa-list', label: 'Shopping List' }
        ];

        return `
            <div class="bottom-nav">
                ${pages.map(page => `
                    <div class="nav-item ${page.id === currentPage ? 'active' : ''}" 
                         data-page="${page.id}" 
                         onclick="App.switchPage('${page.id}')">
                        <i class="${page.icon}"></i>
                        <span>${page.label}</span>
                    </div>
                `).join('')}
            </div>
        `;
    }
}