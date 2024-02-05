// $("input").prop('required', true);
//  $("#cc-exp input").attr("required")
//  $("#cc-cvc input").attr("required")

//function of getting card information
function get_card_dataa() {
	$.ajax({
		method: 'GET',
		url: '/payment/card_info/',
		success: function (res) {
			//console.log(res, 'res')
			if (res.status) {

				// geting name, cardNo, exp month/year
				var fullName = res.fullname;
				var cardNum = res.data.card.last4;
				var exp_mnth = res.data.card.exp_month;
				var exp_year = res.data.card.exp_year;
				$('#cardNum').empty();
				$(".card-spinner").hide() //hide loader when data came from API
				$("#expiration2").show()
				$("#cardHolder").show()
				$("#cardNum").show()
				$('#cardNum').html(`#### #### #### ${cardNum}`); //showing last 4 digits of card no
				$('#mnth').html(`${exp_mnth}`); //showing exp month
				$('#year').html(`${exp_year}`); //showing exp year
				$('#cardHolder').html(`${fullName}`) //showing full name 
			} else {
				//showing no data if card not found
				$(".card-not-found").show()
				$(".main-card").hide()
				ShowNoty(res.error, 'error')
				$('#cardNum').empty();
				$(".card-spinner").hide()
				$("#expiration2").show()
				$("#cardHolder").show()
				$("#cardNum").show()
				$('#cardNum').html("#### #### #### ####");
				$('#mnth').html(`MM`);
				$('#year').html(`YY`);
				$('#cardHolder').html(`John Doe`)
			}
		}
	})

}

//sending data of a form 
$('#btn-submitt').on('click', function () {
	var formData = $('#card-formm').serializeArray();
	console.log(formData, 'formData')
})
//calling a function
get_card_dataa()

var cardNumberElement
var cardExpiryElement
var cardCvcElement
$(document).ready(function () {
	//API of getting public keys
	$.ajax({
		method: 'GET',
		url: '/payment/get_public_key/',
		success: function (res) {
			var pk_key = res.key;
			//initialize Stripe of speicific keys
			var stripe = Stripe(pk_key);
			//initialize stripe elements
			var elements = stripe.elements();
			//stripe styles
			var style = {
				base: {
					iconColor: "#666EE8",
					color: "#31325F",
					lineHeight: "40px",
					fontWeight: 400,
					fontSize: "14px",

					"::placeholder": {
						color: "70709e",
						fontWeight: 400,
						fontSize: "14px"
					}
				}
			};
			//creating cardNumber input 
			cardNumberElement = elements.create("cardNumber", {
				showIcon: true,
				style: style,
				placeholder: 'Card Number: #### #### #### #### ',
			});
			cardNumberElement.mount("#cc-numberr");

			//creating expiry input
			cardExpiryElement = elements.create("cardExpiry", {
				style: style,
				placeholder: 'Expiry Date: MM/YY',
			});
			cardExpiryElement.mount("#cc-expp");

			//creating CVC input
			cardCvcElement = elements.create("cardCvc", {
				style: style
			});
			cardCvcElement.mount("#cc-cvcc");

			//function of having a result whether success or error..
			function setOutcome(result) {
				var successElement = document.querySelector(".successs");
				var errorElement = document.querySelector(".errorr");
				successElement.classList.remove("visible");
				errorElement.classList.remove("visible");

				//checking if token generate or not..
				if (result.token) {
					// In this example, we're simply displaying the token
					successElement.querySelector(".tokenn").textContent = result.token.id;
					successElement.classList.add("visible");
					$('#tokenn').val(result.token.id)
					// In a real integration, you'd submit the form with the token to your backend server
					//var form = document.querySelector('form');
					//form.querySelector('input[name="token"]').setAttribute('value', result.token.id);
					//form.submit();
				}
				//showing error if token not generated
				else if (result.error) {
					errorElement.textContent = result.error.message;
					errorElement.classList.add("visible");
				}
			}

			//function runs onchange input
			cardNumberElement.on('change', function (event) {
				setOutcome(event);

			});

			//initializing different Stripe cards..
			var cardBrandToPfClass = {
				visa: "pf-visa",
				mastercard: "pf-mastercard",
				amex: "pf-american-express",
				discover: "pf-discover",
				diners: "pf-diners",
				jcb: "pf-jcb",
				unknown: "pf-credit-card"
			};

			//function of brand icons on input fields
			function setBrandIconn(brand) {
				var brandIconElement = document.getElementById("brand-icon");
				var pfClass = "pf-credit-card";
				if (brand in cardBrandToPfClass) {
					pfClass = cardBrandToPfClass[brand];
				}
				for (var i = brandIconElement.classList.length - 1; i >= 0; i--) {
					brandIconElement.classList.remove(brandIconElement.classList[i]);
				}
				brandIconElement.classList.add("pf");
				brandIconElement.classList.add(pfClass);
			}
			//swtich icons in onChange method
			cardNumberElement.on("change", function (event) {
				// Switch brand logo if card number valid  
				if (event.brand) {
					setBrandIconn(event.brand);
				}
				setOutcome(event);
			});

			//onSubmit function:- Promise of creating tokens and then calling function of stripe elements to generate tokens from API..
			document.querySelector(".paymentt").addEventListener("submit", function (e) {
				e.preventDefault();
				var options = {};
				stripe.createToken(cardNumberElement, options).then(setOutcome);
			});
		}
	})

})

