import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import moment from "moment";
import './App.css';

import { Bar } from 'react-chartjs-2';
import { Chart } from 'react-chartjs-2';

var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var URLSearchParams = require('url-search-params');
var d = new Date();
d.setDate(d.getDate() - 6);
var ds = [];
for (var i = 0; i < 7; i++){
  var str = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
  ds.push(str);  
  d.setDate(d.getDate() + 1);
}

class Dashboard extends Component {
    // Constructor 
    constructor(props) {
        super(props);
        // State holds relevant dates, total number of sightings, and data specifications

        this.state = {
            // Today's date
            dates: ds,
            // Total number of sightings in date range
            totalSightings: 0,
            // Data specifications
            data: [{
                type: "column",
                toolTipContent: "<b>{label} ({y})",
                indexLabelFontSize: 16,
                //indexLabel: "{label} ({y})",
                dataPoints: [
                    { y: 0, label: ds[0] },
                    { y: 0, label: ds[1] },
                    { y: 0, label: ds[2] },
                    { y: 0, label: ds[3] },
                    { y: 0, label: ds[4] },
                    { y: 0, label: ds[5] },
                    { y: 0, label: ds[6] },
                ],
            }],
        };
    }

    // Updates graph with data from database once component has mounted
    componentDidMount() {
        this.updateGraph();
    }

    // Updates the graph with new date range and data
    async updateGraph() {
        // Prepare array for new data
        var newData = Object.assign({}, this.state.data[0]);
        var newDataPoints = [];
        // Reset total number of sightings
        var total = 0;

        try {
            // Fetch the total number of sightings
            var fetchTotal = await fetch("/amazon/Sighting?lowDate=" + this.state.dates[0] + "&highDate=" + this.state.dates[6]);
            var totalSightings = await fetchTotal.json();
            console.log("total: " + totalSightings.count);
            total = total + totalSightings.count;

            // Fetch the number of visitors on day 0
            var fetchHappy = await fetch("/amazon/Sighting?lowDate=" + this.state.dates[0] + "&highDate=" + this.state.dates[0]);
            var day0 = await fetchHappy.json();
            console.log("Day1: " + day0.count);
            if ((total === 0) || (day0 === 0)) {
                var day0Label = this.state.dates[0] + ": " + 0.0 + "%";
            }
            else {
                var day0Label = this.state.dates[0] + ": " + ((day0.count / total) * 100).toFixed(1) + "%";
            }
            newDataPoints.push({ y: day0.count, label: day0Label });

            // Fetch the number of visitors on day 1
            var fetchHappy = await fetch("/amazon/Sighting?lowDate=" + this.state.dates[1] + "&highDate=" + this.state.dates[1]);
            var day1 = await fetchHappy.json();
            console.log("Day1: " + day1.count);
            if ((total === 0) || (day1 === 0)) {
                var day1Label = this.state.dates[1] + ": " + 0.0 + "%";
            }
            else {
                var day1Label = this.state.dates[1] + ": " + ((day1.count / total) * 100).toFixed(1) + "%";
            }
            newDataPoints.push({ y: day1.count, label: day1Label });

            // Fetch the number of visitors on day 2
            var fetchHappy = await fetch("/amazon/Sighting?lowDate=" + this.state.dates[2] + "&highDate=" + this.state.dates[2]);
            var day2 = await fetchHappy.json();
            console.log("Day1: " + day2.count);
            if ((total === 0) || (day2 === 0)) {
                var day2Label = this.state.dates[2] + ": " + 0.0 + "%";
            }
            else {
                var day2Label = this.state.dates[2] + ": " + ((day2.count / total) * 100).toFixed(1) + "%";
            }
            newDataPoints.push({ y: day2.count, label: day2Label });

            // Fetch the number of visitors on day 3
            var fetchHappy = await fetch("/amazon/Sighting?lowDate=" + this.state.dates[3] + "&highDate=" + this.state.dates[3]);
            var day3 = await fetchHappy.json();
            console.log("Day3: " + day3.count);
            if ((total === 0) || (day3 === 0)) {
                var day3Label = this.state.dates[3] + ": " + 0.0 + "%";
            }
            else {
                var day3Label = this.state.dates[3] + ": " + ((day3.count / total) * 100).toFixed(1) + "%";
            }
            newDataPoints.push({ y: day3.count, label: day3Label });

            // Fetch the number of visitors on day 4
            var fetchHappy = await fetch("/amazon/Sighting?lowDate=" + this.state.dates[4] + "&highDate=" + this.state.dates[4]);
            var day4 = await fetchHappy.json();
            console.log("Day4: " + day4.count);
            if ((total === 0) || (day4 === 0)) {
                var day4Label = this.state.dates[4] + ": " + 0.0 + "%";
            }
            else {
                var day4Label = this.state.dates[4] + ": " + ((day4.count / total) * 100).toFixed(1) + "%";
            }
            newDataPoints.push({ y: day4.count, label: day4Label });

            // Fetch the number of visitors on day 5
            var fetchHappy = await fetch("/amazon/Sighting?lowDate=" + this.state.dates[5] + "&highDate=" + this.state.dates[5]);
            var day5 = await fetchHappy.json();
            console.log("Day5: " + day5.count);
            if ((total === 0) || (day5 === 0)) {
                var day5Label = this.state.dates[5] + ": " + 0.0 + "%";
            }
            else {
                var day5Label = this.state.dates[5] + ": " + ((day5.count / total) * 100).toFixed(1) + "%";
            }
            newDataPoints.push({ y: day5.count, label: day5Label });

            // Fetch the number of visitors on day 6
            var fetchHappy = await fetch("/amazon/Sighting?lowDate=" + this.state.dates[6] + "&highDate=" + this.state.dates[6]);
            var day6 = await fetchHappy.json();
            console.log("Day6: " + day6.count);
            if ((total === 0) || (day6 === 0)) {
                var day6Label = this.state.dates[6] + ": " + 0.0 + "%";
            }
            else {
                var day6Label = this.state.dates[6] + ": " + ((day6.count / total) * 100).toFixed(1) + "%";
            }
            newDataPoints.push({ y: day6.count, label: day6Label });

            
            // Set state with this new data
            newData.dataPoints = newDataPoints;
            this.setState({ data: [newData] });
            this.setState({ totalSightings: total });
        }
        catch (error) {
            console.log(error)
        }

    }

    // Sets state when user chooses new start date from datepicker
    handleStartChange(e) {
        this.setState({ startDate: e.target.value });
    }

    // Sets state when user chooses new end date from datepicker
    handleEndChange(e) {
        this.setState({ endDate: e.target.value });
    }

    // Update graph without reloading page when the user clicks "submit" for datepickers
    submitDates(e) {
        e.preventDefault();
        e.stopPropagation();
        this.updateGraph();
    }

    // Render Emotions
    render() {
        // Graph options
        const options = {
            exportEnabled: true,
            animationEnabled: true,
            title: {
                //text: "Repeat Customers"
            },
            data: this.state.data,
        }

        return (
            <div>
                <h1 class="h2">Daily Visits over Past Week</h1>

                <div>
                    <CanvasJSChart options={options}
                    /* onRef={ref => this.chart = ref} */
                    />
                    {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
                </div>
            </div>
        );
    }
}

export default Dashboard;