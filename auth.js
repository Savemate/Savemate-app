import { supabase } from './supabase.js';
import { ErrorHandler } from '../utils/errorHandler.js';

export class AuthService {
    static async signUp(email, password, userData) {
        try {
            console.log('Attempting signup with:', { email, userData });
            
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        username: userData.username,
                        full_name: userData.fullName
                    }
                }
            });

            if (error) {
                console.error('Signup error:', error);
                throw error;
            }

            console.log('Signup successful, creating profile...');

            // Create user profile
            if (data.user) {
                await this.createUserProfile(data.user.id, userData);
            }

            return { success: true, data };
        } catch (error) {
            return ErrorHandler.handleAuthError(error);
        }
    }

    static async signIn(email, password) {
        try {
            console.log('Attempting signin with:', { email });
            
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            });

            if (error) {
                console.error('Signin error:', error);
                throw error;
            }

            console.log('Signin successful:', data.user.email);
            return { success: true, data };
        } catch (error) {
            return ErrorHandler.handleAuthError(error);
        }
    }

    static async signOut() {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            return { success: true };
        } catch (error) {
            return ErrorHandler.handle(error, 'Failed to sign out');
        }
    }

    static async getCurrentUser() {
        try {
            const { data: { user }, error } = await supabase.auth.getUser();
            if (error) throw error;
            return { success: true, user };
        } catch (error) {
            return ErrorHandler.handle(error);
        }
    }

    static async createUserProfile(userId, userData) {
        try {
            const { error } = await supabase
                .from('users')
                .insert([{
                    id: userId,
                    username: userData.username,
                    full_name: userData.fullName,
                    created_at: new Date().toISOString()
                }]);

            if (error) {
                console.error('Error creating user profile:', error);
                // Don't throw error - user can update profile later
            }
        } catch (error) {
            console.error('Unexpected error creating profile:', error);
        }
    }

    static onAuthStateChange(callback) {
        return supabase.auth.onAuthStateChange(callback);
    }

    static async updateProfile(userId, updates) {
        try {
            const { data, error } = await supabase
                .from('users')
                .update(updates)
                .eq('id', userId)
                .select();

            if (error) throw error;
            return { success: true, data: data[0] };
        } catch (error) {
            return ErrorHandler.handle(error, 'Failed to update profile');
        }
    }

    static async getUserProfile(userId) {
        try {
            const { data, error } = await supabase
                .from('users')
                .select('*')
                .eq('id', userId)
                .single();

            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('Error getting user profile:', error);
            return { success: false, data: null };
        }
    }
}