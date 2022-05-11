import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { ChangeTitle } from '../../store/title.action';
import { Culture, Homeland } from '../../store/models';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cultures',
  templateUrl: './cultures.component.html',
  styleUrls: ['./cultures.component.less']
})
export class CulturesComponent {

 homelands: Homeland[];
 culture: Culture = {
   name: 'vide',
   skills: [],
   runes: [],
   passions: [],
   occupations: []
 };

 formCulture: FormGroup;



  constructor(private route: ActivatedRoute, private store: Store, private router: Router, fb: FormBuilder) {

    this.homelands = this.store.selectSnapshot(state => state.cultures);

    this.formCulture = fb.group({
      culture: fb.control(null)
    });

    this.formCulture.controls['culture'].valueChanges.subscribe((culture) => {
      this.router.navigate(['cultures', { id: culture }]);
    });

    // listen to the params to filter with the good specie
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.formCulture.patchValue({culture: id}, {emitEvent:false});
        this.selectCulture(id);
      }
    });
  }

  selectCulture(cultureName: string) {
    if (cultureName) {
      let nameSplitted = cultureName.split('.');
      let homelandName = nameSplitted[0]+ '.' + nameSplitted[1]+'.name';
      let homeland = this.homelands.find(item => item.name === homelandName);
      if (homeland) {
        let culture = homeland.cultures.find(item => item.name === cultureName);
        if (culture) {
          this.culture = culture;
        }
      }
      this.store.dispatch(new ChangeTitle(cultureName));
    }
  }

}
