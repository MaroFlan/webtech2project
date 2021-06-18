export class News {
  publishedOn: Date;
  headline: string;
  content: string;
  id: number;

  static fromObject(object: any): News {
    const n = new News();
    n.headline = object.headline;
    n.content = object.content;
    n.publishedOn = new Date(object.publishedOn);
    n.id = object.id;
    return n;
  }
}
