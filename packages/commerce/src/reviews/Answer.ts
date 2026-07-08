export class Answer {
  public id: string;
  public questionId: string;
  public responseText: string;

  constructor(id: string, questionId: string, responseText: string) {
    this.id = id;
    this.questionId = questionId;
    this.responseText = responseText;
  }
}
