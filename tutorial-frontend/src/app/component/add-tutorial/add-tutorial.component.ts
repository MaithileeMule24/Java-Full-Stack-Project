import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TutorialService } from '../../services/tutorial.service';

@Component({
  selector: 'app-add-tutorial',
  templateUrl: './add-tutorial.component.html',
  styleUrls: ['./add-tutorial.component.css']
})
export class AddTutorialComponent implements OnInit {
  tutorialForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private tutorialService: TutorialService) {
    this.tutorialForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  get formControls() {
    return this.tutorialForm.controls;
  }

  saveTutorial(): void {
    this.submitted = true;

    if (this.tutorialForm.invalid) {
      return;
    }

    const data = {
      title: this.tutorialForm.value.title,
      description: this.tutorialForm.value.description
    };

    this.tutorialService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (e) => console.error(e)
      });
  }

  newTutorial(): void {
    this.submitted = false;
    this.tutorialForm.reset();
  }
}
