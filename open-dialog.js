if (confirm('Open gNet to use with Google+?' + "/n" + "please login."))
    chrome.runtime.sendMessage({type:'get_info'});
