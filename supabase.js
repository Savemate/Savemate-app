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
})