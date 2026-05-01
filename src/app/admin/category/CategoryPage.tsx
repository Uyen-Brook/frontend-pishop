"use client";

import React, { useMemo, useState, useEffect } from "react";
import Card from "../../../components/card/Card";
import Label from "../../../components/field/LabelField";
import Select from "../../../components/select/Select";
import { CategoryService, CategoryResponse, CategoryRequest } from "../../../service/admin/CategoryService";
import { MdAdd, MdDelete, MdEdit, MdSearch, MdLaptop, MdPhone, MdHeadphones, MdWatch, MdCamera,
   MdHome, MdSports, MdChildCare, MdBusiness, MdRestaurant, MdHealthAndSafety, MdPets,
    MdOutlineShoppingBag, MdGames, MdBook, MdMusicNote, MdMovie, MdDevices, MdComputer, 
    MdPhoneIphone, MdTabletMac, MdKeyboard, MdMouse, MdMonitor, MdSpeaker, MdHeadset, 
    MdWifi, MdBluetooth, MdCloudUpload, MdCloudDownload, MdLock, MdKey, MdFingerprint, 
    MdPerson, MdPeople, MdStar, MdFavorite,  MdSchool, MdCelebration, MdCake, MdShoppingCart,
     MdStore, MdWarehouse, MdFactory, MdNature, MdPark, MdForest, MdWaterDrop, MdCloud,
      MdThunderstorm, MdWbSunny, MdNightsStay, MdTerrain, MdLocationOn, MdMap, MdPublic,
       MdLanguage, MdSignalWifi4Bar, MdSignalCellular4Bar, MdRouter, MdStorage, MdBackup, 
       MdSecurity, MdAccountBalance, MdCreditCard, MdSavings, MdAttachMoney, MdWork, MdEmojiEvents,
        MdSportsEsports, MdFitnessCenter, MdLocalGroceryStore, MdFastfood, MdLocalDrink, MdLocalCafe, MdLocalBar, MdHotel, MdFlight, MdTrain,  MdDirectionsBike,
         MdDirectionsWalk, MdLocalShipping, MdLocalTaxi, MdLocalHospital, MdLocalPharmacy, MdLocalPolice, MdLocalFireDepartment, MdAccessible, MdSpa, MdLocalFlorist, MdPets as MdPetsIcon, MdOutlinePets } from "react-icons/md";
