import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { StarWarsService } from '../star-wars.service';

@Component({
  selector: 'app-create-character',
  templateUrl: './create-character.component.html',
  styleUrls: ['./create-character.component.css']
})
export class CreateCharacterComponent implements OnInit {
  availableSides = [
    { display: 'None', value: '' },
    { display: 'Light', value: 'light' },
    { display: 'Dark', value: 'dark' }
  ]
  swService: StarWarsService;
  defaultName = 'Obi-Wan';

  constructor(swService: StarWarsService) {
    this.swService = swService;
  }

  ngOnInit() {
  }

  onSubmit(submittedForm: NgForm) {
    if (submittedForm.invalid) {
      return;
    }
    console.log(submittedForm);
    this.swService.addCharacter(submittedForm.value.name, submittedForm.value.side);
  }
}
