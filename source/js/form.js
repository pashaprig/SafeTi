function checkCountry(code) {
	var arr = ["UA"];
	return !arr.includes(code);
}
var input1 = document.querySelector("#phone1");
var phoneInput1 = window.intlTelInput(input1, {
	separateDialCode: true,
	utilsScript:
		"https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
	initialCountry: "auto",
	excludeCountries: ["UA"],
	geoIpLookup: function (success, failure) {
		$.get("https://ipinfo.io", function () {
		}, "jsonp").always(function (resp) {
			$("#country1").val(resp.country);
			$("#country2").val(resp.country);
			var countryCode = resp.country !== undefined && checkCountry(resp.country) ? resp.country : "RU";
			console.log(countryCode);
			success(countryCode);
		});
	},
});

$.validator.addMethod(
	"validNumber",
	function (value, element, params) {
		var obj = params.object;
		if (obj.isValidNumber()) {
			var num = obj.getNumber().replace("+", "");
			//console.log(num);
			$(element)
				.closest("form")
				.find(".hidden-phone")
				.val("+" + num);
		}
		return obj.isValidNumber();
	},
	"Введите правильный номер!"
);

// Запрет ввода в поля больше двух пробелов подряд
const nameForm1 = document.querySelector("#name");
const nameForm2 = document.querySelector("#name2");
const emailForm1 = document.querySelector("#email");
const emailForm2 = document.querySelector("#email2");

function removeExtraSpaces(e) {
	const valueWithoutSpaces = e.target.value.replace(/\s+/g, ' ').replace(/^\s+|\s+$/,'');
	e.target.value = valueWithoutSpaces
}
nameForm1.addEventListener("focusout", removeExtraSpaces);
nameForm2.addEventListener("focusout", removeExtraSpaces);

// Валидация формы
$.validator.addMethod(
	"alphanumeric",
	function (value, element) {
		return this.optional(element) || /^[a-zA-Zа-яА-ЯЁё\s]+$/.test(value.replace(/ +/g, ' ').trim()); //RU
	},
	"Имя может содержать только буквы!"
);
// Email validation
$.validator.addMethod("emailValidation", function(value, element) {
	return this.optional(element) || /^[a-zA-Z0-9_.!#$%&\'*+\-\/=?^_`{|}~]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?){1,61}$/g.test( value );
}, "Введите правильный email!");


function removeDotsHyphens(e){
	const valueWithoutDotsHyphens = e.target.value.replace(/\.+/g,'.').replace(/-{2,}/g,'--').replace(/^\.|^-*/,'').replace(/\.@/,'@');
	e.target.value = valueWithoutDotsHyphens;
}
emailForm1.addEventListener("change", removeDotsHyphens);
emailForm2.addEventListener("change", removeDotsHyphens);

//Trim whitespace on email input
$(function()
{
	$('input[type=email]').on('keypress', function(e)
	{
		if (e.which == 32)
			return false;
	});
});

$("#leadform1").validate({
	rules: {
		phone1: {
			required: true,
			validNumber: {
				object: phoneInput1,
			},
		},
		name: {
			required: true,
			alphanumeric: true,
		},
		email: {
			required: true,
			email:false,
			emailValidation: true,
		},
                agreement: {
                        required: true,
        }
                 
                
	},
	messages: {
		phone1: {
			required: "Это поле обязательное",
		},
		name: {
			required: "Это поле обязательное",
		},
		email: {
			required: "Это поле обязательное"
		},
                agreement: {
                        required: "Это поле обязательное"
                }
                      
	},
	submitHandler: function (form, event) {
		sendAjaxForm(form);
		return false;

	}
});

function sendAjaxForm(form) {
	$.ajax({
		url: $(form).attr('action'),
		type: "POST", //метод отправки
		dataType: "json", //формат данных
		data: $(form).serialize(),  // Сеарилизуем объект
		timeout: 30000,
		beforeSend: function () {
			$(form).find(".submit_btn ").html('Отправка');
			$(form).find(".submit_btn").prop('disabled', true); // disable button
		},

	}).done(function (response) { //Данные отправлены успешно
		let result = response;
		let url = result.url;
		//console.log(response);
		if (response.status === 'ok') {
			fbq('track', 'Lead');
			call_gtag();
			ttq.page();
			//console.log('Lead');
			$(form).find(".submit_btn").html('Данные отправлены успешно');
			if (response.url) {
				setTimeout(function () {
					window.location.href = response.url;
				}, 1000);
			} else {
				$(form).html('<div class="form_message success" style="display: block;margin:15px 0;background-color: #d4ffe0;border: 2px dashed #1f6b34;border-radius: 10px;padding: 20px;">Ваши данные успешно отправлены. Ожидайте звонка от нашего менеджера.</div>');
			}

		} else {
			$(form).find('.error.form_message').addClass('active');
			$(form).find('.error.form_message').html(response.message);
			$(form).find(".submit_btn ").html('Начать зарабатывать');
			$(form).find(".submit_btn").prop('disabled', false); // disable button
		}


	}).fail(function (response) { // Данные не отправлены
		//console.log(response);
		//console.log('Ошибка. Данные не отправлены.');
		$(form).find('.error.form_message').addClass('active');
		$(form).find('.error.form_message').html('Во время отправки данных произошла ошибка!');
		$(form).find(".submit_btn ").html('Начать зарабатывать');
		$(form).find(".submit_btn").prop('disabled', false); // disable button
	});
}

$(window).on("load", function () {
	setTimeout(function () {
		var mask1 = jQuery("#phone1").attr("placeholder").replace(/[0-9]/g, 9);

		$(document).ready(function () {
			jQuery("#phone1").mask(mask1, {autoclear: false});
		});

		jQuery("#phone1").on("countrychange", function (e, countryData) {
			jQuery("#phone1").val("");
			var mask1 = $("#phone1").attr("placeholder").replace(/[0-9]/g, 9);
			jQuery("#phone1").mask(mask1, {autoclear: false});
		});
	}, 1000);
});