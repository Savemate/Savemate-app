import { AuthForm } from '../components/AuthForm.js';

export class AuthPage {
    static render() {
        return `
            <div class="auth-container">
                ${AuthForm.renderLoginForm()}
            </div>
        `;
    }
}