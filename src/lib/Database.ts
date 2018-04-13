import Dexie from 'dexie';
import * as uuid from 'uuid/v4';

export interface IBookmark {
  id?: string;
  title: string;
  url: string;
  browserBookmarkId: any;
}

export interface ITag {
  id?: string;
  name: string;
}

export class Bookmark implements IBookmark {
  id?: string;
  title: string;
  browserBookmarkId: any;
  url: string;

  constructor(title: string, url: string, browserBookmarkId: any, id?:string) {
    this.id = id ? id : uuid();
    this.title = title;
    this.url = url;
    this.browserBookmarkId = browserBookmarkId;
  }
}

export class Tag implements ITag {
  id?: string;
  name: string;

  constructor(name: string, id?:string) {
    this.id = id ? id : uuid();
    this.name = name;
  }
}

export class BookmarkDatabase extends Dexie {
  private static db:BookmarkDatabase = null;
  bookmarks: Dexie.Table<IBookmark, number>;
  tags: Dexie.Table<ITag, number>;

  constructor () {
      super("effective-bookmarks");
      this.version(1).stores({
          bookmarks: '&id, title, &url, *tags',
          tags: '&id, &name'
      });
  }

  static getDb() {
    if (BookmarkDatabase.db === null) {
      BookmarkDatabase.db = new BookmarkDatabase();
    }

    return BookmarkDatabase.db;
  }
}
