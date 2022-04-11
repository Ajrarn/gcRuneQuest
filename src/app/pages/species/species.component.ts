import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { first } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-species',
  templateUrl: './species.component.html',
  styleUrls: ['./species.component.scss']
})
export class SpeciesComponent implements OnInit {

  specieData: any;

  skillPanels = [
    {
      active: true,
      name: 'This is panel header 1',
      disabled: false
    },
    {
      active: false,
      disabled: false,
      name: 'This is panel header 2'
    },
    {
      active: false,
      disabled: true,
      name: 'This is panel header 3'
    }
  ];



  constructor(private route: ActivatedRoute, private store: Store, private translate: TranslateService) {

    // listen to the params to filter with the good specie
    this.route.paramMap.subscribe(params => {
      const data$ = this.store.select(state => state.species)
        .pipe(first())
        .subscribe(datas => {
          this.specieData = datas.find((item: any) => item.specie === params.get('id'));
          console.log('specieData', this.specieData);
          this.preparePanels();
        });
    });
  }

  preparePanels() {
    this.skillPanels = this.specieData.skills.map( (item:any) => {
      return {
        name: item.category,
        active: false,
        disabled: false
      }
    });
  }

  getSkillDatas(category: string):any[] {
    let datas:any[] = [];
    if (this.specieData) {
      const specie = this.specieData.skills.find((item: any) => item.category === category);
      if (specie && specie.items) {
        datas = specie.items
      }
      return datas;
    } else {
      return [];
    }

  }

  ngOnInit(): void {
  }

}
