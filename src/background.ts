import { BookmarkDatabase } from './lib/Database';
import { Bookmark } from './lib/Database';
import { Tag } from './lib/Database';

let db = BookmarkDatabase.getDb();

chrome.runtime.onInstalled.addListener(function() {
  console.log('Application installed!');
  chrome.bookmarks.getTree(saveBookmarks);
});

chrome.omnibox.onInputChanged.addListener(
  (text, suggest) => {
    suggest([{
      content: '> ' + text,
      description: `<url>${text}</url>...<match>${text}</match>...<dim>${text}</dim>`
    }]);
  }
);

chrome.omnibox.onInputEntered.addListener((text) => {
  // switch(disposition) {
  //   case "currentTab":
  //   case "newForegroundTab":
  //   case "newBackgroundTab":
  //     break;
  // }
});

async function saveBookmark(bookmark: chrome.bookmarks.BookmarkTreeNode) {
  if (bookmark.url) {
    let existingBookmark = await db.bookmarks.where('url').equals(bookmark.url).first();
    if (!existingBookmark) {
      try {
        await db.bookmarks.add(new Bookmark(bookmark.title, bookmark.url, bookmark.id));
      } catch(e) {
        console.log('Error: ', bookmark)
      }
    }
  } else {
    let existingTag = await db.tags.where('name').equals(bookmark.title).first();
    if (!existingTag) {
      try {
        await db.tags.add(new Tag(bookmark.title));
      } catch(e) {
        console.log('Error: ', bookmark)
      }
    }
  }

  if (bookmark.children) {
    await saveBookmarks(bookmark.children);
  }
}

async function saveBookmarks(bookmarks: chrome.bookmarks.BookmarkTreeNode[]) {
  for (let bookmark of bookmarks) {
    await saveBookmark(bookmark);
  }
}
