import { createAction } from '@reduxjs/toolkit';
import {Film, PromoFilm} from '../types/Film';

export const setGenre = createAction('set-genre', (genre: string) => ({
  payload: genre,
}));

export const getFilms = createAction('get-films');

export const upFilmSize = createAction('up-film-size');

export const setFilmDataLoadingStatus = createAction<boolean>('setFilmDataLoadingStatus');

export const setFilms = createAction<Film[]>('setFilms');

export const setPromoFilm = createAction<PromoFilm>('setPromoFilm');

