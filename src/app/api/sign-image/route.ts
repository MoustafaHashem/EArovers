import { v2 as cloudinary } from "cloudinary";
import { requireAdmin } from "@/lib/auth/roles";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Only admins should be able to sign uploads
    await requireAdmin();
    
    const body = await request.json();
    const { paramsToSign } = body;
    
    const signature = cloudinary.utils.api_sign_request(
      paramsToSign, 
      process.env.CLOUDINARY_API_SECRET as string
    );
    
    return NextResponse.json({ signature });
  } catch (error) {
    console.error("Failed to sign Cloudinary request:", error);
    return NextResponse.json(
      { error: "Unauthorized or failed to sign upload request" }, 
      { status: 401 }
    );
  }
}
