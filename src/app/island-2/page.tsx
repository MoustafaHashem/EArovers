import IslandPage from "@/components/IslandPage";

export default function Island2Page() {
  return (
    <IslandPage
      title="بطولات جامعة عين شمس"
      subtitle="عشيرة الهندسة ضد عشائر عين شمس الأخرى"
      image="/images/island_2_.png"
      cards={[
        {
          id: 1,
          eventName: "المسابقة الأولى",
          year: "2026",
          placement: "المركز الأول",
          specialAwards: [
            "أفضل فريق",
          ],
        },
      ]}
    />
  );
}