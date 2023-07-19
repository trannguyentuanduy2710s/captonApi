import Phone from '../../customer/model/products.js'
import { DOMAIN } from '../../customer/constants/api.js'
import cartItem from '../../customer/model/cartItem.js'

let iconCart = document.querySelector('.iconCart')
let cart = document.querySelector('.cart')
let container = document.querySelector('.container')
let close = document.querySelector('.close')

const getElement = (selector) => document.querySelector(selector)



iconCart.addEventListener('click', function(){
    if(cart.style.right == '-100%'){
        cart.style.right = '0';
        container.style.transform = 'translateX(-400px)';
    }else{
        cart.style.right = '-100%';
        container.style.transform = 'translateX(0)';
    }
})
close.addEventListener('click', function (){
    cart.style.right = '-100%';
    container.style.transform = 'translateX(0)';
})

const getPhoneList = () => {
    const promise = axios({
        url: DOMAIN,
        method: 'GET',
    })

    promise
        //get data thành công
        .then((result) => {
            renderTable(result.data)
        })
        .catch((err) => {
            console.log(err)
        })
}
getPhoneList()



function renderTable(arrPhone) {
    let htmlContent = '';
    arrPhone.forEach((item) => {
        htmlContent += `
            <div class="item">
                <div class="">
                    <img src="${item.img}" alt="">
                    <h2>${item.name}</h2>
                    <div class="price">$${item.price}</div>
                    <h2>${item.desc}</h2>
                    <button class="btnAdd" onclick="addCart(${item.id})">Add to cart</button>;  
                </div>
            </div>
        `;
    });

    getElement('.listProduct').innerHTML = htmlContent;
}

// let list = document.querySelectorAll('.listProduct .item')
// list.forEach(item => {
//     item.addEventListener('click', function(event){
//         if (event.target.classList.contains ('.btnAdd')) {
//             alert(123);
//         }
//     })
// })

// const layThongTinPhone = () => {
//     const elements = document.querySelectorAll(
//         '.modal-body input'
//     )

//     let phone = {}
//     elements.forEach((ele) => {
//         const { name, value } = ele
//         phone[name] = value
//     })

//     const { id, name, price, img, desc } = phone

//     return new cartItem(id, name, price, img, desc)
// }

// let arrCart = []

getElement('.btnAdd').onclick = () => {
       alert(1234); 
}



// let products = new cartItem;
// // get data from file json
// // fetch('cartItem.js')
// //     .then(response => response.json())
// //     .then(data => {
// //         products = data;
// //         addDataToHTML();
// // })

// //show datas product in list 
// function addDataToHTML(){
//     // remove datas default from HTML
//     let listProductHTML = document.querySelector('.listProduct');
//     listProductHTML.innerHTML = '';

//     // add new datas
//     if(products != null) // if has data
//     {
//         products.forEach(item => {
//             let newProduct = document.createElement('div');
//             newProduct.classList.add('item');
//             newProduct.innerHTML = 
//             `<img src="${item.img}" alt="">
//             <h2>${item.name}</h2>
//             <div class="price">$${item.price}</div>
//             <button onclick="addCart(${item.id})">Add To Cart</button>`;

//             listProductHTML.appendChild(newProduct);

//         });
//     }
// }

// let listCart = [];
// function checkCart(){
//     var cookieValue = document.cookie
//     .split('; ')
//     .find(row => row.startsWith('listCart='));
//     if(cookieValue){
//         listCart = JSON.parse(cookieValue.split('=')[1]);
//     }else{
//         listCart = [];
//     }
// }
// checkCart()


// window.addCart = ($idItem) => {
//     let itemCopy = JSON.parse(JSON.stringify(cartItem));
//     //// If this product is not in the cart
//     if(!listCart[$idItem]) 
//     {
//         listCart[$idItem] = itemCopy.filter(item => item.id == $idItem)[0];
//         listCart[$idItem].quantity = 1;
//     }else{
//         //If this product is already in the cart.
//         //I just increased the quantity
//         listCart[$idItem].quantity++;
//     }
//     document.cookie = "listCart=" + JSON.stringify(listCart) + "; expires=Thu, 31 Dec 2025 23:59:59 UTC; path=/;";
//     addCartToHTML();
// }
// addCartToHTML();

// function addCartToHTML(){
//     // clear data default
//     let listCartHTML = document.querySelector('.listCart');
//     listCartHTML.innerHTML = '';

//     let totalHTML = document.querySelector('.totalQuantity');
//     let totalQuantity = 0;
//     // if has product in Cart
//     if(listCart){
//         listCart.forEach(item => {
//             if(item){
//                 let newCart = document.createElement('div');
//                 newCart.classList.add('item');
//                 newCart.innerHTML = `
//                     <div>
//                         <img src="${item.img}" alt="">
//                         <div class="content">
//                             <div class="name">${item.name}</div>
//                             <div class="price">$${item.price} / 1 product</div>
//                         </div>
//                         <div class="quantity">
//                             <button onclick="changeQuantity(${item.id}, '-')">-</button>
//                             <span class="value">${item.quantity}</span>
//                             <button onclick="changeQuantity(${item.id}, '+')">+</button>
//                         </div>
//                     </div>    
//                 `;
//                 listCartHTML.appendChild(newCart);
//                 totalQuantity = totalQuantity + item.quantity;
//             }
//         })
//     }
//     totalHTML.innerText = totalQuantity;
// }

// window.changeQuantity = ($idItem, $type) => {
//     switch ($type) {
//         case '+':
//             listCart[$idItem].quantity++;
//             break;
//         case '-':
//             listCart[$idItem].quantity--;

//             // if quantity <= 0 then remove product in cart
//             if(listCart[$idItem].quantity <= 0){
//                 delete listCart[$idItem];
//             }
//             break;
    
//         default:
//             break;
//     }
//     // save new data in cookie
//     document.cookie = "listCart=" + JSON.stringify(listCart) + "; expires=Thu, 31 Dec 2025 23:59:59 UTC; path=/;";
//     // reload html view cart
//     addCartToHTML();
// }