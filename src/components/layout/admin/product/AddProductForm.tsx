import React, { useState, useRef } from "react";
import Card from "../../../../components/card/Card";
import InputField from "../../../../components/field/InputField";
import Label from "../../../../components/field/LabelField";
import Switch from "../../../../components/field/Switch";
import {
    ProductStatus,
    productStatusLabels,
    ProductCreateRequest,
    SpecEntry,
    Category,
    Brand,
    ProductSumaryResponse,
    ProductResponse,
    SupplierResponse,
} from "../../../../types/index";


// ─── Icons ────────────────────────────────────────────────────────────────────
const InfoIcon = () => (
    <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" /><line x1="12" y1="8" x2="12" y2="12" /><circle cx="12" cy="16" r=".5" fill="currentColor" />
    </svg>
);
const ImageIcon = () => (
    <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" />
    </svg>
);
const PricingIcon = () => (
    <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" />
    </svg>
);
const SpecIcon = () => (
    <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
    </svg>
);
const EyeIcon = () => (
    <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <ellipse cx="12" cy="12" rx="9" ry="6" /><circle cx="12" cy="12" r="3" />
    </svg>
);
const BuildingIcon = () => (
    <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path d="M3 21V7l9-4 9 4v14" /><rect x="9" y="14" width="6" height="7" rx="1" />
    </svg>
);
const UploadIcon = () => (
    <svg className="w-7 h-7 text-red-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
    </svg>
);
const TrashIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" /><path d="M10 11v6M14 11v6" />
    </svg>
);
const HelpIcon = () => (
    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" /><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" /><circle cx="12" cy="17" r=".5" fill="white" />
    </svg>
);

// ─── Helpers ──────────────────────────────────────────────────────────────────
const genId = () => Math.random().toString(36).slice(2, 8);

const CATEGORIES = [
    { id: 1, name: "Laptop" },
    { id: 2, name: "Smartphone" },
    { id: 3, name: "Tablet" },
    { id: 4, name: "Accessories" },
];

