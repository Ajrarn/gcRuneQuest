import { Action, State, StateContext, Store } from '@ngxs/store';
import {
  categoriesToCharacterCategories,
  Character,
  CharacterSkill,Culture,
  SkillProvenance,
  skillsToCharacterSkills,
  Specie
} from './models';
import { Injectable } from '@angular/core';
import { CharacterUpdateCulture, CharacterUpdateSpecie } from './character.actions';
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
    specialSkillsSpecie: [],
    specialSkillsCulture: [],
    spells: [],
    languages: []
  }
})
@Injectable()
export class CharacterState {

  constructor(private store: Store){}

  @Action(CharacterUpdateSpecie)
  updateSpecie(ctx: StateContext<Character>, action: CharacterUpdateSpecie) {
    ctx.patchState({
      specie: action.specie.name
    });
    this.updateCharacter(ctx);
  }

  @Action(CharacterUpdateCulture)
  updateCulture(ctx: StateContext<Character>, action: CharacterUpdateCulture) {
    ctx.patchState({
      culture: action.culture.name
    });
    this.updateCharacter(ctx);
  }

  updateCharacter(ctx: StateContext<Character>) {
    const character = _.cloneDeep(ctx.getState());

    if (!!character.specie) {
      this.skillsFromSpecie(ctx);
    }
    if (!!character.culture) {
      this.skillsFromCulture(ctx);
    }
  }

  skillsFromSpecie(ctx: StateContext<Character>): void {

    const character = _.cloneDeep(ctx.getState());

    const species = this.store.selectSnapshot(state => state.species);
    const specie = species.find((item: Specie) => item.name === character.specie);

    let specialSkills: CharacterSkill[] = [];
    const specieCharacterCategories = categoriesToCharacterCategories(specie.skills, SkillProvenance.Specie, character.characteristics);

    specieCharacterCategories.forEach(categorie => {
      // first we search for the specials skills (with param)
      let sSkills = categorie.skills.filter(skill => !!skill.param);
      sSkills.forEach(item => {
        specialSkills.push(item);
        })
      // then we delete those from the normal list
      categorie.skills = categorie.skills.filter(skill => !skill.param);
    });

    ctx.patchState({
      skills: specieCharacterCategories,
      specialSkillsSpecie: specialSkills
    });
  }

  skillsFromCulture(ctx: StateContext<Character>) {
    const character = _.cloneDeep(ctx.getState());

    const categoriesCultures = this.store.selectSnapshot(state => state.cultures);
    const categorieCultureName = character.culture.split('.', 2).join('.') + '.name';
    const categorieCulture = categoriesCultures.find((item: Culture) => item.name === categorieCultureName);
    const culture = categorieCulture.cultures.find((item: Culture) => item.name === character.culture);


    const skillsFromCulture = skillsToCharacterSkills(culture.skills, SkillProvenance.Culture, character.characteristics);
    const skillCategoriesFromCharacter = character.skills;

    skillsFromCulture.forEach(skill => {
      let categorieName = skill.name.split( '.', 2).join('.') + '.name';
      let categorie = skillCategoriesFromCharacter.find(categorie => categorie.name === categorieName);

      if (!!skill.param) {
        // in this case we'll find the skill in the special list
        let specieSkill = character.specialSkillsSpecie.find(item => item.name === skill.name);
        if (!!specieSkill) {
          skill.valueSpecie = specieSkill.valueSpecie;
        }

        if (categorie) {
          categorie.skills.push(skill);
        }
      } else {
        // in this case we'll update the existing skill
        if (categorie) {
          let characterSkill = categorie.skills.find(item => item.name === skill.name);
          if (characterSkill) {
            characterSkill.valueCulture = skill.valueCulture;
            characterSkill.formulaCulture = skill.formulaCulture;
          }
        }
      }
    });

    ctx.patchState({
      skills: skillCategoriesFromCharacter
    })
  }
}
