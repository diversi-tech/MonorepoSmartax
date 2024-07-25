import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import Quill from 'quill';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [],
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
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
          // First row
          [{ header: [1, 2, false] }, { font: [] }, { align: [] }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ indent: '-1' }, { indent: '+1' }, { direction: 'rtl' }],

          // Second row
          ['bold', 'italic', 'underline', 'link'],
          [{ color: [] }, { background: [] }],
          ['clean', 'image', 'code-block'],
        ],
      },
    });

    if (this.initialContent) {
      this.quill.clipboard.dangerouslyPasteHTML(0, this.initialContent);
    }

    this.quill.on('text-change', () => {
      const html =
        this.editor!.nativeElement.querySelector('.ql-editor').innerHTML;
      this.contentChange.emit(html);
      this.addBorderHighlight();
    });

    this.quill.on('selection-change', (range: any) => {
      if (!range) {
        this.removeBorderHighlight();
      }
    });
  }
  getContents() {
    this.htmlContent = this.quill!.root.innerHTML;
  }
  // 
  addBorderHighlight() {
    this.editor!.nativeElement.classList.add('active');
  }

  removeBorderHighlight() {
    this.editor!.nativeElement.classList.remove('active');
  }
}
