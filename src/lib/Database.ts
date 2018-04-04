import Dexie from 'dexie';

export interface IBookmark {
  id?: number;
  title: string;
  url: string;
  browserBookmarkId: any;
}

export interface ITag {
  id?: number;
  name: string;
}

export class Bookmark implements IBookmark {
  id?: number;
  title: string;
  browserBookmarkId: any;
  url: string;

  constructor(title: string, url: string, browserBookmarkId: any, id?:number) {
    this.title = title;
    this.url = url;
    this.browserBookmarkId = browserBookmarkId;

    if (id) {
      this.id = id;
    }
  }
}

export class Tag implements ITag {
  id?: number;
  name: string;

  constructor(name: string, id?:number) {
    this.name = name;

    if (id) {
      this.id = id;
    }
  }
}

export class BookmarkDatabase extends Dexie {
  private static db:BookmarkDatabase = null;
  bookmarks: Dexie.Table<IBookmark, number>;
  tags: Dexie.Table<ITag, number>;

  constructor () {
      super("effective-bookmarks");
      this.version(1).stores({
          bookmarks: '++id, title, &url, *tags',
          tags: '++id, &name'
      });
  }

  static getDb() {
    if (BookmarkDatabase.db === null) {
      BookmarkDatabase.db = new BookmarkDatabase();
    }

    return BookmarkDatabase.db;
  }
}
