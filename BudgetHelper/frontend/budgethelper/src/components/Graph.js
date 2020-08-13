const Chart = window.Chart;
// Import React
/*import React from "react";
import ReactDOM from "react-dom";

// Import Tecton's `connect()` function
import { connect } from "q2-tecton-sdk";

// Import files we will create in the next steps
import TectonContext from "../contexts/tecton";
import App from "./AppData";

// Initialize your Tecton extension and then render the React app
connect().then(({ actions, sources }) => {
  renderApp(document.getElementById("app"), { actions, sources });
});*/

// var fs = require('fs');

var budgetAmount = 150.00;
// var c = document.getElementById("celebration"); // Congartulator
// c.style.display = "none"; //block // Congartulator

// var lastVisit = JSON.parse(fs.readFileSync("./src/last_visit.json", "utf-8")); // Congartulator
var transactionData = {
  data: {
    transactions: [{
      amount: -104,
      description: "cool money",
      postedDate: "2020-08-05T12:00:00.000-05:00"
    },{
      amount: -120.86,
      description: "cool money",
      postedDate: "2020-07-05T12:00:00.000-05:00"
    },{
      amount: -381,
      description: "cool money",
      postedDate: "2020-06-05T12:00:00.000-05:00"
    },{
      amount: -249,
      description: "cool money",
      postedDate: "2020-05-05T12:00:00.000-05:00"
    },{
      amount: -84.38,
      description: "cool money",
      postedDate: "2020-04-05T12:00:00.000-05:00"
    },{
      amount: -184.25,
      description: "cool money",
      postedDate: "2020-03-05T12:00:00.000-05:00"
    },{
      amount: -142.01,
      description: "cool money",
      postedDate: "2020-02-05T12:00:00.000-05:00"
    },{
      amount: -84,
      description: "cool money",
      postedDate: "2020-01-05T12:00:00.000-05:00"
    },{
      amount: -608,
      description: "cool money",
      postedDate: "2019-12-05T12:00:00.000-05:00"
    },{
      amount: -483.49,
      description: "cool money",
      postedDate: "2019-11-05T12:00:00.000-05:00"
    },{
      amount: -900.00,
      description: "Funds Transfer",
      postedDate: "2019-11-15T12:00:00.000-05:00"
    },{
      amount: -139.10,
      description: "cool money",
      postedDate: "2019-10-05T12:00:00.000-05:00"
    },{
      amount: -60,
      description: "cool money",
      postedDate: "2019-09-05T12:00:00.000-05:00"
    }
  ]}
}
// var transactionData = JSON.parse(fs.readFileSync("./src/transaction.json", "utf-8"));
var transactions = transactionData.data.transactions;
// An amount for each month
var amountSpent = [0.0, 0.0, 0.0, 0.0,
  0.0, 0.0, 0.0, 0.0,
  0.0, 0.0, 0.0, 0.0];

// This assumes that the first transaction is the most recent
var startYear = parseInt(transactions[0].postedDate.substring(0, 4));
var startMonth = parseInt(transactions[0].postedDate.substring(5, 7));
var transactionNum = 0;

// Add up amounts spent for each month
transactions.forEach(function(transaction) {
  var amount = parseFloat(transaction.amount);

  // Make sure transactions are only from the past 12 months
  // (I would use a BreakException to make this simpler, but that would assume the transactions are in reverse chonological order,
  // plus it seems that if there's a single error in this file- even if I catch it- the graph won't render)
  if ( (parseInt(transaction.postedDate.substring(0, 4)) === startYear - 1 && parseInt(transaction.postedDate.substring(5, 7)) > startMonth ) ||
  parseInt(transaction.postedDate.substring(0, 4)) === startYear) {
    transactionNum++;
    // I'm not sure if this "Funds Transfer" technique will be accurate with other data
    if (amount < 0 && transaction.description !== "Funds Transfer")
    {
      var index = 11 - startMonth + parseInt(transaction.postedDate.substring(5, 7));
      if (index > 11) { index -= 12 }
      amountSpent[index] -= amount;
    }
  }
});
var chartTitle = 'Spending Per Month (Last ' + transactionNum + ' Transactions)';

// Round each amount to two decimal places
for (var i = 0; i < amountSpent.length; i++) {
  amountSpent[i] = Math.round(amountSpent[i] * 100) / 100;
}

