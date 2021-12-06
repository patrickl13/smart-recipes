import {Component, OnInit, Output, Input, EventEmitter} from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {ChangeEvent} from '@ckeditor/ckeditor5-angular';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss']
})
export class TextEditorComponent implements OnInit {
  editor = ClassicEditor;
  editorData: string;
  @Input() editorInput: string;
  @Output() editorOutput = new EventEmitter<string>();


  constructor() { }

  ngOnInit(): void {
    this.editorData = this.editorInput;
  }

  onChange( { editor }: ChangeEvent ): void {
    const data = editor.getData();
    this.editorData = data;
    this.editorOutput.emit(this.editorData);
  }
}
