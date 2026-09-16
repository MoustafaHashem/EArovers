import IslandPage from "@/components/IslandPage";

export default function Island5Page() {
  return (
    <IslandPage
      title="الجزيرة الخامسة"
      subtitle="اكتب وصف الجزيرة الخامسة هنا"
      image="/images/island_5.png"
      cards={[
        {
          id: 1,
          eventName: "اسم المسابقة الأولى",
          year: "2026",
          placement: "المركز الأول",
          specialAwards: [
            "أفضل عرض",
            "أفضل تصميم",
          ],
        },
        {
          id: 2,
          eventName: "اسم المسابقة الثانية",
          year: "2025",
          placement: "المركز الثاني",
          specialAwards: [
            "جائزة التميز",
          ],
        },
      ]}
    />
  );
}