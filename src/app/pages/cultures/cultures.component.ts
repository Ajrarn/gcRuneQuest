import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { first } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { ChangeTitle } from '../../store/title.action';

@Component({
  selector: 'app-cultures',
  templateUrl: './cultures.component.html',
  styleUrls: ['./cultures.component.scss']
})
export class CulturesComponent implements OnInit {

  cultureData: any;



  constructor(private route: ActivatedRoute, private store: Store, private translate: TranslateService) {

    // listen to the params to filter with the good specie
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.store.select(state => state.cultures)
          .pipe(first())
          .subscribe(datas => {
            this.cultureData = datas.find((item: any) => item.name === id);
          });
        this.store.dispatch(new ChangeTitle(id));
      }
    });
  }



  ngOnInit(): void {
  }

}
