angular.module('web-tasks').controller("nasatlxcontroller",nasatlxcontroller);
function nasatlxcontroller() {
    var vm = this;
        vm.title = "NASA TLX Questionaire";
        vm.data = {
            "physical-demand": {
                "physical-demand-rating": 0,
                "physical-demand-tally": 0,
                "physical-demand-weight": 0,
                "physical-demand-overall" : 0
            },
            "mental-demand": {
                "mental-demand-rating": 0,
                "mental-demand-tally": 0,
                "mental-demand-weight": 0,
                "mental-demand-overall" : 0
            },
            "temporal-demand": {
                "temporal-demand-rating": 0,
                "temporal-demand-tally": 0,
                "temporal-demand-weight": 0,
                "temporal-demand-overall" : 0
            },
            "effort": {
                "effort-rating": 0,
                "effort-tally": 0,
                "effort-weight": 0,
                "effort-overall" : 0
            },
            "performance": {
                "performance-rating": 0,
                "performance-tally": 0,
                "performance-weight": 0,
                "performance-overall" : 0
            },
            "frustration": {
                "frustration-rating": 0,
                "frustration-tally": 0,
                "frustration-weight": 0,
                "frustration-overall" : 0
            },
            "nasa-tlx-overall": 0
        };
    $(".grid-rating li").click(function() {
        var value = parseInt($(this).attr('data-grid-value')),
            mwlType = $(this).parent().data("name");
            $(this).addClass('selected').siblings().removeClass('selected').parent().attr('data-clicked', 'true');
        if( mwlType !== "self-report-measure" ){
                vm.data[mwlType][mwlType + "-rating"] = value;
            if($(".rating-container").find(".grid-rating[data-clicked='true']").length == 6){
                $("#goToPairwise").attr("disabled",false)
            }
        }
        else
            vm.data[mwlType + "-rating"] = value;
    });
    $('.checkbox').change(function() {
        var mwlType = $(this).data("name"),
            count = $(".pairTable").find(".checkbox[data-name='" + mwlType + "']:checked").length;
            vm.data[mwlType][mwlType + "-tally"] = count;
            vm.data[mwlType][mwlType + "-weight"] = count / 15;
            vm.data[mwlType][mwlType + "-overall"] =  parseFloat( vm.data[mwlType][mwlType + "-rating"]) * parseFloat( vm.data[mwlType][mwlType + "-weight"] );
            computeNasa();
        if($(".checkbox:checked").length > 14) {
            $("#goToSelfReport").removeClass("disabled");
            $.extend(vm.data,JSON.parse(localStorage.getItem("taskData")));
            console.log("data",vm.data);
            localStorage.setItem("taskData",JSON.stringify(vm.data));
        }
        else {
            $("#goToSelfReport").addClass("disabled");
        }
    });
    function computeNasa() {
       vm.data["nasa-tlx-overall"] =  vm.data["effort"]["effort-overall"] + vm.data["frustration"]["frustration-overall"]
           + vm.data["performance"]["performance-overall"] + vm.data["mental-demand"] ["mental-demand-overall"]
           + vm.data["temporal-demand"]["temporal-demand-overall"]+ vm.data["physical-demand"]["physical-demand-overall"];
    }
    $("#goToPairwise").click(function() {
        $(".rating-container").hide();
        $(".pairwise-container").show();
    });
    $("#goToSelfReport").click(function() {
        $(".pairwise-container").hide();
        $(".selfreport-container").show();
    });
}
