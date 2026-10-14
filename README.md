# Thiệp cưới online chủ đề Hoa Sen (ReactJS)

## Chạy website
1. Cài Node.js bản LTS.
2. Giải nén thư mục dự án.
3. Mở terminal trong thư mục `thiep-cuoi-hoa-sen`.
4. Chạy:
   ```bash
   npm install
   npm run dev
   ```
5. Mở địa chỉ localhost mà Vite hiển thị.

## Các phần đã có
- Trang mở thiệp, ảnh bìa, hiệu ứng cánh hoa rơi.
- Nhạc nền (thêm file `nhac-nen.mp3` vào thư mục `public`).
- Thông tin cô dâu chú rể, lời mời, gia đình hai bên.
- Chuyện tình yêu, album ảnh có lightbox.
- Đồng hồ đếm ngược ngày cưới.
- Ngày giờ, địa điểm và nút mở Google Maps.
- Form RSVP, lời chúc được lưu trong localStorage của trình duyệt.
- Khu vực mừng cưới, nút sao chép số tài khoản.
- Responsive cho điện thoại và máy tính.

## Cần sửa trước khi sử dụng thật
Mở `src/App.jsx`, chỉnh object `WEDDING` ở đầu file:
- Tên cô dâu, chú rể.
- Ngày giờ, địa chỉ, tên địa điểm, link bản đồ.
- Tên ngân hàng, số tài khoản, chủ tài khoản, nội dung chuyển khoản.
- Thay ảnh trong mảng `photos` và các URL ảnh bìa bằng ảnh cưới thật.
- Thay khung QR minh họa bằng ảnh QR chuyển khoản thật.
- Sửa thông tin cha mẹ, ngày âm lịch, giờ đón khách/khai tiệc.
- Đặt file nhạc hợp pháp tên `nhac-nen.mp3` vào `public`.

## Lưu ý dữ liệu
Đây là frontend demo. RSVP và lời chúc chỉ lưu ở trình duyệt hiện tại, không tự gửi cho chủ thiệp và không đồng bộ giữa thiết bị. Để thu thập phản hồi thật, hãy kết nối Firebase/Supabase hoặc backend API.
