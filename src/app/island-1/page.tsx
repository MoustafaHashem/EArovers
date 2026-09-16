import IslandPage from "@/components/IslandPage";

export default function Island1Page() {
  return (
    <IslandPage
      title="عشيرة هندسة عين شمس"
      subtitle="عشيرة هندسة عين شمس ضد عشائر الهندسة من الجامعات الأخرى"
      image="/images/island_1_.png"
      cards={[
        {
          id: 1,
          eventName: "اسم المسابقة الأولى",
          year: "2026",
          placement: "المركز الأول",
          specialAwards: [
            "أفضل مشروع",
            "أفضل تصميم",
            "التميز الهندسي",
          ],
        },
        {
          id: 2,
          eventName: "اسم المسابقة الثانية",
          year: "2025",
          placement: "المركز الثاني",
          specialAwards: [
            "أفضل عرض",
          ],
        },
      ]}
    />
  );
}