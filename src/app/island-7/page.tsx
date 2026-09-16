import IslandPage from "@/components/IslandPage";

export default function Island7Page() {
  return (
    <IslandPage
      title="الجزيرة السابعة"
      subtitle="اكتب وصف الجزيرة السابعة هنا"
      image="/images/island_7.png"
      cards={[
        {
          id: 1,
          eventName: "اسم المسابقة الأولى",
          year: "2026",
          placement: "المركز الأول",
          specialAwards: [
            "أفضل فريق",
            "جائزة التميز",
          ],
        },
        {
          id: 2,
          eventName: "اسم المسابقة الثانية",
          year: "2025",
          placement: "المركز الثاني",
          specialAwards: [
            "أفضل أداء",
          ],
        },
      ]}
    />
  );
}