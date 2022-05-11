export interface Skill {
  name: string;
  param?: string;
  formula?: string;
  value?: number;
}

export interface SkillCategorie {
  name: string;
  items: Skill[]
}

export interface Occupation {
  name: string;
  cultures: string[];
  skills: Skill[];
}

export interface OccupationGroup {
  name: string;
  occupations: Occupation[];
}

export interface Characteristics {
  STR: string;
  CON: string;
  SIZ: string;
  INT: string;
  POW: string;
  DEX: string;
  CHA: string;
}

export interface CharacteristicsValues {
  STR: number;
  CON: number;
  SIZ: number;
  INT: number;
  POW: number;
  DEX: number;
  CHA: number;
}

export enum ECharacteristics {
  STR = 'STR',
  CON = 'CON',
  SIZ = 'SIZ',
  INT = 'INT',
  POW = 'POW',
  DEX = 'DEX',
  CHA = 'CHA'
}

export function getCharacteristicValue(characteristics: CharacteristicsValues, charName: string): number {
  let value: number;
  switch (charName) {
    case ECharacteristics.STR: {
      value = characteristics.STR;
      break;
    }
    case ECharacteristics.CON: {
      value = characteristics.CON;
      break;
    }
    case ECharacteristics.SIZ: {
      value = characteristics.SIZ;
      break;
    }
    case ECharacteristics.INT: {
      value = characteristics.INT;
      break;
    }
    case ECharacteristics.POW: {
      value = characteristics.POW;
      break;
    }
    default: {
      value = characteristics.CHA;
      break;
    }
  }

  return value;
}

export interface Rune {
  name: string;
  value: string;
}

export interface Specie {
  name: string;
  cultures: string[];
  characteristics: Characteristics;
  runes: Rune[];
  skills: SkillCategorie[];
}

export interface Passion {
  name: string;
  value: number;
}

export interface Culture {
  name: string;
  runes: Rune[],
  passions: Passion[],
  skills: SkillCategorie[],
  occupations: string []
}

export interface Homeland {
  name: string;
  cultures: Culture[]
}

export interface Character {
  specie: string;
  culture: string;
  characteristics: CharacteristicsValues;
  skills: CharacterSkillCategorie[];
  spells: string[];
  languages: string[];
}

export interface CharacterSkill {
  name: string;
  valueSpecie: number;
  valueCulture: number;
}

export interface CharacterSkillCategorie {
  name: string;
  bonus: number;
  skills: CharacterSkill[];
}

export enum SkillProvenance {
  Specie,
  Culture
}
