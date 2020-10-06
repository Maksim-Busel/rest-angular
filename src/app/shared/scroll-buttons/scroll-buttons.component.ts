import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-scroll-buttons',
  templateUrl: './scroll-buttons.component.html',
  styleUrls: ['./scroll-buttons.component.scss']
})
export class ScrollButtonsComponent implements OnInit {
  showedScrollBtn = false;

  constructor(private utils: UtilsService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    window.addEventListener('scroll', this.changeStyleScrollBtn.bind(this));
  }

  changeStyleScrollBtn(): void{
    let positionTop = document.documentElement.getBoundingClientRect().top;

    if(positionTop < -500 && !this.showedScrollBtn){
      const classListScrollUp = document.querySelector("#scroll-up").classList;

      if(classListScrollUp.contains("hide")){
        classListScrollUp.remove("hide");
      }
      this.showedScrollBtn = true;
    } else if(positionTop > -500 && this.showedScrollBtn){      
      const classListScrollUp = document.querySelector("#scroll-up").classList;

      if(!classListScrollUp.contains("hide")){
        classListScrollUp.add("hide");
      }
      this.showedScrollBtn = false;
    }
  }
    
  scrollToTop(){      
  // this.utils.savePositionInLocalStorage();
    window.scrollTo(0, 0);
  }

    // scrollToSavedPosition(){
    //     const xOffset = localStorage.scrollLeft;
    //     const yOffset = localStorage.scrollTop;
    
    //     window.scrollTo(xOffset, yOffset);
    // }
}
