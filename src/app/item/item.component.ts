import { Component, OnInit, Input } from '@angular/core';
import { StarWarsService } from '../star-wars.service';

interface Character {
  name: string;
  side: string;
}

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input() character: Character = { name: '', side: '' };
  swService: StarWarsService;

  constructor(swService: StarWarsService) {
    this.swService = swService;
  }

  ngOnInit() {
  }

  onAssign(side: string) {
    this.swService.onSideChosen({ name: this.character.name, side: side });
  }
}
