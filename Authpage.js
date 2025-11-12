import { AuthForm } from './AuthForm.js';

export class AuthPage {
    static render() {
        return `
            <div class="auth-container">
                ${AuthForm.renderLoginForm()}
            </div>
        `;
    }
}