import { Character, Culture, Specie } from './models';

export class UpdateCharacter {
  static readonly type = '[Character] update';
  constructor(public character: Character) {}
}

export class CharacterUpdateSpecie {
  static readonly type = '[Character] update specie';
  constructor(public specie: Specie) {}
}

export class CharacterUpdateCulture {
  static readonly type = '[Character] update culture';
  constructor(public culture: Culture) {}
}
