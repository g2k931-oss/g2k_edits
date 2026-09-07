let paybtn = document.querySelector("button");
let amount = document.getElementById("amount");
paybtn.addEventListener("click", ()=> {
    let amountentered = amount.value;
    window.location.href = `upi://pay?pa=abhishekidkshina@fam&pn=Abhishek%20Maitra&am=${amountentered}&cu=INR`;
});
