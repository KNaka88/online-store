import { Injectable } from '@angular/core';
import { Album } from './album.model';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class AlbumService {
  albums: FirebaseListObservable<any[]>;
  constructor(private db: AngularFireDatabase) {
     this.albums = db.list('albums');
   }
  getAlbums() {
     return this.albums;
  }

  addAlbum(newAlbum: Album) {
  this.albums.push(newAlbum);
  }

  getAlbumById(albumId: string){
    return this.db.object('albums/' + albumId);
  }

  updateAlbum(localUpdatedAlbum){
    var albumEntryInFirebase = this.getAlbumById(localUpdatedAlbum.$key);
    albumEntryInFirebase.update({title: localUpdatedAlbum.title,
                                 artist: localUpdatedAlbum.artist,
                                 description: localUpdatedAlbum.description});
  }

  deleteAlbum(localAlbumToDelete){
    var albumEntryInFirebase = this.getAlbumById(localAlbumToDelete.$key);
    albumEntryInFirebase.remove();
  }

}
