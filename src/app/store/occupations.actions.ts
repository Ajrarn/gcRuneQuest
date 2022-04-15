export class LoadAllOccupations {
  static readonly type = '[Occupations] LoadAllOccupations';
}

export class LoadOccupation {
  static readonly type = '[Occupations] LoadOccupation';
  constructor(public filename: string) {}
}
