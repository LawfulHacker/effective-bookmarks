import { BookmarkDatabase } from './lib/Database';
import { Bookmark } from './lib/Database';
import { Tag } from './lib/Database';

let db = BookmarkDatabase.getDb();

function loadBookmarks() {
  db.bookmarks.each(bookmark => {
    let div = document.createElement('div');
    let a = document.createElement('a');
    a.href = bookmark.url;
    a.text = bookmark.title;
    div.appendChild(a);
    document.body.appendChild(div);
  })
}

// Saves options to chrome.storage
function save_options() {
  var color = (document.getElementById('color') as HTMLInputElement).value;
  var likesColor = (document.getElementById('like') as HTMLInputElement).checked;
  chrome.storage.sync.set({
    favoriteColor: color,
    likesColor: likesColor
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    favoriteColor: 'red',
    likesColor: true
  }, function(items) {
    (document.getElementById('color') as HTMLInputElement).value = items.favoriteColor;
    (document.getElementById('like') as HTMLInputElement).checked = items.likesColor;
  });
}

document.addEventListener('DOMContentLoaded', loadBookmarks);
// document.getElementById('save').addEventListener('click', save_options);

