import { Action, State, StateContext } from '@ngxs/store';
import {
  Character,
  CharacteristicsValues,
  CharacterSkill,
  CharacterSkillCategorie,
  getCharacteristicValue,
  Skill,
  SkillCategorie,
  SkillProvenance
} from './models';
import { Injectable } from '@angular/core';
import { CharacterUpdateCulture, CharacterUpdateSpecie, UpdateCharacter } from './character.actions';
import * as _ from 'lodash';

@State<Character>({
  name: 'character',
  defaults: {
    specie: '',
    culture: '',
    characteristics: {
      STR: 0,
      CON: 0,
      SIZ: 0,
      INT: 0,
      POW: 0,
      DEX: 0,
      CHA: 0
    },
    skills: [],
    spells: [],
    languages: []
  }
})
@Injectable()
export class CharacterState {

  @Action(UpdateCharacter)
  updateCharacter(ctx: StateContext<Character>, action: UpdateCharacter) {
    ctx.setState(action.character);
  }

  @Action(CharacterUpdateSpecie)
  updateSpecie(ctx: StateContext<Character>, action: CharacterUpdateSpecie) {
    let character = _.cloneDeep(ctx.getState());
    ctx.patchState({
      specie: action.specie.name,
      skills: this.fusionSkillsWithSpecie(character.skills, action.specie.skills, character.characteristics)
    });
  }

  @Action(CharacterUpdateCulture)
  updateCulture(ctx: StateContext<Character>, action: CharacterUpdateCulture) {
    let character = _.cloneDeep(ctx.getState());
    ctx.patchState({
      culture: action.culture.name,
      skills: this.fusionSkillsWithCulture(character.skills, action.culture.skills, character.characteristics)
    });
  }

  fusionSkillsWithSpecie(initialCategories: CharacterSkillCategorie[], specieCategories: SkillCategorie[], characteristics: CharacteristicsValues): CharacterSkillCategorie[] {
    let responseCategories = initialCategories;
    const specieCharacterCategories = this.categoriesToCharacterCategories(specieCategories, SkillProvenance.Specie, characteristics);

    if (responseCategories && responseCategories.length > 0) {
      specieCharacterCategories.forEach((categorie: CharacterSkillCategorie) => {
        let responseCategorie = responseCategories.find(cat => cat.name === categorie.name);
        if (responseCategorie) {
          categorie.skills.forEach(skill => {
            // @ts-ignore
            let initialSkill = responseCategorie.skills.find(sk => sk.name === skill.name);
            if (initialSkill) {
              initialSkill.valueSpecie = skill.valueSpecie;
            } else {
              // @ts-ignore
              responseCategorie.skills.push(skill);
            }
          });
        } else {
          responseCategories.push( categorie);
        }
      })
    } else {
      responseCategories = specieCharacterCategories;
    }
    return responseCategories;
  }

  fusionSkillsWithCulture(initialCategories: CharacterSkillCategorie[], cultureSkills: Skill[], characteristics: CharacteristicsValues): CharacterSkillCategorie[] {
    let responseCategories:CharacterSkillCategorie[] = [];
    if (initialCategories) {
      responseCategories = initialCategories;
    }

    if (responseCategories && responseCategories.length > 0) {
      cultureSkills.forEach((skill: Skill) => {
        let arrayName = skill.name.split('.');
        let categorieName = arrayName[0] + '.' + arrayName[1] + '.name';
        let responseCategorie = responseCategories.find(cat => cat.name === categorieName);

        let value = 0;
        if (skill.value) {
          value = skill.value;
        } else {
          if (skill.formula) {
            value = this.convertFormula(characteristics, skill.formula);
          }
        }

        if (responseCategorie) {
          let initialSkill = responseCategorie.skills.find(sk => sk.name === skill.name);
          if (initialSkill) {
            initialSkill.valueCulture = value;
          } else {
            responseCategorie.skills.push({name: skill.name, valueCulture: value, valueSpecie:0});
          }
        } else {
          responseCategories.push({name: categorieName, bonus: 0, skills: [{name: skill.name, valueCulture: value, valueSpecie:0}]});
        }
      });
    }
    return responseCategories;
  }

  skillToCharacterSkill(skill: Skill, provenance: SkillProvenance, characteristics: CharacteristicsValues): CharacterSkill {
    const name = skill.name;
    let valueSpecie = 0;
    let valueCulture = 0;

    let value: number;
    if (skill.value) {
      value = skill.value;
    } else {
      if (skill.formula) {
        value = this.convertFormula(characteristics, skill.formula);
      } else {
        value = 0;
      }
    }
    if (provenance === SkillProvenance.Culture) {
      valueCulture = value;
    } else {
      valueSpecie = value;
    }

    return {
      name,
      valueSpecie,
      valueCulture
    };

  }

  skillsToCharacterSkills(skills: Skill[], provenance: SkillProvenance, characteristics: CharacteristicsValues): CharacterSkill[] {
    return skills.map((item: Skill) => this.skillToCharacterSkill(item, provenance, characteristics));
  }

  categorieToCharacterCategorie(categorie: SkillCategorie, provenance: SkillProvenance, characteristics: CharacteristicsValues): CharacterSkillCategorie {
    return {
      name: categorie.name,
      bonus: 0,
      skills: this.skillsToCharacterSkills(categorie.items, provenance, characteristics)
    }
  }

  categoriesToCharacterCategories(categories: SkillCategorie[], provenance: SkillProvenance, characteristics: CharacteristicsValues): CharacterSkillCategorie[] {
    return categories.map(categorie => this.categorieToCharacterCategorie(categorie, provenance, characteristics));
  }

  convertFormula(characteristics: CharacteristicsValues, formula: string): number {
    const [charName, factor] = formula.split('*');
    const nFactor = Number(factor);
    const valueChar = getCharacteristicValue(characteristics, charName);
    return valueChar * nFactor;
  }


}
