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

  pokemonList: PokedexEntry[] = pokedex;
  favoriteIds: number[] = [];

  getPokemonList() {
    return [...this.pokemonList];
  }

  getPokemonFromId(id: number) {
    return {
      ...this.pokemonList.find(pokemon => pokemon.id === id),
    };
  }

  getImageUrlForPokemonId(id: number) {
    const baseUrl = 'https://pokeres.bastionbot.org/images/pokemon/';
    const imageUrl = baseUrl + id + '.png';
    return imageUrl;
  }

  getThumpnailUrlForPokemonId(id: number) {
    const baseUrl =
      'https://github.com/fanzeyi/pokemon.json/blob/master/thumbnails/';
    let idFormated = String(id);
    if (id <= 9) {
      idFormated = '00' + String(id);
    } else if (id <= 99) {
      idFormated = '0' + String(id);
    }

    const imageUrl = baseUrl + idFormated + '.png?raw=true';
    return imageUrl;
  }

  getFavoriteIds = () => {
    return [...this.favoriteIds];
  };

  pokemonWithIdIsFavorite = (id: number) => {
    if (!this.favoriteIds) {
      return false;
    }
    return this.favoriteIds.indexOf(id) !== -1;
  };

  changeFavstatus = (id: number, markAsFavorite: boolean) => {
    console.log('this.favoriteIds', this.favoriteIds);

    if (markAsFavorite) {
      if (!this.pokemonWithIdIsFavorite(id)) {
        this.favoriteIds.push(id);
      }
    } else {
      if (this.pokemonWithIdIsFavorite(id)) {
        this.favoriteIds.splice(this.favoriteIds.indexOf(id), 1);
      }
    }
  };
}
