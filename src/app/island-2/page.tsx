import IslandPage from "@/components/IslandPage";

export default function Island2Page() {
  return (
    <IslandPage
      title="عشيرة الهندسة ضد عشائر عين شمس الأخرى"
      subtitle="سجل مشاركات ونتائج عشيرة الهندسة داخل جامعة عين شمس"
      image="/images/island_2_.png"
      cards={[
        {
          id: 1,
          eventName: "اسم المسابقة",
          year: "2026",

          delegationName: "وفد هندسة عين شمس",
          coachName: "اسم المدرب",

          overallPlacement: "المركز الأول",

          awards: [
            "جائزة 1",
          ],

          shieldPlacements: [
            {
              shieldName: "الدرع الأول",
              placement: "المركز الأول",
            },
          ],

          members: [
            "اسم الفرد الأول",
            "اسم الفرد الثاني",
          ],

          photos: [
            "/images/island2/photo1.jpg",
          ],
        },
      ]}
    />
  );
}