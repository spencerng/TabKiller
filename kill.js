chrome.contextMenus.create({
    id: "killTab",
    title: "Kill a tab",
    contexts: ["all"],
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function killRandomTab() {
    chrome.tabs.query({}, function(tabs) {
        if (tabs.length == 1) {
          return
        }

        // Send message to play a sound in the current tab
        var curId;
        chrome.tabs.query({
            active: true
        }, function(curTab) {
            curId = curTab[0].id

            chrome.tabs.sendMessage(curTab[0].id, {
                name: "shot"
            });

        });

        // Select a tab index that *isn't* our current tab
        var tabIdx;
        do {
          tabIdx = Math.floor(Math.random() * tabs.length);
        } while(tabs[tabIdx].id == curId);
        
        chrome.tabs.remove(tabs[tabIdx].id);
    });
}

// Add button to right-click to close on demand
chrome.contextMenus.onClicked.addListener(function() {
    killRandomTab();
})

var MIN_DUR_SEC = 60;
var MAX_DUR_SEC = 120;

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function killTabContinuous() {
    killRandomTab();
    setTimeout(killTabContinuous, getRandomInt(MIN_DUR_SEC, MAX_DUR_SEC) * 1000);
}

function init() {
    setTimeout(killTabContinuous, getRandomInt(MIN_DUR_SEC, MAX_DUR_SEC) * 1000);
}

init()