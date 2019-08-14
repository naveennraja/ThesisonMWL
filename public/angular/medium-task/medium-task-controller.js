

angular.module('web-tasks').controller("mediumTaskController",mediumTaskController);
function mediumTaskController() {
    var vm = this,
        duration = 240,
        dataValue,
        timerId = document.querySelector('.count-down-timer');
        vm.title = "Medium Task";
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
        createMediumTask();
    });
    $(".custom-control-input").change(function(e){
        $("#nextQuestion").removeClass("btn-disabled");
    });
    $("#nextQuestion").click(function(e){
        e.preventDefault();

        var currentList = $(".question-container").find("li.active-question");
        var  idx = $(".question-container").find("li.active-question").index();
        if($(".questions-list-container").children().length === idx +2  ){
            $(currentList).removeClass("active-question");
            $(currentList).next("li").addClass("active-question");
            vm.data["total-time-taken-user"]  = parseFloat($(".count-down-timer").text().replace(":","."));
            $("#nextQuestion").hide();
            $("#proceedToNasaBtn").show();
        } else {
            $(currentList).next("li").addClass("active-question");
            $("#nextQuestion").addClass("btn-disabled");
            $(currentList).removeClass("active-question");
        }
    });
    // Tracking Events
    function trackAllEvents(duration,display) {
        // Initialising  Timer // Timer to Start Task;
        var checkCity ={
            "0":["Bogota","Ottawa","Lisbon","Paris","Caracas","Panama"],
            "1":["Lisbon","Dublin","Brussels","Athens","Prague","Algiers"],
            "2":["Athens","Oslo","Stockholm","Kuwait","Tashkent","Paris"],
            "3":["Abu Dhabi","Tashkent","Cairo","Tashkent","Abu Dhabi","Cairo"],
            "4":["Colombo","Abu Dhabi","Damascus","Bangkok","Singapore","Tokyo"],
        };
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
            if(target.is("path")) recordEvents(target);
            if(target.is("label") || target.is("input[type='radio']")){
                if($(target).parent().data("relevant")){
                    vm.data["relevant-checkbox-click"] = parseFloat(vm.data["relevant-checkbox-click"]) + 0.5;
                    vm.data["relevant-clicks"] = parseFloat(vm.data["relevant-clicks"]) + 0.5;
                } else {
                    vm.data["irrelevant-checkbox-click"] = parseFloat(vm.data["irrelevant-checkbox-click"]) + 0.5;
                    vm.data["irrelevant-clicks"] = parseFloat(vm.data["irrelevant-clicks"]) + 0.5 ;
                }
            } else if($(e.target).data("relevant") || target.is("path") || target.is("#nextQuestion")) {
                vm.data["relevant-clicks"] = parseInt(vm.data["relevant-clicks"])+ 1;
            } else {
                vm.data["irrelevant-clicks"] = parseInt(vm.data["irrelevant-clicks"]) + 1;
            }
            vm.data["total-clicks"] = parseInt(vm.data["irrelevant-clicks"])  + parseInt(vm.data["relevant-clicks"])  ;
            vm.data["time-spent-on-map"] = TimeMe.getTimeOnElementInSeconds('simple-task-chart');
            vm.data["time-spent-on-questionnaire"] = TimeMe.getTimeOnElementInSeconds('simple-task-questionnaire');
            vm.data["total-time-spent"] = TimeMe.getTimeOnCurrentPageInSeconds();
            //console.log(vm.data);
        });
        function recordEvents(target) {
            var text = $(target).parent().siblings("desc").attr("id"),
                idx = $(".question-container").find("li.active-question").index();
            //console.log(dataValue,text);
            if(text === undefined && dataValue === undefined){
                vm.data["irrelevant-maps-click"] = parseInt(vm.data["irrelevant-maps-click"])+ 1;
                vm.data["irrelevant-clicks"] = parseInt(vm.data["irrelevant-clicks"]) + 1;
            } else if(dataValue !== undefined){
                console.log("DataValues",dataValue);
                if(checkCity[idx].includes(dataValue.title) == true){
                    console.log("Valid Click");
                        vm.data["relevant-maps-click"] = parseInt(vm.data["relevant-maps-click"])+ 1;
                        vm.data["relevant-clicks"] = parseInt(vm.data["relevant-clicks"])+ 1;
                } else {
                    console.log("Invalid Click");
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
    //Creating Medium Task
    function createMediumTask(){
        /** * ---------------------------------------* This demo was created using amCharts 4.** For more information visit:* https://www.amcharts.com/** Documentation is available at: * https://www.amcharts.com/docs/v4/* ---------------------------------------*/
// Themes begin
        am4core.useTheme(am4themes_animated);
// Themes end
// Create map instance
        var chart = am4core.create("flight-map", am4maps.MapChart);
        var interfaceColors = new am4core.InterfaceColorSet();
            chart.geodata = am4geodata_worldLow; // Set map definition
            chart.projection = new am4maps.projections.Mercator(); // Set projection
            chart.exporting.menu = new am4core.ExportMenu(); // Export
            chart.zoomControl = new am4maps.ZoomControl(); // Zoom control
        // Data for general and map use
        var originCities = [
            {
                "id": "washington dc",
                "title": "Washington D.C",
                "destinations": ["ottawa","dublin", "madrid", "lisbon", "panama","bogota","lome","san jose","havana","belmopan","san salvador","algiers","caracas","santo domingo"],
                "latitude": 38.8921,
                "longitude": -77.0241,
                "scale": 1.5,
                "zoomLevel": 2.74,
                "zoomLongitude": -77.0241,
                "zoomLatitude": 38.8921,
            },
            {
                "id": "london",
                "title": "London",
                "destinations": ["dublin","vilnius", "reykjavik", "lisbon", "paris", "belgrade", "helsinki", "madrid", "stockholm", "copenhagen", "brussels", "prague","belgrade","oslo","bern"],
                "latitude": 51.5002,
                "longitude": -0.1262,
                "scale": 1.5,
                "zoomLevel": 2.74,
                "zoomLongitude": -20.1341,
                "zoomLatitude": 49.1712
            },{
                "id": "moscow",
                "title": "Moscow",
                "destinations": ["tashkent","dushanbe","ashgabat","muscat","ulan bator","bishkek","helsinki","kuwait","astana","abu dhabi","damascus","cairo","belgrade","athens","stockholm"],
                "latitude": 55.7558,
                "longitude": 37.6176,
                "scale": 2,
                "zoomLevel": 2.74,
                "zoomLongitude": 41.6076,
                "zoomLatitude": 51.7058
            },
            {
                "id": "baghdad",
                "title": "Baghdad",
                "destinations": ["cairo", "damascus","kuwait",  "doha", "oslo", "stockholm","ashgabat","kiev","copenhagen","helsinki","abu dhabi","sanaa","belgrade","athens"],
                "latitude": 33.3157,
                "longitude": 44.3922,
                "scale": 2,
                "zoomLevel": 2.74,
                "zoomLongitude": 13.4492,
                "zoomLatitude": 47.2631
            },
            {
                "id": "new delhi",
                "title": "New Delhi",
                "destinations": ["ashgabat","tokyo","dushanbe","bangkok","colombo","tashkent","taipei","hanoi","seoul","jakarta","singapore","kuala lumpur","tokyo","ulan bator","bishkek"],
                "latitude": 28.6353,
                "longitude": 77.225,
                "scale": 2.5,
                "zoomLevel": 2.74,
                "zoomLongitude": 77.225,
                "zoomLatitude": 28.6353
            }

        ];
        var destinationCities = [
            {
                "id": "brussels",
                "title": "Brussels",
                "latitude": 50.8371,
                "longitude": 4.3676
            },{
                "title": "Bogota",
                "id": "bogota",
                "latitude": 4.6473,
                "longitude": -74.0962
            },{
                "title": "Santo Domingo",
                "id": "santo domingo",
                "latitude": 18.479,
                "longitude": -69.8908
            }, {
                "title": "Caracas",
                "id": "caracas",
                "latitude": 10.4961,
                "longitude": -66.8983
            },{
                "title": "Belmopan",
                "id": "belmopan",
                "latitude": 17.2534,
                "longitude": -88.7713
            }, {
                "title": "Copenhagen",
                "id": "copenhagen",
                "latitude": 55.6763,
                "longitude": 12.5681
            },{
                "title": "Helsinki",
                "id": "helsinki",
                "latitude": 60.1699,
                "longitude": 24.9384
            }, {
                "title": "Bishkek",
                "id": "bishkek",
                "latitude": 42.8679,
                "longitude": 74.5984
            },{
                "title": "Kuwait",
                "id": "kuwait",
                "latitude": 29.3721,
                "longitude": 47.9824
            }, {
                "title": "Muscat",
                "id": "muscat",
                "latitude": 23.6086,
                "longitude": 58.5922
            }, {
                "title": "Astana",
                "id": "astana",
                "latitude": 51.1796,
                "longitude": 71.4475
            },{
                "title": "Ulan Bator",
                "id": "ulan bator",
                "latitude": 47.9138,
                "longitude": 106.922
            },{
                "id": "prague",
                "title": "Prague",
                "latitude": 50.0878,
                "longitude": 14.4205
            }, {
                "id": "athens",
                "title": "Athens",
                "latitude": 37.9792,
                "longitude": 23.7166
            }, {
                "id": "reykjavik",
                "title": "Reykjavik",
                "latitude": 64.1353,
                "longitude": -21.8952
            }, {
                "id": "dublin",
                "title": "Dublin",
                "latitude": 53.3441,
                "longitude": -6.2675
            }, {
                "id": "oslo",
                "title": "Oslo",
                "latitude": 59.9138,
                "longitude": 10.7387
            }, {
                "id": "lisbon",
                "title": "Lisbon",
                "latitude": 38.7072,
                "longitude": -9.1355
            }, {
                "id": "belgrade",
                "title": "Belgrade",
                "latitude": 44.8048,
                "longitude": 20.4781
            }, {
                "id": "bratislava",
                "title": "Bratislava",
                "latitude": 48.2116,
                "longitude": 17.1547
            }, {
                "id": "ljublana",
                "title": "Ljubljana",
                "latitude": 46.0514,
                "longitude": 14.5060
            }, {
                "id": "madrid",
                "title": "Madrid",
                "latitude": 40.4167,
                "longitude": -3.7033
            }, {
                "id": "stockholm",
                "title": "Stockholm",
                "latitude": 59.3328,
                "longitude": 18.0645
            }, {
                "id": "bern",
                "title": "Bern",
                "latitude": 46.9480,
                "longitude": 7.4481
            }, {
                "id": "kiev",
                "title": "Kiev",
                "latitude": 50.4422,
                "longitude": 30.5367
            }, {
                "id": "paris",
                "title": "Paris",
                "latitude": 48.8567,
                "longitude": 2.3510
            },{
                "id": "tashkent",
                "title": "Tashkent",
                "latitude": 41.3193,
                "longitude": 69.2481
            }, {
                "id": "hanoi",
                "title": "Hanoi",
                "latitude": 21.0341,
                "longitude": 105.8372
            }, {
                "id": "sanaa",
                "title": "Sanaa",
                "latitude": 15.3556,
                "longitude": 44.2081
            }, {
                "title": "Tokyo",
                "id": "tokyo",
                "latitude": 35.6785,
                "longitude": 139.6823
            },{
                "title": "Buenos Aires",
                "id": "buenos aires",
                "latitude": -34.6118,
                "longitude": -58.4173
            }, {
                "title": "Bridgetown",
                "latitude": 13.0935,
                "longitude": -59.6105
            }, {
                "title": "Belmopan",
                "latitude": 17.2534,
                "longitude": -88.7713
            }, {
                "title": "Sucre",
                "latitude": -19.0421,
                "longitude": -65.2559
            }, {
                "title": "Brasilia",
                "latitude": -15.7801,
                "longitude": -47.9292
            }, {
                "title": "Ottawa",
                "id": "ottawa",
                "latitude": 45.4235,
                "longitude": -75.6979
            }, {
                "title": "Santiago",
                "latitude": -33.4691,
                "longitude": -70.642
            }, {
                "title": "Bogota",
                "latitude": 4.6473,
                "longitude": -74.0962
            },
            {
                "title": "Kuala Lumpur",
                "id": "kuala lumpur",
                "latitude": 3.1502,
                "longitude": 101.7077
            },
            {
                "title": "Singapore",
                "id": "singapore",
                "latitude": 1.2894,
                "longitude": 103.85
            },{
                "id": "jakarta",
                "title": "Jakarta",
                "latitude": -6.1862,
                "longitude": 106.8063
            },{
                "title": "San Jose",
                "id": "san jose",
                "latitude": 9.9402,
                "longitude": -84.1002
            }, {
                "id": "havana",
                "title": "Havana",
                "latitude": 23.1333,
                "longitude": -82.3667
            }, {
                "title": "Roseau",
                "latitude": 15.2976,
                "longitude": -61.39
            }, {
                "title": "Santo Domingo",
                "latitude": 18.479,
                "longitude": -69.8908
            }, {
                "title": "Quito",
                "latitude": -0.2295,
                "longitude": -78.5243
            }, {
                "title": "San Salvador",
                "id": "san salvador",
                "latitude": 13.7034,
                "longitude": -89.2073
            }, {
                "id":"carcas",
                "title": "Caracas",
                "latitude": 10.4961,
                "longitude": -66.8983
            }, {
                "title": "Oranjestad",
                "latitude": 12.5246,
                "longitude": -70.0265
            }, {
                "title": "Cayenne",
                "latitude": 4.9346,
                "longitude": -52.3303
            }, {
                "title": "Plymouth",
                "latitude": 16.6802,
                "longitude": -62.2014
            }, {
                "title": "San Juan",
                "latitude": 18.45,
                "longitude": -66.0667
            }, {
                "title": "Algiers",
                "latitude": 36.7755,
                "longitude": 3.0597
            }, {
                "title": "Luanda",
                "latitude": -8.8159,
                "longitude": 13.2306
            }, {
                "title": "Porto-Novo",
                "latitude": 6.4779,
                "longitude": 2.6323
            }, {
                "title": "Gaborone",
                "latitude": -24.657,
                "longitude": 25.9089
            }, {
                "title": "Ouagadougou",
                "latitude": 12.3569,
                "longitude": -1.5352
            }, {
                "title": "Bujumbura",
                "latitude": -3.3818,
                "longitude": 29.3622
            }, {
                "title": "Yaounde",
                "latitude": 3.8612,
                "longitude": 11.5217
            }, {
                "title": "Bangui",
                "latitude": 4.3621,
                "longitude": 18.5873
            }, {
                "title": "Dodoma",
                "latitude": -6.167,
                "longitude": 35.7497
            }, {
                "title": "Lome",
                "latitude": 6.1228,
                "longitude": 1.2255
            }, {
                "id": "colombo",
                "title": "Colombo",
                "latitude": 6.9155,
                "longitude": 79.8572
            }, {
                "id": "damascus",
                "title": "Damascus",
                "latitude": 33.5158,
                "longitude": 36.2939
            }, {
                "id": "taipei",
                "title": "Taipei",
                "latitude": 25.0338,
                "longitude": 121.5645
            }, {
                "id": "dushanbe",
                "title": "Dushanbe",
                "latitude": 38.5737,
                "longitude": 68.7738
            }, {
                "id": "bangkok",
                "title": "Bangkok",
                "latitude": 13.7573,
                "longitude": 100.502
            }, {
                "title": "Seoul",
                "id": "seoul",
                "latitude": 37.5139,
                "longitude": 126.9828
            },{
                "title": "Ankara",
                "latitude": 39.9439,
                "longitude": 32.856
            }, {
                "id": "ashgabat",
                "title": "Ashgabat",
                "latitude": 37.9509,
                "longitude": 58.3794
            }, {
                "id":"abu dhabi",
                "title": "Abu Dhabi",
                "latitude": 24.4764,
                "longitude": 54.3705
            },{
                "title": "Buenos Aires",
                "latitude": -34.6118,
                "longitude": -58.4173
            }, {
                "title": "Bridgetown",
                "latitude": 13.0935,
                "longitude": -59.6105
            }, {
                "title": "Belmopan",
                "latitude": 17.2534,
                "longitude": -88.7713
            }, {
                "title": "Sucre",
                "latitude": -19.0421,
                "longitude": -65.2559
            }, {
                "title": "Brasilia",
                "latitude": -15.7801,
                "longitude": -47.9292
            },  {
                "title": "Managua",
                "latitude": 12.1475,
                "longitude": -86.2734
            }, {
                "title": "Panama",
                "latitude": 8.9943,
                "longitude": -79.5188
            }, {
                "title": "Asuncion",
                "latitude": -25.3005,
                "longitude": -57.6362
            }, {
                "title": "Lima",
                "latitude": -12.0931,
                "longitude": -77.0465
            }, {
                "title": "Castries",
                "latitude": 13.9972,
                "longitude": -60.0018
            }, {
                "title": "Paramaribo",
                "latitude": 5.8232,
                "longitude": -55.1679
            }, {
                "title": "Montevideo",
                "latitude": -34.8941,
                "longitude": -56.0675
            }, {
                "title": "Caracas",
                "latitude": 10.4961,
                "longitude": -66.8983
            }, {
                "title": "Oranjestad",
                "latitude": 12.5246,
                "longitude": -70.0265
            }, {
                "title": "Cayenne",
                "latitude": 4.9346,
                "longitude": -52.3303
            }, {
                "title": "Plymouth",
                "latitude": 16.6802,
                "longitude": -62.2014
            }, {
                "title": "San Juan",
                "latitude": 18.45,
                "longitude": -66.0667
            }, {
                "title": "Algiers",
                "latitude": 36.7755,
                "longitude": 3.0597
            }, {
                "title": "Luanda",
                "latitude": -8.8159,
                "longitude": 13.2306
            }, {
                "title": "Porto-Novo",
                "latitude": 6.4779,
                "longitude": 2.6323
            }, {
                "title": "Gaborone",
                "latitude": -24.657,
                "longitude": 25.9089
            },  {
                "id": "cairo",
                "title": "Cairo",
                "latitude": 30.0571,
                "longitude": 31.2272
            }];

// Default to London view //chart.homeGeoPoint = { "longitude": originCities[0].zoomLongitude, "latitude": originCities[0].zoomLatitude }; //chart.homeZoomLevel = originCities[0].zoomLevel;
        var targetSVG = "M9,0C4.029,0,0,4.029,0,9s4.029,9,9,9s9-4.029,9-9S13.971,0,9,0z M9,15.93 c-3.83,0-6.93-3.1-6.93-6.93S5.17,2.07,9,2.07s6.93,3.1,6.93,6.93S12.83,15.93,9,15.93 M12.5,9c0,1.933-1.567,3.5-3.5,3.5S5.5,10.933,5.5,9S7.067,5.5,9,5.5 S12.5,7.067,12.5,9z";
        var planeSVG = "m2,106h28l24,30h72l-44,-133h35l80,132h98c21,0 21,34 0,34l-98,0 -80,134h-35l43,-133h-71l-24,30h-28l15,-47";
// Texts
        var labelsContainer = chart.createChild(am4core.Container);
            labelsContainer.isMeasured = false;
            labelsContainer.x = 80;
            labelsContainer.y = 27;
            labelsContainer.layout = "horizontal";
            labelsContainer.zIndex = 10;

        var plane = labelsContainer.createChild(am4core.Sprite);
            plane.scale = 0.15;
            plane.path = planeSVG;
            plane.fill = am4core.color("#cc0000");

        var title = labelsContainer.createChild(am4core.Label);
            title.text = "Flights from London";
            title.fill = am4core.color("#cc0000");
            title.fontSize = 20;
            title.valign = "middle";
            title.dy = 2;
            title.marginLeft = 15;

        // var changeLink = chart.createChild(am4core.TextLink);//     changeLink.text = "Click to change origin city";//     changeLink.isMeasured = false;//// changeLink.events.on("hit", function() {//     if (currentOrigin == originImageSeries.dataItems.getIndex(0)) {//         showLines(originImageSeries.dataItems.getIndex(1));//     }//     else {//         showLines(originImageSeries.dataItems.getIndex(0));//     }// });//     changeLink.x = 142;//     changeLink.y = 72;//     changeLink.fontSize = 13; // The world
        var worldPolygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
            worldPolygonSeries.useGeodata = true;
            worldPolygonSeries.fillOpacity = 0.6;
            worldPolygonSeries.exclude = ["AQ"];
// Origin series (big targets, London and Vilnius)
        var originImageSeries = chart.series.push(new am4maps.MapImageSeries());
        var originImageTemplate = originImageSeries.mapImages.template;
            originImageTemplate.propertyFields.latitude = "latitude";
            originImageTemplate.propertyFields.longitude = "longitude";
            originImageTemplate.propertyFields.id = "id";
            originImageTemplate.cursorOverStyle = am4core.MouseCursorStyle.pointer;
            originImageTemplate.nonScaling = true;
            originImageTemplate.tooltipText = "{title}";
            originImageTemplate.setStateOnChildren = true;
            originImageTemplate.states.create("hover");
            originImageTemplate.horizontalCenter = "middle";
            originImageTemplate.verticalCenter = "middle";

        var originHitCircle = originImageTemplate.createChild(am4core.Circle);
            originHitCircle.radius = 11;
            originHitCircle.fill = interfaceColors.getFor("background");
        var originTargetIcon = originImageTemplate.createChild(am4core.Sprite);
            originTargetIcon.fill = interfaceColors.getFor("alternativeBackground");
            originTargetIcon.strokeWidth = 0;
            originTargetIcon.scale = 1.3;
            originTargetIcon.horizontalCenter = "middle";
            originTargetIcon.verticalCenter = "middle";
            originTargetIcon.path = targetSVG;
        var originHoverState = originTargetIcon.states.create("hover");
            originHoverState.properties.fill = chart.colors.getIndex(1);
        originImageTemplate.events.on("hit", function(event) { // when hit on city, change lines
            showLines(event.target.dataItem);
        });
// destination series (small targets)
        var destinationImageSeries = chart.series.push(new am4maps.MapImageSeries());
        var destinationImageTemplate = destinationImageSeries.mapImages.template;
            destinationImageTemplate.nonScaling = true;
            //destinationImageTemplate.tooltipText = "{title}";
            destinationImageTemplate.fill = interfaceColors.getFor("alternativeBackground");
            destinationImageTemplate.setStateOnChildren = true;
            destinationImageTemplate.states.create("hover");
            destinationImageTemplate.propertyFields.latitude = "latitude";
            destinationImageTemplate.propertyFields.longitude = "longitude";
            destinationImageTemplate.propertyFields.id = "id";
        var destinationHitCircle = destinationImageTemplate.createChild(am4core.Circle);
            destinationHitCircle.radius = 7;
            destinationHitCircle.fillOpacity = 1;
            destinationHitCircle.fill = interfaceColors.getFor("background");
        var destinationTargetIcon = destinationImageTemplate.createChild(am4core.Sprite);
            destinationTargetIcon.scale = 0.7;
            destinationTargetIcon.path = targetSVG;
            destinationTargetIcon.horizontalCenter = "middle";
            destinationTargetIcon.verticalCenter = "middle";
            originImageSeries.data = originCities;
            destinationImageSeries.data = destinationCities;
// Line series
        var lineSeries = chart.series.push(new am4maps.MapLineSeries());
            lineSeries.mapLines.template.line.strokeOpacity = 0.5;
        function showLines(origin) {
            console.log(origin);
            var dataContext = origin.dataContext;
            var destinations = dataContext.destinations;
            // clear old
                lineSeries.mapLines.clear();
                lineSeries.toBack();
                worldPolygonSeries.toBack();
                currentOrigin = origin;
            if (destinations) {
                for (var i = 0; i < destinations.length; i++) {
                    var line = lineSeries.mapLines.create();
                    line.imagesToConnect = [origin.mapImage.id, destinations[i]];
                }
            }
            title.text = "Flights from " + dataContext.title;
            chart.zoomToGeoPoint({ latitude: dataContext.zoomLatitude, longitude: dataContext.zoomLongitude }, dataContext.zoomLevel, true);
        }
        // var triggerIndex = function(idx){//     showLines(originImageSeries.dataItems.getIndex(idx));//};
        chart.events.on("ready", function() {
            //console.log(arguments); //triggerIndex(0);
            showLines(originImageSeries.dataItems.getIndex(0));
        });

        var currentOrigin;
        var graticuleSeries = chart.series.push(new am4maps.GraticuleSeries());
            graticuleSeries.mapLines.template.line.strokeOpacity = 0.05;
        //Map
        function chartPopup(elem) {
            chart.closeAllPopups();
            //console.log(elem);
            dataValue = elem.target.dataItem.dataContext;
            console.log(dataValue);
            var popup = chart.openPopup("<strong>" + elem.target.dataItem.dataContext.title + "</strong>");
            popup.left = elem.svgPoint.x + -25;
            popup.top = elem.svgPoint.y + -25;
            popup.showCurtain = true;

            //popup.properties.fill = am4core.color("#CC0000");
        }
        //originImageTemplate.events.on("hit", function(ev) { chartPopup(ev); });
        destinationImageTemplate.events.on("hit", function(ev) { chartPopup(ev); });
    }

}
