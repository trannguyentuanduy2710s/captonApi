document.getElementById('btnsave').onclick = function checkForm(){
   var taiKhoan = document.getElementById('taikhoan').value
   var matKhau = document.getElementById('matkhau').value

   if(taiKhoan === "duytran" && matKhau === "duy123"){
        window.location.replace('http://127.0.0.1:5501/admin/view/index.html'); 
   }else{
    document.getElementById('btnThongbao').innerHTML = "Sao mà dô được"
   }
}


