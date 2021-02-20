//Organic vs Paid Chart
if (document.getElementById('organicVsPaid')) {
  let chartOrganicVsPaid = document.getElementById('organicVsPaid').getContext('2d');
  let organicVsPaid = new Chart(chartOrganicVsPaid, {
      type: 'line',
      data: {
          labels: ["Jan '20", "Feb '20", "Mar '20", "Apr '20", "May '20", "Jun '20", "Jul '20", "Aug '20", "Sep '20", "Oct '20", "Nov '20", "Dec '20"],
          datasets: [
            {
              label: 'Organic Clicks',
              data: [4776, 6071, 5384, 4870, 8126, 5784, 4642, 4713, 4666, 5667, 4867, 4724],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(255, 99, 132, 1)',
                  'rgba(255, 99, 132, 1)',
                  'rgba(255, 99, 132, 1)',
                  'rgba(255, 99, 132, 1)',
                  'rgba(255, 99, 132, 1)',
                  'rgba(255, 99, 132, 1)',
                  'rgba(255, 99, 132, 1)',
                  'rgba(255, 99, 132, 1)',
                  'rgba(255, 99, 132, 1)',
                  'rgba(255, 99, 132, 1)',
                  'rgba(255, 99, 132, 1)'
              ],
              borderWidth: 1
            },
            {
              label: 'Paid Clicks',
              data: [1594, 1988, 2033, 5648, 5548, 4138, 5097, 3954, 2548, 4460, 3800, 6066],
              backgroundColor: [
                  'rgba(54, 162, 235, 0.2)'
              ],
              borderColor: [
                  'rgba(54, 162, 235, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(54, 162, 235, 1)'
              ],
              borderWidth: 1
            }
          ]
      },
      options: {
        title: {
          display: true,
          text: 'Organic vs Paid Google Clicks',
          fontFamily: 'Montserrat',
          fontSize: 22,
          fontColor: '#333',
          fontStyle: 'normal'
        },
        legend: {
          display: true,
          align: 'end'
        },
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          }
      }
  });
  
}

//Organic Clicks Comparison
if (document.getElementById('organicComparison')) {
  let chartOrganicComparison = document.getElementById('organicComparison').getContext('2d');
  let organicComparison = new Chart(chartOrganicComparison, {
      type: 'line',
      data: {
          labels: ["Jan '20", "Feb '20", "Mar '20", "Apr '20", "May '20", "Jun '20", "Jul '20", "Aug '20", "Sep '20", "Oct '20", "Nov '20", "Dec '20"],
          datasets: [
            { //Site 1
              label: 'Site 1',
              data: [4776, 6071, 5384, 4870, 8126, 5784, 4642, 4713, 4666, 5667, 4867, 4724],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(255, 99, 132, 1)',
                  'rgba(255, 99, 132, 1)',
                  'rgba(255, 99, 132, 1)',
                  'rgba(255, 99, 132, 1)',
                  'rgba(255, 99, 132, 1)',
                  'rgba(255, 99, 132, 1)',
                  'rgba(255, 99, 132, 1)',
                  'rgba(255, 99, 132, 1)',
                  'rgba(255, 99, 132, 1)',
                  'rgba(255, 99, 132, 1)',
                  'rgba(255, 99, 132, 1)'
              ],
              borderWidth: 1
            },
            { //Site 2
              label: 'Site 2',
              data: [1594, 1988, 2033, 5648, 5548, 4138, 5097, 3954, 2548, 4460, 3800, 6066],
              backgroundColor: [
                  'rgba(54, 162, 235, 0.2)'
              ],
              borderColor: [
                  'rgba(54, 162, 235, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(54, 162, 235, 1)'
              ],
              borderWidth: 1
            },
            { //Site 3
              label: 'Site 3',
              data: [2776, 4071, 1384, 870, 1126, 3784, 6642, 7713, 5666, 6667, 7867, 5724],
              backgroundColor: [
                  'rgba(255, 206, 86, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 206, 86, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(255, 206, 86, 1)'
              ],
              borderWidth: 1
            },
            { //Site 4
              label: 'Site 4',
              data: [1776, 2071, 3384, 1870, 2126, 784, 3642, 2713, 3666, 2667, 1867, 2724],
              backgroundColor: [
                  'rgba(153, 102, 255, 0.2)'
              ],
              borderColor: [
                  'rgba(153, 102, 255, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(153, 102, 255, 1)'
              ],
              borderWidth: 1
            },
            { //Site 5
              label: 'Site 5',
              data: [8776, 9071, 10384, 11870, 12126, 11784, 13642, 12713, 12666, 10667, 9867, 8724],
              backgroundColor: [
                  'rgba(75, 192, 192, 0.2)'
              ],
              borderColor: [
                  'rgba(75, 192, 192, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(75, 192, 192, 1)'
              ],
              borderWidth: 1
            }
          ]
      },
      options: {
        title: {
          display: true,
          text: 'Organic Clicks Comparision',
          fontFamily: 'Montserrat',
          fontSize: 22,
          fontColor: '#333',
          fontStyle: 'normal'
        },
        legend: {
          display: true,
          align: 'end'
        },
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          }
      }
  });
  
}


