let tableTemplate = document.querySelector("#cartTable tbody");
// let productTable = tableTemplate.rows[0];
// productTable.remove();

let productTable2 = tableTemplate.querySelector("tr.product")
let productTable = document.querySelector("#cartTable tbody tr.product");
productTable.remove();
let giftTable = document.querySelector("#cartTable tbody tr.gift");
giftTable.remove();
let promotion_code = document.querySelector(".promotion_code");
promotion_code.querySelector(".code_discount").textContent = "";

let total = 0;

async function loadCartList() {
  try {
    let res = await fetch("/cart/item");
    let items = await res.json();
    tableTemplate.textContent = "";
    for (let id in items) {
      //item -> qty
      let subtotal = 0;
      let node = productTable.cloneNode(true);
      let qty = items[id];
      let res = await fetch(`/cart/name/${id}`);
      let item = await res.json();
      console.log("returned item:", item);
      let name = item.name;
      let price = item.price;
      node.querySelector("[class='item_name']").textContent = name;
      node.querySelector("[class='unit_price']").textContent = price;
      node.querySelector("[class='quantity']").textContent = qty;
      let minusOne = node.querySelector("[class='minusOne']");
      let plusOne = node.querySelector("[class='plusOne']");
      subtotal += price * qty;
      node.querySelector("[class='item_total_price']").textContent = subtotal;

      minusOne.addEventListener("click", () => editQty("minus"));
      plusOne.addEventListener("click", () => editQty("plus"));

      async function editQty(condition) {
        try {
          let res;
          switch (condition) {
            case "minus":
              res = await fetch("/cart/cart", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  id: id,
                  operation: "reduce",
                }),
              });
              break;
            case "plus":
              res = await fetch("/cart/cart", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  id: id,
                  operation: "add",
                }),
              });
              break;
            default:
              return;
          }
          let json = await res.json();
          if (json.error) {
            let toast = await toastController.create({
              message: json.error,
              color: "danger",
              duration: 4000,
            });
            toast.present();
            return;
          }
          qty = json.count;
          node.querySelector("[class='quantity']").textContent = qty;
          subtotal = price * qty;
          node.querySelector("[class='item_total_price']").textContent =
            subtotal;
          countTotal();
          return;
        } catch (error) {
          let toast = await toastController.create({
            message: "載入失敗",
            color: "danger",
            duration: 3000,
          });
          toast.present();
          return;
        }
      }
      tableTemplate.appendChild(node);
    }
  } catch (error) {
    let toast = await toastController.create({
      message: "初始化失敗",
      color: "danger",
      duration: 4000,
    });
    toast.present();
    return;
  }
}
loadCartList();

async function loadVIP() {
  try {
    let vip_discount = document.querySelector(".vip_discount");
    let res = await fetch("/vip");
    let json = await res.json();
    let is_vip = json.is_vip;
    if (is_vip == true) {
      vip_discount.textContent = "10% off";
    } else {
      vip_discount.textContent = "0";
    }
    if (json.role == "staff") {
      vip_discount.textContent = "20% off";
    }
  } catch (error) {
    let toast = await toastController.create({
      message: "載入失敗",
      color: "danger",
      duration: 4000,
    });
    toast.present();
    return;
  }
}
loadVIP();

async function useCoupon() {
  let promotion_code = document.querySelector(".promotion_code");
  let code = promotion_code.querySelector(".code_input").value;
  let res = await fetch(`customer/coupon`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      code: code,
    }),
  });
  let json = await res.json();
  if (json.error) {
    let toast = await toastController.create({
      message: String(json.error),
      color: "danger",
      duration: 3000,
    });
    toast.present();
    return;
  }
  console.log(json);
  promotion_code.querySelector(".code_discount").textContent =
    json.couponAmount;
  document.querySelector(".total_amount").textContent = json.amount;
  return;
}

async function loadRefund() {
  try {
    let res = await fetch("/cart/credit");
    let json = await res.json();
    console.log("credit json:", json);
    let credit = document.querySelector(".credit");
    if (json.credit) {
      credit.textContent = json.credit;
    } else {
      credit.textContent = "0";
    }
  } catch (error) {
    let toast = await toastController.create({
      message: "載入失敗",
      color: "danger",
      duration: 4000,
    });
    toast.present();
    return;
  }
}
loadRefund();

async function countTotal() {
  try {
    let total_amount = document.querySelector(".total_amount");
    let res = await fetch("/cart/amount");
    let amount = await res.json();
    console.log("amount:", amount);
    total_amount.textContent = amount;
  } catch (error) {
    let toast = await toastController.create({
      message: "載入失敗",
      color: "danger",
      duration: 4000,
    });
    toast.present();
    return;
  }
}
countTotal();

async function checkCart() {
  try {
    let res = await fetch("/cart/item");
    let json = await res.json();
    // console.log(Object.keys(json).length);
    if (Object.keys(json).length == 0) {
      let toast = await toastController.create({
        message: "購物車內未有商品",
        color: "danger",
        duration: 4000,
      });
      toast.present();
      return;
    }
    location.href = "/shipment.html";
  } catch (error) {
    let toast = await toastController.create({
      message: "購物車內未有商品",
      color: "danger",
      duration: 4000,
    });
    toast.present();
    return;
  }
}

// let addBackTable = document.querySelector("#addBack");
// let addBackBody = addBackTable.rows[0];
// addBackTable.remove();

// Display all items in session.inactive_item
// async function loadAddBackList() {
//   let items = await fetch("/inactive_cart");
//   for (let item of items) {
//     let node = addBackBody.cloneNode(true);
//     node.cells[0].textContent = item.name;
//     node.cells[1].textContent = item.price;
//     node.cells[2].innerHTML = `
//         <ion-buttons  style="justify-content: center;">
//         <ion-button onclick="addBack(${item})">
//             <ion-icon name="add-outline"></ion-icon>
//         </ion-button>
//         </ion-buttons>
//         `;
//   }
// }

// async function addBack(index) {
//   let id = session.inactive_item[index].id;
//   await fetch("/cart", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       id: id,
//     }),
//   });
//   await fetch("/inactive_cart", {
//     method: "PATCH",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       index: index,
//       operation: "remove",
//     }),
//   });
//   loadCartList();
// }
