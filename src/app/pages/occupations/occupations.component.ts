import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Occupation, OccupationGroup } from '../../store/occupations.state';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ChangeTitle } from '../../store/title.action';

@Component({
  selector: 'app-occupations',
  templateUrl: './occupations.component.html',
  styleUrls: ['./occupations.component.scss']
})
export class OccupationsComponent implements OnInit {

  occupationData:OccupationGroup[];

  occupation: Occupation = {name: 'vide', skills:[]};

  formOccupationGroup: FormGroup;



  constructor(private route: ActivatedRoute, private router: Router, private store: Store, private fb: FormBuilder) {
    this.occupationData = this.store.selectSnapshot(state => state.occupations);

    this.formOccupationGroup = fb.group({
      occupation: fb.control(null)
    });

    this.formOccupationGroup.controls['occupation'].valueChanges.subscribe((occ) => {
      this.router.navigate(['occupations', { id: occ }]);
    });

    // listen to the params to filter with the good specie
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.formOccupationGroup.patchValue({occupation: id}, {emitEvent:false});
        this.selectOccupation(id);
      }
    });
  }

  selectOccupation(occ: string) {
    let nameTab = occ.split('.');
    let occGroup = nameTab[0] + '.' + nameTab[1] + '.name';
    let occupationGroup = this.occupationData.find(item => item.name === occGroup);
    if (occupationGroup) {
      let occupation = occupationGroup.occupations.find(item => item.name === occ);
      if (occupation) {
        this.occupation = occupation;
      }
      this.store.dispatch(new ChangeTitle(occ));
    }
  }

  ngOnInit(): void {
  }

}
