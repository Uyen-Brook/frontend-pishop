import { useState, useEffect } from "react";
import { orderService, Order } from "../../../../service/user/orderService";
import { OrderStatusLabel, OrderStatus } from "../../../../types";

export default function ProfileOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = await orderService.getUserOrders();
      setOrders(data);
    } catch (err) {
      console.error("Lỗi load đơn hàng", err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-700";
      case "CONFIRMED":
        return "bg-blue-100 text-blue-700";
      case "PROCESSING":
        return "bg-purple-100 text-purple-700";
      case "PREPARING":
        return "bg-cyan-100 text-cyan-700";
      case "SHIPPING":
        return "bg-orange-100 text-orange-700";
      case "DELIVERED":
        return "bg-green-100 text-green-700";
      case "COMPLETED":
        return "bg-emerald-100 text-emerald-700";
      case "CANCELLED":
        return "bg-red-100 text-red-700";
      case "RETURNED":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusText = (status: string) => {
    if (status in OrderStatusLabel) {
      return OrderStatusLabel[status as OrderStatus];
    }
    return status;
  };

  const canCancel = (status: string) => {
    return status === "PENDING" || status === "CONFIRMED";
  };

  const handleCancelOrder = async (orderId: number) => {
    if (!confirm("Bạn có chắc muốn hủy đơn hàng này?")) return;

    try {
      const success = await orderService.cancelOrder(orderId);
      if (success) {
        alert("Đã hủy đơn hàng thành công!");
        loadOrders();
      } else {
        alert("Hủy đơn hàng thất bại");
      }
    } catch (err) {
      console.error("Lỗi hủy đơn hàng", err);
      alert("Có lỗi xảy ra khi hủy đơn hàng");
    }
  };

  if (loading) {
    return <div className="text-center py-8">Đang tải...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Đơn hàng của tôi</h2>

      {orders.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-500">Bạn chưa có đơn hàng nào.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 flex justify-between items-center">
                <div>
                  <span className="font-semibold">Mã đơn: #{order.id}</span>
                  <span className="text-gray-500 text-sm ml-4">
                    Ngày đặt: {new Date(order.createdAt).toLocaleDateString("vi-VN")}
                  </span>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(order.status)}`}>
                  {getStatusText(order.status)}
                </span>
              </div>

              <div className="p-4">
                {order.items?.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image || "https://via.placeholder.com/60"}
                        alt={item.productName}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <p className="font-medium">{item.productName}</p>
                        <p className="text-gray-500 text-sm">x{item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-semibold text-red-500">
                      {item.price?.toLocaleString("vi-VN")}đ
                    </span>
                  </div>
                ))}

                <div className="flex justify-between items-center mt-4 pt-4 border-t">
                  <span className="text-gray-600">Tổng cộng:</span>
                  <span className="text-xl font-semibold text-red-500">
                    {order.totalAmount?.toLocaleString("vi-VN")}đ
                  </span>
                </div>

                {canCancel(order.status) && (
                  <div className="mt-4 pt-4 border-t">
                    <button
                      onClick={() => handleCancelOrder(order.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Hủy đơn hàng
                    </button>
                  </div>
                )}

                {order.status === "COMPLETED" && (
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm text-green-600">
                      Đơn hàng đã hoàn thành - Không thể hủy/hoàn trả
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}