// ==================== CART FUNCTIONALITY ====================

// Cart state (load from localStorage, default empty)
let cartItems = [];

let selectedDeliveryDate = "2025-10-19";
let selectedDeliveryTime = "10:00-12:00";
let selectedPaymentMethod = "cash";
let useGiftPoints = false;

// Initialize cart
document.addEventListener("DOMContentLoaded", function () {
  // Load from localStorage on cart page
  try {
    const saved = localStorage.getItem("cart");
    cartItems = saved ? JSON.parse(saved) : [];
  } catch (e) {
    cartItems = [];
  }

  updateCartDisplay();
  initializeEventListeners();
  checkCartEmpty();
});

// Initialize event listeners
function initializeEventListeners() {
  // Delivery options
  document.querySelectorAll(".option-delivery").forEach((option) => {
    option.addEventListener("click", function () {
      document.querySelectorAll(".option-delivery").forEach((opt) => {
        opt.classList.remove("active");
        opt.querySelector(".cart-radio-item").classList.remove("active");
      });
      this.classList.add("active");
      this.querySelector(".cart-radio-item").classList.add("active");
      document.getElementById("deliveryType").value = this.dataset.type;
    });
  });

  // Payment methods
  document.querySelectorAll(".payment-method-item").forEach((item) => {
    item.addEventListener("click", function () {
      document.querySelectorAll(".payment-method-item").forEach((method) => {
        method.classList.remove("active");
        method.querySelector(".payment-radio-item").classList.remove("active");
      });
      this.classList.add("active");
      this.querySelector(".payment-radio-item").classList.add("active");
      selectedPaymentMethod = this.dataset.method;
    });
  });

  // Time delivery popup date selection
  document.querySelectorAll(".date-item").forEach((item) => {
    item.addEventListener("click", function () {
      document.querySelectorAll(".date-item").forEach((date) => {
        date.classList.remove("active");
      });
      this.classList.add("active");
      selectedDeliveryDate = this.dataset.date;
    });
  });

  // Time delivery popup time selection
  document.querySelectorAll(".time-item").forEach((item) => {
    item.addEventListener("click", function () {
      document.querySelectorAll(".time-item").forEach((time) => {
        time.classList.remove("active");
        time.querySelector(".time-radio-item").classList.remove("active");
      });
      this.classList.add("active");
      this.querySelector(".time-radio-item").classList.add("active");
      selectedDeliveryTime = this.dataset.time;
    });
  });

  // Privacy policy checkbox
  const securityPolicy = document.querySelector(".security-policy-checkbox");
  if (securityPolicy) {
    securityPolicy.addEventListener("click", function () {
      const checkbox = document.getElementById("agreePolicy");
      if (checkbox) {
        checkbox.checked = !checkbox.checked;
      }
      this.classList.toggle("active");
    });
  }
}

// Toggle color picker
function toggleColorPicker(productId) {
  const picker = document.getElementById(`colorPicker${productId}`);
  if (picker) {
    picker.classList.toggle("active");

    // Close when clicking outside
    setTimeout(() => {
      document.addEventListener("click", function closeColorPicker(e) {
        if (!e.target.closest(".product-color-wrapper")) {
          picker.classList.remove("active");
          document.removeEventListener("click", closeColorPicker);
        }
      });
    }, 0);
  }
}

// Toggle scenario info
function toggleScenarioInfo(productId) {
  const info = document.getElementById(`scenarioInfo${productId}`);
  if (info) {
    info.classList.toggle("active");
  }
}

// Toggle promotions
function togglePromotions(productId) {
  const promotionList = document.getElementById(`promotionList${productId}`);
  if (promotionList) {
    promotionList.classList.toggle("active");
  }
}

// Increase quantity
function increaseQuantity(productId) {
  const input = document.getElementById(`quantity${productId}`);
  let quantity = parseInt(input.value);

  if (quantity < 5) {
    quantity++;
    input.value = quantity;

    // Update cart state
    const item = cartItems.find((item) => item.id === productId);
    if (item) {
      item.quantity = quantity;
      updateCartDisplay();
    }
  }
}

// Decrease quantity
function decreaseQuantity(productId) {
  const input = document.getElementById(`quantity${productId}`);
  let quantity = parseInt(input.value);

  if (quantity > 1) {
    quantity--;
    input.value = quantity;

    // Update cart state
    const item = cartItems.find((item) => item.id === productId);
    if (item) {
      item.quantity = quantity;
      updateCartDisplay();
    }
  }
}

