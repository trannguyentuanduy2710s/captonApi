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
            //renderTable(result.data)
            addDataToHTML(result.data)
        })
        .catch((err) => {
            console.log(err)
        })
}
getPhoneList();

function addDataToHTML(arrPhone){
    // Xóa data nhập từ trang HTML
    let listProductHTML = document.querySelector('.listProduct');
    listProductHTML.innerHTML = '';

    // thêm data mới vào
    if(arrPhone != null) // nếu mảng có data
    {
        arrPhone.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('item');
            newProduct.innerHTML = 
            `<img src="${product.img}" alt="">
            <h2>${product.name}</h2>
            <div class="price">$${product.price}</div>
            <h2>${product.desc}</h2>
            <button onclick="addCart(${product.id})">Add To Cart</button>`;

            listProductHTML.appendChild(newProduct);

        });
    }
}

// function renderTable(arrPhone) {
//     let htmlContent = '';
//     arrPhone.forEach((item) => {
//         htmlContent += `
//             <div class="item">
//                 <div class="">
//                     <img src="${item.img}" alt="">
//                     <h2>${item.name}</h2>
//                     <div class="price">$${item.price}</div>
//                     <h2>${item.desc}</h2>
//                     <button onclick="addCart(${item.id})">Add to cart</button>
//                 </div>
//             </div>
//         `;
//     });

//     getElement('.listProduct').innerHTML = htmlContent;
// }



let listCart = [];
function checkCart(){
    var cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith('listCart='))
    if(cookieValue){
        listCart = JSON.parse(cookieValue.split('=')[1])
    }
    // else{
    //     listCart = []
    // }
}
checkCart();

window.addCart = (idProduct) => {
    //let productCopy = JSON.parse(JSON.stringify(cartItem))
    let productCopy = new cartItem

    if (!listCart[idProduct]) {
        let dataProduct = productCopy.filter(
            product => product.id === idProduct
        )[0]

        listCart[idProduct] = dataProduct
        listCart[idProduct].quantity = 1
    }else {
        listCart[idProduct].quantity++
    }
    

    addCartToHTML();
}
addCartToHTML();

// function addCart($idProduct) {
    

   
    
// }


function addCartToHTML () {
    let listCartHTML = document.querySelector('.listCart');
    listCartHTML.innerHTML = '';

    let totalHTML = document.querySelector('.totalQuantity');
    let totalQuantity = 0;

    if(listCart){
        listCart.forEach(product => {
            if(product){
                let newCart = document.createElement('div');
                newCart.classList.add('item');
                newCart.innerHTML = 
                    `<img src="${product.img}">
                    <div class="content">
                        <div class="name">${product.name}</div>
                        <div class="price">$${product.price} / 1 product</div>
                    </div>
                    <div class="quantity">
                        <button onclick="changeQuantity(${product.id}, '-')">-</button>
                        <span class="value">${product.quantity}</span>
                        <button onclick="changeQuantity(${product.id}, '+')">+</button>
                    </div>`;
                listCartHTML.appendChild(newCart);
                totalQuantity = totalQuantity + product.quantity;
            }
        })
    }
    totalHTML.innerText = totalQuantity;
}

function changeQuantity($idProduct, $type) {
    switch ($type) {
        case '+' :
            listCart[$idProduct].quantity++
            break
        case '-':
                listCart[$idProduct].quantity--
                if(listCart[$idProduct] <= 0){
                    delete listCart[$idProduct]
                }
            break
        default:
            break
    }
    let timeSave = "expires=Wed, 19 July 2025 23:59:59 UTC"
    document.cookie = "listCart="+JSON.stringify(listCart)+"; "+timeSave+"; path=/"

    addCartToHTML()
}


