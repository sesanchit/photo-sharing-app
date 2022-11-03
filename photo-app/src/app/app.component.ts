import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { PhotoService } from './photo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  photos: any = [];
  photoInput: string = "";
  showProgress: boolean = false;

  constructor(private photoService: PhotoService, private _snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.getPhotos();
  }

  openSnackBar(msg: string) {
    this._snackBar.open(msg, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000
    });
  }

  getPhotos() {
    this.photoService.getPhotos().subscribe(res => {
      this.photos = res;
    });
  }

  onFileSelected(event: any) {
    this.showProgress = true;
    this.openSnackBar("Uploading");
    const photo = event.target.files[0];
    const fd = new FormData();
    fd.append('image', photo, photo.name);
    this.photoService.addImage(fd).subscribe(res => {
      console.log(res);
      this.photoInput = "";
      this.photos = [res, ...this.photos];
      this.showProgress = false;
      this.openSnackBar("Uploaded");
    });

  }

  deletePhoto(id: string) {
    this.showProgress = true;
    this.openSnackBar("Deleting");
    this.photoService.deletePhoto(id).subscribe(res => {
      console.log(res);
      this.photos = this.photos.filter((photo: any) => photo._id !== id);
      this.showProgress = false;
      this.openSnackBar("Deleted");
    });
  }

}
