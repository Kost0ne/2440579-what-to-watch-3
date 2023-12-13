import {Footer} from '../../components/footer/footer';
import {Logo} from '../../components/logo/logo';
import {FilmList} from '../../components/film-list/film-list';
import {useNavigate} from 'react-router-dom';
import {AppRoute} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {GenreList} from '../../components/genre-list/genre-list';
import {useEffect} from 'react';
import {getFilms} from '../../store/action';
import Spinner from '../../components/spinner/Spinner';

export function MainScreen(): JSX.Element {
  const films = useAppSelector((state) => state.films);
  const filmsByGenre = useAppSelector((state) => state.filmsByGenre);
  const selectedGenre = useAppSelector((state) => state.genre);
  const displayedFilmsSize = useAppSelector((state) => state.filmsSize);
  const promoFilm = useAppSelector((state) => state.promoFilm);
  const filmDataLoadingStatus = useAppSelector((state) => state.filmDataLoadingStatus);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getFilms());
  }, [dispatch, selectedGenre, films]);

  if (filmDataLoadingStatus || promoFilm === undefined) {
    return <Spinner/>;
  }

  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={promoFilm.backgroundImage} alt={promoFilm.name}/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">

          <Logo/>

          <ul className="user-block">
            <li className="user-block__item">
              <div className="user-block__avatar">
                <img src="img/avatar.jpg" alt="User avatar" width="63" height="63"/>
              </div>
            </li>
            <li className="user-block__item">
              <a className="user-block__link">Sign out</a>
            </li>
          </ul>
        </header>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src={promoFilm.posterImage} alt={`${promoFilm.name} poster`} width="218"
                height="327"
              />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{promoFilm.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{promoFilm.genre}</span>
                <span className="film-card__year">{promoFilm.released.valueOf()}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button"
                  onClick={() => navigate(AppRoute.Player.replace(':id', promoFilm.id))}
                >
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button"
                  onClick={() => navigate(AppRoute.MyList.replace(':id', promoFilm.id))}
                >
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">9</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenreList genres={new Set(films.map((f) => f.genre))}/>

          <FilmList films={filmsByGenre.filter((f) => f.id !== promoFilm.id)} displayedFilmsSize={displayedFilmsSize}/>

        </section>

        <Footer />

      </div>
    </>
  );
}
