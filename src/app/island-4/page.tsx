import IslandPage from "@/components/IslandPage";

export default function Island4Page() {
  return (
    <IslandPage
      title="الجزيرة الرابعة"
      subtitle="اكتب وصف هذه الفئة هنا"
      image="/images/island_4.png"
      cards={[
        {
          id: 1,
          eventName: "اسم المسابقة",
          year: "2026",

          delegationName: "اسم الوفد",
          coachName: "اسم المدرب",

          overallPlacement: "المركز الأول",

          awards: [
            "جائزة 1",
          ],

          shieldPlacements: [
            {
              shieldName: "اسم الدرع",
              placement: "المركز الأول",
            },
          ],

          members: [
            "اسم الفرد الأول",
            "اسم الفرد الثاني",
          ],

          photos: [
            "/images/island4/photo1.jpg",
          ],
        },
      ]}
    />
  );
}