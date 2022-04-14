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

  ngOnInit(): void {
  }

}
