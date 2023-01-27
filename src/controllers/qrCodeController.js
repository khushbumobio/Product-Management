// const QRCode = require('qrcode')
// const generateQR = async text =>{
//     try{
//         console.log(await QRCode.toDataURL(text));
//     }catch(error){
//         console.log(error)
//     }
// }
// generateQR("http://yahoo.com")


// const generateQR = async text =>{
//     try{
//         console.log(await QRCode.toString(text,{type :'terminal'}));
//     }catch(error){
//         console.log(error)
//     }
// }
// generateQR("http://yahoo.com")


// const generateQR = async text =>{
//     try{
//         await QRCode.toFile("src/image/yahoo-qr-code1.png",text);
//     }catch(error){
//         console.log(error)
//     }
// }
// generateQR("test","test1")



const QRCode = require('qrcode');
const path ='src/images/'

// QRCode.toString('data',(err,data)=>{
//     if(err) throw err;
//     console.log(data)
// })

QRCode.toFile('src/images/qrcode.png','random data',(err,data)=>{
    if(err) throw err;
    console.log(data)
})
