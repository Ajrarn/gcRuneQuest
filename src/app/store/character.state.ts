import { Action, State, StateContext, Store } from '@ngxs/store';
import {
  categoriesToCharacterCategories,
  Character,
  CharacterSkill, Culture, Occupation,
  SkillProvenance,
  skillsToCharacterSkills,
  Specie
} from './models';
import { Injectable } from '@angular/core';
import { CharacterUpdateCulture, CharacterUpdateOccupation, CharacterUpdateSpecie } from './character.actions';
import * as _ from 'lodash';

@State<Character>({
  name: 'character',
  defaults: {
    specie: '',
    culture: '',
    occupation:'',
    characteristics: {
      STR: 0,
      CON: 0,
      SIZ: 0,
      INT: 0,
      POW: 0,
      DEX: 0,
      CHA: 0
    },
    runeSpecie: [],
    runeAlterations: [],
    runes: [],
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

  @Action(CharacterUpdateOccupation)
  updateOccupation(ctx: StateContext<Character>, action: CharacterUpdateOccupation) {
    ctx.patchState({
      occupation: action.occupation.name
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

    if (!!character.occupation) {
      this.skillsFromOccupation(ctx);
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

    character.specialSkillsCulture = [];

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
        character.specialSkillsCulture.push(skill);
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

  skillsFromOccupation(ctx: StateContext<Character>) {
    const character = _.cloneDeep(ctx.getState());

    const occupationsCultures = this.store.selectSnapshot(state => state.occupations);
    const categorieOccupationName = character.occupation.split('.', 2).join('.') + '.name';
    const categorieOccupation = occupationsCultures.find((item: Occupation) => item.name === categorieOccupationName);
    const occupation = categorieOccupation.occupations.find((item: Occupation) => item.name === character.occupation);


    const skillsFromOccupation = skillsToCharacterSkills(occupation.skills, SkillProvenance.Occupation, character.characteristics);
    const skillCategoriesFromCharacter = character.skills;

    skillsFromOccupation.forEach(skill => {
      let categorieName = skill.name.split( '.', 2).join('.') + '.name';
      let categorie = skillCategoriesFromCharacter.find(categorie => categorie.name === categorieName);

      if (!!skill.param) {
        // in this case we'll find the skill in the special list
        let cultureSkill = character.specialSkillsCulture.find(item => item.name === skill.name);
        if (!!cultureSkill) {
          skill.valueSpecie = cultureSkill.valueSpecie;
        }

        if (categorie) {
          categorie.skills.push(skill);
        }
      } else {
        // in this case we'll update the existing skill
        if (categorie) {
          let characterSkill = categorie.skills.find(item => item.name === skill.name);
          if (characterSkill) {
            characterSkill.valueOccupation = skill.valueOccupation;
            characterSkill.formulaOccupation = skill.formulaOccupation;
          }
        }
      }
    });

    ctx.patchState({
      skills: skillCategoriesFromCharacter
    })
  }
}
