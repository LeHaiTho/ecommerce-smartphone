// ============================================
// PRODUCT DETAIL PAGE JAVASCRIPT
// ============================================

// Global Variables
let currentSlide = 0;
let totalSlides = 0;

// Store Data (Fake data for demo)
const storeData = {
  hcm: {
    name: "TP. Hồ Chí Minh",
    districts: {
      q1: {
        name: "Quận 1",
        stores: [
          {
            name: "Cửa hàng Nguyễn Huệ",
            address: "350-352 Nguyễn Huệ, P.Bến Nghé",
            phone: "1900 232 460",
            stock: "Còn hàng",
            stockLevel: "high",
          },
          {
            name: "Cửa hàng Lê Lợi",
            address: "123 Lê Lợi, P.Bến Nghé",
            phone: "028 3822 8888",
            stock: "Còn hàng",
            stockLevel: "high",
          },
        ],
      },
      q3: {
        name: "Quận 3",
        stores: [
          {
            name: "Cửa hàng Võ Văn Tần",
            address: "456 Võ Văn Tần, P.6",
            phone: "028 3930 8888",
            stock: "Còn 3 máy",
            stockLevel: "low",
          },
        ],
      },
      q10: {
        name: "Quận 10",
        stores: [
          {
            name: "Cửa hàng 3 Tháng 2",
            address: "789 3 Tháng 2, P.12",
            phone: "028 3865 8888",
            stock: "Còn hàng",
            stockLevel: "high",
          },
        ],
      },
    },
  },
  hn: {
    name: "Hà Nội",
    districts: {
      hk: {
        name: "Hoàn Kiếm",
        stores: [
          {
            name: "Cửa hàng Hàng Bài",
            address: "123 Hàng Bài",
            phone: "024 3926 8888",
            stock: "Còn hàng",
            stockLevel: "high",
          },
          {
            name: "Cửa hàng Lê Thái Tổ",
            address: "456 Lê Thái Tổ",
            phone: "024 3824 8888",
            stock: "Hết hàng",
            stockLevel: "out",
          },
        ],
      },
      cg: {
        name: "Cầu Giấy",
        stores: [
          {
            name: "Cửa hàng Trần Duy Hưng",
            address: "789 Trần Duy Hưng",
            phone: "024 3556 8888",
            stock: "Còn 2 máy",
            stockLevel: "low",
          },
        ],
      },
    },
  },
  dn: {
    name: "Đà Nẵng",
    districts: {
      hc: {
        name: "Hải Châu",
        stores: [
          {
            name: "Cửa hàng Hùng Vương",
            address: "123 Hùng Vương",
            phone: "0236 3777 888",
            stock: "Còn hàng",
            stockLevel: "high",
          },
        ],
      },
    },
  },
  ct: {
    name: "Cần Thơ",
    districts: {
      nk: {
        name: "Ninh Kiều",
        stores: [
          {
            name: "Cửa hàng 30 Tháng 4",
            address: "456 30 Tháng 4",
            phone: "0292 3888 888",
            stock: "Còn hàng",
            stockLevel: "high",
          },
        ],
      },
    },
  },
};

