import Phone from '../../customer/model/products.js'
import { DOMAIN } from '../../customer/constants/api.js'


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
            <div class="col-3 item container text-center">
                <div class="content">
                    <th>
                        <image
                            src=${item.img} 
                            style="object-fit: cover; object-position: center"/>
                    </th>
                    <th><p>${item.name}</p></th>
                    <th><p>${item.price.toLocaleString()}</p></th>
                    <th><p>${item.desc}</p></th>
                    <div class="button">
                        <a href="${item.link}">VIEW MORE</a>
                    </div>
                </div>
            </div>
        `;
    });

    getElement('.item_main').innerHTML = htmlContent;
}


