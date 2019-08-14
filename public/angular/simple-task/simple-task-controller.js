angular.module('web-tasks').controller("simpleTaskController",simpleTaskController);
function simpleTaskController() {
    var vm = this,
        dataValue,
        duration = 120,
        timerId = $('.count-down-timer');
        vm.title = "Simple Task";
        vm.data = {
            "times-zoomed-in":0,
            "times-zoomed-out":0,
            "total-time-spent":0,
            "time-spent-on-map":0,
            "time-spent-on-questionnaire":0,
            "total-time-taken-user":0,
            "relevant-clicks": 0,
            "relevant-checkbox-click":0,
            "relevant-maps-click":0,
            "irrelevant-clicks": 0,
            "irrelevant-checkbox-click":0,
            "irrelevant-maps-click":0,
            "total-clicks": 0,
        };
    $(".proceed-to-task").on("click", function (e)  {
        e.stopPropagation();
        $(this).hide().parent().next(".map-container").css({"opacity": 1});
        $(".question-container").show();
        trackAllEvents(duration, timerId);
        createSimpleTask();
    });
    $(".custom-control-input").change(function(e){
        $("#nextQuestion").removeClass("btn-disabled");
    });
    $("#nextQuestion").click(function(e){
        e.preventDefault();
        var currentList = $(".question-container").find("li.active-question");
        var  idx = $(".question-container").find("li.active-question").index();
            if($(".questions-list-container").children().length === idx +2  ){
                $(currentList).removeClass("active-question"); $(currentList).next("li").addClass("active-question");
                vm.data["total-time-taken-user"]  = parseFloat($(".count-down-timer").text().replace(":","."));
                $("#nextQuestion").hide();
                $("#proceedToNasaBtn").show();
                $.extend(vm.data, JSON.parse(localStorage.getItem("taskData")));
                localStorage.setItem("taskData", JSON.stringify(vm.data));
            } else {
                $(currentList).next("li").addClass("active-question");
                $("#nextQuestion").addClass("btn-disabled");
                $(currentList).removeClass("active-question");
            }
    });
    // Tracking Events
    function trackAllEvents(duration,display) {
        // Initialising  Timer // Timer to Start Task;
            var timer, min, sec;
                timer = setInterval(function () {
                min = parseInt(duration / 60, 10);
                sec = parseInt(duration % 60, 10);
                min = min < 10 ? "0" + min : min;
                sec = sec < 10 ? "0" + sec : sec;
                $(display).text(min + ":" + sec);
                if (--duration < 0) {
                    duration = 0;
                    clearInterval(timer);
                    console.log("Timer Stopped");
                }
            }, 1000);

            // Initialising Time Events Capturing
            TimeMe.initialize({
                currentPageName: "simple-task-page", // current page
                idleTimeoutInSeconds: 5, // stop recording time due to inactivity
            });
            TimeMe.getTimeOnCurrentPageInSeconds();
            TimeMe.trackTimeOnElement('simple-task-chart');
            TimeMe.trackTimeOnElement('simple-task-questionnaire');
        // Adding Click to Body
            $(document).on("click", "body", function (e) {
              e.stopPropagation();
                var target = $(e.target);
                if(target.is("path")) recordEvents(target,dataValue);
                else if(target.is("label") || target.is("input[type='radio']")){
                    if($(target).parent().data("relevant")){
                        vm.data["relevant-checkbox-click"] = parseFloat(vm.data["relevant-checkbox-click"]) + 0.5;
                        vm.data["relevant-clicks"] = parseFloat(vm.data["relevant-clicks"]) + 0.5;
                    } else {
                        vm.data["irrelevant-checkbox-click"] = parseFloat(vm.data["irrelevant-checkbox-click"]) + 0.5;
                        vm.data["irrelevant-clicks"] = parseFloat(vm.data["irrelevant-clicks"]) + 0.5 ;
                    }
                } else if($(e.target).data("relevant") || target.is("#nextQuestion")) {
                    vm.data["relevant-clicks"] = parseInt(vm.data["relevant-clicks"])+ 1;
                } else {
                    vm.data["irrelevant-clicks"] = parseInt(vm.data["irrelevant-clicks"]) + 1;
                }
                vm.data["total-clicks"] = parseInt(vm.data["irrelevant-clicks"])  + parseInt(vm.data["relevant-clicks"])  ;
                vm.data["time-spent-on-map"] = TimeMe.getTimeOnElementInSeconds('simple-task-chart');
                vm.data["time-spent-on-questionnaire"] = TimeMe.getTimeOnElementInSeconds('simple-task-questionnaire');
                vm.data["total-time-spent"] = TimeMe.getTimeOnCurrentPageInSeconds();
                console.log(vm.data);
        });

        function recordEvents(target) {
            var text = $(target).parent().siblings("desc").attr("id");
            //console.log(dataValue,text);
            if(text === undefined && dataValue === undefined){
                vm.data["irrelevant-maps-click"] = parseInt(vm.data["irrelevant-maps-click"])+ 1;
                vm.data["irrelevant-clicks"] = parseInt(vm.data["irrelevant-clicks"]) + 1;
            } else if(dataValue !== undefined){
                //console.log("DataValues",dataValue);
                //console.log(parseInt(dataValue["click-relevant-data"]),$(".questions-list-container li:visible").index());
                if(parseInt(dataValue["click-relevant-data"]) === $(".questions-list-container li:visible").index()){
                    vm.data["relevant-maps-click"] = parseInt(vm.data["relevant-maps-click"])+ 1;
                    vm.data["relevant-clicks"] = parseInt(vm.data["relevant-clicks"])+ 1;
                } else {
                    vm.data["irrelevant-maps-click"] = parseInt(vm.data["irrelevant-maps-click"])+ 1;
                    vm.data["irrelevant-clicks"] = parseInt(vm.data["irrelevant-clicks"]) + 1;
                }
            } else {
                if(text === "id-90-description"){
                    vm.data["times-zoomed-in"] += 1;
                    //console.log("Zoomed In");
                }else {
                    vm.data["times-zoomed-out"] += 1;
                    //console.log("Zoomed Out");
                }
            }
        }
    }
    // Am Charts
    function  createSimpleTask()  {
        /*** --------------------------------------- * This demo was created using amCharts 4.  ** For more information visit: * https://www.amcharts.com/** Documentation is available at:* https://www.amcharts.com/docs/v4/ * --------------------------------------- */
        // Themes begin
        var groupData = [
            {
                "name": "EU Countries who joined  before 1995",
                "color": "#e3bf85",
                "data": [
                    {
                        "relevant-data":"quest",
                        "title": "Austria",
                        "id": "AT", // With MapPolygonSeries.useGeodata = true, it will try and match this id, then apply the other properties as custom data
                        "customData": "1995"
                    }, {
                        "click-relevant-data":"0",
                        "title": "Ireland",
                        "id": "IE",
                        "customData": "1973"
                    }, {
                        "click-relevant-data":"0",
                        "title": "Denmark",
                        "id": "DK",
                        "customData": "1973"
                    }, {
                        "click-relevant-data":"0",
                        "title": "Finland",
                        "id": "FI",
                        "customData": "1995"
                    }, {
                        "click-relevant-data":"0",
                        "title": "Sweden",
                        "id": "SE",
                        "customData": "1995"
                    }, {
                        "click-relevant-data":"0",
                        "title": "Great Britain",
                        "id": "GB",
                        "customData": "1973"
                    }, {
                        "click-relevant-data":"0",
                        "title": "Italy",
                        "id": "IT",
                        "customData": "1957"
                    }, {
                        "click-relevant-data":"0",
                        "title": "France",
                        "id": "FR",
                        "customData": "1957"
                    }, {
                        "click-relevant-data":"0",
                        "title": "Spain",
                        "id": "ES",
                        "customData": "1986"
                    }, {
                        "click-relevant-data":"0",
                        "title": "Greece",
                        "id": "GR",
                        "customData": "1981"
                    }, {
                        "click-relevant-data":"0",
                        "title": "Germany",
                        "id": "DE",
                        "customData": "1957"
                    }, {
                        "click-relevant-data":"0",
                        "title": "Belgium",
                        "id": "BE",
                        "customData": "1957"
                    }, {
                        "click-relevant-data":"0",
                        "title": "Luxembourg",
                        "id": "LU",
                        "customData": "1957"
                    }, {
                        "click-relevant-data":"0",
                        "title": "Netherlands",
                        "id": "NL",
                        "customData": "1957"
                    }, {
                        "click-relevant-data":"0",
                        "title": "Portugal",
                        "id": "PT",
                        "customData": "1986"
                    }
                ]
            },
            {
                "name": "EU Countries who joined around 2000 - 2004",
                "clickRelevant":false,
                "color": "#e38785",
                "data": [
                    {
                        "title": "Lithuania",
                        "click-relevant-data":"1",
                        "id": "LT",
                        "customData": "2004",
                        "groupId": "2004"
                    }, {
                        "title": "Latvia",
                        "click-relevant-data":"1",
                        "id": "LV",
                        "customData": "2004",
                        "groupId": "2004"
                    }, {
                        "title": "Czech Republic ",
                        "click-relevant-data":"1",
                        "id": "CZ",
                        "customData": "2004",
                        "groupId": "2004"
                    }, {
                        "title": "Slovakia",
                        "click-relevant-data":"1",
                        "id": "SK",
                        "customData": "2004",
                        "groupId": "2004"
                    }, {
                        "title": "Slovenia",
                        "click-relevant-data":"1",
                        "id": "SI",
                        "customData": "2004",
                        "groupId": "2004"
                    }, {
                        "title": "Estonia",
                        "click-relevant-data":"1",
                        "id": "EE",
                        "customData": "2004",
                        "groupId": "2004"
                    }, {
                        "title": "Hungary",
                        "click-relevant-data":"1",
                        "id": "HU",
                        "customData": "2004",
                        "groupId": "2004"
                    }, {
                        "title": "Cyprus",
                        "click-relevant-data":"1",
                        "id": "CY",
                        "customData": "2004",
                        "groupId": "2004"
                    }, {
                        "title": "Malta",
                        "click-relevant-data":"1",
                        "id": "MT",
                        "customData": "2004",
                        "groupId": "2004"
                    }, {
                        "title": "Poland",
                        "click-relevant-data":"1",
                        "id": "PL",
                        "customData": "2004",
                        "groupId": "2004"
                    }
                ]
            },
            {
                "name": "EU Countries who joined around 2006 - 2007",
                "clickRelevant":false,
                "color": "#e385d8",
                "data": [
                    {
                        "title": "Romania",
                        "click-relevant-data":"2",
                        "id": "RO",
                        "customData": "2007"
                    }, {
                        "title": "Bulgaria",
                        "click-relevant-data":"2",
                        "id": "BG",
                        "customData": "2007"
                    }
                ]
            },
            {
                "name": "EU Countries after 2010",
                "clickRelevant":false,
                "color": "#9985e3",
                "data": [
                    {
                        "title": "Croatia",
                        "click-relevant-data":"3",
                        "id": "HR",
                        "customData": "2013"
                    }
                ]
            }
        ];
        am4core.useTheme(am4themes_animated);
        // Themes end
        // Create map instance
        var chart = am4core.create("chartdiv", am4maps.MapChart);
            chart.geodata = am4geodata_worldHigh; // Set map definition
            chart.projection = new am4maps.projections.Mercator(); // Set projection
            chart.exporting.menu = new am4core.ExportMenu(); // Export
            chart.zoomControl = new am4maps.ZoomControl(); // Zoom control

        var homeButton = new am4core.Button();
            homeButton.events.on("hit", function () {
                chart.goHome();
            });
            //homeButton.icon = new am4core.Sprite();
            // homeButton.padding(7, 5, 7, 5);
            // homeButton.width = 0;
            //homeButton.icon.path = "M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8";
            // homeButton.marginBottom = 0;
            // homeButton.parent = chart.zoomControl;
            //homeButton.insertBefore(chart.zoomControl.plusButton);
            chart.homeZoomLevel = 3.5; // Center on the groups by default
            chart.homeGeoPoint = {longitude: 10, latitude: 52};

        // This array will be populated with country IDs to exclude from the world series
        var excludedCountries = ["AQ"]; // Create a series for each group, and populate the above array
             groupData.forEach(function (group) {
                var series = chart.series.push(new am4maps.MapPolygonSeries());
                    series.name = group.name;
                    series.useGeodata = true;

                var includedCountries = [];
                    group.data.forEach(function (country) {
                        includedCountries.push(country.id);
                        excludedCountries.push(country.id);
                    });
                    series.include = includedCountries;
                    series.fill = am4core.color(group.color);
                    // By creating a hover state and setting setStateOnChildren to true, when we // hover over the series itself, it will trigger the hover SpriteState of all // its countries (provided those countries have a hover SpriteState, too!).
                    series.setStateOnChildren = true;
                    series.calculateVisualCenter = true;
                    // Country shape properties & behaviors
                    var mapPolygonTemplate = series.mapPolygons.template;
                    // Instead of our custom title, we could also use {name} which comes from geodata
                    mapPolygonTemplate.fill = am4core.color(group.color);
                    mapPolygonTemplate.fillOpacity = 0.8;
                    mapPolygonTemplate.nonScalingStroke = true;
                    mapPolygonTemplate.tooltipPosition = "fixed";
                    mapPolygonTemplate.events.on("over", function (event) {
                        series.mapPolygons.each(function (mapPolygon) {
                            mapPolygon.isHover = true;
                        });
                        event.target.isHover = false;
                        event.target.isHover = true;
                    });
                    mapPolygonTemplate.events.on("out", function (event) {
                        series.mapPolygons.each(function (mapPolygon) {
                            mapPolygon.isHover = false;
                        });
                });
                mapPolygonTemplate.events.on("hit", function (event) {
                    dataValue = event.target.dataItem.dataContext;
                });
                // States
                var hoverState = mapPolygonTemplate.states.create("hover");
                    hoverState.properties.fill = am4core.color("#CC0000");
                // Tooltip
                mapPolygonTemplate.events.on("hit", function(ev) {
                    chart.closeAllPopups();
                    var popup = chart.openPopup("<strong>" + ev.target.dataItem.dataContext.name + "</strong> joined EU at "+"<strong>"+ev.target.dataItem.dataContext.customData +"</strong>");
                    popup.left = ev.svgPoint.x + 15;
                    popup.top = ev.svgPoint.y + 15;
                    //popup.properties.fill = am4core.color("#CC0000");
                });
            // series.tooltip.getFillFromObject = false; // prevents default colorization, which would make all tooltips red on hover// series.tooltip.background.fill = am4core.color(group.color);//mapPolygonTemplate.tooltipText = "{title} joined EU at {customData}"; // enables tooltip // MapPolygonSeries will mutate the data assigned to it,// we make and provide a copy of the original data array to leave it untouched.// (This method of copying works only for simple objects, e.g. it will not work//  as predictably for deep copying custom Classes.)
                 series.data = JSON.parse(JSON.stringify(group.data));
             });

                // The rest of the world.
                var worldSeries = chart.series.push(new am4maps.MapPolygonSeries());
                var worldSeriesName = "world";
                    worldSeries.name = worldSeriesName;
                    worldSeries.useGeodata = true;
                    worldSeries.exclude = excludedCountries;
                    worldSeries.fillOpacity = 0.3;
                    worldSeries.hiddenInLegend = true;
                    worldSeries.mapPolygons.template.nonScalingStroke = true;
                    chart.legend = new am4maps.Legend();  // This auto-generates a legend according to each series' name and fill
                // Legend styles
                    chart.legend.paddingLeft = 0;
                    chart.legend.paddingRight = 0;
                    chart.legend.marginBottom = 10;
                    chart.legend.fontSize =12;
                    chart.legend.width = am4core.percent(90);
                    chart.legend.valign = "bottom";
                    chart.legend.contentAlign = "left";
                // Legend items
                  chart.legend.itemContainers.template.interactionsEnabled = false;
    }
}