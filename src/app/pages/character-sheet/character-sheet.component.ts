
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Character } from '../../store/models';
import { Select } from '@ngxs/store';

export interface TreeNodeInterface {
  name: string;
  param?: string;
  bonus?: number;
  valueSpecie?: number;
  valueCulture?: number;
  valueOccupation?: number;
  level?: number;
  expand?: boolean;
  skills?: TreeNodeInterface[];
  parent?: TreeNodeInterface;
}



@Component({
  selector: 'app-character-sheet',
  templateUrl: './character-sheet.component.html',
  styleUrls: ['./character-sheet.component.less']
})
export class CharacterSheetComponent {

  @Select((state: { character: any; }) => state.character) sheet$: Observable<Character> | undefined;
  sheet: Character | undefined;

  constructor() {
    this.sheet$?.subscribe(char => {
      this.sheet = char;

      this.sheet.skills.forEach(item => {
        this.mapOfExpandedData[item.name] = this.convertTreeToList(item);
      });
    });


  }

  mapOfExpandedData: { [key: string]: TreeNodeInterface[] } = {};

  collapse(array: TreeNodeInterface[], data: TreeNodeInterface, $event: boolean): void {
    if (!$event) {
      if (data.skills) {
        data.skills.forEach(d => {
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
      if (node.skills) {
        for (let i = node.skills.length - 1; i >= 0; i--) {
          stack.push({ ...node.skills[i], level: node.level! + 1, expand: false, parent: node });
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

  getTotal(item: TreeNodeInterface): number | null {
    if ((item.valueCulture === null || item.valueCulture === undefined) && (item.valueSpecie === null || item.valueSpecie === undefined)
    && (item.valueOccupation === null || item.valueOccupation === undefined)) {
      return null;
    }

    let value: number = !(item.valueSpecie === null || item.valueSpecie === undefined) ? item.valueSpecie : 0;
    value = !(item.valueCulture === null || item.valueCulture === undefined) ? value + item.valueCulture : value;
    value = !(item.valueOccupation === null || item.valueOccupation === undefined) ? value + item.valueOccupation : value;
    return value;

  }

}
