
const envelope = document.querySelector("#envelope");
const openButton = document.querySelector("#openButton");
const heartsContainer = document.querySelector("#hearts-container");
const photoBurst = document.querySelector("#photoBurst");
const bgm = document.getElementById("bgm");

let isOpened = false;

// =========================
// 1. DANH SÁCH ẢNH
// =========================

const photos = [
    "anh1.jpg",
    "anh2.jpg",
    "anh3.jpg",
    "anh4.jpg",
    "anh5.jpg",
    "anh6.jpg",
    "anh7.jpg",
    "anh8.jpg",
    "anh9.jpg",
    "anh10.jpg"
];

// =========================
// 2. VỊ TRÍ ẢNH
// =========================

const positions = [
    { x: -260, y: 120, rotation: -18 },
    { x: -200, y: 300, rotation: 8 },
    { x: -110, y: 200, rotation: -10 },
    { x: 110, y: 210, rotation: 12 },
    { x: 220, y: 150, rotation: -14 },
    { x: 260, y: 310, rotation: 10 },
    { x: -320, y: 350, rotation: -12 },
    { x: 330, y: 360, rotation: 14 },
    { x: -500, y: 220, rotation: -22 },
    { x: 500, y: 220, rotation: 22 }
];

// =========================
// 3. SỰ KIỆN NÚT BẤM
// =========================

openButton.addEventListener("click", function () {

    if (!isOpened) {

        // Mở phong bì
        envelope.classList.add("open");

        // Đổi nội dung nút
        openButton.textContent = "Send some love ♡";

        // Hiển thị ảnh
        showPhotos();

        if (bgm) {
            bgm.volume = 0.4;
            bgm.currentTime = 60;
            bgm.play().catch(() => {});
        }

        isOpened = true;

    } else {

        // Tạo trái tim
        createHearts();

    }

});

// =========================
// 4. HIỆU ỨNG ẢNH BAY
// =========================

function showPhotos() {

    const spread = window.innerWidth < 600 ? 0.55 : 1;

    photos.forEach(function (photo, index) {

        const frame = document.createElement("div");
        const image = document.createElement("img");

        frame.className = "memory-photo";

        if (index >= 8) {
            frame.style.width = "180px";
            frame.style.height = "230px";
            frame.style.padding = "12px 12px 32px";
        }

        image.src = photo;
        image.alt = "Ảnh kỷ niệm";

        // Kiểm tra ảnh
        image.onerror = function () {

            console.log("Không tìm thấy ảnh: " + photo);

            frame.remove();

        };

        // Lấy vị trí ảnh
        const position = positions[index];

        // Thiết lập hướng bay
        frame.style.setProperty(
            "--x",
            (position.x * spread) + "px"
        );

        frame.style.setProperty(
            "--y",
            position.y + "px"
        );

        frame.style.setProperty(
            "--rotation",
            position.rotation + "deg"
        );

        // Ảnh xuất hiện lần lượt
        frame.style.setProperty(
            "--delay",
            (index * 0.2) + "s"
        );

        frame.appendChild(image);

        photoBurst.appendChild(frame);

    });

}

// =========================
// 5. HIỆU ỨNG TRÁI TIM
// =========================

function createHearts(count = 15) {

    for (let i = 0; i < count; i++) {

        const heart = document.createElement("span");

        heart.className = "floating-heart";

        heart.textContent = "♥";

        heart.style.left = Math.random() * 100 + "vw";

        heart.style.animationDelay =
            Math.random() * 1.5 + "s";

        heartsContainer.appendChild(heart);

        // Xóa trái tim sau khi bay xong
        setTimeout(function () {

            heart.remove();

        }, 7000);

    }

}

createHearts();

window.setInterval(function () {

    createHearts(2);

}, 900);
// Tạo trái tim bay khi truy cập website
function createFlyingHeart() {
    const heart = document.createElement("span");

    heart.className = "floating-heart";
    heart.innerHTML = "♥";

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = (14 + Math.random() * 22) + "px";
    heart.style.animationDuration = (5 + Math.random() * 4) + "s";

    document.querySelector("#hearts-container").appendChild(heart);

    setTimeout(function () {
        heart.remove();
    }, 10000);
}

// Bắt đầu tạo trái tim ngay khi mở trang
setInterval(createFlyingHeart, 400);
// Nội dung lời chúc của từng hộp quà
const giftWishes = [
    "Hãy luôn cười mỗi ngày nhéee! 💗",

    "Wishing you the happiest of birthdays,dear O Nhi May all your dreams and wishes come true! 🌷",

    "Chúc Nhi luôn tự tin, mạnh mẽ và đạt được tất cả những ước mơ của mình. ✨",

    "Mong Nhi luôn được yêu thương, trân trọng và hạnh phúc. 💕",

    "Wishing you a wonderful birthday filled with love and laughter. 🎉",

    "Một món quà nhỏ thay cho lời nhắn: Nhi xứng đáng với tất cả những điều tuyệt vời nhất! 🎁"
];

// Lấy các thành phần hộp quà
const giftBoxes = document.querySelectorAll(".gift-box");
const wishMessage = document.querySelector("#wishMessage");
const wishText = document.querySelector("#wishText");
const closeWish = document.querySelector("#closeWish");

// Khi nhấn vào hộp quà
giftBoxes.forEach(function(gift) {

    gift.addEventListener("click", function() {

        const index = Number(gift.dataset.wish);

        wishText.textContent = giftWishes[index];

        wishMessage.classList.add("show");

    });

});

// Đóng lời chúc
closeWish.addEventListener("click", function() {
    wishMessage.classList.remove("show");
});

// Nhấn bên ngoài để đóng lời chúc
document.addEventListener("click", function(event) {

    if (
        wishMessage.classList.contains("show") &&
        !wishMessage.contains(event.target) &&
        !event.target.closest(".gift-box")
    ) {
        wishMessage.classList.remove("show");
    }

});