// Related Products Data (Fake data)
const relatedProductsData = {
  case: [
    {
      name: "Ốp lưng iPhone 15 Pro Max Silicone",
      price: "990.000₫",
      image:
        "https://cdn.tgdd.vn/Products/Images/522/313098/op-lung-iphone-15-pro-max-apple-silicone-magsafe-thumb-1-600x600.jpg",
    },
    {
      name: "Ốp lưng iPhone 15 Pro Max Clear Case",
      price: "450.000₫",
      image:
        "https://cdn.tgdd.vn/Products/Images/522/313099/op-lung-iphone-15-pro-max-apple-clear-case-thumb-1-600x600.jpg",
    },
    {
      name: "Ốp lưng iPhone 15 Pro Max UAG Pathfinder",
      price: "1.290.000₫",
      image:
        "https://cdn.tgdd.vn/Products/Images/522/313100/op-lung-iphone-15-pro-max-uag-pathfinder-thumb-1-600x600.jpg",
    },
    {
      name: "Ốp lưng iPhone 15 Pro Max Spigen",
      price: "690.000₫",
      image:
        "https://cdn.tgdd.vn/Products/Images/522/313101/op-lung-iphone-15-pro-max-spigen-thumb-1-600x600.jpg",
    },
  ],
  charger: [
    {
      name: "Sạc Apple 20W USB-C",
      price: "490.000₫",
      image:
        "https://cdn.tgdd.vn/Products/Images/58/226036/sac-20w-type-c-apple-mhje3za-thumb-1-600x600.jpg",
    },
    {
      name: "Sạc nhanh Anker 30W",
      price: "690.000₫",
      image:
        "https://cdn.tgdd.vn/Products/Images/58/284022/sac-30w-type-c-anker-thumb-1-600x600.jpg",
    },
    {
      name: "Sạc không dây MagSafe Apple",
      price: "990.000₫",
      image:
        "https://cdn.tgdd.vn/Products/Images/58/251033/sac-khong-day-apple-magsafe-mhxh3za-thumb-1-600x600.jpg",
    },
  ],
  cable: [
    {
      name: "Cáp USB-C to Lightning Apple 1m",
      price: "490.000₫",
      image:
        "https://cdn.tgdd.vn/Products/Images/58/228898/cap-type-c-lightning-1m-apple-mm0a3-thumb-1-600x600.jpg",
    },
    {
      name: "Cáp USB-C to USB-C Apple 1m",
      price: "590.000₫",
      image:
        "https://cdn.tgdd.vn/Products/Images/58/228899/cap-type-c-type-c-1m-apple-mu2g3-thumb-1-600x600.jpg",
    },
    {
      name: "Cáp USB-C Anker Powerline III",
      price: "290.000₫",
      image:
        "https://cdn.tgdd.vn/Products/Images/58/284024/cap-type-c-anker-powerline-thumb-1-600x600.jpg",
    },
  ],
  screen: [
    {
      name: "Dán màn hình iPhone 15 Pro Max Mipow",
      price: "390.000₫",
      image:
        "https://cdn.tgdd.vn/Products/Images/590/313102/dan-man-hinh-iphone-15-pro-max-mipow-thumb-1-600x600.jpg",
    },
    {
      name: "Dán cường lực iPhone 15 Pro Max Kingkong",
      price: "250.000₫",
      image:
        "https://cdn.tgdd.vn/Products/Images/590/313103/dan-cuong-luc-iphone-15-pro-max-kingkong-thumb-1-600x600.jpg",
    },
  ],
};

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener("DOMContentLoaded", function () {
  // Dynamic render by id
  try {
    const params = new URLSearchParams(window.location.search);
    const pid = params.get("id");
    if (pid && typeof PRODUCT_DATA !== "undefined" && PRODUCT_DATA[pid]) {
      renderProductFromData(PRODUCT_DATA[pid]);
      renderSimilarProductsFromData(pid);
    }
  } catch (_) {}

  initProductSlider();
  initThumbnails();
  initOptions();
  initRelatedProducts();
  initReviewImageFallbacks();
  // Ensure header cart count reflects localStorage on product page load
  try {
    updateCartCountPD();
  } catch (_) {}
});

// ============================================
// IMAGE SLIDER FUNCTIONS
// ============================================

function initProductSlider() {
  const slider = document.querySelector("#productSlider");
  if (!slider) return;

  const slides = slider.querySelectorAll(".slide-item");
  totalSlides = slides.length;

  // Update counter
  document.getElementById("totalSlides").textContent = totalSlides;
  document.getElementById("currentSlide").textContent = currentSlide + 1;

  // Auto slide (optional)
  // setInterval(() => {
  //   productSliderNext();
  // }, 5000);
}

function productSliderNext() {
  const slider = document.querySelector("#productSlider");
  if (!slider) return;

  currentSlide = (currentSlide + 1) % totalSlides;
  updateSlider();
}

function productSliderPrev() {
  const slider = document.querySelector("#productSlider");
  if (!slider) return;

  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateSlider();
}

function goToSlide(index) {
  currentSlide = index;
  updateSlider();
}

function updateSlider() {
  const slider = document.querySelector("#productSlider");
  if (!slider) return;

  slider.style.transform = `translateX(-${currentSlide * 100}%)`;

  // Update counter
  document.getElementById("currentSlide").textContent = currentSlide + 1;

  // Update thumbnails
  const thumbs = document.querySelectorAll(".thumb-item");
  thumbs.forEach((thumb, index) => {
    thumb.classList.toggle("active", index === currentSlide);
  });
}

// ============================================
// THUMBNAIL NAVIGATION
// ============================================

function initThumbnails() {
  const thumbs = document.querySelectorAll(".thumb-item");
  thumbs.forEach((thumb, index) => {
    thumb.addEventListener("click", () => {
      goToSlide(index);
    });
  });
}

// ============================================
// LOVE/FAVORITE BUTTON
// ============================================

function toggleLove(button) {
  button.classList.toggle("loved");
  const heartIcon = button.querySelector(".heart-icon");

  if (button.classList.contains("loved")) {
    heartIcon.textContent = "❤️";
    showNotification("Đã thêm vào danh sách yêu thích!", "success");
  } else {
    heartIcon.textContent = "🤍";
    showNotification("Đã xóa khỏi danh sách yêu thích!", "info");
  }
}

// ============================================
// OPTION SELECTION (STORAGE & COLOR)
// ============================================

