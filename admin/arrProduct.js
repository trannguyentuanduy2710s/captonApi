class arrProduct{
    arr=[]

    pushArr =(arrAdd)=>{
        this.arr = this.arr.concat(arrAdd);
        // console.log("arrAdd: ", arrAdd);
    }
}

let ArrProduct = new arrProduct();
// console.log("ArrProduct: ", ArrProduct);
export default ArrProduct;