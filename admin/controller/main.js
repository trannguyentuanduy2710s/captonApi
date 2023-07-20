import Phone from "../../admin/model/products.js";
import { DOMAIN } from "../../admin/constants/api.js";
import ArrProduct from "../arrProduct.js";

const getElement = (selector) => document.querySelector(selector)


const getPhoneList = () => {
    const promise = axios({
        url: DOMAIN,
        method: 'GET',
    })

    promise
        //get data thành công
        .then((result) => {
            ArrProduct.pushArr(result.data);
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
            <tr>
                
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.price.toLocaleString()}-VND</td>
                <td>
                    <image
                       src=${item.img} 
                            style='width: 100px; height: 100px; object-fit: cover; object-position: center'
                        />
                    </td>
                <td>${item.desc}</td>
                <td>
                    <div style='max-width: 200px'>
                        <button 
                            class='btn btn-danger' 
                            onclick="deletePhone(${item.id})"
                        >
                            Delete
                        </button>
                        <button 
                            class='btn btn-success ml-3' 
                            data-bs-toggle="modal" 
                            data-bs-target="#exampleModal"
                            onclick="editPhone(${item.id})"
                        >
                            Edit
                        </button>
                    </div>
                </td>
            </tr>
        `;
    });

    getElement('#tbody').innerHTML = htmlContent;
}


const layThongTinPhone = () => {
    const elements = document.querySelectorAll(
        '.modal-body input'
    )

    let phone = {}
    elements.forEach((ele) => {
        const { name, value } = ele
        phone[name] = value
    })

    const { name, price, screen, backCamera, frontCamera, img, desc, type, id} = phone

    return new Phone(name, price, screen, backCamera, frontCamera, img, desc, type, id)

    //  //Validation
    //  let isValid = true

    //  //Kiểm tra Phone Name
    //  isValid &= kiemTraChuoi(phone.name, 1, undefined, '#tbTen', '(*)This field cannot be empty')

    //  //Kiểm tra Price
    //  isValid &= kiemTraChuoi(phone.price, 1, undefined, '#tbTen', '(*)This field cannot be empty') && kiemTraPattern (phone.price, '#tbTKNV', /^[0-9]+$/, '(*)Price must be a number')

    //  //Kiểm tra Phone Screen
    //  isValid &= kiemTraChuoi(phone.screen, 1, undefined, '#tbTen', '(*)This field cannot be empty')

    //  //Kiểm tra Phone Back Camera
    //  isValid &= kiemTraChuoi(phone.backCamera, 1, undefined, '#tbTen', '(*)This field cannot be empty')

    //  //Kiểm tra Phone Front Camera
    //  isValid &= kiemTraChuoi(phone.frontCamera, 1, undefined, '#tbTen', '(*)This field cannot be empty')

    //  //Kiểm tra Phone Image link
    //  isValid &= kiemTraChuoi(phone.img, 1, undefined, '#tbTen', '(*)This field cannot be empty')

    //  //Kiểm tra Phone Description
    //  isValid &= kiemTraChuoi(phone.desc, 1, undefined, '#tbTen', '(*)This field cannot be empty')

    //  return isValid ? nhanVien : undefined //(Toán tử 3 ngôi)
}

// ẩn btn cập nhật khi click vào btn add products
getElement('#btnAddProduct').onclick = () => {
    // ẩn btn cập nhật
    getElement('#btnEdit').style.display = 'none'

    // show lại btn thêm món ăn
    getElement('#btnAddPhone').style.display = 'inline-block'
}

//gọi API thêm product vào DB
getElement('#btnAddPhone').onclick = () => {
    // lấy thông tin product từ input
    const phone = layThongTinPhone()
    // console.log("phone: ", phone);

    // call API thêm product
    const promise = axios({
        url: DOMAIN,
        method: 'POST',
        data: {
            ...phone,

        },
    })

    promise
        // thêm mới thành công
        .then((result) => {
            // get lại danh sách phones
            getPhoneList()

            // đóng modal sau khi thêm thành công
            getElement('.btn-close').click()
        })

        // thêm mới thất bại
        .catch((err) => {
            console.log('err: ', err)
        })
}

//Xóa product
window.deletePhone = (id) => {
    // call API xóa product
    const promise = axios({
        url: `${DOMAIN}/${id}`,
        method: 'DELETE',
    })

    promise
        // Xóa thành công
        .then(() => {
            // get lại danh sách products sau khi xóa thành công
            getPhoneList()
        })
        // Xóa thất bại
        .catch((err) => {
            console.log(err)
        })
}

// EDIT Phone
window.editPhone = (id) => {
    // ẩn btn thêm 
    getElement('#btnAddPhone').style.display = 'none'

    //Show button cập nhật
    getElement('#btnEdit').style.display = 'inline-block'

    getElement('#btnEdit').setAttribute('data-id', id)

    // call API lấy thông tin product
    const promise = axios({
        url: `${DOMAIN}/${id}`,
        method: 'GET',
    })

    promise
        .then((result) => {
            const elements = document.querySelectorAll(
                '.modal-body input'
            )
            elements.forEach((ele) => {
                const { name } = ele
                ele.value = result.data[name]
            })
        })
        .catch((err) => {
            console.log(err)
        })
}

getElement('#btnEdit').onclick = () => {
    //Lấy thông tin product từ input
    const phone = layThongTinPhone()

    //Lấy id thông qua thuộc tính set attribute
    const id = getElement('#btnEdit').getAttribute('data-id')

    //call API cập nhật DB
    const promise = axios({
        url: `${DOMAIN}/${id}`,
        method: 'PUT',
        data: {
            ...phone,
        },
    })

    promise.then(() => {
        //get lại danh sách sau khi cập nhật thành công
        getPhoneList()

        // đóng modal sau khi thêm thành công
        getElement('.btn-close').click()

        // xóa attribute data-id
        getElement('#btnEdit').toggleAttribute('data-id', false)
    })
        .catch((err) => {
            console.log(err)
        })
}


// SEARCH Phone
getElement('#txtSearch').addEventListener('keyup', function(){
    var valueSearch = getElement('#txtSearch').value.toLowerCase()
    let arrFindProduct = [];
    ArrProduct.arr.map((product)=>{
        // console.log("product: ", product);
        let regex = new RegExp(valueSearch.trim(), "g");
        let matches = product.name.toLowerCase().match(regex);
        matches && arrFindProduct.push(product);
        return product;
    })

    renderTable(arrFindProduct)
    console.log("arrFindProduct: ", arrFindProduct);
})
    


// Sort
getElement('#Sort').onchange = () => {
    var x = getElement('#Sort').value
    if (x == 'loai1') {
        let duy = ArrProduct.arr.sort((a,b) => {
           return a.price - b.price;
        })
        renderTable(duy)
        
   }else if (x == "loai2") {
    let duy = ArrProduct.arr.sort((a,b) => {
        return b.price - a.price;
     })
     renderTable(duy)
   }
}

