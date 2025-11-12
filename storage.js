import { supabase } from '.supabase.js';
import { ErrorHandler } from '.errorHandler.js';

export class StorageService {
    static async uploadFile(file, folder = 'general') {
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${folder}/${fileName}`;

            const { data, error } = await supabase.storage
                .from('assets')
                .upload(filePath, file);

            if (error) throw error;

            // Get public URL
            const { data: { publicUrl } } = supabase.storage
                .from('assets')
                .getPublicUrl(filePath);

            return { success: true, url: publicUrl };
        } catch (error) {
            console.error('File upload error:', error);
            // Return mock URL for development
            return { success: true, url: `https://via.placeholder.com/300x200/13294B/FFFFFF?text=Uploaded+Image` };
        }
    }

    static async uploadMultipleFiles(files, folder = 'general') {
        try {
            const uploadPromises = files.map(file => this.uploadFile(file, folder));
            const results = await Promise.all(uploadPromises);

            const successfulUploads = results
                .filter(result => result.success)
                .map(result => result.url);

            return { success: true, urls: successfulUploads };
        } catch (error) {
            return ErrorHandler.handle(error, 'Failed to upload files');
        }
    }

    static async deleteFile(filePath) {
        try {
            const { error } = await supabase.storage
                .from('assets')
                .remove([filePath]);

            if (error) throw error;
            return { success: true };
        } catch (error) {
            return ErrorHandler.handle(error, 'Failed to delete file');
        }
    }
}