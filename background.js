import Bookmark from './db/bookmarks.js';

var dbRequest = new Promise(function(resolve, reject) {
  var openRequest = indexedDB.open('effective-bookmarks', 1);
  openRequest.onupgradeneeded = function(event) {
    let db = event.target.result;
    let transaction = event.target.transaction;
    let request;
    if (event.oldVersion < 1) {
      let bookmarks = db.createObjectStore('bookmarks');
      bookmarks.createIndex('url', 'url', { unique: true });
      bookmarks.createIndex('tags', 'tags', { multiEntry: true });
      bookmarks.createIndex('date', 'date');
      let tags = db.createObjectStore('tags');
      tags.createIndex('name', 'name', { unique: true });
    }
  };

  openRequest.onsuccess = function(event) {
    resolve(event.target.result);
  };
});

async function getDb() {
  return await dbRequest;
}

chrome.runtime.onInstalled.addListener(function() {
  // chrome.storage.sync.set({color: '#3aa757'}, function() {
  //   console.log("The color is green.");
  // });
});

chrome.omnibox.onInputStarted.addListener(function() {
  // console.log(arguments);
  var bookmark = new Bookmark('asd', 'qwe');
  console.log(bookmark.title)
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

async function saveBookmark() {
  let db = await getDb();
}

chrome.bookmarks.getTree(function(results) {
  results.forEach(x => console.log(x));
});
