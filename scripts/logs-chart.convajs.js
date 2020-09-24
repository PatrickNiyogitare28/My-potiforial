window.onload = function () {
        
    var options = {
        
        animationEnabled: true,
        title: {
            text: "Weekly Success Logs",
            color: '#ffff'
        },
        axisY: {
            title: "Totoal Logs",
            // suffix: "%"
        },
        axisX: {
            title: "Days"
        },
        data: [{
            type: "column",
            yValueFormatString: "#,##0.0#"%"",
            dataPoints: [
                { label: "Mon", y: 7},	
                { label: "Tue", y: 2 },	
                { label: "Wed", y: 0},
                { label: "Thur", y: 3 },	
                { label: "Fri", y: 1 },
                { label: "Sut", y: 8 },
                { label: "San", y: 11},
               
                
            ]
        }]
    };
    $("#chartContainer").CanvasJSChart(options);
    

        
    var options2 = {
        animationEnabled: true,
        title: {
            text: "Weekly Failed Logs"
        },
        axisY: {
            title: "Totoal Logs",
            // suffix: "%"
        },
        axisX: {
            title: "Days"
        },
        data: [{
            type: "column",
            yValueFormatString: "#,##0.0#"%"",
            dataPoints: [
                { label: "Mon", y: 0 },	
                { label: "Tue", y: 2 },	
                { label: "Wed", y: 0 },
                { label: "Thur", y: 0 },	
                { label: "Fri", y: 4 },
                { label: "Sut", y: 2 },
                { label: "San", y: 1 },
               
                
            ]
        }]
    };
    $("#failedChartContainer").CanvasJSChart(options2);
    
    }