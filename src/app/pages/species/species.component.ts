import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { ChangeTitle } from '../../store/title.action';
import { Specie } from '../../store/models';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-species',
  templateUrl: './species.component.html',
  styleUrls: ['./species.component.scss']
})
export class SpeciesComponent {

  species: Specie[];
  specie: Specie = {
    name:'vide',
    characteristics: {
      STR: '',
      CON: '',
      SIZ: '',
      INT: '',
      POW: '',
      DEX: '',
      CHA: ''
    },
    skills: [],
    cultures: [],
    runes: []
  };


  formSpecie: FormGroup;


  constructor(private route: ActivatedRoute, private store: Store, private fb: FormBuilder, private router: Router) {

    this.species = this.store.selectSnapshot(state => state.species);

    this.formSpecie = fb.group({
      specie: fb.control(null)
    });

    this.formSpecie.controls['specie'].valueChanges.subscribe((occ) => {
      this.router.navigate(['species', { id: occ }]);
    });

    // listen to the params to filter with the good specie
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.formSpecie.patchValue({specie: id}, {emitEvent:false});
        this.selectSpecie(id);
      }
    });
}

  selectSpecie(specieName: string) {
    if (specieName) {
      let specie = this.species.find(item => item.name === specieName);
      if (specie) {
        this.specie = specie;
        console.log('specie', this.specie);
      }
      this.store.dispatch(new ChangeTitle(specieName));
    }
  }

}
