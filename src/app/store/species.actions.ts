export class LoadAllSpecies {
  static readonly type = '[Species] LoadAllSpecies';
}

export class LoadSpecie {
  static readonly type = '[Species] LoadHumans';
  constructor(public filename: string) {}
}