import { FaLaptop, FaMobile, FaHeadphones, FaCamera, FaHome, FaCar, FaBaby, FaBuilding, FaUtensils,
   FaHeartbeat, FaPaw, FaSpa, FaShoppingBag, FaGamepad, FaBook, FaMusic, FaFilm, FaPlane, FaTrain,
    FaBus, FaBicycle, FaWalking, FaTruck, FaTaxi, FaHospital, FaPills,FaFire, FaSchool, 
    FaBook as FaBookLibrary, FaLandmark, FaBirthdayCake, FaGift, FaHeart, FaStar, FaTrophy,
     FaBriefcase, FaMoneyBill, FaUniversity, FaCreditCard as FaCreditCardAlt, FaPiggyBank,
      FaShoppingCart as FaShoppingCartAlt, FaCashRegister, FaStore, FaStoreAlt, 
      FaWarehouse as FaWarehouseAlt, FaIndustry, FaSeedling, FaTree, FaLeaf, FaWater,
       FaCloud as FaCloudAlt, FaBolt, FaSun, FaMoon, FaMountain, FaMapMarker, 
       FaMap as FaMapAlt, FaGlobe, FaLanguage, FaWifi as FaWifiAlt, FaBluetooth as FaBluetoothB,
        FaSignal, FaHdd, FaCloudUploadAlt, FaCloudDownloadAlt, FaDatabase, FaLock as FaLockAlt, 
        FaUnlock as FaUnlockAlt, FaKey as FaKeyAlt, FaFingerprint as FaFingerprintAlt, FaUser,
         FaUsers, FaUserFriends, FaWheelchair, FaRestroom, FaMale, FaFemale, FaTransgender, FaDog,
          FaCat, FaFish, FaCrow, FaDove, FaDragon, FaSpider, FaHorse, FaKiwiBird, FaOtter, FaFrog,
           FaPaw as FaPawPrint, FaBone, FaCookie, FaIceCream, FaPizzaSlice, FaHamburger, FaHotdog,
            FaCoffee, FaBeer, FaWineGlass, FaGlassCheers, FaHotel as FaHotelAlt, FaBed, FaConciergeBell, FaSuitcase, FaPassport, FaIdCard, FaEnvelope, FaPhone as FaPhoneAlt, FaFax, FaPrint, FaCopy, FaSave, FaFile, FaFolder, FaFilePdf, FaFileWord, FaFileExcel, FaFilePowerpoint, FaFileImage, FaFileVideo, FaFileAudio, FaFileArchive, FaFileCode, FaFileAlt, FaFileImport, FaFileExport, FaUpload, FaDownload, FaShare, FaShareAlt, FaLink, FaUnlink,  FaExternalLinkAlt, FaAnchor, FaLink as FaChain, FaHashtag, FaAt,FaAsterisk, FaPercent, FaPlus, FaMinus, FaTimes, FaDivide, FaEquals, FaNotEqual, FaLessThan, FaGreaterThan, FaLessThanEqual, FaGreaterThanEqual, FaInfinity, FaEllipsisH, FaEllipsisV, FaCaretUp, FaCaretDown, FaCaretLeft, FaCaretRight, FaCaretSquareUp, FaCaretSquareDown,
            FaCaretSquareLeft, FaCaretSquareRight, FaSort, FaSortUp, FaSortDown, FaSortAlphaDown, FaSortAlphaUp, FaSortNumericDown, FaSortNumericUp, FaSortAmountDown, FaSortAmountUp, FaArrowUp, FaArrowDown, FaArrowLeft, FaArrowRight, FaArrowCircleUp, FaArrowCircleDown, FaArrowCircleLeft, FaArrowCircleRight, FaAngleUp, FaAngleDown, FaAngleLeft, FaAngleRight, FaAngleDoubleUp, FaAngleDoubleDown, FaAngleDoubleLeft, FaAngleDoubleRight,
             FaChevronUp, FaChevronDown, FaChevronLeft, FaChevronRight, FaChevronCircleUp,
              FaChevronCircleDown, FaChevronCircleLeft, FaChevronCircleRight, FaExpand, 
              FaCompress, FaExpandArrowsAlt, FaCompressArrowsAlt,FaLevelUpAlt, FaLevelDownAlt, FaExchangeAlt,
               FaRandom, FaSync, FaSyncAlt, FaSpinner, FaRedo, FaUndo, FaRedoAlt, FaUndoAlt,FaHistory,
                FaClock, FaHourglass, FaHourglassHalf, FaHourglassStart, FaHourglassEnd, FaCalendar, 
                FaCalendarAlt, FaCalendarCheck, FaCalendarTimes, FaCalendarDay, FaCalendarWeek, 
                FaCalendarMinus, FaCalendarPlus } from "react-icons/fa";

