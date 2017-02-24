console.log("Highcharts.version:",Highcharts.version);

ratesNames = [
'AUD', 'BGN', 'BRL', 'CAD', 'CHF',
'CNY', 'CZK', 'DKK', 'EUR', 'GBP',

'HKD', 'HRK', 'HUF', 'IDR', 'ILS',
'INR', 'JPY', 'KRW', 'LTL', 'MXN',

'MYR', 'NOK', 'NZD', 'PHP', 'PLN',
'RON', 'SEK', 'SGD', 'THB', 'TRY',

'USD', 'ZAR', 
];


$(document).ajaxStop( function() {


  const ratesSeries = ratesNames.map(function (rateName) {
    let arr = preparePlotData(rateName);
    return {
      name: rateName,
      data: arr,
    };
  });

  Highcharts.chart('container', {

    title: {
      text: 'Курс основных валют к рублю, 2014-2016'
    },

    subtitle: {
      text: 'Источник: api.fixer.io'
    },

    yAxis: {
      title: {
        text: 'Стоимость единицы валюты в рублях'
      }
    },
    xAxis: {
      type: 'datetime'
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle'
    },

    plotOptions: {
      // lineWidth: 1,
    },

    series: ratesSeries,
    // [{
    //   name: 'AUD',
    //   data: preparePlotData('AUD')
    // }, 
    // {
    //   name: 'BGN',
    //   data: preparePlotData('BGN')
    // },
    // {
    //   name: 'Sales & Distribution',
    //   data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
    // }, {
    //   name: 'Project Development',
    //   data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
    // }, {
    //   name: 'Other',
    //   data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
    // }
    // ]

  });
});


  // Create array of pairs [date, rate]
  function preparePlotData(currencyName) {
    return data
    .map(function (value) {
      let _year = parseInt( value.date.slice(0, 4) );
      let _month = parseInt( value.date.slice(5, 7) );

      return [Date.UTC(_year, _month-1, day), 1.0 / value.rates[ currencyName ]];
    })
    .sort(function (a, b) {
      let aDate = a[0];
      let bDate = b[0];
      return aDate - bDate;
    })
  };
