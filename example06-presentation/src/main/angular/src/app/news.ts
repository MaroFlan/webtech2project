export class News {
  publishedOn: string;
  headline: string;
  content: string;
  userId: number;
  id: number;
  username: string;

  static fromObject(object: any): News {
    const n = new News();
    n.headline = object.headline;
    n.content = object.content;
    n.publishedOn = object.publishedOn;
    n.id = object.id;
    n.userId = object.userId;
    n.username = object.username;
    return n;
  }
}
