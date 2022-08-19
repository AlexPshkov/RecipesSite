export class Tag {

  public id: number;
  public tagName: string;
  public tagIconURL: string;
  public tagDescription: string;


  constructor(id: number, tagName: string, tagIconURL: string, tagDescription: string) {
    this.id = id;
    this.tagName = tagName;
    this.tagIconURL = tagIconURL;
    this.tagDescription = tagDescription;
  }
}
