import IslandPage from "@/components/IslandPage";

export default function Island7Page() {
  return (
    <IslandPage
      title="الجزيرة السابعة"
      subtitle="اكتب وصف هذه الفئة هنا"
      image="/images/island_7.png"
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
            "/images/island7/photo1.jpg",
          ],
        },
      ]}
    />
  );
}