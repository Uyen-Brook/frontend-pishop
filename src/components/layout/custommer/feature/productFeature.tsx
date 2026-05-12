import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ProductSumaryResponse, PageResponse } from "../../../../types/index";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductSectionProps {
  title: string;
  fetcher: () => Promise<PageResponse<ProductSumaryResponse>>;
}

export default function FeaturedProducts({
  title,
  fetcher,
}: ProductSectionProps) {
  const [products, setProducts] = useState<ProductSumaryResponse[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetcher();
        setProducts(res.content);
      } catch (error) {
        console.error("Load products error:", error);
      }
    };

    load();
  }, [fetcher]);
  const scroll = (direction: "left" | "right") => {
    const container = containerRef.current;
    if (!container) return;

    const scrollAmount = 328;

    const maxScroll = container.scrollWidth - container.clientWidth;

    if (direction === "right") {
      // nếu đang ở cuối → quay về đầu
      if (container.scrollLeft + scrollAmount >= maxScroll) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }

    if (direction === "left") {
      // nếu đang ở đầu → nhảy về cuối
      if (container.scrollLeft <= 0) {
        container.scrollTo({ left: maxScroll, behavior: "smooth" });
      } else {
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      }
    }
  };

  const formatPrice = (price: number | string | null | undefined) => {
    const num = Number(price);
    if (!Number.isFinite(num)) return "0₫";
    return new Intl.NumberFormat("vi-VN").format(num) + "₫";
  };



  return (
    <section className="mb-10">
      {/* HEADER */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">{title}</h2>

        {/* NAV BUTTONS */}
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="p-2 rounded-full border hover:bg-gray-100"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            onClick={() => scroll("right")}
            className="p-2 rounded-full border hover:bg-gray-100"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* CAROUSEL */}
      <div
        ref={containerRef}
        className="flex gap-8 overflow-x-auto scroll-smooth scrollbar-hide"
      >
        {products.map((p) => {
          const discount =
            p.discountType === "PERCENT" && p.discountValue != null
              ? `-${p.discountValue}%`
              : p.discountType === "FIXED_AMOUNT" && p.discountValue != null
                ? `- ${formatPrice(p.discountValue)}`
                : null;
          const finalPrice =
            p.discountType === "PERCENT"
              ? p.price * (1 - (p.discountValue ?? 0) / 100)
              : p.discountType === "FIXED_AMOUNT"
                ? p.price - (p.discountValue ?? 0)
                : p.price;
          return (
            <div
              key={p.id}
              className="min-w-[320px] bg-white rounded-xl shadow hover:shadow-md transition flex-shrink-0"
            >
              {/* IMAGE */}
              <Link to={`/product/${p.id}`}>
              <div className="relative">
                {discount && (
                  <span className="absolute left-2 top-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                    {discount}
                  </span>
                )}
  
                <img
                  src={p.thumbnail}
                  alt={p.modelName}
                  className="h-[220px] w-full object-cover rounded-t-xl"
                />
              </div>
              </Link>

              {/* INFO */}
              <div className="p-3">
                <h3 className="text-sm font-semibold line-clamp-2">
                  {p.modelName}
                </h3>

                <p className="text-xs text-gray-500">
                  {p.brandName} • {p.categoryName}
                </p>

                <div className="mt-2 flex items-center justify-between">
                  <span className="text-red-600 font-bold">
                    {formatPrice(p.price)}
                  </span>

                  <span className="text-xs text-gray-400">
                    {p.quantity} sp
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
  // return (
  //   <section className="mb-10">
  //     {/* HEADER */}
  //     <div className="mb-4 flex items-center justify-between">
  //       <h2 className="text-xl font-bold">{title}</h2>
  //     </div>

  //     {/* CAROUSEL */}
  //     <div className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide">
  //       {products.map((p) => {
  //         const discount =
  //           p.discountType === "PERCENT"
  //             ? `-${p.discountValue}%`
  //             : p.discountType === "FIXED_AMOUNT"
  //             ? `-₫${p.discountValue}`
  //             : null;

  //         return (
  //           <div
  //             key={p.id}
  //             className="min-w-[200px] bg-white rounded-xl shadow hover:shadow-md transition"
  //           >
  //             {/* IMAGE */}
  //             <div className="relative">
  //               {discount && (
  //                 <span className="absolute left-2 top-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
  //                   {discount}
  //                 </span>
  //               )}

  //               <img
  //                 src={p.thumbnail}
  //                 alt={p.modelName}
  //                 className="h-[180px] w-full object-cover rounded-t-xl"
  //               />
  //             </div>

  //             {/* INFO */}
  //             <div className="p-3">
  //               <h3 className="text-sm font-semibold line-clamp-2">
  //                 {p.modelName}
  //               </h3>

  //               <p className="text-xs text-gray-500">
  //                 {p.brandName} • {p.categoryName}
  //               </p>

  //               <div className="mt-2 flex items-center justify-between">
  //                 <span className="text-red-600 font-bold">
  //                   {formatPrice(p.price)}
  //                 </span>

  //                 <span className="text-xs text-gray-400">
  //                   {p.quantity} sp
  //                 </span>
  //               </div>
  //             </div>
  //           </div>
  //         );
  //       })}
  //     </div>
  //   </section>
  // );
}