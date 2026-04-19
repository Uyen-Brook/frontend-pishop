import { Link } from "react-router-dom";
import { 
    FaFacebook, 
    FaEnvelope, 
    FaPhoneAlt, 
    FaMapMarkerAlt,
    FaBook,
    FaShieldAlt,
    FaBookOpen,
    FaHeadset,
    FaTruck,
    FaRegNewspaper,
} from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";
import { ROUTES } from "../../../../config/routes";
import "./Footer.css";

export default function Footer() {
    return (
        <footer className="footer-container">
            <div className="footer-content">
                <h3 className="footer-title">THÔNG TIN VỀ SHOP</h3>
                <ul className="footer-list">
                    <li className="icon-text">
                        <FaMapMarkerAlt className="icon" />
                        <a href="https://www.google.com/maps?q=298+Cầu+Diễn+Bắc+Từ+Liêm" target="_blank" rel="noreferrer">
                            Số 298 Đ.Cầu Diễn, Minh Khai, Bắc Từ Liêm, Hà Nội
                        </a>
                    </li>

                    <li className="icon-text">
                        <FaEnvelope className="icon" />
                        <span>Email: manpibrook@gmail.com</span>
                    </li>

                    <li className="icon-text">
                        <FaPhoneAlt className="icon" />
                        <span>Hotline: 0968366940</span>
                    </li>
                    <li className="social-section">
                        <p>Kết nối với chúng tôi</p>
                        <div className="social-icons">
                            <a href="#"><FaFacebook className="fb-icon" /></a>
                            <a href="#"><FaEnvelope className="mail-icon" /></a>
                            <a href="#"><AiFillTikTok size={28} className="tiktok-icon" /></a>
                        </div>
                    </li>
                </ul>
            </div>
            <div className="footer-content">
            <h3 className="footer-title">CHÍNH SÁCH CỦA CỬA HÀNG</h3>
            <ul className="footer-list">
                <li className="icon-text">
                    <FaBook className="icon" />
                    <Link to={ROUTES.ABOUT}>Về chúng tôi</Link>
                </li>
                <li className="icon-text">
                    <FaShieldAlt className="icon" />
                    <Link to={ROUTES.RETURN_POLICY}>Chính sách đổi trả</Link>
                </li>

                <li className="icon-text">
                    <FaBookOpen className="icon" />
                    <span>Hướng dẫn thanh toán</span>
                </li>
                <li className="icon-text">
                    <FaHeadset className="icon" />
                    <span>Chăm sóc khách hàng</span>
                </li>
                <li className="icon-text">
                    <FaTruck className="icon" />
                    <span>Phương thức vận chuyển</span>
                </li>
            </ul>
        </div>
        <div className="footer-content">
            <h3 className="footer-title">TIN TỨC</h3>
            <ul className="footer-list">
                <li className="icon-text">
                    <FaRegNewspaper className="icon" />
                    <a href="">Sản phẩm mới</a>
                </li>
                <li className="icon-text">
                    <FaShieldAlt className="icon"/>
                    <span>Sản phẩm nổi bật năm nay</span>
                </li>

                <li className="icon-text">
                    <FaBookOpen className="icon" />
                    <span>Tin tức</span>
                </li>
            </ul>
        </div>
         <div className="footer-content">
            <h3 className="footer-title">CHỨNG CHỈ</h3>
            <ul className="footer-list">
                <li className="icon-text">
                    Chấp nhận thanh toán qua
                </li>
                <li>
                    <img src="/vnpay.png"></img>
                </li>
            </ul>
        </div>
        </footer>
    );
}