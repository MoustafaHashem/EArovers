import IslandPage from "@/components/IslandPage";

export default function Island1Page() {
  return (
    <IslandPage
      title="عشيرة هندسة عين شمس ضد عشائر الهندسة من جامعات أخرى"
      subtitle="سجل مشاركات ونتائج عشيرة هندسة عين شمس في المسابقات القمية"
      image="/images/island_1_.png"
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
            "جائزة 2",
          ],

          shieldPlacements: [
            {
              shieldName: "الدرع الكشفي",
              placement: "المركز الأول",
            },
            {
              shieldName: "الدرع الفني",
              placement: "المركز الثاني",
            },
          ],

          members: [
            "اسم الفرد الأول",
            "اسم الفرد الثاني",
            "اسم الفرد الثالث",
          ],

          photos: [
            "/images/island1/photo1.jpg",
            "/images/island1/photo2.jpg",
          ],
        },
      ]}
    />
  );
}