// Make the celebration message appear if the user stayed under budget last month
// Congartulator
/*var d = new Date();
var thisVisit = { month: d.getMonth(), year: d.getFullYear() };
if (thisVisit.year > lastVisit.year || (thisVisit.year == lastVisit.year && thisVisit.month > lastVisit.month) )
{
  if (amountSpent[10] < budgetAmount)
  { c.style.display = "block"; }
}*/

var underColor = 'rgba(0, 153, 255, 0.6)';
var underColorHi = 'rgba(0, 153, 255, 1)';
// putple: var overColor = 'rgba(177, 89, 224, 0.6)';
var overColor = 'rgba(120, 142, 184, 0.6)';
var overColorHi = 'rgba(120, 142, 184, 1)';
var barColors = [];
var barColorsHi = [];

var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
var monthOrder = [];
var nameIndex = startMonth - 1;

// Set bar colors and order of months (to be shown on the X axis)
for (var m = 11; m >= 0; m--)
{
  // TODO: Better way to do this?
  barColors[m] = (amountSpent[m] > budgetAmount) ? overColor : underColor;
  barColorsHi[m] = (amountSpent[m] > budgetAmount) ? overColorHi : underColorHi;
  monthOrder[m] = monthNames[nameIndex];

  nameIndex = (nameIndex <= 0) ? 11 : nameIndex - 1;
}
if (amountSpent[11] > budgetAmount)
{
  barColors[11] = 'rgba(245, 76, 145, 0.6)';
  barColorsHi[11] = 'rgba(245, 76, 145, 1)';
}

let myChart = document.getElementById('budgetChart').getContext('2d');
let spendingChart = new Chart(myChart, {
  plugins: {
    annotation: {
			// Defines when the annotations are drawn.
			// This allows positioning of the annotation relative to the other
			// elements of the graph.
			//
			// Should be one of: afterDraw, afterDatasetsDraw, beforeDatasetsDraw
			// See http://www.chartjs.org/docs/#advanced-usage-creating-plugins
			drawTime: 'afterDatasetsDraw', // (default)

			// Mouse events to enable on each annotation.
			// Should be an array of one or more browser-supported mouse events
			// See https://developer.mozilla.org/en-US/docs/Web/Events
			events: ['click'],

			// Double-click speed in ms used to distinguish single-clicks from
			// double-clicks whenever you need to capture both. When listening for
			// both click and dblclick, click events will be delayed by this
			// amount.
			dblClickSpeed: 350, // ms (default)

			// Array of annotation configuration objects
			// See below for detailed descriptions of the annotation options
			annotations: [{
				drawTime: 'afterDraw', // overrides annotation.drawTime if set
				id: 'a-line-1', // optional
				type: 'line',
				mode: 'horizontal',
				scaleID: 'y-axis-0',
				value: '25',
				borderColor: 'red',
				borderWidth: 2,

				// Fires when the user clicks this annotation on the chart
				// (be sure to enable the event in the events array below).
				onClick: function(e) {
					// `this` is bound to the annotation element
				}
			}]
		}
  },
  type: 'bar',
  data: {
    labels: monthOrder,
    datasets: [{
      label: 'Amount Spent',
      data: amountSpent,
      backgroundColor: barColors,
      hoverBackgroundColor: barColorsHi
    }]
  },
  options: {
    title: {
      display: true,
      text: chartTitle
    },
    legend: {
      display: false
    },
    scales: {
      yAxes: [{
          ticks: {
              beginAtZero: true
          }
      }]
    },
    tooltips: {
      enabled: true,
      mode: 'single',
      callbacks: {
          label: function(tooltipItems, data) { 
              return "$" + tooltipItems.yLabel + " Spent";
          }
      }
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'horizontal',
          scaleID: 'y-axis-0',
          value: budgetAmount,
          borderColor: 'rgba(90, 60, 230, 1)',
          borderWidth: 3,
          label: {
            content: 'Budget',
            enabled: true,
            position: "left"
          }
        }
      ]
    }
  }
});

// Adding the capabilities (actions and sources) to the Tecton
// Context we are about to create will make them available anywhere
// in the React app.
/*function renderApp(root, capabilities) {
  ReactDOM.render(
    <TectonContext.Provider value={capabilities}>
      <App />
    </TectonContext.Provider>,
    root
  );
}*/