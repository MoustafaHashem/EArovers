"use server";

import { getCloudinaryImages, CloudinaryImage } from "@/lib/cloudinary";

export async function fetchMediaAction(category: string): Promise<CloudinaryImage[]> {
  // Map categories to cloudinary folders or tags.
  // Assuming "gallery" is the root folder, and category names map to subfolders.
  // If "الكل" (All), fetch from the root or leave folder empty.
  const folder = category === "الكل" ? "gallery" : `gallery/${category}`;
  
  const images = await getCloudinaryImages(folder, 12);
  return images;
}
