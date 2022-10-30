import "bootstrap/dist/css/bootstrap.css"
import "@fortawesome/fontawesome-free/css/all.css"
// 實作寫在這裡！
preventInputInvalid()

const container = document.querySelector(".container")
const cart = document.querySelector(".cart-item-table tbody")
const itemInput = document.querySelectorAll(".quantity")

//加到購物車//
let catsInCart = []
itemInput.forEach((input) => {
  catsInCart.push(input.parentElement.previousElementSibling.textContent)
})
const addCatBtn = document.querySelectorAll(".btn-warning")
addCatBtn.forEach((catBtn) => {
  catBtn.addEventListener("click", (e) => {
    let target = e.currentTarget
    if (isCatInCart(target)) {
      //已經有//
      let cartCatIndex = isCatInCart(target) - 1
      let theCatCounts = document.querySelectorAll(
        ".cart-item-table tbody input"
      )
      theCatCounts[cartCatIndex].value =
        Number(theCatCounts[cartCatIndex].value) + 1
      const itemChanged = theCatCounts[cartCatIndex].parentElement.parentElement
      subTotal(itemChanged)
      totalAmount()
    } else {
      //沒有//
      catCartHTML(target)
      preventInputInvalid()
      totalAmount()
    }
  })
})

//清空購物車//
const emptyCartBtn = document.querySelector(".empty-cart")
emptyCartBtn.addEventListener("click", () => {
  cart.innerHTML = ""
  totalAmount()
})
//表單內//
cart.addEventListener("click", (e) => {
  const targetClass = e.target.classList
  //項目數量變更//
  if (targetClass.contains("quantity")) {
    subTotal(e.target.parentElement.parentElement)
    totalAmount()
  }
  //刪除項目 icon//
  else if (targetClass.contains("fa-trash-alt")) {
    e.target.parentElement.parentElement.parentElement.remove()
    totalAmount()
  }
  //刪除項目 按鈕//
  else if (e.target.firstElementChild.classList.contains("fa-trash-alt")) {
    e.target.parentElement.parentElement.remove()
    totalAmount()
  }
})

function preventInputInvalid() {
  document.querySelectorAll("input").forEach((input) => {
    input.setAttribute("min", "1")
  })
}

function subTotal(itemChangedTr) {
  itemChangedTr.children[3].textContent = `$${
    itemChangedTr.children[1].firstElementChild.value *
    Number(itemChangedTr.children[2].innerHTML.replace("$", ""))
  }`
}

function totalAmount() {
  const itemInput = document.querySelectorAll(".quantity")
  const totalPrice = document.querySelector(".total-price")
  const subTotals = []
  itemInput.forEach((input) => {
    const subTotalColumn =
      input.parentElement.nextElementSibling.nextElementSibling
    subTotals.push(Number(subTotalColumn.textContent.replace("$", "")))
  })
  if (subTotals.length) {
    var subTotalAmount = subTotals.reduce((arr, num) => {
      return arr + num
    })
  } else {
    var subTotalAmount = 0
  }
  totalPrice.innerHTML = `$${subTotalAmount.toFixed(2)}`
}

function catCartHTML(target) {
  const catName =
    target.previousElementSibling.previousElementSibling.textContent
  const catPrice = target.previousElementSibling.textContent
  const newCartItem = `<tr>
    <td>${catName}</td>
    <td><input type="number" class="quantity" value="1" /></td>
    <td>${catPrice}</td>
    <td>${catPrice}</td>
    <td>
      <button class="remove-item-btn btn btn-danger btn-sm">
        <i class="fas fa-trash-alt"></i>
      </button>
    </td>
  </tr>`
  cart.insertAdjacentHTML("beforeend", newCartItem)
}
function isCatInCart(target) {
  const itemInput = document.querySelectorAll(".quantity")
  const catsInCart = []
  itemInput.forEach((input) => {
    catsInCart.push(input.parentElement.previousElementSibling.textContent)
  })
  const indexOfTargetCat = catsInCart.indexOf(
    target.previousElementSibling.previousElementSibling.textContent
  )

  if (indexOfTargetCat !== -1) {
    return indexOfTargetCat + 1
  } else {
    return false
  }
}
