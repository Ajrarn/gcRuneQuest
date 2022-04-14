import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { first } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-occupations',
  templateUrl: './occupations.component.html',
  styleUrls: ['./occupations.component.scss']
})
export class OccupationsComponent implements OnInit {

  occupationData: any;

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
    this.route.params.subscribe(params => {
      const data$ = this.store.select(state => state.occupations)
        .pipe(first())
        .subscribe(datas => {
          this.occupationData = datas.find((item: any) => item.name === params['id']);
        });
    });
  }

  getSkillDatas(category: string):any[] {
    let datas:any[] = [];
     const specie = this.occupationData.skills.find((item: any) => item.category === category);
     if (specie && specie.items) {
       datas = specie.items
     }
      return datas;
  }

  ngOnInit(): void {
  }

}
