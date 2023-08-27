import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/food';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  foods:Food[]=[]
  constructor(private foodService:FoodService , activatedRoute:ActivatedRoute){
    let FoodsObservable:Observable<Food[]>;
    activatedRoute.params.subscribe((params)=>{
      if(params.searchTerm)
      FoodsObservable= foodService.getAllFoodsBySearchTerm(params.searchTerm);
      else  if(params.tag)
      FoodsObservable= foodService.getAllFoodsByTag(params.tag);
      else 
      FoodsObservable=this.foodService.getAll();

      FoodsObservable.subscribe((serverFoods)=>{
        this.foods=serverFoods;

      })
    });
   
  }
  ngOnInit(): void {
    
  }

}
