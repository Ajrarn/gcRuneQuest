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
