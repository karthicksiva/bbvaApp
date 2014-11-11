function createOptionsForChart(chartType,drawContainer){
	// create options object
	var options = {
			   chart: {
			       renderTo: '',
			       defaultSeriesType: '',
			       zoomType: '',
			       panning : false
			   },
			   title: {
			       text: '',
			       style: {
	                    fontSize: '16px',
	                    fontFamily: 'Verdana, sans-serif',
	                    fontWeight : 'bold'
	                }
			   },
			   xAxis: {
			       categories: [],
			       title: {
			           text: '',
			           style: {
		                    fontSize: '14px',
		                    fontFamily: 'Verdana, sans-serif',
		                    fontWeight : 'bold'
		                }
			       },
			       labels :{
			    	   rotation  : 0,
			    	   style: {
		                    fontSize: '12px',
		                    fontFamily: 'Verdana, sans-serif',
		                    fontWeight : 'bold'
		                }
			       }
			   },
			   yAxis: {
			       title: {
			           text: '',
			           style: {
		                    fontSize: '14px',
		                    fontFamily: 'Verdana, sans-serif',
		                    fontWeight : 'bold'
		                }
			       },
			       labels :{
			    	   rotation  : 0,
			    	   style: {
		                    fontSize: '12px',
		                    fontFamily: 'Verdana, sans-serif',
		                    fontWeight : 'bold'
		                }
			       }
			   },
			   tooltip: {
			           headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
			           pointFormat: '',
			           footerFormat: '</table>',
			           shared: true,
			           useHTML: true
			       },
		      series: [],
		      plotOptions: {
	                series: {
	                    cursor: 'pointer',
	                    point: {
	                        events: {
	                            click: function (e) {
	                               //console.log(this);
	                            }
	                        }
	                    },
	                    marker: {
	                        lineWidth: 1
	                    }
	                }
	            },
		    }
		// set options based on type of API Call
		if(chartType == "paymentscube"){
			options.chart.defaultSeriesType = "area";
			options.chart.zoomType = "x";
			options.chart.panning = true;
			options.title.text = "";
			options.xAxis.title.text = "Transcation Amount Category";
			options.yAxis.floor = 0;
			options.xAxis.tickmarkPlacement = "on";
			options.xAxis.labels.rotation = -45;
			options.yAxis.title.text = "# of Payments";
			options.tooltip.pointFormat = '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
   										  '<td style="padding:0"><b>{point.y:.1f} Payments</b></td></tr>'
		}else if(chartType == "cardscube"){
			options.chart.defaultSeriesType = "column";
			options.title.text = "Spend Habits";
			options.xAxis.title.text = "Dates";
			options.yAxis.title.text = "Avergae Spend";
			options.tooltip.pointFormat = '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
   										  '<td style="padding:0"><b>$ {point.y:.1f}</b></td></tr>'
		}
	options.chart.renderTo = drawContainer;

	// return options to drawChartforuser function
	return options;
}

function doLogicforChart(chartType,dataObj,filterCriteria){
	// create a  object to return both catagories and data to drawChartforuser function
	var returnData = {};
	if(chartType == "paymentscube"){
		var graphdata = new Array();
	    var values = new Array();
	    var categories = new Array();
	    dataObj.metadata.hash_description.ranges[2].values.forEach(function(data){
	    	categories.push(data.description);
	    });
	    dataObj.data.stats.forEach(function(data,count,total){
		var valuesObj = new Array();
		data.cube.forEach(function(data){
		    if(data.hash.indexOf(filterCriteria)>-1){
	             var catagory = data.hash.split("#");
	             valuesObj.push({category:catagory[2],nfp:data.num_payments});
		    }
	    });
	    for(i=0;i<categories.length;i++){
	    	var objectsArray = valuesObj.filter(function (el) {
			return el.category == i});
		    if(objectsArray.length>0){
				objectsArray.forEach(function(data){
				   values.push(data.nfp);
				});
		    }else{
		    	values.push(0);
		    }
		 }
		});
	  graphdata.push({name:'Your Group',data:values,color:"#8BD58F"});
	  returnData.graphdata = graphdata;
	  returnData.categories = categories;
	}else if(chartType == "cardscube"){
		var values = new Array();
		var categories = new Array();
		var totalAmtAll = new Array();
		var totalAmtYou = new Array();
		var graphData = new Array();
		dataObj.data.stats.forEach(function(data,count,total){
			categories.push(data.date);
		    var avgYou = 0.0;
		    var avgAll = 0.0;
		    var count = 0 ;
			data.cube.forEach(function(data){
			    if(data.hash.indexOf(filterCriteria)>-1){
				avgYou = parseFloat(data.avg);
			    }
			    avgAll = avgAll + parseFloat(data.avg);
			    count = count + 1;
		    });
			totalAmtAll.push(avgAll/count);
		    totalAmtYou.push(avgYou);
		});
		graphData.push({name:'Your Group',data:totalAmtYou,color:"#8BD58F"});
		graphData.push({name:'All',data:totalAmtAll,color:"#6DADEC"});
		returnData.graphdata = graphData;
		returnData.categories = categories;
	}
	//return both catagories and data to drawChartforuser function
	return returnData;
}

function drawChartforuser(data,filterVal,drawContainer,chartType){
	// Empty chart div to clear any existing chart
	$("#"+drawContainer).empty();
	//get the gender and age criteria from filterVal
	var userGender = filterVal.gender;
	var userAgeValue = filterVal.ageValue;

	//create filter Criteria
	var filterCriteria = userGender+"#"+userAgeValue ;

	//get both options and criteria from
    var options = createOptionsForChart(chartType,drawContainer);
    var graphData = doLogicforChart(chartType,data,filterCriteria);

    //set both options and criteria to chart options
    options.series = graphData.graphdata;
	options.xAxis.categories = graphData.categories;

	// create and render chart
	chart = new Highcharts.Chart(options);
}