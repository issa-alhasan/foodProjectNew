import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { FoodService } from 'src/app/services/food.service';
import { Tag } from 'src/app/shared/models/Tag';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent  implements OnInit{
  tags?:Tag[];
  constructor(foodService:FoodService) {
    let tagsObservable:Observable<Tag[]>;
    tagsObservable = foodService.getAllTags();
    tagsObservable.subscribe(serverTags=>{
      this.tags=serverTags;});
   }

  ngOnInit(): void {
  }

}