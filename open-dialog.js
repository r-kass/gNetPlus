if (confirm("Please login to Google+ to use gNet"))
    chrome.runtime.sendMessage({type:'get_info'});
