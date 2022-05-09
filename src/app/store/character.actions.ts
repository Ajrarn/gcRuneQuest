import { Character } from './models';

export class UpdateCharacter {
  static readonly type = '[Character] update';
  constructor(public character: Character) {}
}
