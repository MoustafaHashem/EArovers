import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export type CloudinaryImage = {
  id: string;
  publicId: string;
  url: string;
  format: string;
  width: number;
  height: number;
};

export async function getCloudinaryImages(folder = "gallery", maxResults = 12): Promise<CloudinaryImage[]> {
  try {
    // We search across all assets in the account, or we can filter by folder if needed.
    // For now, we will just fetch the latest assets if folder is empty, or filter by folder.
    const expression = folder ? `folder:${folder}/*` : "";
    
    const request = cloudinary.search
      .sort_by("created_at", "desc")
      .max_results(maxResults);
      
    if (expression) {
      request.expression(expression);
    }
      
    const result = await request.execute();
      
    return result.resources.map((resource: any) => ({
      id: resource.asset_id,
      publicId: resource.public_id,
      url: resource.secure_url,
      format: resource.format,
      width: resource.width,
      height: resource.height,
    }));
  } catch (error) {
    console.error("Cloudinary fetch error:", error);
    return [];
  }
}
