import {
    BehaviorSubject,
} from 'rxjs';
import {
    map,
    take,
} from 'rxjs/operators';

import {
    Injectable,
} from '@angular/core';

import pokedex from '../../assets/pokedex.json';

export interface PokedexEntry {
    id: number;
    name: {
        english: string;
        japanese: string;
        chinese: string;
        french: string;
    };
    type: string[];
    base: {
        HP: string;
        Attack: string;
        SPAttack: string;
        SPDefense: string;
    };
}

@Injectable({
    providedIn: 'root',
})
export class PokemonService {
    constructor() {}

    private _pokemonList = new BehaviorSubject<PokedexEntry[]>(pokedex);
    private _favoriteIds: number[] = [];

    get pokemonList() {
        return this._pokemonList.asObservable();
    }

    getPokemonFromId(id: number) {
        return this.pokemonList.pipe(
            take(1),
            map((pList: PokedexEntry[]) => {
                return { ...pList.find(p => p.id === id) };
            })
        );
    }

    getImageUrlForPokemonId(id: number) {
        const baseUrl = 'https://pokeres.bastionbot.org/images/pokemon/';
        const imageUrl = baseUrl + id + '.png';
        return imageUrl;
    }

    getThumpnailUrlForPokemonId(id: number) {
        const baseUrl = 'assets/thumbnails/';
        let idFormated = String(id);
        if (id <= 9) {
            idFormated = '00' + String(id);
        } else if (id <= 99) {
            idFormated = '0' + String(id);
        }

        const imageUrl = baseUrl + idFormated + '.png';
        return imageUrl;
    }

    getFavoriteIds = () => {
        return [...this._favoriteIds];
    };

    pokemonWithIdIsFavorite = (id: number) => {
        if (!this._favoriteIds) {
            return false;
        }
        return this._favoriteIds.indexOf(id) !== -1;
    };

    changeFavstatus = (id: number, markAsFavorite: boolean) => {
        console.log('this.favoriteIds', this._favoriteIds);

        if (markAsFavorite) {
            if (!this.pokemonWithIdIsFavorite(id)) {
                this._favoriteIds.push(id);
            }
        } else {
            if (this.pokemonWithIdIsFavorite(id)) {
                this._favoriteIds.splice(this._favoriteIds.indexOf(id), 1);
            }
        }
    };
}