function initOptions() {
  // Storage options
  const storageOptions = document.querySelectorAll(
    '.box-product-option.version .option-item input[type="radio"]'
  );
  storageOptions.forEach((radio) => {
    radio.addEventListener("change", function () {
      // Remove active class from all
      document
        .querySelectorAll(".box-product-option.version .option-item")
        .forEach((item) => item.classList.remove("active"));

      // Add active to selected
      this.closest(".option-item").classList.add("active");

      // Update price
      const price =
        this.closest(".option-item").querySelector(".option-price").textContent;
      document.querySelector(".current-price").textContent = price;

      showNotification(
        "Đã chọn dung lượng " + this.value.toUpperCase(),
        "success"
      );
    });
  });

  // Color options
  const colorOptions = document.querySelectorAll(
    '.box-product-option.color .color-item input[type="radio"]'
  );
  colorOptions.forEach((radio) => {
    radio.addEventListener("change", function () {
      // Remove active class from all
      document
        .querySelectorAll(".box-product-option.color .color-item")
        .forEach((item) => item.classList.remove("active"));

      // Add active to selected
      this.closest(".color-item").classList.add("active");

      const colorName =
        this.closest(".color-item").querySelector(".color-name").textContent;
      showNotification("Đã chọn màu " + colorName, "success");
    });
  });
}

// ============================================
// STORE AVAILABILITY
// ============================================

function filterDistricts() {
  const citySelect = document.getElementById("citySelect");
  const districtSelect = document.getElementById("districtSelect");
  const storeList = document.getElementById("storeList");

  const selectedCity = citySelect.value;

  if (!selectedCity) {
    districtSelect.innerHTML = '<option value="">Chọn Quận/Huyện</option>';
    storeList.innerHTML =
      '<p class="store-placeholder">Vui lòng chọn Tỉnh/Thành phố để xem danh sách cửa hàng</p>';
    return;
  }

  // Populate districts
  const districts = storeData[selectedCity].districts;
  let districtOptions = '<option value="">Chọn Quận/Huyện</option>';

  for (const districtId in districts) {
    districtOptions += `<option value="${districtId}">${districts[districtId].name}</option>`;
  }

  districtSelect.innerHTML = districtOptions;
  storeList.innerHTML =
    '<p class="store-placeholder">Vui lòng chọn Quận/Huyện để xem danh sách cửa hàng</p>';
}

function filterStores() {
  const citySelect = document.getElementById("citySelect");
  const districtSelect = document.getElementById("districtSelect");
  const storeList = document.getElementById("storeList");

  const selectedCity = citySelect.value;
  const selectedDistrict = districtSelect.value;

  if (!selectedCity || !selectedDistrict) {
    storeList.innerHTML =
      '<p class="store-placeholder">Vui lòng chọn Quận/Huyện để xem danh sách cửa hàng</p>';
    return;
  }

  // Get stores
  const stores = storeData[selectedCity].districts[selectedDistrict].stores;

  if (!stores || stores.length === 0) {
    storeList.innerHTML =
      '<p class="store-placeholder">Không có cửa hàng nào trong khu vực này</p>';
    return;
  }

  // Display stores
  let storeHTML = "";
  stores.forEach((store) => {
    storeHTML += `
      <div class="store-item">
        <div class="store-name">${store.name}</div>
        <div class="store-address">${store.address}</div>
        <div class="store-phone">📞 ${store.phone}</div>
        <span class="store-stock ${store.stockLevel}">${store.stock}</span>
      </div>
    `;
  });

  storeList.innerHTML = storeHTML;
}

// ============================================
// RELATED PRODUCTS
// ============================================

function initRelatedProducts() {
  const tabs = document.querySelectorAll(".ref-tab");
  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      // Remove active from all tabs
      tabs.forEach((t) => t.classList.remove("active"));
      // Add active to clicked tab
      this.classList.add("active");

      // Get category
      const category = this.getAttribute("data-category");

      // Load products
      loadRelatedProducts(category);
    });
  });

  // Load default category
  loadRelatedProducts("case");
}

