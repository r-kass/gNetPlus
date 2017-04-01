document.forms[0].onsubmit = function(e) {
    e.preventDefault(); // Prevent submission
    var school = document.getElementById('school').value;
    var city = document.getElementById('city').value;
    var major = document.getElementById('major').value;
    var email = document.getElementById('email').value;
    chrome.runtime.getBackgroundPage(function(bgWindow) {
        bgWindow.setSchool(school);
        bgWindow.setCity(city);
        bgWindow.setMajor(major);
        bgWindow.setEmail(email);
        window.close();     // Close dialog
    });
};
