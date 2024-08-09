import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, Input } from '@angular/core';
import Quill from 'quill';

@Component({
  selector: 'app-editor',
    standalone: true,
  imports: [

  ],
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  @ViewChild('editor', { static: true }) editor: ElementRef | undefined;
  @Output() contentChange = new EventEmitter<string>();
  @Input() initialContent: string = '';

  quill: Quill | undefined;
  htmlContent: string = '';

  ngOnInit() {
    this.quill = new Quill(this.editor!.nativeElement, {
      theme: 'snow',
      modules: {
        toolbar: [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline'],
          ['image', 'code-block'],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          ['link', 'blockquote', 'code-block', 'image'],
          [{ 'script': 'sub'}, { 'script': 'super' }],
          [{ 'indent': '-1'}, { 'indent': '+1' }],
          [{ 'direction': 'rtl' }],
          [{ 'size': ['small', false, 'large', 'huge'] }],
          [{ 'color': [] }, { 'background': [] }],
          [{ 'font': [] }],
          [{ 'align': [] }],
          ['clean']
        ]
      }
    });

    if (this.initialContent) {
      this.quill.clipboard.dangerouslyPasteHTML(0, this.initialContent);
    }

    this.quill.on('text-change', () => {
      const html = this.editor!.nativeElement.querySelector('.ql-editor').innerHTML;
      this.contentChange.emit(html);
    });
  }
  getContents() {
    this.htmlContent = this.quill!.root.innerHTML;
  }
}