// Remove product from cart
function removeProduct(productId) {
  if (confirm("Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?")) {
    // Remove from cart state
    cartItems = cartItems.filter((item) => item.id !== productId);
    saveCartToStorage();

    // Remove from DOM
    const productElement = document.querySelector(
      `[data-product-id="${productId}"]`
    );
    if (productElement) {
      productElement.style.opacity = "0";
      productElement.style.transform = "translateX(-20px)";
      setTimeout(() => {
        productElement.remove();
        updateCartDisplay();
        checkCartEmpty();
      }, 300);
    }

    showNotification("Đã xóa sản phẩm khỏi giỏ hàng", "success");
  }
}

// Update cart display
function updateCartDisplay() {
  let totalQuantity = 0;
  let totalMoney = 0;

  cartItems.forEach((item) => {
    totalQuantity += item.quantity;
    totalMoney += item.price * item.quantity;
  });

  // Render UI sections
  renderCartFromState();

  // Update total quantity
  const totalQuantityElement = document.getElementById("totalQuantity");
  if (totalQuantityElement) {
    totalQuantityElement.textContent = totalQuantity;
  }

  // Update temporary total
  const tempTotalElement = document.getElementById("tempTotalMoney");
  if (tempTotalElement) {
    tempTotalElement.textContent = formatMoney(totalMoney);
  }

  // Update final total
  const finalTotalElement = document.getElementById("finalTotalMoney");
  const finalAmountElement = document.getElementById("finalAmount");
  if (finalTotalElement) {
    finalTotalElement.textContent = formatMoney(totalMoney);
  }
  if (finalAmountElement) {
    finalAmountElement.textContent = formatMoney(totalMoney);
  }

  // Update accumulated points
  const accumulatedPointsElement = document.getElementById("accumulatedPoints");
  if (accumulatedPointsElement) {
    const points = Math.floor(totalMoney / 1000) * 2;
    accumulatedPointsElement.textContent = `${formatNumber(points)} điểm`;
  }

  // Update cart count in header (if exists)
  const cartCount = document.querySelector(".cart-count");
  if (cartCount) {
    cartCount.textContent = totalQuantity;
    if (totalQuantity > 0) {
      cartCount.classList.add("show");
    } else {
      cartCount.classList.remove("show");
    }
  }

  // Persist to localStorage
  saveCartToStorage();
}

// Render cart product list and order summary from cartItems
function renderCartFromState() {
  const listEl = document.getElementById("cartProductList");
  if (listEl) {
    if (!cartItems || cartItems.length === 0) {
      listEl.innerHTML = "";
    } else {
      listEl.innerHTML = cartItems
        .map(
          (it) => `
      <div class="product-item" data-product-id="${encodeURIComponent(it.id)}">
        <div class="product-item-info">
          <div class="product-image-wrapper">
            <a href="product-detail.html" class="product-item__image">
              <img src="${it.image || ""}" alt="${
            it.name
          }" class="product-item__image-img" loading="lazy" />
            </a>
          </div>
          <div class="product-item__right">
            <div class="product-item__right-info">
              <a href="product-detail.html" class="product-item__name">${
                it.name
              }</a>
              <div class="product-item__price-wrapper">
                <div class="price-original">${formatMoney(it.price)}</div>
              </div>
            </div>
            <div class="product-item__right-info-other">
              ${
                it.color || it.storage
                  ? `<div class="amount-color"><small>Màu: <small>${
                      it.color || "-"
                    }</small></small>${
                      it.storage
                        ? ` <small class="ml-2">Bộ nhớ: <small>${it.storage}</small></small>`
                        : ""
                    }</div>`
                  : ""
              }
            </div>
            <div class="quantity-box">
              <div class="product-quantity">
                <button class="product-quantity__remove" onclick="removeItemById('${encodeURIComponent(
                  it.id
                )}')">Xoá</button>
                <div class="product-quantity__btn">
                  <button class="product-quantity__btn-minus" onclick="decreaseItem('${encodeURIComponent(
                    it.id
                  )}')"><i class="minus-icon">−</i></button>
                  <input type="number" class="quantity-input" value="${
                    it.quantity
                  }" min="1" max="5" readonly />
                  <button class="product-quantity__btn-plus" onclick="increaseItem('${encodeURIComponent(
                    it.id
                  )}')"><i class="plus-icon">+</i></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`
        )
        .join("");
    }
  }

  const summaryEl = document.getElementById("orderSummaryList");
  if (summaryEl) {
    if (!cartItems || cartItems.length === 0) {
      summaryEl.innerHTML = "";
    } else {
      summaryEl.innerHTML = cartItems
        .map(
          (it) => `
        <li>
          <div class="box-pro">
            <a href="product-detail.html" class="img-order">
              <img src="${it.image || ""}" alt="${it.name}" loading="lazy" />
            </a>
            <div class="text-order">
              <a class="text-order__product-name" href="product-detail.html">${
                it.name
              }</a>
              <div class="amount-color">
                ${
                  it.color
                    ? `<small>Màu: <small>${it.color}</small></small>`
                    : ""
                }
                <small>SL: <small>${it.quantity}</small></small>
              </div>
            </div>
          </div>
        </li>`
        )
        .join("");
    }
  }
}

