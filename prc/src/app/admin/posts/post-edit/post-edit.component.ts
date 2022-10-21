import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ContentService } from 'src/app/services/content.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SaveRandomService } from 'src/app/services/save-random.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.scss'],
})
export class PostEditComponent implements OnInit {
  @ViewChild('fileButton', { static: false }) fileButton!: ElementRef;
  @ViewChild('videoPlayer', { static: false }) videoplayer!: ElementRef;
  file: any;
  fileVideo: any;
  fileImage: any;
  videFile: any;
  photoURL: any;
  videoURL: any;
  imageUrl: any;
  form: FormGroup;
  constructor(
    private contentService: ContentService,
    public fb: FormBuilder,
    private saveRandom: SaveRandomService,
    private router: Router,
    private notifi: NotificationService
  ) {
    this.form = this.fb.group({
      titleFrench: [''],
      titleEnglish: [''],
      texteFrench: [''],
      texteEnglish: [''],
    });
  }

  ngOnInit(): void {
    if (!this.saveRandom.getUser()) {
      this.router.navigate(['/login']);
    }
  }

  uploadVideoFile(event: any, formControlName: any) {
    this.videFile = event.target.files.item(0);

    let theType = this.videFile.type.split('/');
    if (theType[0] == 'video') {
      const file = event.target.files[0];
      this.fileVideo = event.target.files[0];

      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.videoURL = event.target.result;
        };
        reader.readAsDataURL(event.target.files[0]);
      }
    }
  }
  uploadFile(event: any, formControlName: any) {
    this.file = event.target.files.item(0);

    let theType = this.file.type.split('/');

    if (theType[0] == 'image') {
      const file = event.target.files[0];
      this.fileImage = file;
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.photoURL = event.target.result;
        };
        reader.readAsDataURL(event.target.files[0]);
      }
    }

    if (theType[0] == 'video') {
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.videoURL = event.target.result;
        };
        reader.readAsDataURL(event.target.files[0]);
      }
    }
  }
  toggleVideo() {
    this.videoplayer.nativeElement.play();
  }
  resetImage() {
    this.photoURL = null;
  }
  saveContent() {
    let formData = new FormData();

    for (const key in this.form.value) {
      formData.append(key, this.form.value[key]);
    }

    if (this.fileVideo) {
      formData.append('contentVideo', this.fileVideo);
    }
    if (this.fileImage) {
      formData.append('contentImage', this.fileImage);
    }
    let id: any = this.saveRandom.getUser()._id;
    formData.append('authorId', id);
    this.contentService.postArticle(formData).subscribe(
      (resultat) => {
        console.log(resultat);
        this.form.reset();
      },
      (err: HttpErrorResponse) => {
        this.notifi.openSnackBar(err.error);
        this.router.navigate(['/login']);
      }
    );
    if (this.photoURL) {
      this.saveImageMedia();
    } else if (this.videoURL) {
      this.saveVideoMedia();
    } else {
    }
  }
  cancelContent() {}

  saveVideoMedia(): Promise<string> {
    return new Promise((resolve, reject) => {});
  }
  saveImageMedia(): Promise<string> {
    return new Promise((resolve, reject) => {});
  }
  galerie() {
    this.fileButton.nativeElement.click();
  }
  getRubrique(ev: any) {
    console.log(ev);

    let selectedValues = Array.apply(null, ev.options)
      .filter((option: any) => option.selected)
      .map((option: any) => option.value);
    let id = selectedValues[0];
    console.log(id);
  }
}
