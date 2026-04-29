
// AccountPage.tsx
import React, { useMemo, useState } from "react";
import Card from "../../../components/card/Card";
import Label from "../../../components/field/LabelField";
import Select from "../../../components/select/Select";
import Switch from "../../../components/field/Switch";
import {
  MdAdd,
  MdDelete,
  MdEdit,
  MdPerson,
  MdSearch,
  MdShield,
} from "react-icons/md";

export type AccountRole = "ADMIN" | "USER";

interface Account {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isActive: boolean;
  isDelete: boolean;
  image: string;
  role: AccountRole;
  point: number;
  rank: string;
  createAt: string;
  lastActivity: string;
}

const mockAccounts: Account[] = [
  {
    id: 1,
    firstName: "Admin",
    lastName: "System",
    email: "admin@gmail.com",
    password: "123456",
    isActive: true,
    isDelete: false,
    image: "https://i.pravatar.cc/150?img=1",
    role: "ADMIN",
    point: 1000,
    rank: "VIP",
    createAt: "2026-04-20",
    lastActivity: "2026-04-28",
  },
  {
    id: 2,
    firstName: "Nguyen",
    lastName: "Van A",
    email: "user@gmail.com",
    password: "123456",
    isActive: true,
    isDelete: false,
    image: "https://i.pravatar.cc/150?img=2",
    role: "USER",
    point: 250,
    rank: "SILVER",
    createAt: "2026-04-22",
    lastActivity: "2026-04-27",
  },
];

