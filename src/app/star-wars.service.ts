import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { LogService } from './log.service';

interface Character {
  name: string;
  side: string;
}

@Injectable()
export class StarWarsService {
  private characters: Character[] = [
    { name: 'Luke Skywalker', side: '' },
    { name: 'Darth Vader', side: '' }
  ];
  charactersChanged = new Subject<void>();

  constructor(private logService: LogService, private http: HttpClient) {}

  fetchCharacters() {
    this.http.get<any>('https://swapi.dev/api/people/')
      .pipe(
        map(data => {
          const extractedChars = data.results;
          const chars: Character[] = extractedChars.map((char: { name: any; }) => {
            return { name: char.name, side: '' };
          });
          return chars;
        })
      )
      .subscribe(
        data => {
          console.log(data);
          this.characters = data;
          this.charactersChanged.next();
        }
      );
  }

  getCharacters(chosenList: string) {
    if (chosenList === 'all') {
      return this.characters.slice();
    }
    return this.characters.filter((char: Character) => {
      return char.side === chosenList;
    });
  }

  onSideChosen(charInfo: { name: string; side: string }) {
    const pos = this.characters.findIndex((char: Character) => {
      return char.name === charInfo.name;
    });
    if (pos !== -1) {
      this.characters[pos].side = charInfo.side;
      this.charactersChanged.next();
      this.logService.writeLog(`Changed side of ${charInfo.name}, new side: ${charInfo.side}`);
    }
  }

  addCharacter(name: string, side: string) {
    const pos = this.characters.findIndex((char: Character) => {
      return char.name === name;
    });
    if (pos === -1) {
      const newChar: Character = { name: name, side: side };
      this.characters.push(newChar);
    }
  }
}
