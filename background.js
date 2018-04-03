"use strict";

chrome.runtime.onInstalled.addListener(function() {
  // chrome.storage.sync.set({color: '#3aa757'}, function() {
  //   console.log("The color is green.");
  // });
});

chrome.omnibox.onInputStarted.addListener(function() {
  // console.log(arguments);
});

chrome.omnibox.onInputChanged.addListener(function(text, suggest) {
  suggest([{
    content: '> ' + text,
    description: `<url>${text}</url>...<match>${text}</match>...<dim>${text}</dim>`
  }]);
});

chrome.omnibox.onInputEntered.addListener(function(text, /* OnInputEnteredDisposition */ disposition) {
  switch(disposition) {
    case "currentTab":
    case "newForegroundTab":
    case "newBackgroundTab":
      break;
  }
});
