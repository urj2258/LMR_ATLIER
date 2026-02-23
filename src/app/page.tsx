import HeroCarousel from "@/components/HeroCarousel";
import CollectionRow from "@/components/CollectionRow";
import CraftSection from "@/components/CraftSection";
import { getCategories, getProductsBySubcategory } from "@/utils/db";

export default async function Home() {
  // 1. Fetch categories to find subcategories
  const categories = await getCategories();
  const sortedCategories = [...categories].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  // 2. Identify Featured Subcategories (First 2 from Women Wear and Menswear)
  const featuredWomenSubcats = sortedCategories
    .filter(c => c.mainCategory === 'Women Wear')
    .slice(0, 2);

  const featuredMensSubcats = sortedCategories
    .filter(c => c.mainCategory === 'Menswear')
    .slice(0, 2);

  // 3. Fetch products for these subcategories in parallel with a limit of 8
  const subcatDataPromises = [...featuredWomenSubcats, ...featuredMensSubcats].map(async (subcat) => {
    const products = await getProductsBySubcategory(subcat.mainCategory!, subcat.name, 8);
    return {
      ...subcat,
      products
    };
  });

  const featuredData = (await Promise.all(subcatDataPromises)).filter(item => item.products.length > 0);

  return (
    <>
      {/* 1️⃣ HERO SECTION */}
      <HeroCarousel />


      {/* 2️⃣ FEATURED SUBCATEGORIES SECTION */}
      <div className="py-12">
        {featuredData.map((subcat) => (
          <div key={subcat.id} className="mb-16">
            <CollectionRow
              title={subcat.name}
              products={subcat.products}
              categorySlug={subcat.mainCategory?.toLowerCase().replace(/ /g, '-') || ''}
            />
          </div>
        ))}
      </div>

      {/* 3️⃣ OUR CRAFT SECTION */}
      <CraftSection />
    </>
  );
}

