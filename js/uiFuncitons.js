
function activePlugin() {
    localStorage.activate = "true";
    $("#activate").hide();
}

function deactivePlugin() {
    localStorage.activate = "false";
    $("#activate").show();
    resetTimeline();
    location.reload();
}

function setHeight() {
    $("#logPreview").height($(window).height() - $("#logPreview").offset().top);
}

function clearPreview() {
    $("#logPreview").html("");
}

function noScroll() {
    while ($("#logPreview").prop("scrollHeight") > $("#logPreview").height()) {
        $("#logPreview").find("div:first-child").remove();
    }
}

function autoScroll() {
    var height = Number.MAX_SAFE_INTEGER;
    var scrollSpeed = 0;
    $("#logPreview").animate({ scrollTop: height }, scrollSpeed);
}

function lineLimitation() {
    var limitation = 100;
    for (var lines = document.getElementById("logPreview").children; lines.length > limitation;)
    {
        lines[0].remove();
    }
}

function resetTimeline() {
    window.timeline = [];
    window.workline = [];
    window.logline = [];
    window.isActive = false;
    window.pauseTimeline = false;
    window.lastZone = "Unknown";

    clearPreview();
}