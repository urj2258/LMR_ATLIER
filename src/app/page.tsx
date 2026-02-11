import HeroCarousel from "@/components/HeroCarousel";
import CategorySection from "@/components/CategorySection";
import CraftSection from "@/components/CraftSection";

export default function Home() {
  return (
    <>
      {/* 1️⃣ HERO SECTION */}
      <HeroCarousel />

      {/* 2️⃣ WEDDING EDIT SECTION */}
      <CategorySection
        title="WEDDING EDIT"
        images={[
          { src: "/images/wedding_edit.png", title: "Tiffany Blue – Bridal Gown" },
          { src: "/images/wedding_edit.png", title: "Tiffany Blue – Co-ord Set" },
          { src: "/images/wedding_edit.png", title: "Tiffany Blue – Sequin Saree" },
          { src: "/images/wedding_edit.png", title: "Tiffany Blue – Lehengha" }
        ]}
        theme="cream"
        showViewAll={true}
        link="/wedding-edit"
      />

      {/* 4️⃣ MENSWEAR SECTION - Renamed based on reference */}
      <CategorySection
        title="MIAN SAHIB AUR BEGHUM SAHIBA"
        images={[
          { src: "/images/menswear.png", title: "Charcoal – Sherwani" },
          { src: "/images/menswear.png", title: "Charcoal – Kurta" },
          { src: "/images/menswear.png", title: "Charcoal – Nehru Jacket" },
          { src: "/images/menswear.png", title: "Charcoal – Tuxedo" }
        ]}
        theme="light"
        showViewAll={true}
        link="/menswear"
      />

      {/* 3️⃣ BRIDAL EDIT SECTION */}
      <CategorySection
        title="BRIDAL EDIT"
        images={[
          { src: "/images/bridal_edit.png", title: "Ivory – Bridal Gown" },
          { src: "/images/bridal_edit.png", title: "Ivory – Co-ord Set" },
          { src: "/images/bridal_edit.png", title: "Ivory – Sequin Saree" },
          { src: "/images/bridal_edit.png", title: "Ivory – Lehengha" }
        ]}
        theme="cream"
        showViewAll={true}
        link="/bridal-edit"
      />

      {/* 5️⃣ FORMAL EDIT SECTION - Party Wear */}
      <CategorySection
        title="FORMAL EDIT"
        images={[
          { src: "/images/bridal_edit.png", title: "Hand Embroidered – Karhai Gown" },
          { src: "/images/bridal_edit.png", title: "Hand WORKED – Co-ord Set" },
          { src: "/images/bridal_edit.png", title: "Hand Embellished – Saree" },
          { src: "/images/bridal_edit.png", title: "Hand Crafted – Fusion Wear" }
        ]}
        theme="cream"
        showViewAll={true}
        link="/formal-edit"
      />

      {/* 6️⃣ LITTLE ONES SECTION */}
      <CategorySection
        title="LITTLE ONES"
        images={[
          { src: "/images/little_ones.png", title: "Mini – Bridal Gown" },
          { src: "/images/little_ones.png", title: "Mini – Co-ord Set" },
          { src: "/images/little_ones.png", title: "Mini – Sequin Saree" }
        ]}
        theme="light"
        showViewAll={true}
        link="/little-ones"
      />

      {/* 6️⃣ OUR CRAFT SECTION */}
      <CraftSection />
    </>
  );
}
