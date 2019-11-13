import {
    Subject,
} from 'rxjs';
import {
    map,
} from 'rxjs/operators';

import {
    HttpClient,
} from '@angular/common/http';
import {
    Injectable,
} from '@angular/core';

export interface PokemonData {
    name: string;
    imageUrl: string;
    id: number;
}

@Injectable({
    providedIn: 'root',
})
export class PokemonHttpService {
    constructor(private http: HttpClient) {}

    pokemonsChanged = new Subject<PokemonData[]>();
    pokemons: PokemonData[] = [];

    getPokemonListData() {
        this.pokemons = [];

        for (let pokedexNumber = 1; pokedexNumber <= 151; pokedexNumber++) {
            this.http
                .get<PokemonData>(
                    `https://pokeapi.co/api/v2/pokemon/${pokedexNumber}`
                )
                .pipe(
                    map(resData => {
                        return {
                            name: resData.name,
                            id: resData.id,
                        };
                    })
                )
                .subscribe(requestResult => {
                    const newPokemon = {
                        name: requestResult.name,
                        id: requestResult.id,
                        imageUrl: `https://pokeres.bastionbot.org/images/pokemon/${pokedexNumber}.png`,
                    };
                    this.pokemons.push(newPokemon);
                    this.pokemonsChanged.next(this.pokemons);
                });
        }
    }
}
