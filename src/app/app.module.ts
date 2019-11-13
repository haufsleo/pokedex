import {
    HttpClientModule,
} from '@angular/common/http';
import {
    NgModule,
} from '@angular/core';
import {
    BrowserModule,
} from '@angular/platform-browser';
import {
    RouteReuseStrategy,
} from '@angular/router';
import {
    SplashScreen,
} from '@ionic-native/splash-screen/ngx';
import {
    StatusBar,
} from '@ionic-native/status-bar/ngx';
import {
    IonicModule,
    IonicRouteStrategy,
} from '@ionic/angular';

import {
    AppRoutingModule,
} from './app-routing.module';
import {
    AppComponent,
} from './app.component';
import {
    AddPokemonPageModule,
} from './pokemon-list/add-pokemon/add-pokemon.module';
import {
    AddPokemonPage,
} from './pokemon-list/add-pokemon/add-pokemon.page';

@NgModule({
    declarations: [AppComponent],
    entryComponents: [AddPokemonPage],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        HttpClientModule,
        AddPokemonPageModule,
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
