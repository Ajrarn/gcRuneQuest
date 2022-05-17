import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { ChangeTitle } from '../../store/title.action';
import { Specie } from '../../store/models';
import { FormBuilder, FormGroup } from '@angular/forms';

export interface TreeNodeInterface {
  name: string;
  param?: string;
  bonus?: number;
  value?: number;
  formula?: string;
  level?: number;
  expand?: boolean;
  items?: TreeNodeInterface[];
  parent?: TreeNodeInterface;
}

@Component({
  selector: 'app-species',
  templateUrl: './species.component.html',
  styleUrls: ['./species.component.less']
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
        this.formSpecie.patchValue({specie: id}, { emitEvent: false });
        this.selectSpecie(id);
      }
    });
  }

  selectSpecie(specieName: string) {
    if (specieName) {
      let specie = this.species.find(item => item.name === specieName);
      if (specie) {
        this.specie = specie;

        this.specie.skills.forEach(item => {
          this.mapOfExpandedData[item.name] = this.convertTreeToList(item);
        });


      }
      this.store.dispatch(new ChangeTitle(specieName));
    }
  }

  mapOfExpandedData: { [key: string]: TreeNodeInterface[] } = {};

  collapse(array: TreeNodeInterface[], data: TreeNodeInterface, $event: boolean): void {
    if (!$event) {
      if (data.items) {
        data.items.forEach(d => {
          const target = array.find(a => a.name === d.name)!;
          target.expand = false;
          this.collapse(array, target, false);
        });
      } else {
        return;
      }
    }
  }

  convertTreeToList(root: TreeNodeInterface): TreeNodeInterface[] {
    const stack: TreeNodeInterface[] = [];
    const array: TreeNodeInterface[] = [];
    const hashMap = {};
    stack.push({ ...root, level: 0, expand: false });

    while (stack.length !== 0) {
      const node = stack.pop()!;
      this.visitNode(node, hashMap, array);
      if (node.items) {
        for (let i = node.items.length - 1; i >= 0; i--) {
          stack.push({ ...node.items[i], level: node.level! + 1, expand: false, parent: node });
        }
      }
    }

    return array;
  }

  visitNode(node: TreeNodeInterface, hashMap: { [key: string]: boolean }, array: TreeNodeInterface[]): void {
    if (!hashMap[node.name + node.param]) {
      hashMap[node.name + node.param] = true;
      array.push(node);
    }
  }

}
