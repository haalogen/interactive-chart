console.log("Highcharts.version:",Highcharts.version);

const btnChartType = document.querySelector('#btn-chartType');
const ratesNames = [
'AUD', 'BGN', 'BRL', 'CAD', 'CHF',
'CNY', 'CZK', 'DKK', 'EUR', 'GBP',

'HKD', 'HRK', 'HUF', 'IDR', 'ILS',
'INR', 'JPY', 'KRW', 'LTL', 'MXN',

// 'MYR', 'NOK', 'NZD', 'PHP', 'PLN',
// 'RON', 'SEK', 'SGD', 'THB', 'TRY',

'USD', 'ZAR', 
];
let ratesSeries = [];
let chartType = 'column';

$(document).ajaxStop( function() {

  ratesSeries = ratesNames.map(function (rateName) {
    let arr = preparePlotData(rateName);
    return {
      name: rateName,
      data: arr,
    };
  });

  renderChart(chartType);
  });
  


  // Create array of pairs [date, rate]
  function preparePlotData(currencyName) {
    return data
    .map(function (value) {
      // Get year & month from date string
      let _year = parseInt( value.date.slice(0, 4) );
      let _month = parseInt( value.date.slice(5, 7) );

      return [
        Date.UTC(_year, _month-1, day), 
        (1.0 / value.rates[ currencyName ])
      ];
    })
    // Sort by Date
    .sort(function (a, b) {
      let aDate = a[0];
      let bDate = b[0];
      return aDate - bDate;
    })
  };

function renderChart(chartType) {
    Highcharts.chart('container', {
    chart: {
      type: chartType
    },
    
    title: {
      text: 'Курс основных валют к рублю, 2014-2016'
    },

    subtitle: {
      text: 'Источник: api.fixer.io'
    },

    yAxis: {
      min: 0,
      title: {
        text: 'Стоимость единицы валюты (руб)'
      },
    },
    xAxis: {
      categories: [
      'Jan-14', 'Feb-14', 'Mar-14', 'Apr-14', 'May-14', 'Jun-14', 
      'Jul-14', 'Aug-14', 'Sep-14', 'Oct-14', 'Nov-14', 'Dec-14',

      'Jan-15', 'Feb-15', 'Mar-15', 'Apr-15', 'May-15', 'Jun-15', 
      'Jul-15', 'Aug-15', 'Sep-15', 'Oct-15', 'Nov-15', 'Dec-15',

      'Jan-16', 'Feb-16', 'Mar-16', 'Apr-16', 'May-16', 'Jun-16', 
      'Jul-16', 'Aug-16', 'Sep-16', 'Oct-16', 'Nov-16', 'Dec-16'
      ],
      crosshair: true,
      
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle'
    },

    plotOptions: {
      column: {
            groupPadding: 0.1,
            pointPadding: 0,
            borderWidth: 0
        }
    },

    series: ratesSeries.map(function (currency) {
      return { 
        name: currency.name,
        data: 
        currency.data.map(function (day) {
          return day[1];
        })
      };
    }),

    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: 
          '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.4f} </b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },

  });
}

btnChartType.addEventListener('click', () => {
  if (chartType === 'line') {
    chartType = 'column';
  } else {
    chartType = 'line';
  }
  renderChart(chartType);
});