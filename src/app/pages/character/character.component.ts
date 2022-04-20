import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { ChangeTitle } from '../../store/title.action';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new ChangeTitle('static.character'))
  }

}
