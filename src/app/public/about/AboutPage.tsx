import React from "react";
import "./AboutPage.css";

export default function AboutPage() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <h1>Về PiShop</h1>
          <p>Nơi tin cậy cho mọi nhu cầu điện tử của bạn</p>
        </div>
      </section>

      {/* Company Info */}
      <section className="about-container">
        <div className="about-section">
          <h2>Giới thiệu PiShop</h2>
          <p>
            <strong>PiShop</strong> là cửa hàng bán lẻ thiết bị điện tử hàng đầu tại Thái Nguyên, Việt Nam. 
            Chúng tôi cam kết cung cấp những sản phẩm chính hãng, chất lượng cao với giá cạnh tranh nhất trên thị trường.
          </p>
          <p>
            Với hơn <strong>10 năm kinh nghiệm</strong> trong ngành bán lẻ điện tử, PiShop đã xây dựng được 
            mối quan hệ tin tưởng với hàng nghìn khách hàng trên khắp Thái Nguyên và các tỉnh lân cận.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="about-grid">
          <div className="about-card">
            <div className="card-icon">🎯</div>
            <h3>Sứ Mệnh</h3>
            <p>
              Mang công nghệ hàng đầu thế giới đến tay mỗi khách hàng Việt Nam 
              với mức giá hợp lý và dịch vụ hàng đầu.
            </p>
          </div>

          <div className="about-card">
            <div className="card-icon">👁️</div>
            <h3>Tầm Nhìn</h3>
            <p>
              Trở thành chuỗi bán lẻ điện tử lớn nhất và được yêu thích nhất 
              tại Thái Nguyên, mang lại giá trị tốt nhất cho khách hàng.
            </p>
          </div>

          <div className="about-card">
            <div className="card-icon">💎</div>
            <h3>Giá Trị Cốt Lõi</h3>
            <p>
              Chúng tôi tin vào sự chính trực, chất lượng, và sự hài lòng của khách hàng 
              là ưu tiên hàng đầu trong mọi hoạt động.
            </p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="about-section" style={{ marginTop: "60px" }}>
          <h2>Tại Sao Chọn PiShop?</h2>
          <div className="features-list">
            <div className="feature-item">
              <div className="feature-number">1</div>
              <h4>Sản Phẩm Chính Hãng</h4>
              <p>Tất cả sản phẩm đều là hàng chính hãng 100%, có bảo hành chính thức từ nhà sản xuất.</p>
            </div>

            <div className="feature-item">
              <div className="feature-number">2</div>
              <h4>Giá Cạnh Tranh</h4>
              <p>Cam kết giá tốt nhất thị trường. Nếu tìm được giá rẻ hơn, chúng tôi sẽ giảm giá tương ứng.</p>
            </div>

            <div className="feature-item">
              <div className="feature-number">3</div>
              <h4>Dịch Vụ Sau Bán Hàng Tuyệt Vời</h4>
              <p>Hỗ trợ tận tình trước và sau mua hàng, giải quyết mọi vấn đề nhanh chóng và hiệu quả.</p>
            </div>

            <div className="feature-item">
              <div className="feature-number">4</div>
              <h4>Chính Sách Đổi Trả Thoải Mái</h4>
              <p>Quy trình đổi trả đơn giản, nhanh chóng với điều kiện cực kỳ thuận lợi cho khách hàng.</p>
            </div>

            <div className="feature-item">
              <div className="feature-number">5</div>
              <h4>Giao Hàng Nhanh</h4>
              <p>Hỗ trợ giao hàng tận nơi miễn phí cho các đơn hàng trong nội thành Thái Nguyên.</p>
            </div>

            <div className="feature-item">
              <div className="feature-number">6</div>
              <h4>Khuyến Mãi Hấp Dẫn</h4>
              <p>Các chương trình khuyến mãi, sale lớn thường xuyên với mức giảm giá hấp dẫn.</p>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="about-section" style={{ marginTop: "60px" }}>
          <h2>Thông Tin Liên Hệ</h2>
          <div className="contact-info">
            <div className="contact-item">
              <h4>📍 Địa Chỉ Cửa Hàng</h4>
              <p>123 Đường Lê Hồng Phong, Thái Nguyên, Việt Nam</p>
            </div>

            <div className="contact-item">
              <h4>☎️ Hotline Tư Vấn</h4>
              <p><strong>0909 123 456</strong> (Zalo/Viber)</p>
            </div>

            <div className="contact-item">
              <h4>📧 Email</h4>
              <p><strong>support@pishop.vn</strong></p>
            </div>

            <div className="contact-item">
              <h4>⏰ Giờ Làm Việc</h4>
              <p>Thứ 2 - Chủ Nhật: 8:00 - 21:00</p>
              <p>Lễ, Tết: 9:00 - 20:00</p>
            </div>

            <div className="contact-item">
              <h4>🏪 Chi Nhánh</h4>
              <p>456 Đường Trần Phú, Thái Nguyên</p>
              <p>789 Đường Hoàng Văn Thụ, Thái Nguyên</p>
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="about-section" style={{ marginTop: "60px" }}>
          <h2>Đội Ngũ PiShop</h2>
          <p style={{ marginBottom: "30px" }}>
            Chúng tôi có đội ngũ nhân viên được đào tạo chuyên nghiệp, tâm huyết và am hiểu sâu sắc 
            về các sản phẩm điện tử. Mỗi nhân viên đều sẵn sàng giúp bạn tìm kiếm sản phẩm phù hợp nhất 
            với nhu cầu và ngân sách của mình.
          </p>
          <div className="team-stats">
            <div className="stat-box">
              <div className="stat-number">50+</div>
              <p>Nhân viên</p>
            </div>
            <div className="stat-box">
              <div className="stat-number">10+</div>
              <p>Năm kinh nghiệm</p>
            </div>
            <div className="stat-box">
              <div className="stat-number">100K+</div>
              <p>Khách hàng hài lòng</p>
            </div>
            <div className="stat-box">
              <div className="stat-number">1M+</div>
              <p>Sản phẩm bán ra</p>
            </div>
          </div>
        </div>

        {/* Partners */}
        <div className="about-section" style={{ marginTop: "60px" }}>
          <h2>Các Thương Hiệu Tin Cậy</h2>
          <p style={{ marginBottom: "30px" }}>
            PiShop là đại lý ủy quyền chính thức của các thương hiệu hàng đầu thế giới:
          </p>
          <div className="brands-grid">
            <div className="brand-box">🍎 Apple</div>
            <div className="brand-box">💻 Dell</div>
            <div className="brand-box">📱 Samsung</div>
            <div className="brand-box">🎮 Sony</div>
            <div className="brand-box">🖥️ ASUS</div>
            <div className="brand-box">🎧 Logitech</div>
            <div className="brand-box">📡 TP-Link</div>
            <div className="brand-box">⌚ Xiaomi</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <h2>Hãy Thăm Viếng PiShop Hôm Nay!</h2>
        <p>Khám phá hàng ngàn sản phẩm điện tử chính hãng với giá tốt nhất</p>
        <button className="cta-button">Mua Sắm Ngay</button>
      </section>
    </div>
  );
}
