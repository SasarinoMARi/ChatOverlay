
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

function resetTimeline() {
    window.timeline = [];
    window.workline = [];
    window.logline = [];
    window.isActive = false;
    window.pauseTimeline = false;
    window.lastZone = "Unknown";

    clearPreview();
}