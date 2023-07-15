import Phone from "../../admin/model/products.js";
import { DOMAIN } from "../../admin/constants/api.js";

const getElement = (selector) => document.querySelector(selector)

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
            <tr>
                
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.price}</td>
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
                            onclick="deleteFood(${item.id})"
                        >
                            Delete
                        </button>
                        <button 
                            class='btn btn-success ml-3' 
                            data-toggle="modal" 
                            data-target="#exampleModal"
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

    const { name, price, screen, backCamera, frontCamera, img, desc, type, id } = phone

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


//gọi API thêm product vào DB
getElement('#btnsave').onclick = () => {
    // lấy thông tin product từ input
    const phone = layThongTinPhone()
    console.log('food: ', phone)

    // call API thêm product
    const promise = axios({
        url: DOMAIN,
        method: 'POST',
        data: {
            ...phone,
            // loaiMon: food.mapLoaiMon(),
            // tinhTrang: food.mapTinhTrang(),
        },
    })

    promise
        // thêm mới thành công
        .then((result) => {
            // get lại danh sách phones
            getPhoneList()

            // đóng modal sau khi thêm thành công
            //getElement('.btn.btn-secondary').click()
        })

        // thêm mới thất bại
        .catch((err) => {
            console.log('err: ', err)
        })
}

// Xóa product
// window.deletePhone = (id) => {
//     console.log({ id })
//     // call API xóa product
//     const promise = axios({
//         url: `${DOMAIN}/${id}`,
//         method: 'DELETE',
//     })

//     promise
//         // Xóa thành công
//         .then(() => {
//             // get lại danh sách food sau khi xóa thành công
//             getPhoneList()
//         })
//         // Xóa thất bại
//         .catch((err) => {
//             console.log(err)
//         })
// }

// EDIT Phone
// window.editPhone = (id) => {
//     // ẩn btn thêm product
//     getElement('#btnThemMon').style.display = 'none'

//     //Show button cập nhật
//     getElement('#btnCapNhat').style.display = 'inline-block'


//     getElement('#btnCapNhat').setAttribute('data-id', id)

//     console.log(id)
//     // call API lấy thông tin product
//     const promise = axios({
//         url: `${DOMAIN}/${id}`,
//         method: 'GET',
//     })

//     promise
//         .then((result) => {
//             const elements = document.querySelectorAll(
//                 '#foodForm input, #foodForm select, #foodForm textarea'
//             )
//             elements.forEach((ele) => {
//                 const { name } = ele
//                 ele.value = result.data[name]
//             })
//         })
//         .catch((err) => {
//             console.log(err)
//         })
// }

// getElement('#btnCapNhat').onclick = () => {
//     //Lấy thông tin product từ input
//     const phone = layThongTinPhone()

//     //call API cập nhật DB
//     const promise = axios({
//         url: `${DOMAIN}/${id}`, //id từ đâu chưa biết
//         method: 'PUT',
//         data: {
//             ...phone,
//             loaiMon: food.mapLoaiMon(),
//             tinhTrang: food.mapTinhTrang(),
//         },
//     })

//     promise.then(() => {
//         //get lại danh sách món ăn sau khi cập nhật thành công
//         getPhoneList()

//         // đóng modal sau khi thêm thành công
//         getElement('.btn.btn-secondary').click()

//         // xóa attribute data-id
//         getElement('#btnCapNhat').toggleAttribute('data-id', false)
//     })
//         .catch((err) => {
//             console.log(err)
//         })
// }

// Tìm kiếm sinh viên
// getElement('#searchName').addEventListener('keyup', function () {
//     var valueSearch = getElement('#searchName').value.toLowerCase()
//     var arrSearch = []
//     for (var i = 0; i < dsnv.arrNV.length; i++) {
//         var loaiNV = dsnv.arrNV[i].loaiNV().toLowerCase()
//         if (loaiNV.indexOf(valueSearch) !== -1) {
//             arrSearch.push(dsnv.arrNV[i])
//         }
//     }
//     renderdsnv(arrSearch)
// })