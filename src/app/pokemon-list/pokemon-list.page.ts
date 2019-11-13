import {
    Subscription,
} from 'rxjs';

import {
    Component,
    OnDestroy,
    OnInit,
} from '@angular/core';
import {
    Router,
} from '@angular/router';
import {
    ModalController,
} from '@ionic/angular';

import {
    PokemonData,
    PokemonHttpService,
} from '../services/pokemon-http.service';
import {
    PokedexEntry,
    PokemonService,
} from '../services/pokemon.service';
import {
    AddPokemonPage,
} from './add-pokemon/add-pokemon.page';

@Component({
    selector: 'app-pokemon-list',
    templateUrl: './pokemon-list.page.html',
    styleUrls: ['./pokemon-list.page.scss'],
})
export class PokemonListPage implements OnInit, OnDestroy {
    constructor(
        private httpService: PokemonHttpService,
        private pokemonService: PokemonService,
        private modalController: ModalController
    ) {}

    // pokemonList: PokemonData[];
    pokemonList: PokedexEntry[];
    favMode = false;
    searchWord = '';
    private pokemonListSub: Subscription;

    getThumpnailUrl = this.pokemonService.getThumpnailUrlForPokemonId;

    pokemonIsFavorite = this.pokemonService.pokemonWithIdIsFavorite;

    filteredPokemon = () => {
        return this.pokemonList.filter(pokemon => {
            const found =
                pokemon.name.english
                    .toLowerCase()
                    .indexOf(this.searchWord.toLowerCase()) > -1;
            const inRightFavState =
                !this.favMode || this.pokemonIsFavorite(pokemon.id);

            return found && inRightFavState;
        });
    };

    switchFavMode = () => {
        this.favMode = !this.favMode;
    };

    async addPokemon() {
        const modal = await this.modalController.create({
            component: AddPokemonPage,
        });
        return await modal.present();
    }

    ngOnInit(): void {
        this.httpService.getPokemonListData();
        this.pokemonListSub = this.pokemonService.pokemonList.subscribe(
            pokemonList => {
                this.pokemonList = pokemonList;
            }
        );
    }

    ngOnDestroy() {
        this.pokemonListSub.unsubscribe();
    }
}
