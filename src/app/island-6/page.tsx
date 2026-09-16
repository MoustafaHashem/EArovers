import IslandPage from "@/components/IslandPage";

export default function Island6Page() {
  return (
    <IslandPage
      title="الجزيرة السادسة"
      subtitle="اكتب وصف الجزيرة السادسة هنا"
      image="/images/island_6.png"
      cards={[
        {
          id: 1,
          eventName: "اسم المسابقة الأولى",
          year: "2026",
          placement: "المركز الأول",
          specialAwards: [
            "أفضل مشاركة",
          ],
        },
        {
          id: 2,
          eventName: "اسم المسابقة الثانية",
          year: "2024",
          placement: "المركز الثاني",
          specialAwards: [],
        },
      ]}
    />
  );
}