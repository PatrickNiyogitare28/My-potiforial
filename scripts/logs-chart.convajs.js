window.onload = function () {
        
    let options = {
        
        animationEnabled: true,
        showInLegend:true,
        title: {
            text: "This week logs",
            color: '#ffff'
        },
        axisY: {
            title: "Totoal Logs",
         },
        axisX: {
            title: "Days"
        },
        data: [{
            type: "column",
            yValueFormatString: "#,##0.0#"%"",
            dataPoints: [
                { label: "Page Visitors", y: 7},	
                { label: "New users", y: 2 },	
                { label: "Enqueries", y: 4},
                { label: "Unanswered Enqueries", y: 3 }
                 
            ]
        }]
    };
    $("#chartContainer").CanvasJSChart(options);
    

        
    let options2 = {
        animationEnabled: true,
        title: {
            text: "Previous Month logs"
        },
        axisY: {
            title: "Totoal Logs",
         },
        axisX: {
            title: "Days"
        },
        data: [{
            type: "column",
            yValueFormatString: "#,##0.0#"%"",
            dataPoints: [
                { label: "Page Visitors", y: 10},	
                { label: "New users", y: 5 },	
                { label: "Enqueries", y: 12},
                { label: "Unanswered Enqueries", y: 6 }
             ]
        }]
    };
    $("#failedChartContainer").CanvasJSChart(options2);
    
    }
