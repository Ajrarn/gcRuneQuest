import { Component } from '@angular/core';
import { ChangeTitle } from '../../store/title.action';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-runes',
  templateUrl: './runes.component.html',
  styleUrls: ['./runes.component.less'],
})
export class RunesComponent {

  runes = [
    {
      name: 'static.elementalRunes',
      active: true,
      runes:[
        { title: 'runes.elemental.fire', icon: 'rune:fire-sky'},
        { title: 'runes.elemental.darkness', icon: 'rune:darkness'},
        { title: 'runes.elemental.water', icon: 'rune:water'},
        { title: 'runes.elemental.earth', icon: 'rune:earth'},
        { title: 'runes.elemental.air', icon: 'rune:air'},
        { title: 'runes.elemental.moon', icon: 'rune:moon-full'}
      ]
    },
    {
      name: 'static.powerRunes',
      active: true,
      runes:[
        { title: 'runes.power_form.beast', icon: 'rune:beast'},
        { title: 'runes.power_form.chaos', icon: 'rune:chaos'},
        { title: 'runes.power_form.death', icon: 'rune:death'},
        { title: 'runes.power_form.disorder', icon: 'rune:disorder'},
        { title: 'runes.power_form.dragonewt', icon: 'rune:dragonewt'},
        { title: 'runes.power_form.fertility', icon: 'rune:fertility'},
        { title: 'runes.power_form.harmony', icon: 'rune:harmony'},
        { title: 'runes.power_form.illusion', icon: 'rune:illusion'},
        { title: 'runes.power_form.man', icon: 'rune:man'},
        { title: 'runes.power_form.movement', icon: 'rune:movement-change'},
        { title: 'runes.power_form.plant', icon: 'rune:plant'},
        { title: 'runes.power_form.spirit', icon: 'rune:spirit'},
        { title: 'runes.power_form.stasis', icon: 'rune:stasis'},
        { title: 'runes.power_form.truth', icon: 'rune:truth'}
      ]
    },
    {
      name: 'static.conditions_runes',
      active: true,
      runes:[
        { title: 'runes.conditions.fate', icon: 'rune:fate'},
        { title: 'runes.conditions.infinity', icon: 'rune:infinity'},
        { title: 'runes.conditions.luck', icon: 'rune:luck'},
        { title: 'runes.conditions.magic', icon: 'rune:magic'},
        { title: 'runes.conditions.mastery', icon: 'rune:mastery'}
      ]
    },
    {
      name: 'static.moon_runes',
      active: true,
      runes:[
        { title: 'runes.moon.black', icon: 'rune:moon-black'},
        { title: 'runes.moon.crescent_come', icon: 'rune:moon-crescent-come'},
        { title: 'runes.moon.crescent_go', icon: 'rune:moon-crescent-go'},
        { title: 'runes.moon.empty_half', icon: 'rune:moon-empty-half'},
        { title: 'runes.moon.full', icon: 'rune:moon-full'},
        { title: 'runes.moon.full_half', icon: 'rune:moon-full-half'}
      ]
    },
    {
      name: 'static.sorcery_runes',
      active: true,
      runes:[
        { title: 'runes.sorcery.combine', icon: 'rune:combine'},
        { title: 'runes.sorcery.command', icon: 'rune:command'},
        { title: 'runes.sorcery.dispel', icon: 'rune:dispel'},
        { title: 'runes.sorcery.separate', icon: 'rune:separate'},
        { title: 'runes.sorcery.summon', icon: 'rune:summon'},
        { title: 'runes.sorcery.tap', icon: 'rune:tap'}
      ]
    },
    {
      name: 'static.other_runes',
      active: true,
      runes:[
        { title: 'runes.others.bartar', icon: 'rune:bartar'},
        { title: 'runes.others.cold', icon: 'rune:cold'},
        { title: 'runes.others.communication_trade', icon: 'rune:communication-trade'},
        { title: 'runes.others.dragon', icon: 'rune:dragon'},
        { title: 'runes.others.eternal_battle', icon: 'rune:eternal-battle'},
        { title: 'runes.others.alternate_fire_sky', icon: 'rune:fire-sky-2'},
        { title: 'runes.others.god', icon: 'rune:god'},
        { title: 'runes.others.heler', icon: 'rune:heler'},
        { title: 'runes.others.hell', icon: 'rune:hell'},
        { title: 'runes.others.horse', icon: 'rune:horse'},
        { title: 'runes.others.law', icon: 'rune:law'},
        { title: 'runes.others.light', icon: 'rune:light'},
        { title: 'runes.others.lightbringers', icon: 'rune:lightbringers'},
        { title: 'runes.others.maker', icon: 'rune:maker'},
        { title: 'runes.others.malkion', icon: 'rune:malkion'},
        { title: 'runes.others.odayla', icon: 'rune:odayla'},
        { title: 'runes.others.pamalt', icon: 'rune:pamalt'},
        { title: 'runes.others.sartar', icon: 'rune:sartar'},
        { title: 'runes.others.shargash', icon: 'rune:shargash'},
        { title: 'runes.others.undeath', icon: 'rune:undeath'},
        { title: 'runes.others.yinkin', icon: 'rune:yinkin'},

      ]
    }

  ]

  constructor(private store: Store) {
    this.store.dispatch(new ChangeTitle('static.runes'));
  }

}
