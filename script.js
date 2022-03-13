const amountInput = document.querySelector(".form-text");
const tipsBtnParent = document.querySelector(".tip-buttons");
const formPanel = document.querySelector(".form-panel");
const tipInfo = document.querySelector(".tip-info-parent");
let tipPercentage;
let tipAmount;

//Render Component
const renderComponent = (data, target) => {
  target.innerHTML = "";

  //create mark up
  const html = `
    <div class="detail">
      <h3 class="detail-title">$ ${data.totalAmount}</h3> 
      <p class="amount">$ ${data.amount}</p>
      <p class="tip-amount">$ ${data.tipAmount} (${
    data.tipPercentage * 100
  }%+)</p>
    </div>
    `;

  //insert markup to dom
  target.insertAdjacentHTML("afterbegin", html);
};

//Calculate tip
const calculateTip = (amount, tipPercent) => {
  //calculate tip amount
  tipAmount = amount * tipPercent;

  //return total amount
  return amount + tipAmount;
};

//Tipbutton parent
tipsBtnParent.addEventListener("click", (e) => {
  //check target
  if (e.target.classList.contains("btn")) {
    //get data tip
    tipPercentage = +e.target.dataset.tip;

    //get target child's parent
    const parent = e.target.closest(".tip-buttons");

    //get target parent children
    const btns = parent.querySelectorAll(".btn");

    //remove active
    btns.forEach((btn) => btn.classList.remove("active"));

    //add active to target children
    document
      .querySelector(`.btn-${e.target.dataset.id}`)
      .classList.add("active");
  }
});

//Form panel
formPanel.addEventListener("submit", (e) => {
  //prevent default
  e.preventDefault();

  //check input
  if (!amountInput.value) {
    alert(`Please don't leave the input blank!`);
  } else {
    //amount
    const amount = +amountInput.value;

    //get total amount
    const totalAmount = calculateTip(amount, tipPercentage);

    //call render component
    renderComponent(
      {
        amount: amount,
        tipAmount: tipAmount,
        totalAmount: totalAmount,
        tipPercentage: tipPercentage,
      },
      tipInfo
    );

    //empty string
    amountInput.value = "";
  }
});
