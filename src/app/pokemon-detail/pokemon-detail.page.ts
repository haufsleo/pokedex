import {
    Component,
    OnInit,
} from '@angular/core';
import {
    ActivatedRoute,
} from '@angular/router';

import {
    PokedexEntry,
    PokemonService,
} from '../pokemon-list/pokemon.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.page.html',
  styleUrls: ['./pokemon-detail.page.scss'],
})
export class PokemonDetailPage implements OnInit {
  currentPokemon: PokedexEntry;

  constructor(
    private pokemonService: PokemonService,
    private activatedRoute: ActivatedRoute
  ) {}

  getImageUrl = this.pokemonService.getImageUrlForPokemonId;
  pokemonWithIdIsFavorite = this.pokemonService.pokemonWithIdIsFavorite;
  changeFavstatus = this.pokemonService.changeFavstatus;

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('pokemonId')) {
        return;
      }
      const pokemonId = paramMap.get('pokemonId');
      console.log('pokemonId', pokemonId);

      this.currentPokemon = this.pokemonService.getPokemonFromId(+pokemonId);
    });
  }
}
