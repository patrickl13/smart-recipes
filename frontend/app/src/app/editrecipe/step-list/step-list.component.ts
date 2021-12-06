import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Step} from '../../../models/recipe.model';
import {SnackbarService} from '../../../services/snackbar.service';
import {ImageService} from '../../../services/image.service';



@Component({
  selector: 'app-step-list',
  templateUrl: './step-list.component.html',
  styleUrls: ['./step-list.component.scss']
})
export class StepListComponent implements OnInit {
  @Input() steps: Step [];
  @Output() stepsEmitter = new EventEmitter<Step []>();

  constructor(private snackbar: SnackbarService,
              private imageService: ImageService) { }

  ngOnInit(): void {
  }

  deleteStep(step: Step): void {
    const stepToRemove = this.steps.indexOf(step);
    this.deleteImageById(step.image.id);
    this.steps.splice(stepToRemove, 1);
    this.stepsEmitter.emit(this.steps);
  }

  deleteImageById(id: number): void {
    this.imageService.deleteImageById(id).subscribe(
      () => {},
      () => {
        this.snackbar.error('Could not delete image.', 'Close');
      }
    );
  }

}
