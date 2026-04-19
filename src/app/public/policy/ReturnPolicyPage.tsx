import React from "react";
import "./ReturnPolicyPage.css";

export default function ReturnPolicyPage() {
  return (
    <div className="margin-auto">
      {/* Hero Section */}
      <section className="policy-hero">
        <div className="policy-hero-content">
          <h1>Chính Sách Đổi Trả Hàng</h1>
          <p>Bảo vệ quyền lợi khách hàng là ưu tiên hàng đầu của chúng tôi</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="policy-container">
        {/* Quick Summary */}
        <div className="policy-summary">
          <h2>Tóm Tắt Chính Sách</h2>
          <div className="summary-grid">
            <div className="summary-card">
              <div className="summary-icon">⏱️</div>
              <h4>Thời Gian Đổi Trả</h4>
              <p>Trong 30 ngày kể từ ngày mua hàng</p>
            </div>
            <div className="summary-card">
              <div className="summary-icon">📋</div>
              <h4>Điều Kiện</h4>
              <p>Sản phẩm nguyên seal, chưa sử dụng</p>
            </div>
            <div className="summary-card">
              <div className="summary-icon">🆓</div>
              <h4>Chi Phí</h4>
              <p>Hoàn toàn miễn phí không phát sinh</p>
            </div>
            <div className="summary-card">
              <div className="summary-icon">⚡</div>
              <h4>Thời Gian Xử Lý</h4>
              <p>Giải quyết trong 24 giờ làm việc</p>
            </div>
          </div>
        </div>

        {/* Detailed Policy */}
        <div className="policy-section">
          <h2>1. Phạm Vi Đổi, Trả Hàng</h2>
          <div className="policy-content">
            <h4>1.1 Sản phẩm có thể đổi/trả:</h4>
            <ul>
              <li>Sản phẩm lỗi do nhà sản xuất (pin không sạc, màn hình bị mờ, nút bấm không hoạt động...)</li>
              <li>Sản phẩm bị hư hỏng do quá trình vận chuyển</li>
              <li>Sản phẩm bị giao nhầm hoặc giao thiếu</li>
              <li>Sản phẩm không đúng với thông tin quảng cáo</li>
              <li>Sản phẩm bị nước vào, bị rơi nhưng vẫn trong vòng bảo hành (nếu có)</li>
            </ul>

            <h4>1.2 Điều kiện đổi/trả (KHÔNG lỗi):</h4>
            <ul>
              <li>Sản phẩm chưa sử dụng, nguyên seal, nguyên hộp</li>
              <li>Còn đầy đủ phụ kiện kèm theo ban đầu</li>
              <li>Hóa đơn hoặc giấy tờ giao dịch còn hạn 30 ngày</li>
              <li>Sản phẩm không có dấu hiệu sử dụng (không bị trầy xước, bị bẩn...)</li>
            </ul>

            <h4>1.3 Sản phẩm KHÔNG được đổi/trả:</h4>
            <ul>
              <li>Sản phẩm đã sử dụng hoặc tháo seal</li>
              <li>Sản phẩm bị trầy xước, cấn, bựa do sử dụng</li>
              <li>Quá 30 ngày kể từ ngày mua hàng</li>
              <li>Không có hóa đơn hoặc không tìm được chứng minh giao dịch</li>
              <li>Sản phẩm bị nước xâm nhập (trừ sản phẩm có chế độ chống nước)</li>
              <li>Sản phẩm bị thay pin, thay linh kiện</li>
              <li>Sản phẩm bị rơi từ độ cao cao gây hỏng hóc</li>
            </ul>
          </div>
        </div>

        {/* Warranty */}
        <div className="policy-section">
          <h2>2. Chính Sách Bảo Hành</h2>
          <div className="policy-content">
            <h4>2.1 Thời gian bảo hành:</h4>
            <ul>
              <li><strong>Laptop & PC:</strong> 12 tháng tính từ ngày mua</li>
              <li><strong>Điện thoại & Tablet:</strong> 12 tháng tính từ ngày mua</li>
              <li><strong>Tai nghe & Loa:</strong> 12 tháng tính từ ngày mua</li>
              <li><strong>Phụ kiện:</strong> 6 tháng hoặc theo quy định nhà sản xuất</li>
            </ul>

            <h4>2.2 Điều kiện bảo hành:</h4>
            <ul>
              <li>Sản phẩm còn trong thời hạn bảo hành</li>
              <li>Lỗi không phải do sử dụng sai cách hoặc tai nạn</li>
              <li>Còn seal, không tháo máy, không sửa chữa ngoài hãng</li>
            </ul>

            <h4>2.3 Quá trình bảo hành:</h4>
            <ul>
              <li>Khách hàng mang sản phẩm đến cửa hàng hoặc gửi qua đường bưu điện</li>
              <li>Phòng kỹ thuật kiểm tra và đánh giá lỗi (3-5 ngày làm việc)</li>
              <li>Sửa chữa hoặc thay mới nếu không sửa được (7-10 ngày làm việc)</li>
              <li>Trả sản phẩm về cho khách hàng</li>
            </ul>
          </div>
        </div>

        {/* Refund */}
        <div className="policy-section">
          <h2>3. Chính Sách Hoàn Tiền</h2>
          <div className="policy-content">
            <h4>3.1 Điều kiện hoàn tiền:</h4>
            <ul>
              <li>Sản phẩm lỗi không thể sửa chữa</li>
              <li>PPC yêu cầu hoàn tiền sau 30 ngày (khi không còn điều kiện đổi)</li>
              <li>Sản phẩm giao nhầm, giao thiếu</li>
            </ul>

            <h4>3.2 Mức hoàn tiền:</h4>
            <ul>
              <li>100% giá tiền sản phẩm (nếu lỗi nhà sản xuất hoặc lỗi cửa hàng)</li>
              <li>90% giá tiền sản phẩm (nếu khách hàng muốn hoàn tiền sau 30 ngày)</li>
              <li>Không hoàn tiền các chi phí phụ như ship, cài đặt, bảo hành mở rộng</li>
            </ul>

            <h4>3.3 Hình thức hoàn tiền:</h4>
            <ul>
              <li>Chuyển khoản ngân hàng (5-7 ngày làm việc)</li>
              <li>Hoàn tiền qua ví điện tử (1-3 ngày làm việc)</li>
              <li>Tiền mặt tại cửa hàng (ngay lập tức)</li>
            </ul>
          </div>
        </div>

        {/* Process */}
        <div className="policy-section">
          <h2>4. Quy Trình Đổi, Trả, Hoàn Tiền</h2>
          <div className="process-steps">
            <div className="step">
              <div className="step-number">1</div>
              <h4>Liên Hệ & Xác Nhận</h4>
              <p>Gọi hotline hoặc đến cửa hàng để thông báo ý định đổi/trả, cung cấp thông tin sản phẩm</p>
            </div>

            <div className="step">
              <div className="step-number">2</div>
              <h4>Mang/Gửi Sản Phẩm</h4>
              <p>Mang sản phẩm nguyên seal, nguyên hộp + hóa đơn đến cửa hàng hoặc gửi qua bưu điện</p>
            </div>

            <div className="step">
              <div className="step-number">3</div>
              <h4>Kiểm Tra & Đánh Giá</h4>
              <p>Nhân viên kiểm tra tình trạng sản phẩm và điều kiện đổi/trả (24h)</p>
            </div>

            <div className="step">
              <div className="step-number">4</div>
              <h4>Xử Lý Yêu Cầu</h4>
              <p>Đổi sản phẩm mới, trả hàng hoặc hoàn tiền tùy theo yêu cầu và điều kiện</p>
            </div>

            <div className="step">
              <div className="step-number">5</div>
              <h4>Hoàn Tất Và Xác Nhận</h4>
              <p>Cấp phiếu xác nhận hoàn tất quá trình, hướng dẫn tiếp theo nếu cần</p>
            </div>
          </div>
        </div>

        {/* Special Cases */}
        <div className="policy-section">
          <h2>5. Các Trường Hợp Đặc Biệt</h2>
          <div className="policy-content">
            <h4>5.1 Sản phẩm bị nước vào:</h4>
            <ul>
              <li>Nếu sản phẩm có chế độ chống nước (IP rating): được bảo hành</li>
              <li>Nếu sản phẩm không chống nước: không được bảo hành, có thể sửa chữa với chi phí</li>
            </ul>

            <h4>5.2 Sản phẩm bị vỡ/hư hỏng ngoài:</h4>
            <ul>
              <li>Do lỗi vận chuyển: được đổi/trả hoàn toàn</li>
              <li>Do khách hàng rơi/va đập: không được đổi/trả, có thể sửa chữa với chi phí</li>
            </ul>

            <h4>5.3 Sản phẩm bị khóa:</h4>
            <ul>
              <li>Điện thoại bị khóa iCloud/Google: không được đổi/trả, khách hàng cần phải mở khóa</li>
              <li>Cửa hàng hỗ trợ mở khóa với chi phí (nếu khách hàng quên mật khẩu)</li>
            </ul>

            <h4>5.4 Linh kiện riêng lẻ:</h4>
            <ul>
              <li>Sạc, cáp, bao da: đổi/trả trong 7 ngày nếu bị lỗi do nhà sản xuất</li>
              <li>Pin, bàn phím, chuột: đổi/trả trong 30 ngày nếu chưa sử dụng</li>
            </ul>
          </div>
        </div>

        {/* Contact */}
        <div className="policy-section">
          <h2>6. Liên Hệ & Hỗ Trợ</h2>
          <div className="policy-content">
            <h4>Nếu có thắc mắc về chính sách đổi trả, vui lòng liên hệ:</h4>
            <div className="contact-box">
              <p><strong>📞 Hotline:</strong> 0909 123 456 (Zalo/Viber)</p>
              <p><strong>📧 Email:</strong> support@pishop.vn</p>
              <p><strong>🏪 Cửa hàng:</strong> 123 Đường Lê Hồng Phong, Thái Nguyên</p>
              <p><strong>⏰ Giờ hỗ trợ:</strong> 8:00 - 21:00 (Thứ 2 - Chủ Nhật)</p>
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <div className="policy-section">
          <div className="important-box">
            <h3>⚠️ Lưu Ý Quan Trọng</h3>
            <ul>
              <li>Tất cả thời gian tính toán là ngày làm việc (không tính lễ, tết, cuối tuần)</li>
              <li>PiShop bảo lưu quyền từ chối đổi/trả những sản phẩm không đúng điều kiện</li>
              <li>Chính sách có thể thay đổi mà không cần thông báo trước, vui lòng kiểm tra lại thường xuyên</li>
              <li>Trong trường hợp tranh chấp, PiShop sẽ giải quyết theo luật pháp Việt Nam</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="policy-faq">
        <div className="faq-container">
          <h2>Câu Hỏi Thường Gặp</h2>
          <div className="faq-list">
            <div className="faq-item">
              <input type="checkbox" id="faq1" className="faq-checkbox" />
              <label htmlFor="faq1" className="faq-question">
                ❓ Có được đổi sản phẩm nếu không thích nhưng chưa tháo seal?
              </label>
              <div className="faq-answer">
                Được. Miễn là sản phẩm chưa sử dụng, nguyên seal, nguyên hộp và còn chứng minh giao dịch trong 30 ngày, 
                bạn có thể đổi sang sản phẩm khác cùng giá trị hoặc chênh lệch.
              </div>
            </div>

            <div className="faq-item">
              <input type="checkbox" id="faq2" className="faq-checkbox" />
              <label htmlFor="faq2" className="faq-question">
                ❓ Làm sao nếu lỡ tháo seal để kiểm tra pin?
              </label>
              <div className="faq-answer">
                Nếu tháo seal để kiểm tra lần đầu và sản phẩm không có vấn đề, bạn vẫn có thể đổi nhưng 
                sẽ được công khai với người mua mới (thường có mức giảm giá nhỏ).
              </div>
            </div>

            <div className="faq-item">
              <input type="checkbox" id="faq3" className="faq-checkbox" />
              <label htmlFor="faq3" className="faq-question">
                ❓ Có phải trả phí để đổi hàng?
              </label>
              <div className="faq-answer">
                Hoàn toàn KHÔNG. Nếu đổi sang sản phẩm cùng giá, hoàn toàn miễn phí. 
                Nếu chênh lệch giá, bạn chỉ cần bổ sung chênh lệch đó mà không có chi phí khác.
              </div>
            </div>

            <div className="faq-item">
              <input type="checkbox" id="faq4" className="faq-checkbox" />
              <label htmlFor="faq4" className="faq-question">
                ❓ Nếu bảo hành thì có được đổi lại sản phẩm mới không?
              </label>
              <div className="faq-answer">
                Nếu sản phẩm lỗi nhà sản xuất và không thể sửa chữa được, bạn sẽ được đổi sản phẩm mới. 
                Nếu sửa được thì sẽ sửa và trả lại trong thời hạn bảo hành.
              </div>
            </div>

            <div className="faq-item">
              <input type="checkbox" id="faq5" className="faq-checkbox" />
              <label htmlFor="faq5" className="faq-question">
                ❓ Tôi mua online có được đổi/trả không?
              </label>
              <div className="faq-answer">
                Có. Khách hàng mua online có đủ quyền đổi/trả như mua tại cửa hàng. 
                Bạn có thể gửi hàng về cửa hàng hoặc sử dụng dịch vụ giao nhận của chúng tôi.
              </div>
            </div>

            <div className="faq-item">
              <input type="checkbox" id="faq6" className="faq-checkbox" />
              <label htmlFor="faq6" className="faq-question">
                ❓ Sau khi bảo hành hết hạn có được đổi sản phẩm lỗi không?
              </label>
              <div className="faq-answer">
                Nếu sản phẩm bị lỗi nhà sản xuất (ví dụ pin không sạc, main die...), 
                bạn vẫn có thể được hỗ trợ sửa chữa với chi phí thành phần + công nhân. 
                Không được đổi mới khi hết hạn bảo hành.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
