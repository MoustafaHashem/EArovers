"use client";

import { CldUploadWidget } from "next-cloudinary";
import { UploadCloud } from "lucide-react";
import { useRouter } from "next/navigation";
import { addMediaFromWidget } from "./actions";

interface CloudinaryUploadProps {
  selectedCategory: string;
}

export default function CloudinaryUpload({ selectedCategory }: CloudinaryUploadProps) {
  const router = useRouter();

  return (
    <CldUploadWidget 
      signatureEndpoint="/api/sign-image"
      onSuccess={async (result, { widget }) => {
        if (result?.info && typeof result.info === 'object' && 'secure_url' in result.info) {
          const url = result.info.secure_url as string;
          
          await addMediaFromWidget({
            url,
            title: "New Upload",
            category: selectedCategory, 
          });
          
          router.refresh();
        }
      }}
      onClose={() => {
        router.refresh();
      }}
    >
      {({ open }) => (
        <button
          onClick={() => open()}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--color-scout-blue)] text-white font-medium hover:bg-blue-600 transition-colors"
        >
          <UploadCloud size={18} />
          رفع صور
        </button>
      )}
    </CldUploadWidget>
  );
}
