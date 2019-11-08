import {
    Subscription,
} from 'rxjs';

import {
    Component,
    OnDestroy,
    OnInit,
} from '@angular/core';

import {
    PokemonData,
    PokemonHttpService,
} from '../pokemon-http.service';
import {
    PokedexEntry,
    PokemonService,
} from './pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.page.html',
  styleUrls: ['./pokemon-list.page.scss'],
})
export class PokemonListPage implements OnInit, OnDestroy {
  constructor(
    private httpService: PokemonHttpService,
    private pokemonService: PokemonService
  ) {}

  private pokemonListSubscription: Subscription;
  // pokemonList: PokemonData[];
  pokemonList: PokedexEntry[];
  favMode = false;

  getThumpnailUrl = this.pokemonService.getThumpnailUrlForPokemonId;

  pokemonIsFavorite = this.pokemonService.pokemonWithIdIsFavorite;

  filteredPokemon = () => {
    return this.pokemonList.filter(pokemon => {
      return !this.favMode || this.pokemonIsFavorite(pokemon.id);
    });
  };

  switchFavMode = () => {
    this.favMode = !this.favMode;
  };

  ngOnInit(): void {
    this.httpService.getPokemonListData();

    // this.pokemonListSubscription = this.httpService.pokemonsChanged.subscribe(
    //   pokemons => {
    //     this.pokemonList = pokemons.sort((a, b) => a.id - b.id);
    //     this.loading = false;
    //   }
    // );
    this.pokemonList = this.pokemonService.getPokemonList();
  }

  ngOnDestroy() {
    this.pokemonListSubscription.unsubscribe();
  }
}
