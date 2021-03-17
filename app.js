//listen for submit
document.getElementById('loan-form').addEventListener('submit', function (e) {
  e.preventDefault();
  //hide results 
  document.getElementById('results').style.display = 'none';
  //show loader
  document.getElementById('loading').style.display = 'block';
  setTimeout(calculate, 2000);

});

//function calculate
function calculate() {

  console.log('calculando...');

  //getting UI variables

  const amountUI = document.getElementById('amount');
  const interestUI = document.getElementById('interest');
  const years = document.getElementById('years');

  const monthlyPaymentUI = document.getElementById('monthly-payment');
  const totalPaymentUI = document.getElementById('total-payment');
  const totalInterestUI = document.getElementById('total-interest');

  //parsing vars

  const principal = parseFloat(amountUI.value);
  const calculatedInterest = parseFloat(interestUI.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  //compute monthly payments

  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPaymentUI.value = monthly.toFixed(2);
    totalPaymentUI.value = (monthly * calculatedPayments).toFixed(2);
    totalInterestUI.value = ((monthly * calculatedPayments) - principal).toFixed(2);

    //show results 
    document.getElementById('results').style.display = 'block';

    //hide loader
    document.getElementById('loading').style.display = 'none';
  } else {
    console.log('please check your numbers!');
    showError('Please Check your numbers!');
  }
}

//creating showError func

function showError(error) {

  //show results 
  document.getElementById('results').style.display = 'none';

  //hide loader
  document.getElementById('loading').style.display = 'none';

  //create div
  const errorDiv = document.createElement('div');

  //get Elements 
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  //Add class
  errorDiv.className = 'alert alert-danger';

  //create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  //insert error above heading
  card.insertBefore(errorDiv, heading);

  //clear error after 3s
  setTimeout(clearError, 3000);

}

//creating the function clear error 
function clearError() {
  document.querySelector('.alert').remove();
}