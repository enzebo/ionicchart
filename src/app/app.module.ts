import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';


 
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import {HomePage} from '../pages/home/home';

 
var firebaseConfig = {
 
    apiKey: "AIzaSyCavsA-TXbXzOF5mPBVG1Ty7HiC15Nn3bE",
    authDomain: "acapushtest-a0d54.firebaseapp.com",
    databaseURL: "https://acapushtest-a0d54.firebaseio.com",
    projectId: "acapushtest-a0d54",
    storageBucket: "acapushtest-a0d54.appspot.com",
    messagingSenderId: "878815842266"

};
 
@NgModule({
  declarations: [
    MyApp,
    HomePage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
   

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}