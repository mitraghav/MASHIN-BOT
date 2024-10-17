Notification !
Lưu Ý! Đây Là Sản Phẩm Được Hokai Remake ( Chính Bởi Facebook-Chat-Api Của Schmavery, Tác Giả Không Chịu Trách Nghiệm Nào ! ), Nếu Có Lỗi Hãy Thử Sử Dụng Sang Sản Phẩm Khác !

Support For :
Support English, VietNamese !,
All bot if using listenMqtt first.
Api Cho ChatBot Messenger
Facebook Đã Có Và Cho Người Dùng Tạo Api Cho Chatbots 😪 Tại Đey => Đây Nè.

Api Này Có Thể Khiến Cho Bạn Payy Acc Như Cách Acc Bạn Chưa Từng Có, Hãy Chú Ý Nhé =))
Lưu Ý ! Nếu Bạn Muốn Sài Api Này Hãy Xem Document Tại Đây Nè.

Tải Về
Nếu Bạn Muốn Sử Dụng, Hãy Tải Nó Bằng Cách:

npm i fca-hokai-remake
or

npm install fca-hokai-remake
Nó Sẽ Tải Vô node_modules (Lib Của Bạn) - Lưu Ý Replit Sẽ Không Hiện Đâu Mà Tìm 😪

Tải Bản Mới Nhất Hoặc Update
Nếu Bạn Muốn Sử Dụng Phiên Bản Mới Nhất Hay Cập Nhật Thì Hãy Vô Terminal Hoặc Command Promt Nhập :

npm install fca-hokai-remake@latest
Hoặc

npm i fca-hokai-remake@latest
Nếu Bạn Muốn Test Api
Lợi Ích Cho Việc Này Thì Bạn Sẽ Không Tốn Thời Gian Pay Acc Và Có Acc 😪 Hãy Sử Dụng Với Tài Khoản Thử Nghiệm => Facebook Whitehat Accounts.

Cách Sử Dụng
const login = require("fca-hokai-remake"); // lấy từ lib ra 

// đăng nhập
login({email: "Gmail Account", password: "Mật Khẩu Facebook Của Bạn"}, (err, api) => {

    if(err) return console.error(err); // trường hợp lỗi

    // tạo bot tự động nhái theo bạn:
    api.listenMqtt((err, message) => {
        api.sendMessage(message.body, message.threadID);
    });

});
Kết Quả Là Nó Sẽ Nhái Bạn Như Hình Dưới: screen shot 2016-11-04 at 14 36 00

Nếu Bạn Muốn Sử Dụng Nâng Cao Thì Hãy Sử Dụng Các Loại Bot Được Liệt Kê Ở Trên !

Danh Sách
Bạn Có Thể Đọc Full Api Tại => here.

Cài Đặt Cho Mirai:
Bạn Cần Vô File Mirai.js,Sau Đó Tìm Đến Dòng

    var login = require('tùy bot'); 
    /* Có thể là :
        var login = require('@maihuybao/fca-Unofficial');
        var login = require('fca-xuyen-get');
        var login = require('fca-unofficial-force');
        var login = require('fca-horizon-remake'):
    ...   
    */
Và Thay Nó Bằng:

    var login = require('fca-hokai-remake')
Sau Đó Thì Chạy Bình Thường Thôi !

Tự Nghiên Cứu
Nếu Bạn Muốn Tự Nghiên Cứu Hoặc Tạo Bot Cho Riêng Bạn Thì Bạn Hãy Vô Cái Này Đọc Chức Năng Của Nó Và Cách Sử Dụng => Link

Lưu Lại Thông Tin Đăng Nhập.
Để Lưu Lại Thì Bạn Cần 1 Apstate Kiểu (Cookie, etc,..) Để Lưu Lại Hoặc Là Sử Dụng Mã Login Như Trên Để Đăng Nhập !

Và Chế Độ Này Đã Có Sẵn Trong 1 Số Bot Việt Nam Nên Bạn Cứ Yên Tâm Nhé !

Hướng Dẫn Với Appstate

const fs = require("fs");
const login = require("fca-hokai-remake");

var credentials = {email: "FB_EMAIL", password: "FB_PASSWORD"}; // thông tin tk

login(credentials, (err, api) => {
    if(err) return console.error(err);
    // đăng nhập
    fs.writeFileSync('appstate.json', JSON.stringify(api.getAppState(), null,'\t')); //tạo appstate
});
Hoặc Dễ Dàng Hơn ( Chuyên Nghiệp ) Bạn Có Thể Dùng => c3c-fbstate Để Lấy Fbstate And Rename Lại Thành Apstate Cũng Được ! (appstate.json)

FAQS
FAQS => Link

Fca-Hokai-Remake/README.md at main · RqzaX040/Fca-Hokai-Remake