// Quantity handlers using product string id
function findIndexByEncodedId(encodedId) {
  const id = decodeURIComponent(encodedId);
  return cartItems.findIndex((it) => it.id === id);
}

function increaseItem(encodedId) {
  const idx = findIndexByEncodedId(encodedId);
  if (idx >= 0 && cartItems[idx].quantity < 5) {
    cartItems[idx].quantity += 1;
    onCartChange();
  }
}

function decreaseItem(encodedId) {
  const idx = findIndexByEncodedId(encodedId);
  if (idx >= 0) {
    if (cartItems[idx].quantity > 1) {
      cartItems[idx].quantity -= 1;
      onCartChange();
    } else {
      // If decreasing from 1 to 0, remove item from cart
      cartItems.splice(idx, 1);
      onCartChange();
      showNotification("Đã xóa sản phẩm khỏi giỏ hàng", "success");
    }
  }
}

function removeItemById(encodedId) {
  const id = decodeURIComponent(encodedId);
  cartItems = cartItems.filter((it) => it.id !== id);
  onCartChange();
  showNotification("Đã xóa sản phẩm khỏi giỏ hàng", "success");
}

// Check if cart is empty
function checkCartEmpty() {
  const cartPage = document.querySelector(".cart-page");
  const emptyCart = document.getElementById("emptyCart");
  const orderSuccessPage = document.getElementById("orderSuccessPage");

  // Don't show empty cart if order success page is visible
  if (orderSuccessPage && orderSuccessPage.style.display === "block") {
    return;
  }

  if (cartItems.length === 0) {
    if (cartPage) cartPage.style.display = "none";
    if (emptyCart) emptyCart.style.display = "flex";
  } else {
    if (cartPage) cartPage.style.display = "block";
    if (emptyCart) emptyCart.style.display = "none";
  }
}

// Toggle customer note input
function toggleCustomerNote() {
  const checkbox = document.getElementById("otherRequest");
  const input = document.getElementById("customerNoteInput");

  if (checkbox && input) {
    if (checkbox.checked) {
      input.classList.add("active");
    } else {
      input.classList.remove("active");
    }
  }
}

// Toggle gift points
function togglePoints() {
  const checkbox = document.getElementById("usePoints");
  const pointsDisplay = document.getElementById("pointsDisplay");

  if (checkbox && pointsDisplay) {
    if (checkbox.checked) {
      pointsDisplay.classList.add("active");
      useGiftPoints = true;
    } else {
      pointsDisplay.classList.remove("active");
      useGiftPoints = false;
    }
  }
}

// Open address popup (placeholder)
function openAddressPopup() {
  showNotification("Chức năng đang được phát triển", "info");
}

// Open coupon popup (placeholder)
function openCouponPopup() {
  showNotification("Chức năng đang được phát triển", "info");
}

// Toggle more payment methods
function toggleMorePayments() {
  showNotification("Chức năng đang được phát triển", "info");
}