//Paid Clicks Comparison
if (document.getElementById('paidComparison')) {
  let chartPaidComparison = document.getElementById('paidComparison').getContext('2d');
  let paidComparison = new Chart(chartPaidComparison, {
      type: 'line',
      data: {
          labels: ["Jan '20", "Feb '20", "Mar '20", "Apr '20", "May '20", "Jun '20", "Jul '20", "Aug '20", "Sep '20", "Oct '20", "Nov '20", "Dec '20"],
          datasets: [
            { //Site 1
              label: 'Site 1',
              data: [4776, 6071, 5384, 4870, 8126, 5784, 4642, 4713, 4666, 5667, 4867, 4724],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(255, 99, 132, 1)',
                  'rgba(255, 99, 132, 1)',
                  'rgba(255, 99, 132, 1)',
                  'rgba(255, 99, 132, 1)',
                  'rgba(255, 99, 132, 1)',
                  'rgba(255, 99, 132, 1)',
                  'rgba(255, 99, 132, 1)',
                  'rgba(255, 99, 132, 1)',
                  'rgba(255, 99, 132, 1)',
                  'rgba(255, 99, 132, 1)',
                  'rgba(255, 99, 132, 1)'
              ],
              borderWidth: 1
            },
            { //Site 2
              label: 'Site 2',
              data: [1594, 1988, 2033, 5648, 5548, 4138, 5097, 3954, 2548, 4460, 3800, 6066],
              backgroundColor: [
                  'rgba(54, 162, 235, 0.2)'
              ],
              borderColor: [
                  'rgba(54, 162, 235, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(54, 162, 235, 1)'
              ],
              borderWidth: 1
            },
            { //Site 3
              label: 'Site 3',
              data: [2776, 4071, 1384, 870, 1126, 3784, 6642, 7713, 5666, 6667, 7867, 5724],
              backgroundColor: [
                  'rgba(255, 206, 86, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 206, 86, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(255, 206, 86, 1)'
              ],
              borderWidth: 1
            },
            { //Site 4
              label: 'Site 4',
              data: [1776, 2071, 3384, 1870, 2126, 784, 3642, 2713, 3666, 2667, 1867, 2724],
              backgroundColor: [
                  'rgba(153, 102, 255, 0.2)'
              ],
              borderColor: [
                  'rgba(153, 102, 255, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(153, 102, 255, 1)'
              ],
              borderWidth: 1
            },
            { //Site 5
              label: 'Site 5',
              data: [8776, 9071, 10384, 11870, 12126, 11784, 13642, 12713, 12666, 10667, 9867, 8724],
              backgroundColor: [
                  'rgba(75, 192, 192, 0.2)'
              ],
              borderColor: [
                  'rgba(75, 192, 192, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(75, 192, 192, 1)'
              ],
              borderWidth: 1
            }
          ]
      },
      options: {
        title: {
          display: true,
          text: 'Paid Clicks Comparision',
          fontFamily: 'Montserrat',
          fontSize: 22,
          fontColor: '#333',
          fontStyle: 'normal'
        },
        legend: {
          display: true,
          align: 'end'
        },
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          }
      }
  });
  
}