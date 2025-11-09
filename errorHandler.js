import { createClient } from '@supabase/supabase-js'

// Your actual Supabase credentials
const supabaseUrl = 'https://ykgtjyleyuxgwdmaduzs.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlrZ3RqeWxleXV4Z3dkbWFkdXpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIzNDE1OTksImV4cCI6MjA3NzkxNzU5OX0.XsqpRrql4dT34meefxiKVOwECXlqm4ynDXRcedvgYq0'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
    }
})

// Test connection on startup
supabase.auth.getSession().then(({ data, error }) => {
    if (error) {
        console.error('Supabase connection error:', error)
    } else {
        console.log('✅ Supabase connected successfully!')
    }
})export class ErrorHandler {
    static handle(error, userMessage = 'Something went wrong') {
        console.error('SaveMate Error:', error);
        this.showToast(userMessage);
        return { success: false, error: error.message };
    }

    static showToast(message) {
        const toast = document.getElementById('toast');
        if (toast) {
            toast.textContent = message;
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 3000);
        } else {
            alert(message); // Fallback
        }
    }

    static async handleAuthError(error) {
        switch (error.message) {
            case 'Invalid login credentials':
                return this.handle(error, 'Invalid email or password');
            case 'Email not confirmed':
                return this.handle(error, 'Please confirm your email address');
            case 'User already registered':
                return this.handle(error, 'An account with this email already exists');
            default:
                return this.handle(error, 'Authentication failed');
        }
    }
}