// Open time delivery popup
function openTimeDeliveryPopup() {
  const popup = document.getElementById("timeDeliveryPopup");
  if (popup) {
    popup.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

// Close time delivery popup
function closeTimeDeliveryPopup() {
  const popup = document.getElementById("timeDeliveryPopup");
  if (popup) {
    popup.classList.remove("active");
    document.body.style.overflow = "";
  }
}

// Save delivery time
function saveDeliveryTime() {
  const dateText = document.querySelector(".date-item.active").textContent;
  const timeText = selectedDeliveryTime
    .replace("-", " - ")
    .replace(":", "h")
    .replace(":", "h");

  const infoDelivery = document.querySelector(".info-delivery .info strong");
  if (infoDelivery) {
    infoDelivery.textContent = `Giao ${timeText}, ${dateText}`;
  }

  closeTimeDeliveryPopup();
  showNotification("Đã cập nhật thời gian giao hàng", "success");
}

// Submit order
function submitOrder() {
  if (cartItems.length === 0) {
    showNotification("Giỏ hàng trống", "error");
    return;
  }

  // Open customer info popup
  openCustomerPopup();
}

// Open customer info popup
function openCustomerPopup() {
  const popup = document.getElementById("customerInfoPopup");
  if (popup) {
    popup.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

// Close customer info popup
function closeCustomerPopup() {
  const popup = document.getElementById("customerInfoPopup");
  if (popup) {
    popup.classList.remove("active");
    document.body.style.overflow = "";
  }
}

// Select sex
function selectSex(value) {
  document.getElementById("customerSex").value = value;

  // Update UI
  document.querySelectorAll(".sex-customer .sex-option").forEach((option) => {
    if (option.dataset.value === value.toString()) {
      option.classList.add("active");
    } else {
      option.classList.remove("active");
    }
  });
}

// Select consignee sex
function selectConsigneeSex(value) {
  document.getElementById("consigneeSex").value = value;

  // Update UI
  document
    .querySelectorAll(".consigneeBox .sex-customer .sex-option")
    .forEach((option) => {
      if (option.dataset.value === value.toString()) {
        option.classList.add("active");
      } else {
        option.classList.remove("active");
      }
    });
}

// Select delivery method
function selectDeliveryMethod(method) {
  document.getElementById("deliveryMethodPopup").value = method;

  // Update UI
  document.querySelectorAll(".deliveryMethod").forEach((item) => {
    if (item.dataset.method === method.toString()) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
}

// Toggle address input
function toggleAddressInput() {
  const addressInput = document.getElementById("addressInput");
  if (addressInput) {
    addressInput.classList.toggle("active");
  }
}

// Toggle consignee info
function toggleConsigneeInfo() {
  const consigneeSection = document.getElementById("consigneeSection");
  const checkbox = document.querySelector(".checkConsigneelnInstead");

  if (consigneeSection && checkbox) {
    consigneeSection.classList.toggle("active");
    checkbox.classList.toggle("active");
  }
}

// Submit customer info
function submitCustomerInfo() {
  // Validate form
  const cusName = document.getElementById("cusName").value.trim();
  const cusPhone = document.getElementById("cusPhone").value.trim();

  if (!cusName) {
    showNotification("Vui lòng nhập họ và tên", "error");
    return;
  }

  if (!cusPhone || cusPhone.length < 10) {
    showNotification("Vui lòng nhập đúng số điện thoại", "error");
    return;
  }

  // Check if consignee info is required
  const consigneeSection = document.getElementById("consigneeSection");
  if (consigneeSection && consigneeSection.classList.contains("active")) {
    const consigneeName = document.getElementById("consigneeName").value.trim();
    const consigneePhone = document
      .getElementById("consigneePhone")
      .value.trim();
    const consigneeSex = document.getElementById("consigneeSex").value;

    if (consigneeSex === "-1") {
      showNotification("Vui lòng chọn xưng hô người nhận", "error");
      return;
    }

    if (!consigneeName) {
      showNotification("Vui lòng nhập họ và tên người nhận", "error");
      return;
    }

    if (!consigneePhone || consigneePhone.length < 10) {
      showNotification("Vui lòng nhập đúng số điện thoại người nhận", "error");
      return;
    }
  }

  // Save cart items before clearing (to show in success page)
  const orderItems = [...cartItems];

  // Close popup
  closeCustomerPopup();

  // Show loading notification
  showNotification("Đang xử lý đơn hàng...", "info");

  // Simulate order processing
  setTimeout(() => {
    // Show order success page
    showOrderSuccessPage(cusName, cusPhone, orderItems);
  }, 1500);
}

// Show order success page
function showOrderSuccessPage(customerName, customerPhone, orderItems) {
  // Hide cart page, finaltotal, and empty cart
  const cartPage = document.querySelector(".cart-page");
  const finalTotal = document.querySelector(".finaltotal");
  const orderSuccessPage = document.getElementById("orderSuccessPage");
  const emptyCart = document.getElementById("emptyCart");

  if (cartPage) cartPage.style.display = "none";
  if (finalTotal) finalTotal.style.display = "none";
  if (emptyCart) emptyCart.style.display = "none";
  if (orderSuccessPage) orderSuccessPage.style.display = "block";

  // Generate order number
  const orderNumber = "#TGS" + Date.now().toString().slice(-8);
  document.getElementById("orderNumber").textContent = orderNumber;

  // Set customer info

  document.getElementById("customerNameSuccess").textContent = customerName;
  document.getElementById("receiverInfo").textContent =
    customerName + ", " + customerPhone;

  // Set total money
  const finalMoney = document.getElementById("finalTotalMoney");
  if (finalMoney) {
    document.getElementById("totalOrderMoney").textContent =
      finalMoney.textContent;
  }

  // Set accumulated points
  const accPoints = document.getElementById("accumulatedPoints");
  if (accPoints) {
    document.getElementById("accumulatedPointsSuccess").textContent =
      accPoints.textContent.replace(" điểm", "");
  }

  // Set selected payment method
  const selectedPayment = document.querySelector(".payment-method-item.active");
  if (selectedPayment) {
    const paymentText = selectedPayment.querySelector(
      ".payment-text span:last-child"
    ).textContent;
    document.getElementById("selectedPaymentMethod").textContent = paymentText;
  }

  // Set delivery address (from location)
  const addressText = document.querySelector(
    ".location-address .address-text a"
  );
  if (addressText) {
    document.getElementById("deliveryAddress").textContent =
      addressText.textContent + " (nhân viên sẽ gọi xác nhận trước khi giao)";
  }

  // Set delivery time
  const deliveryInfo = document.querySelector(".info-delivery .info strong");
  if (deliveryInfo) {
    document.getElementById("deliveryTimeSuccess").textContent =
      "Nhận hàng " + deliveryInfo.textContent.replace("Giao ", "");
  }

  // Build products list using saved orderItems
  const productsList = document.getElementById("deliveryProductsList");
  if (productsList && orderItems && orderItems.length > 0) {
    productsList.innerHTML = "";

    orderItems.forEach((item) => {
      const li = document.createElement("li");
      li.className = "delivery-product-item";
      li.innerHTML = `
        <div class="box-pro">
          <a href="product-detail.html" class="img-order">
            <img src="${item.image}" alt="${item.name}" loading="lazy" />
          </a>
          <div class="text-order">
            <a class="text-order__product-name" href="product-detail.html">
              ${item.name}
            </a>
            <div class="amount-color">
              <small>Màu: <small>${item.color || "Đen"}</small></small>
              <small>Số lượng: <small>${item.quantity}</small></small>
            </div>
          </div>
        </div>
      `;
      productsList.appendChild(li);
    });
  }

  // Clear cart after showing success
  cartItems = [];
  saveCartToStorage();
  updateCartCountFromStorage();

  // Scroll to top
  window.scrollTo(0, 0);
}

// Reset to cart view (when user clicks "Mua thêm sản phẩm khác")
function resetToCartView() {
  // Redirect to home page to continue shopping
  window.location.href = "index.html";
}

// Format money
function formatMoney(amount) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  })
    .format(amount)
    .replace("₫", "₫");
}

// Format number
function formatNumber(num) {
  return new Intl.NumberFormat("vi-VN").format(num);
}

// Show notification
function showNotification(message, type = "info") {
  // Remove existing notification
  const existingNotification = document.querySelector(".custom-notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification element
  const notification = document.createElement("div");
  notification.className = `custom-notification ${type}`;

  let icon = "";
  switch (type) {
    case "success":
      icon = "✓";
      break;
    case "error":
      icon = "✕";
      break;
    case "warning":
      icon = "⚠";
      break;
    default:
      icon = "ℹ";
  }

  notification.innerHTML = `
    <div class="notification-content">
      <span class="notification-icon ${type}">${icon}</span>
      <span class="notification-message">${message}</span>
    </div>
  `;

  document.body.appendChild(notification);

  // Auto remove after 3 seconds
  setTimeout(() => {
    notification.style.opacity = "0";
    notification.style.transform = "translateX(100%)";
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

// Handle click outside to close popups
document.addEventListener("click", function (e) {
  // Close color picker
  if (!e.target.closest(".product-color-wrapper")) {
    document
      .querySelectorAll(".color-picker-popup.active")
      .forEach((picker) => {
        picker.classList.remove("active");
      });
  }
});

// Update cart count from localStorage (if you're using localStorage)
function updateCartCountFromStorage() {
  const savedCart = localStorage.getItem("cart");
  if (savedCart) {
    try {
      cartItems = JSON.parse(savedCart);
      updateCartDisplay();
      checkCartEmpty();
    } catch (e) {
      console.error("Error loading cart from storage:", e);
    }
  }
}

// Save cart to localStorage
function saveCartToStorage() {
  try {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  } catch (e) {
    console.error("Error saving cart to storage:", e);
  }
}

// Call this when cart changes
function onCartChange() {
  updateCartDisplay();
  saveCartToStorage();
  checkCartEmpty();
}
