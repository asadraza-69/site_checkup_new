
$(document).on('click', '#buy_subscription', function () {
	$(".health_spinner_webb").show()
	$(this).prop("disabled", true);
	$.ajax({
		method: 'GET',
		url: '/subscription/service_subscription/',
		success: function (response) {
			if (response.status) {
				ShowNoty(response.message, "success")
				$("#subscription_modal").modal('hide')
			} else {
				ShowNoty(response.message, "error")
			}
		}
	})
});


// $(".conect_g_analytics_neww").on('click', function () {
// 	$(".health_spinner_webb").hide()
// 	$('#buy_subscription').prop("disabled", false);
// 	$.ajax({
// 		method: 'GET',
// 		url: `/subscription/check_service_subscription/`,
// 		success: function (response) {
// 			// console.log("new respin", response)
// 			if (response.status) {
// 				$('.top_spinner').show();
// 				$(".google_spinner").css("opacity", "1")
// 				$('.google_spinner1').css('opacity', '1');
// 				var project_id = $('.radio :selected').first().attr('data-id')
// 				const perm_url = window.location.origin + '/site_audit/get_auth_url/?project_id=' + project_id;
// 				$.ajax({
// 					method: 'GET',
// 					url: perm_url,
// 					success: function (response) {
// 						if (response.status) {
// 							$('.top_spinner').hide();
// 							let auth_url = response.auth_url;
// 							window.location.href = auth_url
// 						} else {
// 							ShowNoty('Somthing went wrong', 'error');
// 							$('.top_spinner').hide();
// 							// $('.google_spinner').hide();
// 							$(".google_spinner").css("opacity", "0")
// 							$('.google_spinner1').css('opacity', '0');

// 						}
// 					}
// 				})
// 			} else {
// 				$.ajax({
// 					method: 'GET',
// 					url: '/payment/check_user_card/',
// 					success: function (response) {
// 						if (response.status) {
// 							$("#subscription_modal").modal('show')
// 						} else {
// 							$("#cardInfoModal").modal("show")
// 						}
// 					}
// 				})

// 			}
// 		}
// 	})
// })

var cardNumberElement
var cardExpiryElement
var cardCvcElement
$(document).ready(function () {
	$.ajax({
		//         method:'GET',
		url: '/payment/get_public_key/',
		success: function (res) {
			var pk_key = res.key;
			var stripe = Stripe(pk_key);
			var elements = stripe.elements();

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

			cardNumberElement = elements.create("cardNumber", {
				showIcon: true,
				style: style,
				placeholder: 'Card Number: #### #### #### #### ',
			});
			cardNumberElement.mount("#cc-number");

			cardExpiryElement = elements.create("cardExpiry", {
				style: style,
				placeholder: 'Expiry Date: MM/YY',
			});
			cardExpiryElement.mount("#cc-exp");

			cardCvcElement = elements.create("cardCvc", {
				style: style
			});
			cardCvcElement.mount("#cc-cvc");

			function setOutcome(result) {
				var successElement = document.querySelector(".success");
				var errorElement = document.querySelector(".error");
				successElement.classList.remove("visible");
				errorElement.classList.remove("visible");

				if (result.token) {
					// In this example, we're simply displaying the token
					successElement.querySelector(".token").textContent = result.token.id;
					successElement.classList.add("visible");
					$('#token').val(result.token.id)
					// In a real integration, you'd submit the form with the token to your backend server
					//var form = document.querySelector('form');
					//form.querySelector('input[name="token"]').setAttribute('value', result.token.id);
					//form.submit();
				} else if (result.error) {
					errorElement.textContent = result.error.message;
					errorElement.classList.add("visible");
				}
			}
			cardNumberElement.on('change', function (event) {
				setOutcome(event);

			});
			var cardBrandToPfClass = {
				visa: "pf-visa",
				mastercard: "pf-mastercard",
				amex: "pf-american-express",
				discover: "pf-discover",
				diners: "pf-diners",
				jcb: "pf-jcb",
				unknown: "pf-credit-card"
			};

			function setBrandIcon(brand) {
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
			cardNumberElement.on("change", function (event) {
				// Switch brand logo
				if (event.brand) {
					setBrandIcon(event.brand);

				}
				setOutcome(event);
			});

			document.querySelector(".payment").addEventListener("submit", function (e) {
				e.preventDefault();
				var options = {};
				stripe.createToken(cardNumberElement, options).then(setOutcome);
			});
		}
	})

})
$(".success").hide();
$('.btn--payment').on('click', function () {

	var setInter = setInterval(submitToken, 1000)
	function submitToken() {

		var token = $('#token').val();
		if (token !== '' && token !== undefined) {
			clearInterval(setInter)
			var token = $('#token').val();
			var data = {
				card_token: token
			}
			if ($("#cc-cvc").hasClass("StripeElement--complete") && $("#cc-number ").hasClass("StripeElement--complete") && $("#cc-exp").hasClass("StripeElement--complete")) {
				$("#expiration2").hide()
				$("#cardHolder").hide()
				$("#cardNum").hide()
				$(".card-spinner").show()
				// console.log("hello", data)
				// hello
				$.ajax({
					method: 'POST',
					url: '/payment/create_customer/',
					data: data,
					success: function (res) {
						console.log(res)
						$(".success").show();
						ShowNoty(res.message, 'success')
						$("#cardInfoModal").modal("hide")
						setTimeout(() => {
							window.location.reload();
						}, 100);

						// cardNumberElement.clear();
						// cardExpiryElement.clear();
						// cardCvcElement.clear();
						// get_card_data()
					},
					error: function (res) {
						ShowNoty(res.message, 'error')
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