function loadRelatedProducts(category) {
  const container = document.getElementById("refProducts");
  if (!container) return;

  const products = relatedProductsData[category] || [];

  if (products.length === 0) {
    container.innerHTML =
      '<p style="text-align: center; color: #999; padding: 20px;">Không có sản phẩm</p>';
    return;
  }

  let html = "";
  products.forEach((product) => {
    html += `
      <div class="ref-product-item" onclick="showNotification('Đã thêm ${product.name} vào giỏ hàng', 'success')">
        <img src="${product.image}" alt="${product.name}" class="ref-product-img" />
        <div class="ref-product-name">${product.name}</div>
        <div class="ref-product-price">${product.price}</div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// ============================================
// CONTENT EXPANSION
// ============================================

function expandContent() {
  const content = document.querySelector(".content-detail");
  const button = document.querySelector(".btn-read-more");

  if (!content || !button) return;

  if (content.classList.contains("expanded")) {
    content.classList.remove("expanded");
    button.querySelector("span").textContent = "Xem toàn bộ bài viết";
    button.querySelector(".arrow-down").textContent = "▼";
  } else {
    content.classList.add("expanded");
    button.querySelector("span").textContent = "Thu gọn";
    button.querySelector(".arrow-down").textContent = "▲";

    // Scroll to content smoothly
    setTimeout(() => {
      content.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }
}

// ============================================
// ACTION BUTTONS
// ============================================

function buyNow() {
  showNotification(
    "Đang chuyển đến trang thanh toán... Vui lòng đợi!",
    "success"
  );
  setTimeout(() => {
    // Redirect to checkout page
    // window.location.href = '/checkout';
    console.log("Redirect to checkout");
  }, 1500);
}

function buyInstallment() {
  showNotification("Đang chuyển đến trang trả góp... Vui lòng đợi!", "success");
  setTimeout(() => {
    // Redirect to installment page
    // window.location.href = '/installment';
    console.log("Redirect to installment");
  }, 1500);
}

function checkStoreStock() {
  // Scroll to store availability section
  const storeSection = document.querySelector(".box-stores");
  if (storeSection) {
    storeSection.scrollIntoView({ behavior: "smooth", block: "center" });
    storeSection.style.animation = "pulse 1s ease-in-out";
    setTimeout(() => {
      storeSection.style.animation = "";
    }, 1000);
  }
}

function showMemberOffer() {
  showNotification(
    "Đăng nhập để xem giá thành viên ưu đãi! Tiết kiệm thêm 400.000₫",
    "info"
  );
}

function showEduOffer() {
  showNotification(
    "Xác thực tài khoản sinh viên để nhận ưu đãi! Tiết kiệm thêm 640.000₫",
    "info"
  );
}

function showWarrantyPopup() {
  showNotification(
    "Đang mở chi tiết chính sách bảo hành... Vui lòng đợi!",
    "info"
  );
  // In real implementation, this would open a modal with warranty details
}

function showAllPromotions() {
  showNotification("Đang tải thêm ưu đãi... Vui lòng đợi!", "info");
  // In real implementation, this would expand or show more promotions
}

function showPaymentOffers() {
  showNotification("Đang tải thêm ưu đãi thanh toán... Vui lòng đợi!", "info");
  // In real implementation, this would expand or show more payment offers
}

// ============================================
// NOTIFICATION SYSTEM
// ============================================

function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll(
    ".custom-notification"
  );
  existingNotifications.forEach((n) => n.remove());

  // Create notification
  const notification = document.createElement("div");
  notification.className = "custom-notification";

  let icon = "ℹ️";
  let iconColor = "#2377e8";

  if (type === "success") {
    icon = "✓";
    iconColor = "#4caf50";
  } else if (type === "error") {
    icon = "✕";
    iconColor = "#f44336";
  } else if (type === "warning") {
    icon = "⚠";
    iconColor = "#ff9800";
  }

  notification.innerHTML = `
    <div class="notification-content">
      <i class="notification-icon" style="background: ${iconColor}">${icon}</i>
      <span>${message}</span>
    </div>
  `;

  document.body.appendChild(notification);

  // Trigger animation
  setTimeout(() => {
    notification.classList.add("show");
  }, 10);

  // Auto hide after 3 seconds
  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Format price
function formatPrice(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "₫";
}

// Smooth scroll to element
function scrollToElement(selector) {
  const element = document.querySelector(selector);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

// ============================================
// KEYBOARD NAVIGATION
// ============================================

document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowLeft") {
    productSliderPrev();
  } else if (e.key === "ArrowRight") {
    productSliderNext();
  }
});

// ============================================
// TOUCH/SWIPE SUPPORT FOR MOBILE
// ============================================

let touchStartX = 0;
let touchEndX = 0;

const sliderBanner = document.querySelector(".slider-banner");
if (sliderBanner) {
  sliderBanner.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
    },
    false
  );

  sliderBanner.addEventListener(
    "touchend",
    (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    },
    false
  );
}

function handleSwipe() {
  if (touchEndX < touchStartX - 50) {
    // Swipe left
    productSliderNext();
  }
  if (touchEndX > touchStartX + 50) {
    // Swipe right
    productSliderPrev();
  }
}

// ============================================
// RATING & REVIEW FUNCTIONS
// ============================================

// Global Variables for Rating
let currentPhotoIndex = 0;
const customerPhotos = [
  "https://cdn.tgdd.vn/Products/Images/42/305658/iphone-15-pro-max-blue-review-1.jpg",
  "https://cdn.tgdd.vn/Products/Images/42/305658/iphone-15-pro-max-blue-review-2.jpg",
  "https://cdn.tgdd.vn/Products/Images/42/305658/iphone-15-pro-max-blue-review-3.jpg",
];

let selectedRating = 5;
let uploadedImages = [];
let likedReviews = [];

// Initialize Review Functions
function initReviewFunctions() {
  // Star rating selection
  const starItems = document.querySelectorAll(".star-item");
  starItems.forEach((item) => {
    item.addEventListener("click", function () {
      const rating = parseInt(this.getAttribute("data-rating"));
      selectRating(rating);
    });
  });

  // Character count for textarea
  const reviewContent = document.getElementById("reviewContent");
  if (reviewContent) {
    reviewContent.addEventListener("input", function () {
      const charCount = this.value.length;
      document.getElementById("charCount").textContent = charCount;
    });
  }

  // Image upload
  const reviewImages = document.getElementById("reviewImages");
  if (reviewImages) {
    reviewImages.addEventListener("change", function (e) {
      handleImageUpload(e.target.files);
    });
  }

  // Form submission
  const reviewForm = document.getElementById("reviewForm");
  if (reviewForm) {
    reviewForm.addEventListener("submit", function (e) {
      e.preventDefault();
      submitReview();
    });
  }
}

// Select Star Rating
function selectRating(rating) {
  selectedRating = rating;
  const starItems = document.querySelectorAll(".star-item");

  starItems.forEach((item, index) => {
    if (index < rating) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
}

// Handle Image Upload
function handleImageUpload(files) {
  const maxImages = 3;
  const uploadPreview = document.getElementById("uploadPreview");

  if (files.length + uploadedImages.length > maxImages) {
    showNotification(`Chỉ có thể tải lên tối đa ${maxImages} ảnh!`, "warning");
    return;
  }

  Array.from(files).forEach((file) => {
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = function (e) {
        uploadedImages.push(e.target.result);
        displayUploadedImages();
      };
      reader.readAsDataURL(file);
    }
  });
}

// Display Uploaded Images
function displayUploadedImages() {
  const uploadPreview = document.getElementById("uploadPreview");
  if (!uploadPreview) return;

  uploadPreview.innerHTML = "";
  uploadedImages.forEach((imageData, index) => {
    const imgContainer = document.createElement("div");
    imgContainer.style.position = "relative";

    const img = document.createElement("img");
    img.src = imageData;
    img.alt = `Upload ${index + 1}`;
    img.loading = "lazy";
    img.onerror = function () {
      img.src = "https://cdn.tgdd.vn/2023/12/content/placeholder-200x200.png";
      img.alt = "Ảnh người dùng";
    };

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "✕";
    removeBtn.style.cssText = `
      position: absolute;
      top: -8px;
      right: -8px;
      width: 24px;
      height: 24px;
      background: #ff4444;
      color: white;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      font-size: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
    `;
    removeBtn.onclick = function () {
      uploadedImages.splice(index, 1);
      displayUploadedImages();
    };

    imgContainer.appendChild(img);
    imgContainer.appendChild(removeBtn);
    uploadPreview.appendChild(imgContainer);
  });
}

// Submit Review
function submitReview() {
  const userName = document.getElementById("userName").value;
  const userPhone = document.getElementById("userPhone").value;
  const reviewContent = document.getElementById("reviewContent").value;
  const agreePolicy = document.getElementById("agreePolicy").checked;

  // Validation
  if (!userName || !userPhone) {
    showNotification(
      "Vui lòng điền đầy đủ họ tên và số điện thoại!",
      "warning"
    );
    return;
  }

  if (userPhone.length < 10 || !/^\d+$/.test(userPhone)) {
    showNotification("Số điện thoại không hợp lệ!", "warning");
    return;
  }

  if (!agreePolicy) {
    showNotification(
      "Vui lòng đồng ý với chính sách xử lý dữ liệu!",
      "warning"
    );
    return;
  }

  // Show loading
  showNotification("Đang gửi đánh giá... Vui lòng đợi!", "info");

  // Simulate API call
  setTimeout(() => {
    closeReviewPopup();
    showSuccessPopup();
    resetReviewForm();
  }, 1500);
}

// Reset Review Form
function resetReviewForm() {
  document.getElementById("reviewForm").reset();
  selectRating(5);
  uploadedImages = [];
  displayUploadedImages();
  document.getElementById("charCount").textContent = "0";
}

// Open/Close Review Popup
function openReviewPopup() {
  const popup = document.getElementById("reviewPopup");
  if (popup) {
    popup.classList.add("show");
    document.body.style.overflow = "hidden";
  }
}

function closeReviewPopup() {
  const popup = document.getElementById("reviewPopup");
  if (popup) {
    popup.classList.remove("show");
    document.body.style.overflow = "";
  }
}

// Success Popup
function showSuccessPopup() {
  const popup = document.getElementById("successPopup");
  if (popup) {
    popup.classList.add("show");
    document.body.style.overflow = "hidden";
  }
}

function closeSuccessPopup() {
  const popup = document.getElementById("successPopup");
  if (popup) {
    popup.classList.remove("show");
    document.body.style.overflow = "";
  }
}

// Like Review
function likeReview(reviewId) {
  const likeCountElement = document.getElementById(`like-count-${reviewId}`);
  const likeButton = event.currentTarget;

  if (!likeCountElement) return;

  let currentCount = parseInt(likeCountElement.textContent);

  if (likedReviews.includes(reviewId)) {
    // Unlike
    likedReviews = likedReviews.filter((id) => id !== reviewId);
    currentCount--;
    likeButton.classList.remove("liked");
    showNotification("Đã bỏ đánh dấu hữu ích!", "info");
  } else {
    // Like
    likedReviews.push(reviewId);
    currentCount++;
    likeButton.classList.add("liked");
    showNotification("Cảm ơn bạn đã đánh giá hữu ích!", "success");
  }

  likeCountElement.textContent = currentCount;
}

// Load More Reviews
function loadMoreReviews() {
  const remainingElement = document.querySelector(".remaining-count");
  const button = event.currentTarget;

  // Show loading state
  button.disabled = true;
  button.innerHTML = '<i>⏳</i> Đang tải... <i class="arrow-down">▼</i>';

  // Simulate loading
  setTimeout(() => {
    showNotification("Đang tải thêm đánh giá...", "info");

    // Update remaining count
    if (remainingElement) {
      let remaining = parseInt(remainingElement.textContent);
      remaining = Math.max(0, remaining - 4);
      remainingElement.textContent = remaining;

      if (remaining === 0) {
        button.style.display = "none";
      }
    }

    // Reset button
    button.disabled = false;
    button.innerHTML = `Xem thêm <span class="remaining-count">${remainingElement.textContent}</span> đánh giá <i class="arrow-down">▼</i>`;
  }, 1500);
}

// Photo Gallery Functions
function openPhotoGallery(index) {
  currentPhotoIndex = index;
  const popup = document.getElementById("photoGalleryPopup");
  const galleryImage = document.getElementById("galleryImage");

  if (popup && galleryImage) {
    galleryImage.src = customerPhotos[currentPhotoIndex];
    galleryImage.onerror = function () {
      galleryImage.src =
        "https://cdn.tgdd.vn/2023/12/content/placeholder-800x800.png";
    };
    popup.classList.add("show");
    document.body.style.overflow = "hidden";
    updatePhotoCounter();
  }
}

function closePhotoGallery() {
  const popup = document.getElementById("photoGalleryPopup");
  if (popup) {
    popup.classList.remove("show");
    document.body.style.overflow = "";
  }
}

function prevPhoto() {
  currentPhotoIndex =
    (currentPhotoIndex - 1 + customerPhotos.length) % customerPhotos.length;
  const galleryImage = document.getElementById("galleryImage");
  if (galleryImage) {
    galleryImage.src = customerPhotos[currentPhotoIndex];
    galleryImage.onerror = function () {
      galleryImage.src =
        "https://cdn.tgdd.vn/2023/12/content/placeholder-800x800.png";
    };
    updatePhotoCounter();
  }
}

function nextPhoto() {
  currentPhotoIndex = (currentPhotoIndex + 1) % customerPhotos.length;
  const galleryImage = document.getElementById("galleryImage");
  if (galleryImage) {
    galleryImage.src = customerPhotos[currentPhotoIndex];
    galleryImage.onerror = function () {
      galleryImage.src =
        "https://cdn.tgdd.vn/2023/12/content/placeholder-800x800.png";
    };
    updatePhotoCounter();
  }
}

function updatePhotoCounter() {
  const currentPhoto = document.getElementById("currentPhoto");
  const totalPhotos = document.getElementById("totalPhotos");

  if (currentPhoto && totalPhotos) {
    currentPhoto.textContent = currentPhotoIndex + 1;
    totalPhotos.textContent = customerPhotos.length;
  }
}

// Keyboard Navigation for Photo Gallery
document.addEventListener("keydown", function (e) {
  const popup = document.getElementById("photoGalleryPopup");
  if (popup && popup.classList.contains("show")) {
    if (e.key === "ArrowLeft") {
      prevPhoto();
    } else if (e.key === "ArrowRight") {
      nextPhoto();
    } else if (e.key === "Escape") {
      closePhotoGallery();
    }
  }

  // Close review popup with Escape
  const reviewPopup = document.getElementById("reviewPopup");
  if (reviewPopup && reviewPopup.classList.contains("show")) {
    if (e.key === "Escape") {
      closeReviewPopup();
    }
  }

  // Close success popup with Escape
  const successPopup = document.getElementById("successPopup");
  if (successPopup && successPopup.classList.contains("show")) {
    if (e.key === "Escape") {
      closeSuccessPopup();
    }
  }
});

// ============================================
// SIMILAR PRODUCTS SLIDER
// ============================================

let similarScrollPosition = 0;
const similarItemWidth = 236; // 220px + 16px gap

// Initialize Similar Products Slider
function initSimilarProductsSlider() {
  const track = document.getElementById("similarProductsTrack");
  const dotsContainer = document.getElementById("similarDots");

  if (!track) return;

  const items = track.querySelectorAll(".similar-product-item");
  const totalItems = items.length;

  // Calculate number of visible items based on screen width
  const getVisibleItems = () => {
    const width = window.innerWidth;
    if (width >= 1200) return 5;
    if (width >= 992) return 4;
    if (width >= 768) return 3;
    if (width >= 480) return 2;
    return 2;
  };

  const visibleItems = getVisibleItems();
  const totalPages = Math.ceil(totalItems / visibleItems);

  // Create dots
  if (totalPages > 1) {
    for (let i = 0; i < totalPages; i++) {
      const dot = document.createElement("button");
      dot.className = "slider-dot" + (i === 0 ? " active" : "");
      dot.onclick = () => goToSimilarPage(i);
      dotsContainer.appendChild(dot);
    }
  }

  // Update arrow states
  updateSimilarArrows();
}

// Scroll Similar Products
function scrollSimilarProducts(direction) {
  const track = document.getElementById("similarProductsTrack");
  if (!track) return;

  const scrollAmount = track.offsetWidth;

  if (direction === "next") {
    track.scrollLeft += scrollAmount;
  } else {
    track.scrollLeft -= scrollAmount;
  }

  // Update dots and arrows after scroll
  setTimeout(() => {
    updateSimilarDots();
    updateSimilarArrows();
  }, 300);
}

// Go to Specific Page
function goToSimilarPage(pageIndex) {
  const track = document.getElementById("similarProductsTrack");
  if (!track) return;

  const scrollAmount = track.offsetWidth * pageIndex;
  track.scrollLeft = scrollAmount;

  updateSimilarDots();
  updateSimilarArrows();
}

// Update Dots
function updateSimilarDots() {
  const track = document.getElementById("similarProductsTrack");
  const dots = document.querySelectorAll("#similarDots .slider-dot");

  if (!track || dots.length === 0) return;

  const scrollLeft = track.scrollLeft;
  const scrollWidth = track.scrollWidth - track.offsetWidth;
  const currentPage = Math.round(
    (scrollLeft / scrollWidth) * (dots.length - 1)
  );

  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentPage);
  });
}

// Update Arrow States
function updateSimilarArrows() {
  const track = document.getElementById("similarProductsTrack");
  const prevBtn = document.getElementById("similarPrev");
  const nextBtn = document.getElementById("similarNext");

  if (!track || !prevBtn || !nextBtn) return;

  const scrollLeft = track.scrollLeft;
  const scrollWidth = track.scrollWidth - track.offsetWidth;

  // Disable prev if at start
  prevBtn.disabled = scrollLeft <= 0;

  // Disable next if at end
  nextBtn.disabled = scrollLeft >= scrollWidth - 10; // 10px tolerance
}

// Handle scroll event
const similarTrack = document.getElementById("similarProductsTrack");
if (similarTrack) {
  similarTrack.addEventListener("scroll", () => {
    updateSimilarDots();
    updateSimilarArrows();
  });
}

// Handle window resize
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    // Reinitialize dots on resize
    const dotsContainer = document.getElementById("similarDots");
    if (dotsContainer) {
      dotsContainer.innerHTML = "";
      initSimilarProductsSlider();
    }
  }, 250);
});

// Touch/Swipe Support for Similar Products
let similarTouchStartX = 0;
let similarTouchEndX = 0;

if (similarTrack) {
  similarTrack.addEventListener(
    "touchstart",
    (e) => {
      similarTouchStartX = e.changedTouches[0].screenX;
    },
    false
  );

  similarTrack.addEventListener(
    "touchend",
    (e) => {
      similarTouchEndX = e.changedTouches[0].screenX;
      handleSimilarSwipe();
    },
    false
  );
}

function handleSimilarSwipe() {
  if (similarTouchEndX < similarTouchStartX - 50) {
    // Swipe left - next
    scrollSimilarProducts("next");
  }
  if (similarTouchEndX > similarTouchStartX + 50) {
    // Swipe right - prev
    scrollSimilarProducts("prev");
  }
}

// Initialize on DOM Load
document.addEventListener("DOMContentLoaded", function () {
  initReviewFunctions();
  initSimilarProductsSlider();
});

// ============================================
// CONSOLE LOG (For Development)
// ============================================

console.log("Product Detail Page JavaScript Loaded Successfully!");
console.log("Total Slides:", totalSlides);
console.log("Store Data:", storeData);
console.log("Related Products Data:", relatedProductsData);

// ============================================
// CART ADD (BuyNow) FOR PRODUCT DETAIL
// ============================================

function safeParsePD(json, fallback) {
  try {
    return JSON.parse(json);
  } catch (_) {
    return fallback;
  }
}

function getCartPD() {
  const raw = localStorage.getItem("cart");
  return raw ? safeParsePD(raw, []) : [];
}

function setCartPD(items) {
  localStorage.setItem("cart", JSON.stringify(items || []));
}

function updateCartCountPD() {
  const items = getCartPD();
  const total = items.reduce((s, it) => s + (it.quantity || 0), 0);
  const el = document.querySelector(".cart-count");
  if (el) {
    el.textContent = total;
    if (total > 0) {
      el.classList.add("show");
    } else {
      el.classList.remove("show");
    }
  }
}

function parseMoneyPD(text) {
  if (!text) return 0;
  return Number(("" + text).replace(/[^0-9]/g, "")) || 0;
}

function readProductDetailPD() {
  const name = (
    document.querySelector(".box-header h1")?.textContent || "Sản phẩm"
  ).trim();
  const priceText =
    document.querySelector(".current-price")?.textContent || "0";
  const price = parseMoneyPD(priceText);
  const image =
    document
      .querySelector("#productSlider .slide-item img")
      ?.getAttribute("src") || "";
  const color = (
    document.querySelector(".color-item.active .color-name")?.textContent || ""
  ).trim();
  const storage = (
    document.querySelector(".option-item.active .option-name")?.textContent ||
    ""
  ).trim();
  const params = new URLSearchParams(window.location.search);
  const urlId = params.get("id");
  const id = urlId || [name, storage, color].filter(Boolean).join("|");
  return { id, name, price, quantity: 1, color, storage, image };
}

function BuyNow(el, type) {
  const product = readProductDetailPD();
  const cart = getCartPD();
  const idx = cart.findIndex((it) => it.id === product.id);
  if (idx >= 0) {
    cart[idx].quantity = (cart[idx].quantity || 0) + 1;
  } else {
    cart.push(product);
  }
  setCartPD(cart);
  updateCartCountPD();
  try {
    showNotification("Đã thêm vào giỏ hàng", "success");
  } catch (_) {}
}

window.BuyNow = BuyNow;

// Add to cart then go to cart page
function BuyNowAndGo() {
  const product = readProductDetailPD();
  const cart = getCartPD();
  const idx = cart.findIndex((it) => it.id === product.id);
  if (idx >= 0) {
    cart[idx].quantity = (cart[idx].quantity || 0) + 1;
  } else {
    cart.push(product);
  }
  setCartPD(cart);
  updateCartCountPD();
  window.location.href = "cart.html";
}

window.BuyNowAndGo = BuyNowAndGo;

function renderProductFromData(p) {
  const title = document.querySelector(".box-header h1");
  if (title) title.textContent = p.name;

  const priceEl = document.querySelector(".current-price");
  if (priceEl)
    priceEl.textContent = new Intl.NumberFormat("vi-VN").format(p.price) + "₫";
  const oldEl = document.querySelector(".old-price");
  const discountEl = document.querySelector(".discount-badge");
  if (oldEl) {
    if (p.oldPrice) {
      oldEl.textContent =
        new Intl.NumberFormat("vi-VN").format(p.oldPrice) + "₫";
      if (discountEl) {
        const percent = Math.round((1 - p.price / p.oldPrice) * 100);
        discountEl.textContent = `-${percent}%`;
      }
    } else {
      oldEl.textContent = "";
      if (discountEl) discountEl.textContent = "";
    }
  }

  const slider = document.querySelector("#productSlider");
  if (slider && p.images && p.images.length) {
    slider.innerHTML = p.images
      .map(
        (src) => `
      <div class="slide-item">
        <img src="${src}" alt="${p.name}" />
      </div>`
      )
      .join("");
  }

  const thumbs = document.querySelector(".custom-thumb-transform");
  if (thumbs && p.images && p.images.length) {
    thumbs.innerHTML = p.images
      .map(
        (src, i) => `
      <div class="thumb-item ${i === 0 ? "active" : ""}" data-slide="${i}">
        <img src="${src}" alt="Thumb ${i + 1}" />
      </div>`
      )
      .join("");
  }
}

// ============================================
// SIMILAR PRODUCTS FROM DATASET
// ============================================

function renderSimilarProductsFromData(currentId) {
  try {
    if (typeof PRODUCT_DATA === "undefined") return;
    const track = document.getElementById("similarProductsTrack");
    const dotsContainer = document.getElementById("similarDots");
    if (!track) return;

    const products = Object.values(PRODUCT_DATA).filter(
      (p) => p.id !== currentId
    );
    if (products.length === 0) return;

    const placeholder =
      "https://cdn.tgdd.vn/2023/12/content/placeholder-300x300.png";
    const toCurrency = (v) => new Intl.NumberFormat("vi-VN").format(v) + "₫";

    track.innerHTML = products
      .map(
        (p) => `
      <div class="similar-product-item">
        <a href="product-detail.html?id=${p.id}" class="product-card">
          <div class="product-label">
            <span class="label-installment">Trả chậm 0%</span>
          </div>
          <div class="product-image">
            <img src="${(p.images && p.images[0]) || placeholder}" alt="${
          p.name
        }" onerror="this.src='${placeholder}'" />
          </div>
          <h4 class="product-name">${p.name}</h4>
          <div class="product-price">
            <strong class="price-current">${toCurrency(p.price)}</strong>
            ${
              p.oldPrice
                ? `<div class="price-box"><span class="price-old">${toCurrency(
                    p.oldPrice
                  )}</span><span class="price-discount">-${Math.round(
                    (1 - p.price / p.oldPrice) * 100
                  )}%</span></div>`
                : ""
            }
          </div>
        </a>
      </div>`
      )
      .join("");

    if (dotsContainer) dotsContainer.innerHTML = "";

    // Re-init slider controls based on new content
    initSimilarProductsSlider();
  } catch (e) {
    console.error("renderSimilarProductsFromData error", e);
  }
}
