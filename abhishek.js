let paybtn = document.querySelector("button");
let amount = document.getElementById("amount");
let amountentered = amount.value;
paybtn.addEventListener("click", ()=> {
    window.location.href = `upi://pay?pa=abhishekidkshina@fam&pn=Abhishek%20Maitra&am=${amountentered}&cu=INR`;
});