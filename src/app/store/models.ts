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
  specialSkillsSpecie: CharacterSkill[];
  specialSkillsCulture: CharacterSkill[];
  spells: string[];
  languages: string[];
}

export interface CharacterSkill {
  name: string;
  param?: string;
  valueSpecie: number;
  formulaSpecie?: string;
  valueCulture: number;
  formulaCulture?: string;
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

export function skillToCharacterSkill(skill: Skill, provenance: SkillProvenance, characteristics: CharacteristicsValues): CharacterSkill {
  const name = skill.name;
  const param = skill.param
  let valueSpecie = 0;
  let valueCulture = 0;
  let formulaSpecie: string | undefined = undefined;
  let formulaCulture: string | undefined  = undefined;

  let value: number;
  if (skill.value) {
    value = skill.value;
  } else {
    if (skill.formula) {
      value = convertFormula(characteristics, skill.formula);
    } else {
      value = 0;
    }
  }
  if (provenance === SkillProvenance.Culture) {
    valueCulture = value;
    formulaCulture = skill.formula;
  } else {
    valueSpecie = value;
    formulaSpecie = skill.formula
  }

  return {
    name,
    param,
    valueSpecie,
    valueCulture,
    formulaCulture,
    formulaSpecie
  };
}

export function skillsToCharacterSkills(skills: Skill[], provenance: SkillProvenance, characteristics: CharacteristicsValues): CharacterSkill[] {
  return skills.map((item: Skill) => skillToCharacterSkill(item, provenance, characteristics));
}

export function categorieToCharacterCategorie(categorie: SkillCategorie, provenance: SkillProvenance, characteristics: CharacteristicsValues): CharacterSkillCategorie {
  return {
    name: categorie.name,
    bonus: 0,
    skills: skillsToCharacterSkills(categorie.items, provenance, characteristics)
  }
}

export function categoriesToCharacterCategories(categories: SkillCategorie[], provenance: SkillProvenance, characteristics: CharacteristicsValues): CharacterSkillCategorie[] {
  return categories.map(categorie => categorieToCharacterCategorie(categorie, provenance, characteristics));
}

export function convertFormula(characteristics: CharacteristicsValues, formula: string): number {
  const [charName, factor] = formula.split('*');
  const nFactor = Number(factor);
  const valueChar = getCharacteristicValue(characteristics, charName);
  return valueChar * nFactor;
}
