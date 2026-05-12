import { apiClient } from "../api";
import { ProductStatus, ProductResponse, ProductCreateRequest, ProductUpdateRequest } from "../../types";

// =========================
// TYPES (frontend mapping)
// =========================


// =========================
// SERVICE
// =========================

const BASE_URL = "/admin/products";

export const ProductService = {
  // CREATE (multipart/form-data)
  create: async (data: ProductCreateRequest) => {
    const formData = buildProductFormData(data);

    const res = await apiClient.post<ProductResponse>(
      BASE_URL,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    return res.data;
  },

  // UPDATE (multipart/form-data)
  update: async (id: number, data: ProductUpdateRequest) => {
    const formData = buildProductUpdateFormData(data);

    const res = await apiClient.put<ProductResponse>(
      `${BASE_URL}/${id}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    return res.data;
  },

  // GET DETAIL
  getById: async (id: number) => {
    const res = await apiClient.get<ProductResponse>(
      `${BASE_URL}/${id}`
    );
    return res.data;
  },

  // GET ALL
  getAll: async (page = 0, size = 10) => {
    const res = await apiClient.get(`${BASE_URL}`, {
      params: { page, size },
    });
    return res.data;
  },

  // SEARCH
  search: async (params: {
    keyword?: string;
    categoryId?: number;
    brandId?: number;
    supplierId?: number;
    deleted?: boolean;
    page?: number;
    size?: number;
  }) => {
    const res = await apiClient.get(`${BASE_URL}/search`, {
      params,
    });
    return res.data;
  },

  // SOFT DELETE
  softDelete: async (id: number) => {
    await apiClient.delete(`${BASE_URL}/${id}`);
  },

  // HARD DELETE
  hardDelete: async (id: number) => {
    await apiClient.delete(`${BASE_URL}/${id}/hard`);
  },

  // RESTORE
  restore: async (id: number) => {
    await apiClient.patch(`${BASE_URL}/${id}/restore`);
  },

  // CHANGE STATUS
  changeStatus: async (id: number, status: ProductStatus) => {
    const res = await apiClient.patch<ProductResponse>(
      `${BASE_URL}/${id}/status`,
      null,
      {
        params: { status },
      }
    );
    return res.data;
  },
};

// =========================
// HELPERS (FORMDATA)
// =========================

function buildProductFormData(data: ProductCreateRequest) {
  const formData = new FormData();

  appendIfExists(formData, "modelName", data.modelName);
  appendIfExists(formData, "modelNumber", data.modelNumber);
  appendIfExists(formData, "description", data.description);

  appendIfExists(formData, "importPrice", data.importPrice);
  appendIfExists(formData, "taxVat", data.taxVat);
  appendIfExists(formData, "price", data.price);

  appendIfExists(formData, "quantity", data.quantity);
  appendIfExists(formData, "productStatus", data.productStatus);

  appendIfExists(formData, "brandId", data.brandId);
  appendIfExists(formData, "supplierId", data.supplierId);
  appendIfExists(formData, "categoryId", data.categoryId);

  if (data.specification) {
    formData.append("specification", data.specification);
  }

  if (data.thumbnail) {
    formData.append("thumbnail", data.thumbnail);
  }

  if (data.listImage?.length) {
    data.listImage.forEach((file) => {
      formData.append("listImage", file);
    });
  }

  return formData;
}

function buildProductUpdateFormData(data: ProductUpdateRequest) {
  const formData = new FormData();

  appendIfExists(formData, "modelName", data.modelName);
  appendIfExists(formData, "modelNumber", data.modelNumber);
  appendIfExists(formData, "description", data.description);

  appendIfExists(formData, "price", data.price);
  appendIfExists(formData, "quantity", data.quantity);
  appendIfExists(formData, "importPrice", data.importPrice);

  appendIfExists(formData, "productStatus", data.productStatus);

  if (data.specification) {
    formData.append(
      "specification",
      JSON.stringify(data.specification)
    );
  }

  if (data.brandId) formData.append("brandId", String(data.brandId));
  if (data.supplierId) formData.append("supplierId", String(data.supplierId));
  if (data.categoryId) formData.append("categoryId", String(data.categoryId));

  // images
  data.newImages?.forEach((file) => {
    formData.append("newImages", file);
  });

  data.deletedImages?.forEach((url) => {
    formData.append("deletedImages", url);
  });

  data.keptImages?.forEach((url) => {
    formData.append("keptImages", url);
  });

  if (data.thumbnail) {
    formData.append("thumbnail", data.thumbnail);
  }

  return formData;
}

function appendIfExists(
  formData: FormData,
  key: string,
  value: any
) {
  if (value !== undefined && value !== null) {
    formData.append(key, String(value));
  }
}