$(".successs").hide();

//Submit click button to save and confirm all inputs
$('.btn--paymentt').on('click', function () {

	var setInterr = setInterval(submitTokenn, 1000)

	//function of submitting a token
	function submitTokenn() {

		var token = $('#tokenn').val();
		if (token !== '' && token !== undefined) {
			clearInterval(setInterr)
			var token = $('#tokenn').val();
			var data = {
				card_token: token
			}
			if ($("#cc-cvcc").hasClass("StripeElement--complete") && $("#cc-numberr ").hasClass("StripeElement--complete") && $("#cc-expp").hasClass("StripeElement--complete")) {
				$("#expiration2").hide()
				$("#cardHolder").hide()
				$("#cardNum").hide()
				$(".card-spinner").show()
				$.ajax({
					method: 'POST',
					url: '/payment/user_update_card/',
					data: data,
					success: function (res) {
						//console.log(res)
						$(".successs").show();
						window.location.reload();
						// cardNumberElement.clear();
						// cardExpiryElement.clear();
						// cardCvcElement.clear();
						// get_card_data()


					},

					//showing error if token not genrated or having API status false.
					error: function (res) {
						ShowNoty(res.statusText, 'error')
						setTimeout(() => {
							$("#expiration2").show()
							$("#cardHolder").show()
							$("#cardNum").show()
							$(".card-spinner").hide()
						}, 1000);
					}
				})
			}
		}

	}
});

const card = document.querySelector('#card'),
	btnOpenForm = document.querySelector('#btn-open-form'),
	form = document.querySelector('#card-formm'),
	cardNumber = document.querySelector('#card .number'),
	cardName = document.querySelector('#card .name'),
	brandLogo = document.querySelector('#brand-logo'),
	signature = document.querySelector('#card .signature p'),
	monthExpDate = document.querySelector('#card .month'),
	yearExpDate = document.querySelector('#card .year');
ccv = document.querySelector('#card .ccv');

// * Flip the card to show the front and vice versa.
const flipCard = () => {
	if (card.classList.contains('active')) {
		card.classList.remove('active');
	}
}

// * Card rotation
card.addEventListener('click', () => {
	card.classList.toggle('active');
});


// * Button to open the form
btnOpenForm.addEventListener('click', () => {
	btnOpenForm.classList.toggle('active');
	form.classList.toggle('active');
});

// * Select month dynamically.
for (let i = 1; i <= 12; i++) {
	let option = document.createElement('option');
	option.value = i;
	option.innerText = i;
	form?.selectMonth?.appendChild(option);
}

// * Select year dynamically.
const currentYear = new Date().getFullYear();
for (let i = currentYear; i <= currentYear + 8; i++) {
	let option = document.createElement('option');
	option.value = i;
	option.innerText = i;
	form?.selectYear?.appendChild(option);
}


form?.inputNumber?.addEventListener('keyup', (e) => {
	let inputValue = e.target.value;

	form.inputNumber.value = inputValue
		// Reject Spaces
		.replace(/\s/g, '')
		// Reject letters
		.replace(/\D/g, '')
		// Place an space each four numbers
		.replace(/([0-9]{4})/g, '$1 ')
		// Delete the last space
		.trim();

	cardNumber.textContent = inputValue;

	if (inputValue == '') {
		cardNumber.textContent = '#### #### #### ####';

		brandLogo.innerHTML = '';
	}

	if (inputValue[0] == 4) {
		brandLogo.innerHTML = '';
		const image = document.createElement('img');
		image.src = 'https://raw.githubusercontent.com/falconmasters/formulario-tarjeta-credito-3d/master/img/logos/visa.png';
		brandLogo.appendChild(image);
	} else if (inputValue[0] == 5) {
		brandLogo.innerHTML = '';
		const image = document.createElement('img');
		image.src = 'https://raw.githubusercontent.com/falconmasters/formulario-tarjeta-credito-3d/master/img/logos/mastercard.png';
		brandLogo.appendChild(image);
	}

	// Card is flipped to the front to be shown to the user
	flipCard();
});


// * Input Card Holder's Name
form?.inputHolder?.addEventListener('keyup', (e) => {
	let inputValue = e.target.value;

	form.inputHolder.value = inputValue.replace(/[0-9]/g, '');
	cardName.textContent = inputValue;
	signature.textContent = inputValue;

	if (inputValue == '') {
		cardName.textContent = 'Jhon Doe';
	}

	flipCard();
});

// * Select Month
form?.selectMonth?.addEventListener('change', (e) => {
	monthExpDate.textContent = e.target.value;
	flipCard();
});

// * Select Year
form?.selectYear?.addEventListener('change', (e) => {
	yearExpDate.textContent = e.target.value.slice(2);
	flipCard();
});

// * CCV
form?.inputCCV?.addEventListener('keyup', () => {
	if (!card.classList.contains('active')) {
		card.classList.toggle('active');
	}

	form.inputCCV.value = form.inputCCV.value
		// Reject Spaces
		.replace(/\s/g, '')
		// Reject letters
		.replace(/\D/g, '');

	ccv.textContent = form.inputCCV.value;
});

const cards = document.querySelectorAll('li[data-pattern]')
