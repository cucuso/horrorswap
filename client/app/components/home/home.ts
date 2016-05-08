import {Component} from 'angular2/core';

@Component({
  selector: 'home',
  templateUrl: './components/home/home.html',
  styleUrls: ['./components/home/home.css']
})
export class HomeCmp {
  happyManImgUrl: string = './components/home/images/happy_man.svg';
  sadManImgUrl: string = './components/home/images/sad_man.svg';
  ideaManImgUrl: string = './components/home/images/idea_man.svg';
  masksImgUrl: string = './components/home/images/masks.svg';
  logoImgUrl: string = './components/home/images/logo.png';
}
