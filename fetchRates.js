/*
Download (mb AJAX) currency exchange rates against RUB --
20 positions (mb as JSON), monthly average values, 3 years 
(2014-2016) (36 points)
Get historical rates for any day since 1999.
http://api.fixer.io/2016-12-15?base=RUB
*/
const NUM_POINTS = 12 * 3;
const data = [];
const urlDomain = 'https://api.fixer.io/';
const urlQuery = 'base=RUB';


const day = 15;
let month = 0;
let year = 2014;
let date = '2014-01-15';



for (var i = 0; i < NUM_POINTS; i++) {
  // Change date
  if (month < 12) {
    month++;
  } else { // Next year
    month = 1;
    year++;
  }

  // Create date string in format: YYYY-MM-DD
  date = year.toString() + '-' + 
    ("0" + month.toString()).slice(-2) + '-' + 
    day.toString();

  let endpoint = urlDomain + '/' + date + '?' + urlQuery;

  $.getJSON(endpoint, success = function (json) {
    data.push(json);
  });

}

