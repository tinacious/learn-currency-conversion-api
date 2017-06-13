$(function () {
  
  var _ratesWithMultipliers = null;

  // DOM elements
  var $currencyList = $('#targetCurrency');
  var $convertedAmount = $('#convertedAmount');
  var $convertedCurrency = $('#convertedCurrency');

  // API call
  $.get('https://api.fixer.io/latest?base=CAD')
    .done(function (res) {
      // Successful API call
      var rates = Object.keys(res.rates);
      _ratesWithMultipliers = res.rates;

      // Dynamically create option elements and append to the currency select list
      rates.forEach(function (rate) {
        $('<option />')
          .val(rate)
          .text(rate)
          .appendTo($currencyList);
      });
    })
    .fail(function (err) {
      // Failed API call
      console.error(err);
    });
  

  function handleSubmit(evt) {
    evt.preventDefault();

    // Set up the variables at the top of the scope
    var amount = null;
    var conversionMultiplier = null;
    var convertedAmount = null;
    var conversionInfo = {}; // ConversionInfo object
    
    // DOM elements
    var $form = $(this);
    var formData = $form.serializeArray();

    formData.forEach(function (fieldObj) {
      var fieldName = fieldObj.name;
      var fieldValue = fieldObj.value;
      
      conversionInfo[fieldName] = fieldValue;
    });

    console.log('Conversion info', conversionInfo);

    // Math it!
    amount = Number(conversionInfo.baseCurrency);
    conversionMultiplier = _ratesWithMultipliers[conversionInfo.targetCurrency];
    convertedAmount = amount * conversionMultiplier; // here it is!

    console.log('Converted amount', convertedAmount);

    // Put it in the DOM
    $convertedAmount.text(convertedAmount);
    $convertedCurrency.text(conversionInfo.targetCurrency);
  }


  // Listen to form submission
  $('#currencyForm').on('submit', handleSubmit);
});