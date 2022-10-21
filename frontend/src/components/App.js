import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useHistory, Link } from 'react-router-dom';

import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import { api } from '../utils/API.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup.js'
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';

import Login from './Login.js';
import Register from './Register.js';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltipError from './InfoTooltipError';
import InfoTooltipSuccess from './InfoTooltipSuccess';
import Menu from './Menu.js';
import BurgerMenu from './BurgerMenu.js';
import * as auth from '../utils/auth.js';

function App() {

  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);

  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);

  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);

  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  const [isCardSelected, setCardSelected] = useState({ isOpen: false, card: {} });

  const closeAllPopups = () => {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setCardSelected({ isOpen: false, card: {} });
    setIsAuth(false);
    setIsError(false);
  }

  //Открытие картинки на весь экран

  const handleCardClick = (card) => {
    setCardSelected({ isOpen: true, card: card });
  }

  const [isCurrentUser, setCurrentUser] = useState('');
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => console.log(`${err}`))
  }, [])

  useEffect(() => {
    api.getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => console.log(`${err}`))
  }, [])

  function handleCardLike(id, isLiked) {
    api.toggleLike(id, isLiked)
      .then((res) => {
        setCards(cards.map((card) => (card._id === res._id ? res : card)))
      })
      .catch((err) => console.log(`${err}`))
  }

  function handleCardDelete(id) {
    api.deleteCard(id)
      .then(() => {
        setCards(cards.filter((card) => (card._id !== id)))
      })
      .catch((err) => console.log(`${err}`))
  }

  //setCards((state) => state.filter((item) => item._id !== card._id));

  function handleUpdateUser(data) {
    api.setInfo(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(`${err}`))
  }

  function handleUpdateAvatar(data) {
    api.setAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(`${err}`))
  }

  function handleAddPlaceSubmit(data) {
    console.log(data)
    api.setInitialCards(data.name, data.link)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(`${err}`))
  }

  //Запросы на сервер авторизация/регистрация

  const [loggedIn, setLoggedIn] = useState(false);

  //Отображение почты юзера в шапке

  const [userEmail, setUserEmail] = useState('');
  const [isAuth, setIsAuth] = useState(false);
  const [isError, setIsError] = useState(false);

  const history = useHistory();

  function handleOnRegister({ password, email }) {
    auth.register({ password, email })
      .then((res) => {
        console.log(res)
        if (res) {
          setIsAuth(true);
          history.push('/sign-in');
        } else {
          setIsError(true);
        }
      })
      .catch(() => { setIsError(true) })
      .catch((err) => console.log(`${err}`))
  }

  function handleOnLogin({ password, email }) {
    auth.authorize({ password, email })
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setIsAuth(true);
          history.push('/');
        }
        if (!res) {
          setIsError(true);
        }
      })
      .then(() => {
        setIsAuth(false);
      })
      .catch(() => { setIsError(true) })
      .catch((err) => console.log(`${err}`))
  }

  //Проверка на совпадение текущего токена с отправленным ранее при длит нахождении на стр

  useEffect(() => {
    tokenCheck()
  }, [loggedIn])

  function tokenCheck() {
    // если у пользователя есть токен в localStorage, 
    // эта функция проверит, действующий он или нет
    const jwt = localStorage.getItem('token');
    if (jwt) {
      // здесь будем проверять токен
      auth.getContent(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            //Установим в хедере почту юзера
            setUserEmail(res.data.email)
            history.push('/');
          }
        })
        .catch((err) => console.log(`${err}`))
    }
  }
  console.log(localStorage)
  function signOut() {
    console.log(localStorage)
    localStorage.removeItem('token');
    setLoggedIn(false);
    history.push('/sign-up');
  }

  // Закрытие попапов на Esc

  const isOpen = (isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || isCardSelected.isOpen || isAuth || isError)

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen])

  const [menuActive, setMenuActive] = React.useState(false);

  return (

    <CurrentUserContext.Provider value={isCurrentUser}>
      {loggedIn ? <BurgerMenu userEmail={userEmail} signOut={signOut} active={menuActive} /> : ''}

      {loggedIn ?
        <Header value={userEmail} >
          <Menu userEmail={userEmail} signOut={signOut} />
          <div className={` ${menuActive ? 'header__burger-btn_active' : 'header__burger-btn'}`} onClick={() => setMenuActive(!menuActive)}>
            <span></span>
          </div>
        </Header> : ''}
      <Switch>

        <Route exact path="/sign-in">
          <Header>
            <Link className="header__link" to="/sign-up">Регистрация</Link>
          </Header>
          <Login onLogin={handleOnLogin} />
        </Route>

        <Route exact path="/sign-up">
          <Header>
            <Link className="header__link" to="/sign-in">Войти</Link>
          </Header>
          <Register onRegister={handleOnRegister} />
        </Route>

        <ProtectedRoute exact path="/" component={Main} loggedIn={loggedIn} onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete} />

        <Route exact path="*">
          {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-up" />}
        </Route>
      </Switch>

      {loggedIn ? <Footer /> : ''}

      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

      <PopupWithForm name="confirm-delete" title="Вы уверены?" btnText="Да" />

      <ImagePopup name="open-pic" isOpen={isCardSelected.isOpen} card={isCardSelected} onClose={closeAllPopups} />
      <InfoTooltipSuccess isOpen={isAuth} onClose={closeAllPopups} />

      <InfoTooltipError isOpen={isError} onClose={closeAllPopups} />

    </CurrentUserContext.Provider>

  );
}

export default App;
