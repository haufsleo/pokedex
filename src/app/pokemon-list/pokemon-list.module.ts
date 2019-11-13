import {
    CommonModule,
} from '@angular/common';
import {
    NgModule,
} from '@angular/core';
import {
    FormsModule,
} from '@angular/forms';
import {
    RouterModule,
    Routes,
} from '@angular/router';
import {
    IonicModule,
} from '@ionic/angular';

import {
    AddPokemonPageModule,
} from './add-pokemon/add-pokemon.module';
import {
    PokemonListPage,
} from './pokemon-list.page';

const routes: Routes = [
    {
        path: '',
        component: PokemonListPage,
    },
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
    ],
    declarations: [PokemonListPage],
})
export class PokemonListPageModule {}