const AccountPage: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>(mockAccounts);

  const [activeTab, setActiveTab] = useState<AccountRole>("ADMIN");

  const [search, setSearch] = useState("");

  const [sortField, setSortField] = useState<"name" | "date">("name");

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const [openModal, setOpenModal] = useState(false);

  const [editingAccount, setEditingAccount] = useState<Account | null>(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    image: "",
    role: "USER" as AccountRole,
    isActive: true,
    point: 0,
  });

  const filteredAccounts = useMemo(() => {
    const filtered = accounts
      .filter((item) => !item.isDelete)
      .filter((item) => item.role === activeTab)
      .filter((item) => {
        const fullName = `${item.firstName} ${item.lastName}`;

        return (
          fullName.toLowerCase().includes(search.toLowerCase()) ||
          item.email.toLowerCase().includes(search.toLowerCase())
        );
      });

    filtered.sort((a, b) => {
      if (sortField === "name") {
        const nameA = `${a.firstName} ${a.lastName}`;
        const nameB = `${b.firstName} ${b.lastName}`;

        return sortOrder === "asc"
          ? nameA.localeCompare(nameB)
          : nameB.localeCompare(nameA);
      }

      return sortOrder === "asc"
        ? new Date(a.createAt).getTime() -
            new Date(b.createAt).getTime()
        : new Date(b.createAt).getTime() -
            new Date(a.createAt).getTime();
    });

    return filtered;
  }, [accounts, activeTab, search, sortField, sortOrder]);

  const resetForm = () => {
    setEditingAccount(null);

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      image: "",
      role: activeTab,
      isActive: true,
      point: 0,
    });
  };

  const handleOpenAdd = () => {
    resetForm();
    setOpenModal(true);
  };

  const handleEdit = (account: Account) => {
    setEditingAccount(account);

    setFormData({
      firstName: account.firstName,
      lastName: account.lastName,
      email: account.email,
      password: account.password,
      image: account.image,
      role: account.role,
      isActive: account.isActive,
      point: account.point,
    });

    setOpenModal(true);
  };

  const calculateRank = (point: number) => {
    if (point === 0) return "NEW";
    if (point < 200) return "BRONZE";
    if (point < 500) return "SILVER";
    if (point < 700) return "GOLD";
    if (point < 1000) return "DIAMOND";

    return "VIP";
  };

  const handleSave = () => {
    if (!formData.email || !formData.firstName) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    if (editingAccount) {
      setAccounts((prev) =>
        prev.map((item) =>
          item.id === editingAccount.id
            ? {
                ...item,
                ...formData,
                rank: calculateRank(formData.point),
              }
            : item
        )
      );
    } else {
      const newAccount: Account = {
        id: Date.now(),
        ...formData,
        rank: calculateRank(formData.point),
        isDelete: false,
        createAt: new Date().toISOString(),
        lastActivity: new Date().toISOString(),
      };

      setAccounts((prev) => [...prev, newAccount]);
    }

    setOpenModal(false);
    resetForm();
  };

  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc muốn xóa tài khoản này không?"
    );

    if (!confirmDelete) return;

    setAccounts((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              isDelete: true,
            }
          : item
      )
    );
  };

  return (
    <div className="w-full p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-navy-700 dark:text-white">
            Account Management
          </h2>

          <p className="mt-1 text-gray-600 dark:text-gray-300">
            Quản lý tài khoản hệ thống
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 rounded-xl bg-brand-500 px-5 py-3 font-semibold text-white transition hover:opacity-90"
        >
          <MdAdd className="text-xl" />
          Thêm Account
        </button>
      </div>

      <div className="mb-6 flex gap-4">
        <button
          onClick={() => setActiveTab("ADMIN")}
          className={`flex items-center gap-2 rounded-xl px-5 py-3 font-semibold transition ${
            activeTab === "ADMIN"
              ? "bg-brand-500 text-white"
              : "bg-white text-gray-700 dark:bg-navy-800 dark:text-white"
          }`}
        >
          <MdShield className="text-lg" />
          Admin Accounts
        </button>

        <button
          onClick={() => setActiveTab("USER")}
          className={`flex items-center gap-2 rounded-xl px-5 py-3 font-semibold transition ${
            activeTab === "USER"
              ? "bg-brand-500 text-white"
              : "bg-white text-gray-700 dark:bg-navy-800 dark:text-white"
          }`}
        >
          <MdPerson className="text-lg" />
          User Accounts
        </button>
      </div>

      <Card extra="mb-6 p-5">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
          <div className="relative lg:col-span-2">
            <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-xl text-gray-400" />

            <input
              type="text"
              placeholder="Tìm kiếm account..."
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
          />
        </div>
      </Card>

      <Card extra="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200 bg-gray-50 dark:border-white/10 dark:bg-navy-900">
              <tr>
                <th className="px-5 py-4 text-left text-sm font-bold text-gray-600 dark:text-gray-300">
                  User
                </th>

                <th className="px-5 py-4 text-left text-sm font-bold text-gray-600 dark:text-gray-300">
                  Email
                </th>

                <th className="px-5 py-4 text-left text-sm font-bold text-gray-600 dark:text-gray-300">
                  Role
                </th>

                <th className="px-5 py-4 text-left text-sm font-bold text-gray-600 dark:text-gray-300">
                  Point
                </th>

                <th className="px-5 py-4 text-left text-sm font-bold text-gray-600 dark:text-gray-300">
                  Rank
                </th>

                <th className="px-5 py-4 text-left text-sm font-bold text-gray-600 dark:text-gray-300">
                  Status
                </th>

                <th className="px-5 py-4 text-left text-sm font-bold text-gray-600 dark:text-gray-300">
                  Create At
                </th>

                <th className="px-5 py-4 text-center text-sm font-bold text-gray-600 dark:text-gray-300">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredAccounts.map((account) => (
                <tr
                  key={account.id}
                  className="border-b border-gray-100 transition hover:bg-gray-50 dark:border-white/5 dark:hover:bg-white/5"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={account.image}
                        alt={account.firstName}
                        className="h-12 w-12 rounded-full object-cover"
                      />

                      <div>
                        <p className="font-bold text-navy-700 dark:text-white">
                          {account.firstName} {account.lastName}
                        </p>

                        <p className="text-sm text-gray-500">
                          ID: #{account.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600 dark:text-gray-300">
                    {account.email}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        account.role === "ADMIN"
                          ? "bg-red-100 text-red-600"
                          : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      {account.role}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-sm font-semibold text-navy-700 dark:text-white">
                    {account.point}
                  </td>

                  <td className="px-5 py-4">
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-600">
                      {account.rank}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <Switch checked={account.isActive} readOnly />

                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {account.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600 dark:text-gray-300">
                    {new Date(account.createAt).toLocaleDateString()}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={() => handleEdit(account)}
                        className="rounded-lg bg-yellow-400 p-2 text-white transition hover:opacity-80"
                      >
                        <MdEdit className="text-lg" />
                      </button>

                      <button
                        onClick={() => handleDelete(account.id)}
                        className="rounded-lg bg-red-500 p-2 text-white transition hover:opacity-80"
                      >
                        <MdDelete className="text-lg" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <Card extra="w-full max-w-3xl p-6">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-navy-700 dark:text-white">
                {editingAccount ? "Edit Account" : "Add Account"}
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
                <Label htmlFor="firstName" text="First Name" required />

                <input
                  id="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      firstName: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-brand-500 dark:border-white/10 dark:bg-navy-800 dark:text-white"
                />
              </div>

              <div>
                <Label htmlFor="lastName" text="Last Name" required />

                <input
                  id="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      lastName: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-brand-500 dark:border-white/10 dark:bg-navy-800 dark:text-white"
                />
              </div>

              <div>
                <Label htmlFor="email" text="Email" required />

                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-brand-500 dark:border-white/10 dark:bg-navy-800 dark:text-white"
                />
              </div>

              <div>
                <Label htmlFor="password" text="Password" required />

                <input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      password: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-brand-500 dark:border-white/10 dark:bg-navy-800 dark:text-white"
                />
              </div>

              <div>
                <Label htmlFor="image" text="Avatar URL" />

                <input
                  id="image"
                  type="text"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      image: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-brand-500 dark:border-white/10 dark:bg-navy-800 dark:text-white"
                />
              </div>

              <div>
                <Label htmlFor="point" text="Point" />

                <input
                  id="point"
                  type="number"
                  value={formData.point}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      point: Number(e.target.value),
                    })
                  }
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-brand-500 dark:border-white/10 dark:bg-navy-800 dark:text-white"
                />
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between rounded-xl border border-gray-200 p-4 dark:border-white/10">
              <div>
                <h4 className="font-bold text-navy-700 dark:text-white">
                  Account Active
                </h4>

                <p className="text-sm text-gray-500">
                  Bật/tắt trạng thái hoạt động
                </p>
              </div>

              <Switch
                checked={formData.isActive}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    isActive: e.target.checked,
                  })
                }
              />
            </div>

            <div className="mt-8 flex justify-end gap-3">
              <button
                onClick={() => setOpenModal(false)}
                className="rounded-xl border border-gray-300 px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-100 dark:border-white/10 dark:text-white dark:hover:bg-white/10"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="rounded-xl bg-brand-500 px-5 py-3 font-semibold text-white transition hover:opacity-90"
              >
                {editingAccount ? "Update" : "Create"}
              </button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AccountPage;
