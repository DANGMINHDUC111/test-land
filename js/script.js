// script.js

document.addEventListener('DOMContentLoaded', () => {
    /* =========================
       MODAL TOGGLE LOGIC
       ========================= */
    const modal = document.getElementById('contactModal');
    const openBtns = document.querySelectorAll('.open-modal-btn'); // Các nút mở Modal
    const closeBtn = document.getElementById('closeModalBtn');

    // Mở Modal cho tất cả các nút
    openBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('active');
        });
    });

    // Đóng Modal bằng nút X
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }

    // Đóng Modal khi click bên ngoài khung form (vùng đen)
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    /* =========================
       FORM SUBMISSION TO GOOGLE SHEETS
       ========================= */
    // ĐÂY LÀ ĐƯỜNG LINK WEB APP GOOGLE SCRIPT CỦA BẠN (Cần cấu hình ở Google Sheets theo hướng dẫn)
    // Ghi chú: Đừng quên dán link thật vào đây khi bạn đã deploy script.
    const GOOGLE_SCRIPT_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbwzr4vAjXv8WfPXsNZCTqGRfpcsA6D47aUNZsskxW5XepKFESZlfXyZLadg5QiHbWxk/exec';

    const form = document.getElementById('leadForm');
    const btnText = document.getElementById('btnText');
    const btnLoader = document.getElementById('btnLoader');
    const formSuccess = document.getElementById('formSuccess');
    const submitBtn = form.querySelector('.form-submit-btn');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault(); // Ngăn trình duyệt tự load lại trang

            // Nếu bạn CHƯA thay link Google Script thật, báo lỗi giúp bạn nhận ra
            if (GOOGLE_SCRIPT_WEB_APP_URL === 'YOUR_GOOGLE_SCRIPT_URL_HERE') {
                console.log("Dữ liệu thử nghiệm:", new FormData(form));
                return;
            }

            // Hiển thị trạng thái đang tải
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';
            btnText.style.display = 'none';
            btnLoader.style.display = 'inline';
            formSuccess.style.display = 'none';

            // FormData sẽ tự động thu thập TẤT CẢ các thẻ input/textarea có thuộc tính name (Tên, SoDienThoai, Email, Noidung)
            const formData = new FormData(form);

            try {
                // 1. Gửi form ngầm dưới nền (Fire-and-forget)
                // KHÔNG dùng 'await' ở đây để giao diện bỏ qua lúc chờ đợi máy chủ Google quét.
                fetch(GOOGLE_SCRIPT_WEB_APP_URL, {
                    method: 'POST',
                    body: formData,
                    mode: 'no-cors' // Bỏ qua CORS
                }).catch(err => console.error("Lỗi ngầm:", err));

                // 2. Chuyển thông báo thành công NGAY LẬP TỨC (Trải nghiệm cực mượt)
                form.reset();
                form.style.display = 'none';
                formSuccess.style.display = 'block';

            } catch (error) {
                console.error('Lỗi khi gửi form:', error);
                alert('Có lỗi xảy ra khi kết nối máy chủ. Vui lòng thử lại sau hoặc gọi qua Zalo!');
            } finally {
                // Khôi phục nút
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
                btnText.style.display = 'inline';
                btnLoader.style.display = 'none';
            }
        });
    }
});
