import { useEffect, useState, useRef } from "react";
import HomeSlider from "../../../components/layout/custommer/slider/HomeSlider";
import FeaturedProducts from "../../../components/layout/custommer/feature/productFeature";
import { categoryService } from "../../../service/public/categoryService";
import { FeatureService } from "../../../service/public/FeatureService";
import { Category, PageResponse, ProductSumaryResponse } from "../../../types/index";

// Hook lazy fetch
export function useLazyFetcher<T>(fetcher: () => Promise<T>) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !data) {
        setLoading(true);
        fetcher().then((res) => {
          setData(res);
          setLoading(false);
        });
      }
    });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [data, fetcher]);

  return { ref, data, loading };
}

export default function HomePage() {
  // Lazy load categories
  const { ref: catRef, data: categories, loading: catLoading } = useLazyFetcher(() =>
    categoryService.getAll()
  );

  // Lazy load newest products
  const { ref: newestRef, data: newestProducts, loading: newestLoading } =
    useLazyFetcher(() =>
      FeatureService.getTopNewestProducts({ page: 0, size: 8, sort: "createAt,desc" })
    );

  // Lazy load best selling products
  const { ref: sellingRef, data: sellingProducts, loading: sellingLoading } =
    useLazyFetcher(() =>
      FeatureService.getTopBestSellingProducts({ page: 0, size: 8, sort: "create_at,desc" })
    );
   // top khuyến mãi
    const { ref: promoRef, data: promoProducts, loading: promoLoading } =
    useLazyFetcher(() =>
      FeatureService.getTopBestSellingProducts({ page: 0, size: 8, sort: "create_at,desc" })
    );

  return (
    <div className="max-w-7xl mx-auto px-4 pt-14">
      {/* SLIDER */}
      <HomeSlider />

      <div className="max-w-7xl mx-auto px-6 py-12">
       
          {/* top khuyến mãi */}
         <div ref={promoRef} className="mb-10">
          {promoLoading && <div>Loading...</div>}
          {promoProducts && (
            <FeaturedProducts
              title="Sản phẩm khuyến mãi"
              fetcher={() =>
                FeatureService.getTopDiscountProducts({ page: 0, size: 8})
              }
            />
          )}
        </div>
        {/* TOP NEWEST */}
        <div ref={newestRef} className="mb-10">
          {newestLoading && <div>Loading...</div>}
          {newestProducts && (
            <FeaturedProducts
              title="Sản phẩm mới nhất"
              fetcher={() =>
                FeatureService.getTopNewestProducts({ page: 0, size: 8})
              }
            />
          )}
        </div>

        {/* TOP SELLING */}
        <div ref={sellingRef} className="mb-10">
          {sellingLoading && <div>Loading...</div>}
          {sellingProducts && (
            <FeaturedProducts
              title="Sản phẩm bán chạy"
              fetcher={() =>
                FeatureService.getTopBestSellingProducts({ page: 0, size: 8})
              }
            />
          )}
        </div>
 {/* CATEGORIES */}
        <div ref={catRef} className="mb-10">
          <h2 className="text-xl font-bold mb-4">Danh mục</h2>
          {catLoading && <div>Loading...</div>}
          {categories && (
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              {categories.map((c: Category) => (
                <div key={c.id} className="p-4 bg-white shadow rounded-lg text-center">
                  {c.name}
                </div>
              ))}
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}




// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// import HomeSlider from "../../../components/layout/custommer/slider/HomeSlider";
// import ProductCard from "../../../components/product/ProductCard";
// import FeaturedProducts from "../../../components/layout/custommer/feature/productFeature";

// import { categoryService } from "../../../service/public/categoryService";
// import { PageResponse, ProductSumaryResponse, Brand, Category } from "../../../types/index";
// import { FeatureService } from "../../../service/public/FeatureService"


// export default function HomePage() {
//   const [categories, setCategories] = useState<Category[]>([]);

//   const [topSellingProducts, setTopSellingProducts] =
//     useState<PageResponse<ProductSumaryResponse> | null>(null);

//   const [topNewestProducts, setTopNewestProducts] =
//     useState<PageResponse<ProductSumaryResponse> | null>(null);

//   const [topBrandProducts, setTopBrandProducts] =
//     useState<PageResponse<ProductSumaryResponse> | null>(null);

//   const [topSupplierProducts, setTopSupplierProducts] =
//     useState<PageResponse<ProductSumaryResponse> | null>(null);

//   const [topCategoryProducts, setTopCategoryProducts] =
//     useState<PageResponse<ProductSumaryResponse> | null>(null);

//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [
//           cats,
//           topSelling,
//           topNewest,
//           topBrand,
//           topSupplier,
//           topCategory,
//         ] = await Promise.all([
//           categoryService.getAll(),

//           FeatureService.getTopBestSellingProducts({
//             page: 0,
//             size: 8,
//           }),

//           FeatureService.getTopNewestProducts({
//             page: 0,
//             size: 8,
//           }),

//           // ⚠️ demo brandId = 1
//           FeatureService.getTopSellingByBrand(1, {
//             page: 0,
//             size: 8,
//           }),

//           // ⚠️ demo supplierId = 1
//           FeatureService.getTopSellingBySupplier(1, {
//             page: 0,
//             size: 8,
//           }),

//           // ⚠️ demo categoryId = 1
//           FeatureService.getTopSellingByCategory(1, {
//             page: 0,
//             size: 8,
//           }),
//         ]);

//         setCategories(cats);
//         setTopSellingProducts(topSelling);
//         setTopNewestProducts(topNewest);
//         setTopBrandProducts(topBrand);
//         setTopSupplierProducts(topSupplier);
//         setTopCategoryProducts(topCategory);
//       } catch (error) {
//         console.error("Error fetching home data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         Loading...
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 pt-14">
//       {/* SLIDER */}
//       <HomeSlider />

//       <div className="max-w-7xl mx-auto px-6 py-12">
//         {/* CATEGORIES */}
//         <div className="mb-10">
//           <h2 className="text-xl font-bold mb-4">Danh mục</h2>
//           <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
//             {categories.map((c) => (
//               <div
//                 key={c.id}
//                 className="p-4 bg-white shadow rounded-lg text-center"
//               >
//                 {c.name}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* TOP NEWEST */}
//         <FeaturedProducts
//           title="Sản phẩm mới nhất"
//           fetcher={() =>
//             FeatureService.getTopNewestProducts({
//               page: 0,
//               size: 8,
//               sort: "createAt,desc",
//             })
//           }
//         />

//         {/* TOP SELLING */}
//         {topSellingProducts && (
//           <FeaturedProducts
//             title="Sản phẩm bán chạy"
//              fetcher={() =>
//             FeatureService.getTopBestSellingProducts({
//               page: 0,
//               size: 8,
//               sort: "create_at,desc",
//             })
//           }
//           />
//         )}

//         {/* TOP BRAND */}
//         {topBrandProducts && (
//           <FeaturedProducts
//             title="Sản phẩm khuyến mãi"
//              fetcher={() =>
//             FeatureService.getTopDiscountProducts({
//               page: 0,
//               size: 8,
//               sort: "create_at,desc",
//             })
//           }
//           />
//         )}

//         {/* TOP SUPPLIER */}
//         {topSupplierProducts && (
//           <FeaturedProducts
//             title="Theo nhà cung cấp"
//              fetcher={() =>
//             FeatureService.getTopNewestProducts({
//               page: 0,
//               size: 8,
//               sort: "createAt,desc",
//             })
//           }
//           />
//         )}

//       </div>
//     </div>
//   );
// }