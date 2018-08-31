import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireStorage } from 'angularfire2/storage';

@Component({
  selector: 'app-update-news',
  templateUrl: './update-news.component.html',
  styleUrls: ['./update-news.component.css']
})
export class UpdateNewsComponent implements OnInit, AfterViewInit {
news: any;
downloadURL: Observable<string>;
image: any;
data = {
  title: null,
  shortdesc: null,
  Description: null,
  image: null,
  id: ''
};
  constructor(public router: ActivatedRoute , private storage: AngularFireStorage) { }

  ngOnInit() {

   }
   ngAfterViewInit(): void {
    this.router.params.subscribe( data => {
      this.data.title = data.title;
      this.data.shortdesc = data.shortdesc;
      this.data.Description = data.Description;
      this.data.id = data.id;
      console.log(this.data);

    });
  }
   uploadImage(event) {
    const file = event.target.files[0];
    const path = `posts/${file.name}`;
    if (file.type.split('/')[0] !== 'image') {
      return alert('only image files');
    } else {
      const task =  this.storage.upload(path, file).then(res => {
        console.log(res);
      });
      const ref = this.storage.ref(path);
      this.downloadURL = ref.getDownloadURL();
      console.log('Image Uploaded!');
      this.downloadURL.subscribe(url => (this.image = url));
    }
   }
   Save(f) {

   }

}
