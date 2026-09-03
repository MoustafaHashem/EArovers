import { prisma } from "@/lib/prisma";
import RequestsClient from "./RequestsClient";

export default async function RequestsPage() {
  let requests = [];
  try {
    requests = await prisma.joinRequest.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Database connection failed for Requests page:", error);
    requests = [
      {
        id: "req-1",
        fullName: "مصطفى هاشم",
        phone: "01020304050",
        academicYear: "الفرقة الثانية حاسبات",
        interests: "الرحلات الخلوية والسمر الكشفي",
        status: "pending",
        createdAt: new Date(),
      },
      {
        id: "req-2",
        fullName: "سارة محمد",
        phone: "01234567890",
        academicYear: "الفرقة الأولى عمارة",
        interests: "الفنون والأعمال اليدوية الكشفية",
        status: "approved",
        createdAt: new Date("2024-01-01T00:00:00Z"), // Static date
      }
    ] as any;
  }

  return <RequestsClient initialRequests={requests} />;
}
