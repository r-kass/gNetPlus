document.forms[0].onsubmit = function(e) {
    e.preventDefault(); // Prevent submission
    var enter_info = document.getElementById('enter_info').value;
    var find_info = document.getElementById('find_info').value;
    chrome.runtime.getBackgroundPage(function(bgWindow) {
        bgWindow.setEnter_info(enter_info);
        bgWindow.setFind_info(find_info);
        window.close();     // Close dialog
    });
};
