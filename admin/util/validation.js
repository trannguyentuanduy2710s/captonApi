/**
 *
 * @param  value Giá trị chuỗi cần kiểm tra
 * @param  minLength Chiều dài tối thiểu của chuỗi cần kiểm tra
 * @param  maxLength Chiều dài tối đa của chuỗi
 * @param selector selector của thẻ cần hiển thị looix
 * @param messErr Lỗi cần hiển thị lên UI nếu `value` không thỏa mãn điều kiện
 */
function kiemTraChuoi (value, minLength, maxLength, selector, messErr) {
    //Nếu như kiểm tra false
    if (value.trim().length < minLength || value.trim().length > maxLength) {
        getElement(selector).innerHTML = messErr
        return false
    }

    //Nếu như kiểm tra true
    getElement(selector).innerHTML = ''
    return true
}



/**
 * 
 * @param value chuỗi cần kiểm tra
 * @param selector Thẻ hiển thị lỗi
 * @param pattern chuỗi pattern để kiểm tra chuỗi
 * @param messErr Mess err cần hiển thị
 */
function kiemTraPattern (value, selector, pattern, messErr) {
    //Nếu chuỗi không thõa mãn pattern
    if (!pattern.test(value)) {
        getElement(selector).innerHTML = messErr
        return false
    }
    
    //Nếu đúng
    getElement(selector).innerHTML = ''
    return true
}




