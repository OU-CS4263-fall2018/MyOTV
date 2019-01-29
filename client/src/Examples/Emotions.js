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

class Emotions extends Component {
    // Constructor 
    constructor(props) {
        super(props);
        // State holds relevant dates, total number of sightings, and data specifications

        this.state = {
            // Today's date
            today: (new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate()),
            // End of requested date range
            endDate: ((new URLSearchParams(this.props.location.search).get("endDate")) || (new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate())),
            // Beginning of requested date range
            startDate: ((new URLSearchParams(this.props.location.search).get("startDate")) || "2018-01-01"),
            // Total number of sightings in date range
            totalSightings: 0,

            // Data specifications
            data: [{
                type: "column",
                toolTipContent: "<b>{label} ({y})",
                indexLabelFontSize: 16,
                //indexLabel: "{label} ({y})",
                dataPoints: [
                    { y: 0, label: "Happy" },
                    { y: 0, label: "Sad" },
                    { y: 0, label: "Angry" },
                    { y: 0, label: "Confused" },
                    { y: 0, label: "Disgusted" },
                    { y: 0, label: "Surprised" },
                    { y: 0, label: "Calm" },
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
            var fetchTotal = await fetch("/amazon/Sighting?lowDate=" + this.state.startDate + "&highDate=" + this.state.endDate);
            var totalSightings = await fetchTotal.json();
            console.log("total: " + totalSightings.count);
            total = total + totalSightings.count;

            // Fetch the number of happy visitors
            var fetchHappy = await fetch("/amazon/Sighting?lowDate=" + this.state.startDate + "&highDate=" + this.state.endDate + "&emotion=happy");
            var happySightings = await fetchHappy.json();
            console.log("Happy: " + happySightings.count);
            if ((total === 0) || (happySightings === 0)) {
                var happyLabel = "Happy: " + 0.0 + "%";
            }
            else {
                var happyLabel = "Happy: " + ((happySightings.count / total) * 100).toFixed(1) + "%";
            }
            newDataPoints.push({ y: happySightings.count, label: happyLabel });

            // Fetch the number of sad visitors
            var fetchSad = await fetch("/amazon/Sighting?lowDate=" + this.state.startDate + "&highDate=" + this.state.endDate + "&emotion=sad");
            var sadSightings= await fetchSad.json();
            console.log("Sad: " + sadSightings.count);
            if ((total === 0) || (sadSightings === 0)) {
                var sadLabel = "Sad: " + 0.0 + "%";
            }
            else {
                var sadLabel = "Sad: " + ((sadSightings.count / total) * 100).toFixed(1) + "%";
            }
            newDataPoints.push({ y: sadSightings.count, label: sadLabel });
 
            // Fetch the number of angry visitors
            var fetchAngry = await fetch("/amazon/Sighting?lowDate=" + this.state.startDate + "&highDate=" + this.state.endDate + "&emotion=angry");
            var angrySightings= await fetchAngry.json();
            console.log("Angry: " + angrySightings.count);
            if ((total === 0) || (angrySightings === 0)) {
                var angryLabel = "Angry: " + 0.0 + "%";
            }
            else {
                var angryLabel = "Angry: " + ((angrySightings.count / total) * 100).toFixed(1) + "%";
            } 
            newDataPoints.push({ y: angrySightings.count, label: angryLabel });

            // Fetch the number of confused visitors
            var fetchConfused = await fetch("/amazon/Sighting?lowDate=" + this.state.startDate + "&highDate=" + this.state.endDate + "&emotion=confused");
            var confusedSightings= await fetchConfused.json();
            console.log("Confused: " + confusedSightings.count);
            if ((total === 0) || (confusedSightings === 0)) {
                var confusedLabel = "Confused: " + 0.0 + "%";
            }
            else {
              var confusedLabel = "Confused: " + ((confusedSightings.count / total) * 100).toFixed(1) + "%";
            } 
            newDataPoints.push({ y: confusedSightings.count, label: confusedLabel });

            // Fetch the number of disgusted visitors
            var fetchDisgusted = await fetch("/amazon/Sighting?lowDate=" + this.state.startDate + "&highDate=" + this.state.endDate + "&emotion=disgusted");
            var disgustedSightings= await fetchDisgusted.json();
            console.log("Disgusted: " + disgustedSightings.count);
            if ((total === 0) || (disgustedSightings === 0)) {
                var disgustedLabel = "Disgusted: " + 0.0 + "%";
            }
            else {
              var disgustedLabel = "Disgusted: " + ((disgustedSightings.count / total) * 100).toFixed(1) + "%";
            } 
            newDataPoints.push({ y: disgustedSightings.count, label: disgustedLabel });

            // Fetch the number of surprised visitors
            var fetchSurprised = await fetch("/amazon/Sighting?lowDate=" + this.state.startDate + "&highDate=" + this.state.endDate + "&emotion=surprised");
            var surprisedSightings= await fetchSurprised.json();
            console.log("Surprised: " + surprisedSightings.count);
            if ((total === 0) || (surprisedSightings === 0)) {
                var surprisedLabel = "Surprised: " + 0.0 + "%";
            }
            else {
              var surprisedLabel = "Surprised: " + ((surprisedSightings.count / total) * 100).toFixed(1) + "%";
            } 
            newDataPoints.push({ y: surprisedSightings.count, label: surprisedLabel });

            // Fetch the number of calm visitors
            var fetchCalm = await fetch("/amazon/Sighting?lowDate=" + this.state.startDate + "&highDate=" + this.state.endDate + "&emotion=calm");
            var calmSightings= await fetchCalm.json();
            console.log("Calm: " + calmSightings.count);
            if ((total === 0) || (calmSightings === 0)) {
                var calmLabel = "Calm: " + 0.0 + "%";
            }
            else {
              var calmLabel = "Calm: " + ((calmSightings.count / total) * 100).toFixed(1) + "%";
            }
            newDataPoints.push({ y: calmSightings.count, label: calmLabel });

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
                <h1 class="h2">Emotion Metrics</h1>

                {/*Allows user to choose dates to display on graph */}
                <form>
                    <p>Choose a date range to display emotion data from.</p>
                    <p class="row">
                        <div class="input-append date form_datetime">
                            Start Date:
                        <input name="startDate" size="16" type="date" value={this.state.startDate} onChange={(this.handleStartChange.bind(this))}></input>
                        </div>

                        <div class="input-append date form_datetime">
                            End Date:
                        <input name="endDate" size="16" type="date" value={this.state.endDate} onChange={(this.handleEndChange.bind(this))}></input>
                        </div>
                    </p>
                    <input type="submit" onClick={this.submitDates.bind(this)}></input>
                </form>

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

export default Emotions;