export class AuthForm {
    static renderLoginForm() {
        return `
            <div class="auth-card">
                <h2>Welcome to SaveMate</h2>
                <div id="loginForm">
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" class="form-control" placeholder="Enter your email">
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" class="form-control" placeholder="Enter your password">
                    </div>
                    <button class="btn btn-primary" onclick="App.handleLogin()">Log In</button>
                    <div class="auth-switch">
                        Don't have an account? <a href="#" onclick="App.showSignupForm()">Sign Up</a>
                    </div>
                </div>
                <div id="signupForm" style="display: none;">
                    <div class="form-group">
                        <label for="signupName">Full Name</label>
                        <input type="text" id="signupName" class="form-control" placeholder="Enter your full name">
                    </div>
                    <div class="form-group">
                        <label for="signupUsername">Username</label>
                        <input type="text" id="signupUsername" class="form-control" placeholder="Choose a username">
                    </div>
                    <div class="form-group">
                        <label for="signupEmail">Email</label>
                        <input type="email" id="signupEmail" class="form-control" placeholder="Enter your email">
                    </div>
                    <div class="form-group">
                        <label for="signupPassword">Password</label>
                        <input type="password" id="signupPassword" class="form-control" placeholder="Create a password">
                    </div>
                    <button class="btn btn-primary" onclick="App.handleSignup()">Sign Up</button>
                    <div class="auth-switch">
                        Already have an account? <a href="#" onclick="App.showLoginForm()">Log In</a>
                    </div>
                </div>
            </div>
        `;
    }
}