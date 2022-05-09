export interface Skill {
  name: string;
  value: number | string;
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
  occupations: string []
}

export interface Homeland {
  name: string;
  cultures: Culture[]
}

export interface Character {
  specie: Specie | null;
  culture: Culture | null;
  skills: Skill[];
  spells: string[];
  languages: string[];
}
