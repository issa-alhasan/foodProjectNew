import { Input, OnInit } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnInit {
  @Input()
  title!:string;
 @Input()
 margin?='1rem 0 1rem 0.2rem';
 @Input()
 fonSize?='1.7.rem';
  ngOnInit(): void {
    
  }

}
