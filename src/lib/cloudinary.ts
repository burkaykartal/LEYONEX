import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

/**
 * Upload a file to Cloudinary
 * @param file - Base64 string or file path
 * @param folder - Cloudinary folder name
 * @returns Upload result with URL
 */
export async function uploadToCloudinary(
  file: string,
  folder: string = 'luna360expo'
) {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder,
      resource_type: 'auto', // Automatically detect file type (image, video, raw)
    });

    return {
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
      format: result.format,
      width: result.width,
      height: result.height,
      resourceType: result.resource_type,
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Upload failed',
    };
  }
}

/**
 * Delete a file from Cloudinary
 * @param publicId - Public ID of the file
 * @returns Deletion result
 */
export async function deleteFromCloudinary(publicId: string) {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return {
      success: result.result === 'ok',
      result: result.result,
    };
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Delete failed',
    };
  }
}

/**
 * Get optimized image URL with transformations
 * @param publicId - Public ID of the image
 * @param width - Target width
 * @param height - Target height
 * @returns Optimized image URL
 */
export function getOptimizedImageUrl(
  publicId: string,
  width?: number,
  height?: number
) {
  return cloudinary.url(publicId, {
    transformation: [
      { quality: 'auto', fetch_format: 'auto' },
      ...(width || height
        ? [{ width, height, crop: 'fill', gravity: 'auto' }]
        : []),
    ],
  });
}
