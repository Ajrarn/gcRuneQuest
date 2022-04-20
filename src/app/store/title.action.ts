export class ChangeTitle {
  static readonly type = '[Title] Change';
  constructor(public title: string) {}
}
