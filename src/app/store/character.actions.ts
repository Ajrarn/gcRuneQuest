import { CharacterRune, Culture, Occupation, Specie } from './models';


export class CharacterUpdateSpecie {
  static readonly type = '[Character] update specie';
  constructor(public specie: Specie) {}
}

export class CharacterUpdateCulture {
  static readonly type = '[Character] update culture';
  constructor(public culture: Culture) {}
}

export class CharacterUpdateOccupation {
  static readonly type = '[Character] update occupation';
  constructor(public occupation: Occupation) {}
}

export class CharacterUpdateRunes {
  static readonly type = '[Character] update runes';
  constructor(public runes: CharacterRune[]) {}
}
