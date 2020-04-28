import { Component } from '@angular/core';
import { Capacitor, Plugins, CameraResultType, FilesystemDirectory } from '@capacitor/core';
const { Camera, Filesystem } = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor() {}

  async takePhoto() {
    const options = {
      resultType: CameraResultType.Uri
    };

    const originalPhoto = await Camera.getPhoto(options);
    debugger
    const photoInTempStorage = await Filesystem.readFile({ path: originalPhoto.path });
debugger;
    let date = new Date(),
      time = date.getTime(),
      fileName = time + ".jpeg";

    await Filesystem.writeFile({
      data: photoInTempStorage.data,
      path: fileName,
      directory: FilesystemDirectory.Data
    });

    const finalPhotoUri = await Filesystem.getUri({
      directory: FilesystemDirectory.Data,
      path: fileName
    });

    let photoPath = Capacitor.convertFileSrc(finalPhotoUri.uri);
    console.log(photoPath);
  }

}
