import IslandPage from "@/components/IslandPage";

export default function Island3Page() {
  return (
    <IslandPage
      title="الجزيرة الثالثة"
      subtitle="اكتب وصف الجزيرة الثالثة هنا"
      image="/images/island_3.png"
      cards={[
        {
          id: 1,
          eventName: "اسم المسابقة الأولى",
          year: "2026",
          placement: "المركز الأول",
          specialAwards: [
            "جائزة مميزة",
            "أفضل فريق",
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