const CategoryPage: React.FC = () => {
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  const [sortField, setSortField] = useState<"name" | "date">("name");

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const [openModal, setOpenModal] = useState(false);

  const [editingCategory, setEditingCategory] = useState<CategoryResponse | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    icon: "",
    note: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  // Load categories from API
  const loadCategories = async () => {
    setLoading(true);
    try {
      const data = await CategoryService.getAll();
      setCategories(data);
    } catch (error) {
      console.error("Error loading categories:", error);
      alert("Lỗi khi tải danh mục");
    }
    setLoading(false);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const filteredCategories = useMemo(() => {
    const filtered = categories.filter((category) =>
      category.name.toLowerCase().includes(search.toLowerCase())
    );

    filtered.sort((a, b) => {
      if (sortField === "name") {
        return sortOrder === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }

      // Sort by ID as fallback for date
      return sortOrder === "asc"
        ? a.id - b.id
        : b.id - a.id;
    });

    return filtered;
  }, [categories, search, sortField, sortOrder]);

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      icon: "",
      note: "",
    });
    setImageFile(null);
    setImagePreview("");
    setEditingCategory(null);
  };

  const handleOpenAdd = () => {
    resetForm();
    setOpenModal(true);
  };

  const handleEdit = (category: CategoryResponse) => {
    setEditingCategory(category);

    setFormData({
      name: category.name,
      description: category.description || "",
      icon: category.icon || "",
      note: category.note || "",
    });
    setImagePreview(category.image || "");
    setOpenModal(true);
  };

  const handleSave = async () => {
    if (!formData.name.trim()) {
      alert("Tên danh mục không được để trống");
      return;
    }

    try {
      const request: CategoryRequest = {
        name: formData.name,
        description: formData.description,
        icon: formData.icon,
        note: formData.note,
      };

      if (editingCategory) {
        await CategoryService.update(editingCategory.id, request, imageFile || undefined);
        alert("Cập nhật danh mục thành công!");
      } else {
        await CategoryService.create(request, imageFile || undefined);
        alert("Thêm danh mục thành công!");
      }

      await loadCategories();
      setOpenModal(false);
      resetForm();
    } catch (error) {
      console.error("Error saving category:", error);
      alert("Có lỗi xảy ra khi lưu danh mục");
    }
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa danh mục này không?"
    );

    if (!confirmDelete) return;

    try {
      await CategoryService.delete(id);
      alert("Xóa danh mục thành công!");
      await loadCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
      alert("Có lỗi xảy ra khi xóa danh mục");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // // Helper function to render icon based on value
  // const renderIcon = (iconValue: string) => {
  //   const iconOption = ICON_OPTIONS.find(opt => opt.value === iconValue);
  //   if (iconOption) {
  //     return <span className="text-2xl">{iconOption.icon}</span>;
  //   }
  //   return <span className="text-2xl">{iconValue}</span>;
  // };

  return (
    <div className="w-full p-6">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-navy-700 dark:text-white">
            Category Management
          </h2>
          <p className="mt-1 text-gray-600 dark:text-gray-300">
            Quản lý danh mục sản phẩm
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 rounded-xl bg-brand-500 px-5 py-3 font-semibold text-white transition hover:opacity-90"
        >
          <MdAdd className="text-xl" />
          Thêm Category
        </button>
      </div>

      <Card extra="mb-6 p-5">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
          <div className="relative lg:col-span-2">
            <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-xl text-gray-400" />

            <input
              type="text"
              placeholder="Tìm kiếm category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-11 pr-4 text-sm outline-none focus:border-brand-500 dark:border-white/10 dark:bg-navy-800 dark:text-white"
            />
          </div>

          <Select
            options={[
              {
                label: "Sort by Name",
                value: "name",
              },
              {
                label: "Sort by Date",
                value: "date",
              },
            ]}
            value={sortField}
            onChange={(value) =>
              setSortField(value as "name" | "date")
            }
            className="!mb-0"
          />

          <Select
            options={[
              {
                label: "Ascending",
                value: "asc",
              },
              {
                label: "Descending",
                value: "desc",
              },
            ]}
            value={sortOrder}
            onChange={(value) =>
              setSortOrder(value as "asc" | "desc")
            }
            className="!mb-0"
          />
        </div>
      </Card>

      <Card extra="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200 bg-gray-50 dark:border-white/10 dark:bg-navy-900">
              <tr>
                <th className="px-5 py-4 text-left text-sm font-bold text-gray-600 dark:text-gray-300">
                  ID
                </th>

                <th className="px-5 py-4 text-left text-sm font-bold text-gray-600 dark:text-gray-300">
                  Image
                </th>

                <th className="px-5 py-4 text-left text-sm font-bold text-gray-600 dark:text-gray-300">
                  Icon
                </th>

                <th className="px-5 py-4 text-left text-sm font-bold text-gray-600 dark:text-gray-300">
                  Name
                </th>

                <th className="px-5 py-4 text-left text-sm font-bold text-gray-600 dark:text-gray-300">
                  Description
                </th>

                <th className="px-5 py-4 text-left text-sm font-bold text-gray-600 dark:text-gray-300">
                  Note
                </th>

                <th className="px-5 py-4 text-center text-sm font-bold text-gray-600 dark:text-gray-300">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredCategories.map((category) => (
                <tr
                  key={category.id}
                  className="border-b border-gray-100 transition hover:bg-gray-50 dark:border-white/5 dark:hover:bg-white/5"
                >
                  <td className="px-5 py-4 text-sm text-gray-700 dark:text-white">
                    #{category.id}
                  </td>

                  <td className="px-5 py-4">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="h-14 w-14 rounded-xl object-cover"
                    />
                  </td>

                  {/* <td className="px-5 py-4 text-2xl">
                    {renderIcon(category.icon || "")}
                  </td> */}

                  <td className="px-5 py-4 font-semibold text-navy-700 dark:text-white">
                    {category.name}
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600 dark:text-gray-300">
                    {category.description}
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600 dark:text-gray-300">
                    {category.note}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={() => handleEdit(category)}
                        className="rounded-lg bg-yellow-400 p-2 text-white transition hover:opacity-80"
                      >
                        <MdEdit className="text-lg" />
                      </button>

                      <button
                        onClick={() => handleDelete(category.id)}
                        className="rounded-lg bg-red-500 p-2 text-white transition hover:opacity-80"
                      >
                        <MdDelete className="text-lg" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredCategories.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="py-10 text-center text-gray-500 dark:text-gray-400"
                  >
                    Không có dữ liệu danh mục
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <Card extra="w-full max-w-2xl p-6">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-navy-700 dark:text-white">
                {editingCategory
                  ? "Chỉnh sửa Category"
                  : "Thêm Category"}
              </h3>

              <button
                onClick={() => setOpenModal(false)}
                className="text-2xl text-gray-500"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              <div>
                <Label
                  htmlFor="name"
                  text="Category Name"
                  required
                />

                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-brand-500 dark:border-white/10 dark:bg-navy-800 dark:text-white"
                />
              </div>

              <div>
                <Label htmlFor="icon" text="Icon" />

                {/* <Select
                  // options={ICON_OPTIONS}
                  value={formData.icon}
                  onChange={(value) =>
                    setFormData({
                      ...formData,
                      icon: value as string,
                    })
                  }
                  placeholder="-- Chọn icon --"
                /> */}
              </div>

              <div className="lg:col-span-2">
                <Label htmlFor="description" text="Description" />

                <textarea
                  id="description"
                  rows={3}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-brand-500 dark:border-white/10 dark:bg-navy-800 dark:text-white"
                />
              </div>

              <div className="lg:col-span-2">
                <Label htmlFor="image" text="Hình ảnh" />

                <div className="flex items-center gap-4">
                  <input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-brand-500 dark:border-white/10 dark:bg-navy-800 dark:text-white"
                  />
                  {(imagePreview || editingCategory?.image) && (
                    <img
                      src={imagePreview || editingCategory?.image}
                      alt="Preview"
                      className="h-14 w-14 rounded-xl object-cover"
                    />
                  )}
                </div>
              </div>

              <div className="lg:col-span-2">
                <Label htmlFor="note" text="Note" />

                <textarea
                  id="note"
                  rows={3}
                  value={formData.note}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      note: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-brand-500 dark:border-white/10 dark:bg-navy-800 dark:text-white"
                />
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-3">
              <button
                onClick={() => setOpenModal(false)}
                className="rounded-xl border border-gray-300 px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-100 dark:border-white/10 dark:text-white dark:hover:bg-white/10"
              >
                Hủy
              </button>

              <button
                onClick={handleSave}
                className="rounded-xl bg-brand-500 px-5 py-3 font-semibold text-white transition hover:opacity-90"
              >
                {editingCategory ? "Cập nhật" : "Thêm mới"}
              </button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
