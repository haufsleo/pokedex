import {
    Subscription,
} from 'rxjs';

import {
    Component,
    OnDestroy,
    OnInit,
} from '@angular/core';

import {
    po,
} from '';

import {
    PokemonData,
    PokemonHttpService,
} from '../pokemon-http.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  constructor(private httpService: PokemonHttpService) {}

  private pokemonListSubscription: Subscription;
  pokemonList: PokemonData[];
  loading = false;

  ngOnInit(): void {
    this.loading = true;

    this.httpService.getPokemonListData();

    this.pokemonListSubscription = this.httpService.pokemonsChanged.subscribe(
      pokemons => {
        this.pokemonList = pokemons.sort((a, b) => a.id - b.id);
        this.loading = false;
      }
    );
  }

  ngOnDestroy() {
    this.pokemonListSubscription.unsubscribe();
  }
}
