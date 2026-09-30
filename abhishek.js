const payButton = document.querySelector("#contentbox > button");
const amountInput = document.getElementById("amount");
const qrModal = document.getElementById("qr-modal");
const qrCode = document.getElementById("qr-code");
const qrAmount = document.getElementById("qr-amount");
const directPayButton = document.getElementById("direct-pay");
const closeQrButton = document.getElementById("close-qr");
const clickSound = document.getElementById("click-sound");

const upiId = "abhishekidkshina@fam";
const payeeName = "Abhishek Maitra";

function createUpiUrl(amount) {
    const params = new URLSearchParams({
        pa: upiId,
        pn: payeeName,
        am: amount,
        cu: "INR",
        tn: "You made my day! Thanks for the creative fuel!",
    });

    return `upi://pay?${params.toString()}`;
}

function closeQrModal() {
    qrModal?.classList.remove("is-visible");
    qrCode?.removeAttribute("src");
}

function showPaymentQr() {
    const amount = Number(amountInput.value);

    if (!Number.isFinite(amount) || amount <= 0) {
        return;
    }

    amountInput.setCustomValidity("");
    const upiUrl = createUpiUrl(amount.toFixed(2));
    if (qrCode && qrAmount && directPayButton && qrModal) {
        qrCode.src = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(upiUrl)}`;
        qrAmount.textContent = `Amount: Rs. ${amount.toFixed(2)}`;
        directPayButton.dataset.upiUrl = upiUrl;
        qrModal.classList.add("is-visible");
    } else {
        window.location.href = upiUrl;
    }
}

amountInput?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();

        if (!Number.isFinite(Number(amountInput.value)) || Number(amountInput.value) <= 0) {
            amountInput.setCustomValidity("Enter an amount greater than zero.");
            amountInput.reportValidity();
            return;
        }

        showPaymentQr();
    }
});

payButton?.addEventListener("click", () => {
    if (clickSound) {
        clickSound.currentTime = 0;
        clickSound.play().catch(() => {});
    }

    if (!Number.isFinite(Number(amountInput.value)) || Number(amountInput.value) <= 0) {
        amountInput.setCustomValidity("Enter an amount greater than zero.");
        amountInput.reportValidity();
        return;
    }

    showPaymentQr();
});

directPayButton?.addEventListener("click", () => {
    if (clickSound) {
        clickSound.currentTime = 0;
        clickSound.play().catch(() => {});
    }

    if (directPayButton.dataset.upiUrl) {
        window.location.href = directPayButton.dataset.upiUrl;
    }
});

closeQrButton?.addEventListener("click", closeQrModal);

qrModal?.addEventListener("click", (event) => {
    if (event.target === qrModal) {
        closeQrModal();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeQrModal();
    }
});