// ─── Component ────────────────────────────────────────────────────────────────
const AddNewProduct: React.FC = () => {
    // ── Form state ─────────────────────────────────────────────────────────────
    // sửa type form state
    const [form, setForm] = useState<ProductCreateRequest>({
        modelName: "",
        specification: "[]",
        thumbnail: "",
        description: "",

        importPrice: 0,
        taxVat: 0,
        price: 0,

        modelNumber: "",
        listImage: "[]",

        quanlity: 0,

        productStatus: "NEW",

        brandId: 0,
        supplierId: 0,
        categoryId: 0,
    });

    const [publishToStore, setPublishToStore] = useState(true);
    const [tags, setTags] = useState<string[]>(["NEW", "PREMIUM"]);
    const [tagInput, setTagInput] = useState("");
    // sửa SpecEntry state
    const [specs, setSpecs] = useState<(SpecEntry & { id: string })[]>([
        {
            id: genId(),
            key: "CPU",
            value: "Apple M3 Chip",
        },
        {
            id: genId(),
            key: "RAM",
            value: "16GB Unified Memory",
        },
        {
            id: genId(),
            key: "",
            value: "",
        },
    ]);
    const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
    const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
    const thumbnailRef = useRef<HTMLInputElement>(null);
    const galleryRef = useRef<HTMLInputElement>(null);

    // ── Handlers ───────────────────────────────────────────────────────────────
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value === "" ? 0 : Number(value) }));
    };

    const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && tagInput.trim()) {
            e.preventDefault();
            const newTag = tagInput.trim().toUpperCase();
            if (!tags.includes(newTag)) setTags((prev) => [...prev, newTag]);
            setTagInput("");
        }
    };

    const removeTag = (tag: string) => setTags((prev) => prev.filter((t) => t !== tag));

    const addSpec = () =>
        setSpecs((prev) => [...prev, { id: genId(), key: "", value: "" }]);

    const updateSpec = (id: string, field: "key" | "value", val: string) =>
        setSpecs((prev) => prev.map((s) => (s.id === id ? { ...s, [field]: val } : s)));

    const removeSpec = (id: string) =>
        setSpecs((prev) => (prev.length > 1 ? prev.filter((s) => s.id !== id) : prev));

    const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const url = URL.createObjectURL(file);
        setThumbnailPreview(url);
        setForm((prev) => ({ ...prev, thumbnail: file.name }));
    };

    const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files ?? []);
        const urls = files.map((f) => URL.createObjectURL(f));
        setGalleryPreviews((prev) => [...prev, ...urls].slice(0, 6));
        const names = files.map((f) => f.name);
        setForm((prev) => ({
            ...prev,
            listImage: JSON.stringify([...JSON.parse(prev.listImage), ...names]),
        }));
    };

    // sửa buildPayload
    const buildPayload = (): ProductCreateRequest => {
        return {
            ...form,
            specification: JSON.stringify(
                specs.filter((s) => s.key.trim() && s.value.trim())
            ),
        };
    };

    const handleSave = () => {
        const payload = buildPayload();
        console.log("ProductCreateRequest payload:", payload);
        alert("Saved! Check console for payload.");
    };

    const handleDraft = () => {
        const payload = buildPayload();
        console.log("Draft payload:", payload);
        alert("Saved as draft! Check console for payload.");
    };

    // ── Render ─────────────────────────────────────────────────────────────────
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
            <div className="max-w-5xl mx-auto">

                {/* Breadcrumb */}
                <p className="text-xs text-gray-400 mb-4">
                    Dashboard &rsaquo; Inventory &rsaquo;{" "}
                    <span className="text-red-500 font-medium">Add New Product</span>
                </p>

                {/* Page Header */}
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
                            Add New Product
                        </h1>
                        <p className="text-sm text-gray-400 mt-1">
                            Create a new listing for your global tech inventory.
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                            Cancel
                        </button>
                        <button
                            onClick={handleDraft}
                            className="px-4 py-2 text-sm font-medium rounded-lg border border-red-400 text-red-500 bg-white hover:bg-red-50 transition"
                        >
                            Save as Draft
                        </button>
                        <button
                            onClick={handleSave}
                            className="px-4 py-2 text-sm font-medium rounded-lg bg-red-500 hover:bg-red-600 text-white transition"
                        >
                            Save Product
                        </button>
                    </div>
                </div>

                {/* Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-5">

                    {/* ── Left Column ── */}
                    <div className="space-y-5">

                        {/* Product Information */}
                        <Card extra="p-6">
                            <div className="flex items-center gap-2 mb-5">
                                <InfoIcon />
                                <h2 className="text-sm font-semibold text-gray-700 dark:text-white">
                                    Product Information
                                </h2>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <InputField
                                    label="Product Name"
                                    id="modelName"
                                    name="modelName"
                                    value={form.modelName}
                                    onChange={handleChange}
                                    placeholder="e.g. MacBook Pro M3"
                                />
                                <InputField
                                    label="Model Number"
                                    id="modelNumber"
                                    name="modelNumber"
                                    value={form.modelNumber}
                                    onChange={handleChange}
                                    placeholder="e.g. A2991"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <Label htmlFor="categoryId" text="Category" />
                                    <select
                                        id="categoryId"
                                        name="categoryId"
                                        value={form.categoryId}
                                        onChange={handleChange}
                                        className="mt-2 h-12 w-full rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-gray-800 px-3 text-sm text-gray-700 dark:text-white outline-none focus:border-red-400 transition"
                                    >
                                        <option value="">Select Category</option>
                                        {CATEGORIES.map((c) => (
                                            <option key={c.id} value={c.id}>{c.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <InputField
                                    label="Brand"
                                    id="brandNameDisplay"
                                    placeholder="e.g. Apple"
                                    value={form.modelName ? undefined : ""}
                                />
                            </div>
                            <div>
                                <Label htmlFor="description" text="Product Description" />
                                <textarea
                                    id="description"
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    rows={4}
                                    placeholder="Detailed technical specifications and features..."
                                    className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-gray-800 px-3 py-3 text-sm text-gray-700 dark:text-white outline-none focus:border-red-400 resize-none transition placeholder:text-gray-300"
                                />
                            </div>
                        </Card>

                        {/* Pricing & Inventory */}
                        <Card extra="p-6">
                            <div className="flex items-center gap-2 mb-5">
                                <PricingIcon />
                                <h2 className="text-sm font-semibold text-gray-700 dark:text-white">
                                    Pricing &amp; Inventory
                                </h2>
                            </div>
                            <div className="grid grid-cols-3 gap-4 mb-4">
                                {/* Retail Price */}
                                <div>
                                    <Label htmlFor="price" text="Retail Price ($)" />
                                    <div className="relative mt-2">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                                        <input
                                            id="price"
                                            name="price"
                                            type="number"
                                            min={0}
                                            step={0.01}
                                            value={form.price || ""}
                                            onChange={handleNumberChange}
                                            placeholder="0.00"
                                            className="h-12 w-full rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-gray-800 pl-7 pr-3 text-sm text-gray-700 dark:text-white outline-none focus:border-red-400 transition"
                                        />
                                    </div>
                                </div>
                                {/* Import Price */}
                                <div>
                                    <Label htmlFor="importPrice" text="Import Price ($)" />
                                    <div className="relative mt-2">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                                        <input
                                            id="importPrice"
                                            name="importPrice"
                                            type="number"
                                            min={0}
                                            step={0.01}
                                            value={form.importPrice || ""}
                                            onChange={handleNumberChange}
                                            placeholder="0.00"
                                            className="h-12 w-full rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-gray-800 pl-7 pr-3 text-sm text-gray-700 dark:text-white outline-none focus:border-red-400 transition"
                                        />
                                    </div>
                                </div>
                                {/* Stock */}
               {/* // sửa InputField quantity */}
                                <InputField
                                    label="Stock Quantity"
                                    id="quanlity"
                                    name="quanlity"
                                    type="number"
                                    value={form.quanlity.toString()}
                                    onChange={handleNumberChange}
                                    placeholder="0"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                {/* Tax VAT */}
                                <div>
                                    <Label htmlFor="taxVat" text="Tax VAT (%)" />
                                    <input
                                        id="taxVat"
                                        name="taxVat"
                                        type="number"
                                        min={0}
                                        max={100}
                                        value={form.taxVat || ""}
                                        onChange={handleNumberChange}
                                        placeholder="0"
                                        className="mt-2 h-12 w-full rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-gray-800 px-3 text-sm text-gray-700 dark:text-white outline-none focus:border-red-400 transition"
                                    />
                                </div>
                                {/* Product Status */}
                                <div>
                                    <Label htmlFor="productStatus" text="Product Status" />
                  {/* // sửa select Product Status */}
                                    <select
                                        id="productStatus"
                                        name="productStatus"
                                        value={form.productStatus}
                                        onChange={handleChange}
                                        className="mt-2 h-12 w-full rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-gray-800 px-3 text-sm text-gray-700 dark:text-white outline-none focus:border-red-400 transition"
                                    >
                                        {(
                                            [
                                                "NEW",
                                                "HOT",
                                                "SALE",
                                                "OUT_OF_STOCK",
                                                "DISCONTINUED",
                                                "USED",
                                            ] as ProductStatus[]
                                        ).map((s) => (
                                            <option key={s} value={s}>
                                                {productStatusLabels[s]}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </Card>

                        {/* Technical Specifications */}
                        <Card extra="p-6">
                            <div className="flex items-center justify-between mb-5">
                                <div className="flex items-center gap-2">
                                    <SpecIcon />
                                    <h2 className="text-sm font-semibold text-gray-700 dark:text-white">
                                        Technical Specifications
                                    </h2>
                                </div>
                                <button
                                    onClick={addSpec}
                                    className="text-xs text-red-500 font-medium hover:text-red-600 transition"
                                >
                                    + Add Field
                                </button>
                            </div>
                            <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                                <table className="w-full text-sm">
                                    <tbody>
                                        {specs.map((spec, idx) => (
                                            <tr
                                                key={spec.id}
                                                className={idx !== specs.length - 1 ? "border-b border-gray-100 dark:border-gray-700" : ""}
                                            >
                                                <td className="w-32 bg-gray-50 dark:bg-gray-800/60 px-4 py-2">
                                                    <input
                                                        type="text"
                                                        value={spec.key}
                                                        onChange={(e) => updateSpec(spec.id, "key", e.target.value)}
                                                        placeholder="Property"
                                                        className="w-full bg-transparent text-gray-500 dark:text-gray-400 outline-none text-sm font-medium placeholder:text-gray-300"
                                                    />
                                                </td>
                                                <td className="px-4 py-2 bg-white dark:bg-gray-800">
                                                    <div className="flex items-center justify-between gap-2">
                                                        <input
                                                            type="text"
                                                            value={spec.value}
                                                            onChange={(e) => updateSpec(spec.id, "value", e.target.value)}
                                                            placeholder="Value"
                                                            className="flex-1 bg-transparent text-gray-700 dark:text-gray-200 outline-none text-sm placeholder:text-gray-300"
                                                        />
                                                        <button
                                                            onClick={() => removeSpec(spec.id)}
                                                            className="text-gray-300 hover:text-red-400 transition"
                                                        >
                                                            <TrashIcon />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    </div>

                    {/* ── Right Column ── */}
                    <div className="space-y-5">

                        {/* Product Media */}
                        <Card extra="p-5">
                            <div className="flex items-center gap-2 mb-4">
                                <ImageIcon />
                                <h2 className="text-sm font-semibold text-gray-700 dark:text-white">
                                    Product Media
                                </h2>
                            </div>
                            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
                                Primary Thumbnail
                            </p>
                            <div
                                onClick={() => thumbnailRef.current?.click()}
                                className="border-2 border-dashed border-red-200 bg-red-50 dark:bg-red-900/10 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-red-400 transition gap-2"
                            >
                                {thumbnailPreview ? (
                                    <img
                                        src={thumbnailPreview}
                                        alt="Thumbnail preview"
                                        className="h-24 w-full object-cover rounded-lg"
                                    />
                                ) : (
                                    <>
                                        <UploadIcon />
                                        <p className="text-xs text-gray-400 text-center">
                                            Click to upload main image<br />
                                            <span className="text-gray-300">PNG, JPG up to 5MB</span>
                                        </p>
                                    </>
                                )}
                            </div>
                            <input
                                ref={thumbnailRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleThumbnailChange}
                            />

                            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mt-4 mb-2">
                                Gallery Images
                            </p>
                            <div className="flex gap-2 flex-wrap">
                                <div
                                    onClick={() => galleryRef.current?.click()}
                                    className="w-14 h-14 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-600 flex items-center justify-center cursor-pointer hover:border-red-300 transition text-gray-300 text-xl font-light"
                                >
                                    +
                                </div>
                                {galleryPreviews.map((url, i) => (
                                    <img
                                        key={i}
                                        src={url}
                                        alt={`Gallery ${i + 1}`}
                                        className="w-14 h-14 rounded-xl object-cover border border-gray-200"
                                    />
                                ))}
                            </div>
                            <input
                                ref={galleryRef}
                                type="file"
                                accept="image/*"
                                multiple
                                className="hidden"
                                onChange={handleGalleryChange}
                            />
                        </Card>

                        {/* Supplier & Brand IDs */}
                        <Card extra="p-5">
                            <div className="flex items-center gap-2 mb-4">
                                <BuildingIcon />
                                <h2 className="text-sm font-semibold text-gray-700 dark:text-white">
                                    Supplier &amp; Brand
                                </h2>
                            </div>
                            <InputField
                                label="Brand ID"
                                id="brandId"
                                name="brandId"
                                type="number"
                                value={form.brandId.toString()}
                                onChange={handleChange}
                                placeholder="e.g. 1"
                                extra="mb-3"
                            />
                            {/* // sửa Supplier ID */}
                            <InputField
                                label="Supplier ID"
                                id="supplierId"
                                name="supplierId"
                                type="number"
                                value={form.supplierId.toString()}
                                onChange={handleNumberChange}
                                placeholder="e.g. 1"
                            />
                        </Card>

                        {/* Visibility */}
                        <Card extra="p-5">
                            <div className="flex items-center gap-2 mb-4">
                                <EyeIcon />
                                <h2 className="text-sm font-semibold text-gray-700 dark:text-white">
                                    Visibility
                                </h2>
                            </div>
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <p className="text-sm font-medium text-gray-700 dark:text-white">
                                        Publish to Store
                                    </p>
                                    <p className="text-xs text-gray-400">Visible to all customers</p>
                                </div>
                                <Switch
                                    checked={publishToStore}
                                    onChange={setPublishToStore}
                                    color="green"
                                />
                            </div>

                            <Label htmlFor="tags" text="Tags" />
                            <div
                                className="flex flex-wrap gap-2 border border-gray-200 dark:border-white/10 rounded-xl p-2 min-h-[44px] cursor-text"
                                onClick={() => document.getElementById("tagInput")?.focus()}
                            >
                                {tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="flex items-center gap-1 bg-red-100 text-red-600 text-xs font-medium px-2 py-1 rounded-full"
                                    >
                                        {tag}
                                        <button
                                            onClick={(e) => { e.stopPropagation(); removeTag(tag); }}
                                            className="hover:text-red-800 transition"
                                        >
                                            ×
                                        </button>
                                    </span>
                                ))}
                                <input
                                    id="tagInput"
                                    type="text"
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    onKeyDown={handleTagKeyDown}
                                    placeholder={tags.length === 0 ? "Add tags (press Enter)" : ""}
                                    className="flex-1 min-w-[80px] bg-transparent text-sm text-gray-700 dark:text-white outline-none placeholder:text-gray-300"
                                />
                            </div>
                        </Card>

                        {/* Help */}
                        <div className="bg-red-500 rounded-xl p-4 flex items-start gap-3">
                            <div className="mt-0.5">
                                <HelpIcon />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-white">Need assistance?</p>
                                <p className="text-xs text-red-100 mt-0.5">
                                    Contact support or view the product listing guide for help with your inventory.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddNewProduct;