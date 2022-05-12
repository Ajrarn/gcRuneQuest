
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Character } from '../../store/models';
import { Select } from '@ngxs/store';

export interface TreeNodeInterface {
  name: string;
  param?: string;
  bonus?: number;
  valueSpecie?: number;
  valueCulture?: number;
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
export class CharacterSheetComponent implements OnInit{

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

  getCharacter() {
    let response = '';
    if (this.sheet) {
      response = JSON.stringify(this.sheet);
    }
    return response;
  }

  /*listOfMapData: TreeNodeInterface[] = [
    {
      key: `1`,
      name: 'John Brown sr.',
      age: 60,
      address: 'New York No. 1 Lake Park',
      children: [
        {
          key: `1-1`,
          name: 'John Brown',
          age: 42,
          address: 'New York No. 2 Lake Park'
        },
        {
          key: `1-2`,
          name: 'John Brown jr.',
          age: 30,
          address: 'New York No. 3 Lake Park',
          children: [
            {
              key: `1-2-1`,
              name: 'Jimmy Brown',
              age: 16,
              address: 'New York No. 3 Lake Park'
            }
          ]
        },
        {
          key: `1-3`,
          name: 'Jim Green sr.',
          age: 72,
          address: 'London No. 1 Lake Park',
          children: [
            {
              key: `1-3-1`,
              name: 'Jim Green',
              age: 42,
              address: 'London No. 2 Lake Park',
              children: [
                {
                  key: `1-3-1-1`,
                  name: 'Jim Green jr.',
                  age: 25,
                  address: 'London No. 3 Lake Park'
                },
                {
                  key: `1-3-1-2`,
                  name: 'Jimmy Green sr.',
                  age: 18,
                  address: 'London No. 4 Lake Park'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      key: `2`,
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park'
    }
  ];*/
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
    if (!hashMap[node.name]) {
      hashMap[node.name] = true;
      array.push(node);
    }
  }

  ngOnInit(): void {

  }





}
