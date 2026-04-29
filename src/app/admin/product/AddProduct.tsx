// import React, { useState } from "react";
// import {
//   ProductFormData,
//   initialFormData,
//   MOCK_BRANDS,
//   MOCK_SUPPLIERS,
//   MOCK_CATEGORIES,
// } from "../../types/product";
// import PageHeader from "./PageHeader";
// import ProductInfoSection from "./ProductInfoSection";
// import PricingInventorySection from "./PricingInventorySection";
// import SpecificationSection from "./SpecificationSection";
// import ProductMediaSection from "./ProductMediaSection";
// import VisibilitySection from "./VisibilitySection";
// import HelpCard from "./HelpCard";

// type SaveMode = "ACTIVE" | "DRAFT";

// const AddProductPage: React.FC = () => {
//   const [formData, setFormData] = useState<ProductFormData>(initialFormData);
//   const [isSaving, setIsSaving] = useState(false);
//   const [toast, setToast] = useState<{ msg: string; type: "success" | "error" | "info" } | null>(null);

//   const handleChange = (field: keyof ProductFormData, value: any) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   const showToast = (msg: string, type: "success" | "error" | "info" = "success") => {
//     setToast({ msg, type });
//     setTimeout(() => setToast(null), 3000);
//   };

//   const validateForm = (): string | null => {
//     if (!formData.modelName.trim()) return "Model Name is required.";
//     if (!formData.categoryId) return "Please select a Category.";
//     if (!formData.brandId) return "Please select a Brand.";
//     if (!formData.supplierId) return "Please select a Supplier.";
//     if (!formData.price) return "Sale Price is required.";
//     if (formData.quantity < 0) return "Quantity cannot be negative.";
//     return null;
//   };

//   const buildPayload = (mode: SaveMode) => {
//     const specsObj = Object.fromEntries(
//       formData.specification.filter((s) => s.key.trim()).map((s) => [s.key, s.value])
//     );
//     return {
//       modelName: formData.modelName,
//       modelNumber: formData.modelNumber,
//       description: formData.description,
//       thumbnail: formData.thumbnail,
//       listImage: JSON.stringify(formData.listImage),
//       specification: JSON.stringify(specsObj),
//       importPrice: parseFloat(formData.importPrice) || 0,
//       taxVat: parseFloat(formData.taxVat) || 0,
//       price: parseFloat(formData.price) || 0,
//       quanlity: formData.quantity,
//       productStatus: mode === "DRAFT" ? "NEW" : formData.productStatus,
//       brandId: formData.brandId,
//       supplierId: formData.supplierId,
//       categoryId: formData.categoryId,
//     };
//   };

//   const handleSave = async () => {
//     const err = validateForm();
//     if (err) { showToast(err, "error"); return; }
//     setIsSaving(true);
//     try {
//       await new Promise((res) => setTimeout(res, 1200));
//       const payload = buildPayload("ACTIVE");
//       console.log("POST /api/products →", payload);
//       showToast("Product saved successfully!", "success");
//       setFormData(initialFormData);
//     } catch {
//       showToast("Failed to save product.", "error");
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const handleSaveDraft = async () => {
//     if (!formData.modelName.trim()) { showToast("Model Name is required for draft.", "error"); return; }
//     setIsSaving(true);
//     try {
//       await new Promise((res) => setTimeout(res, 800));
//       const payload = buildPayload("DRAFT");
//       console.log("POST /api/products/draft →", payload);
//       showToast("Draft saved!", "info");
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   return (
//     <div style={{ background: "#0d0d0d", minHeight: "100vh", padding: "28px 28px" }}>
//       {/* Toast */}
//       {toast && (
//         <div style={{
//           position: "fixed", top: 20, right: 24, zIndex: 9999,
//           padding: "12px 20px", borderRadius: 10, fontSize: 13, fontWeight: 600,
//           background: toast.type === "success" ? "#e6f9f0" : toast.type === "error" ? "#fff3f3" : "#e6f1fb",
//           color: toast.type === "success" ? "#0f6e56" : toast.type === "error" ? "#c0392b" : "#185fa5",
//           border: `1px solid ${toast.type === "success" ? "#9fe1cb" : toast.type === "error" ? "#f5c6c6" : "#b5d4f4"}`,
//           boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
//           animation: "slideIn 0.2s ease",
//         }}>
//           {toast.type === "success" ? "✓ " : toast.type === "error" ? "⚠ " : "ℹ "}{toast.msg}
//         </div>
//       )}

//       <PageHeader
//         onCancel={() => setFormData(initialFormData)}
//         onSaveDraft={handleSaveDraft}
//         onSave={handleSave}
//         isSaving={isSaving}
//       />

//       <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 18, alignItems: "start" }}>
//         {/* Left column */}
//         <div>
//           <ProductInfoSection
//             data={formData}
//             brands={MOCK_BRANDS}
//             suppliers={MOCK_SUPPLIERS}
//             categories={MOCK_CATEGORIES}
//             onChange={handleChange}
//           />
//           <PricingInventorySection data={formData} onChange={handleChange} />
//           <SpecificationSection
//             specs={formData.specification}
//             onChange={(specs) => handleChange("specification", specs)}
//           />
//         </div>

//         {/* Right column */}
//         <div>
//           <ProductMediaSection data={formData} onChange={handleChange} />
//           <VisibilitySection data={formData} onChange={handleChange} />
//           <HelpCard />
//         </div>
//       </div>

//       <style>{`
//         @keyframes slideIn { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: none; } }
//         input::placeholder, textarea::placeholder { color: #ccc; }
//         input:focus, textarea:focus, select:focus { border-color: #e83e3e !important; box-shadow: 0 0 0 3px rgba(232,62,62,0.1); }
//       `}</style>
//     </div>
//   );
// };

// export default AddProductPage;
