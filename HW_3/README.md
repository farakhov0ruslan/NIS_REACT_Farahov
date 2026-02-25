# E-commerce Admin Panel — HW_3

Административная панель для e-commerce системы с полным циклом: авторизация, регистрация, каталог продуктов, профиль, настройки.

## Описание проекта

**E-commerce Admin** — SPA на React + TypeScript с архитектурой Feature Sliced Design. Приложение подключается к реальному API [DummyJSON](https://dummyjson.com) через RTK Query, поддерживает авторизацию с сохранением сессии, смену темы и языка интерфейса на лету.

## Функциональность

### Аутентификация

- **Логин** — форма с валидацией полей; поддерживает два типа аккаунтов: DummyJSON (`POST /auth/login`) и локально зарегистрированных пользователей (из `localStorage`)
- **Регистрация** — полноценная форма (username, password, firstName, lastName, email); аккаунт сохраняется в `localStorage`; при входе такой пользователь авторизуется без запросов к API
- **Аватар** — при регистрации к профилю автоматически привязывается уникальный аватар через [pravatar.cc](https://pravatar.cc) на основе username
- **Восстановление сессии** — при перезагрузке страницы токен из `localStorage` проверяется через `GET /auth/me`; для локальных пользователей сессия восстанавливается синхронно без запроса к сети
- **Logout** — очистка Redux state и `localStorage`, редирект на `/login`
- **Protected Routes** — неавторизованный пользователь перенаправляется на `/login`; авторизованный с `/login` или `/register` — на `/`; пока идёт проверка токена, приложение показывает спиннер и не делает преждевременный редирект

### Каталог продуктов

- **Список продуктов** — сетка карточек с изображением, названием, ценой, рейтингом и категорией
- **Поиск** — поиск по названию через `GET /products/search` с debounce 300ms
- **Пагинация** — навигация по страницам через URL query-параметры (`?page=2`)
- **Детальная страница** — полная информация о продукте: описание, бренд, остаток на складе

### Настройки

- **Тема** — переключение light / dark, применяется через `data-theme` на `<html>`, сохраняется в `localStorage`
- **Язык** — переключение ru / en без перезагрузки страницы через `i18next`
- **Размер страницы** — выбор количества продуктов на странице: 10 / 20 / 50

### Прочее

- **Профиль** — отображение данных текущего пользователя из Redux: имя, email, аватар; для DummyJSON-пользователей используется их штатная аватарка с API, для локально зарегистрированных — pravatar.cc
- **Dashboard** — приветственное сообщение с именем пользователя, карточка с общим числом продуктов (через RTK Query), быстрые ссылки на основные разделы
- **404 страница** — для всех неизвестных маршрутов
- **Error Boundary** — class-компонент, перехватывает ошибки рендера, показывает fallback UI с кнопкой перезагрузки; текст кнопки и заголовка переведён через i18n

## Архитектура

Проект реализован по методологии **Feature Sliced Design (FSD)** — явное разделение на слои без прямых импортов снизу вверх.

```
src/
├── app/
│   ├── providers/    # AuthInit, ThemeProvider, I18nSync, ProtectedRoute
│   ├── slices/       # settingsSlice (тема, язык, размер страницы)
│   └── styles/       # глобальные CSS-переменные и темы
├── pages/
│   ├── login/        # форма входа
│   ├── register/     # форма регистрации
│   ├── dashboard/    # главная страница
│   ├── products/     # каталог продуктов
│   ├── product-detail/ # детальная страница продукта
│   ├── profile/      # профиль пользователя
│   ├── settings/     # настройки
│   └── not-found/    # 404
├── widgets/
│   ├── header/       # шапка с навигационными элементами
│   ├── sidebar/      # боковое меню
│   ├── private-layout/ # общий layout для приватных страниц
│   └── error-boundary/ # перехват ошибок рендера
├── features/
│   ├── auth/         # LoginForm, LogoutButton
│   ├── product-search/     # SearchBar с debounce
│   ├── product-pagination/ # пагинация через URL-параметры
│   ├── theme-switcher/     # переключатель темы
│   └── language-switcher/  # переключатель языка
├── entities/
│   ├── user/         # authSlice, authApi, типы пользователя
│   └── product/      # productsApi, типы продукта
└── shared/
    ├── api/          # baseQuery с заголовком авторизации
    ├── i18n/         # конфигурация i18next, en.json, ru.json
    ├── ui/           # Spinner, ErrorMessage, EmptyState
    └── lib/          # хуки, утилиты localStorage
```

## Технологии и подходы

### State Management

- **Redux Toolkit** — `configureStore`, `createSlice`, `createApi`
- **authSlice** — хранение пользователя и токена; actions: `setCredentials`, `logout`; `initialState` для локальных пользователей заполняется синхронно из `localStorage` ещё до первого рендера
- **settingsSlice** — тема, язык, размер страницы; `initialState` читается из `localStorage`, изменения записываются туда же мгновенно
- **Селекторы** — `selectUser`, `selectToken`, `selectIsAuthenticated`, `selectTheme`, `selectLanguage`, `selectPageSize`; вся логика выбора данных вынесена из компонентов

### RTK Query

- **authApi** — `useLoginMutation`, `useGetMeQuery` через `POST /auth/login` и `GET /auth/me`
- **productsApi** — `useGetProductsQuery`, `useGetProductByIdQuery`, `useSearchProductsQuery`
- **baseQuery** — единый `fetchBaseQuery` с `prepareHeaders`: токен берётся из Redux state, с fallback на `localStorage` для первого запроса при перезагрузке
- **Кэширование** — RTK Query автоматически кэширует результаты, повторные запросы с теми же параметрами не делают лишних HTTP-запросов

### Маршрутизация

- **React Router v6** — `createBrowserRouter`
- **Lazy loading** — все страницы через `React.lazy` + `Suspense` с `<Spinner />` как fallback
- **AuthInit** — провайдер, который блокирует отрисовку RouterProvider до завершения проверки токена; для DummyJSON-пользователей ждёт ответа `GET /auth/me` и диспатчит `setCredentials` до первого рендера маршрутов; для локальных пользователей завершается синхронно
- **ProtectedRoute** — редиректит на `/login`, если пользователь не авторизован; благодаря AuthInit никогда не срабатывает преждевременно
- **PublicOnlyRoute** — авторизованного пользователя перенаправляет с `/login` и `/register` на `/`

### Интернационализация

- **react-i18next** — переключение языка без перезагрузки страницы
- **JSON-файлы переводов** — `en.json` и `ru.json` покрывают все страницы: навигация, формы, ошибки, пустые состояния, настройки
- **I18nSync** — провайдер следит за `settingsSlice.language` и вызывает `i18n.changeLanguage()` при изменении; язык сохраняется в `localStorage`

### Качество кода

- **TypeScript strict** — строгие типы везде, нет `any`, нет `@ts-ignore`
- **useCallback** — мемоизация обработчиков: `handleChange` в `SearchBar`, `handleLogout` в `LogoutButton`, `goTo` в `Pagination`, `change` в `LanguageSwitcher`
- **useMemo** — вычисление `skip` из `page` и `pageSize` в `ProductsPage`
- **React.memo** — `Header`, `Sidebar` обёрнуты в `memo` для предотвращения лишних ре-рендеров
- **useRef** — `committedQuery` в `SearchBar` для отслеживания последнего отправленного запроса (решает проблему сброса пагинации в StrictMode)
- **ErrorBoundary** — class-компонент, перехватывает ошибки рендера, показывает fallback UI с кнопкой перезагрузки

### Стилизация

- **CSS-переменные** — единая палитра `--color-bg`, `--color-surface`, `--color-text`, `--color-primary` и др.
- **data-theme** — атрибут на `<html>` переключает наборы переменных: `[data-theme='dark']` переопределяет цвета
- Без внешних UI-библиотек — всё написано на чистом CSS

## Установка и запуск

### Требования

- Node.js >= 18.x
- npm >= 9.x

### Установка зависимостей

```bash
npm install
```

### Команды

```bash
npm run dev      # Запуск dev-сервера
npm run build    # Сборка для production
```

После запуска `npm run dev` приложение доступно на `http://localhost:5173`.

## Тестовые данные для входа

Приложение поддерживает два типа аккаунтов.

### Способ 1: Зарегистрировать собственный аккаунт

Перейти на `/register`, заполнить форму — аккаунт сохраняется в `localStorage`. Пример данных:

| Поле       | Значение           |
|------------|--------------------|
| Username   | `test_user`        |
| Password   | `test_pass`        |
| First Name | `Test`             |
| Last Name  | `User`             |
| Email      | `test@example.com` |

После регистрации можно сразу войти с этими данными на `/login`. Аватар генерируется автоматически через pravatar.cc на основе username.

### Способ 2: Использовать тестовых пользователей DummyJSON

| Username  | Password     |
|-----------|--------------|
| emilys    | emilyspass   |
| michaelw  | michaelwpass |
| sophiab   | sophiabpass  |

Полный список: [dummyjson.com/users](https://dummyjson.com/users)

## Маршруты приложения

| Маршрут         | Доступ    | Описание                                         |
|-----------------|-----------|--------------------------------------------------|
| `/login`        | Публичный | Форма авторизации с валидацией                   |
| `/register`     | Публичный | Регистрация нового аккаунта (сохраняется в localStorage) |
| `/`             | Приватный | Dashboard: приветствие, статистика, быстрые ссылки |
| `/products`     | Приватный | Каталог с поиском, пагинацией и фильтрацией      |
| `/products/:id` | Приватный | Детальная страница продукта                      |
| `/profile`      | Приватный | Данные текущего пользователя и аватар            |
| `/settings`     | Приватный | Тема, язык, размер страницы                      |
| `*`             | —         | 404 — страница не найдена                        |

## Критерии приёмки

| Категория | Критерий | Реализация | Баллы |
|-----------|----------|------------|-------|
| Аутентификация (max 16) | Реализация логина через RTK Query | `useLoginMutation` → `POST /auth/login`; fallback на localStorage-пользователей | 6 |
| | Хранение токена и пользователя в Redux | `authSlice`: `setCredentials`, `logout`; селекторы `selectUser`, `selectToken`, `selectIsAuthenticated` | 4 |
| | Protected routes и редиректы | `AuthInit` блокирует рендер до завершения проверки токена; `ProtectedRoute` / `PublicOnlyRoute` | 4 |
| | Logout и очистка состояния | `LogoutButton` диспатчит `logout`, вызывает `removeStoredToken`, редирект на `/login` | 2 |
| Маршрутизация и layout (max 10) | Разделение публичных и приватных маршрутов | `PublicOnlyRoute` для `/login`, `/register`; `ProtectedRoute` для всех остальных | 3 |
| | Общий layout (Header + Sidebar) | `PrivateLayout` — `Header` + `Sidebar` + `<Outlet />`; оба компонента обёрнуты в `React.memo` | 3 |
| | Lazy loading страниц | Все 8 страниц через `React.lazy` + `Suspense` с `<Spinner />` как fallback | 2 |
| | Страница 404 | `NotFoundPage` на маршруте `*` с кнопкой возврата на главную | 2 |
| RTK Query (max 16) | Корректная настройка `createApi` | `authApi` и `productsApi` с единым `baseQuery`; `prepareHeaders` для токена | 4 |
| | Получение списка продуктов | `useGetProductsQuery` с параметрами `limit` / `skip`; `pageSize` берётся из Redux | 4 |
| | Детальная страница продукта | `useGetProductByIdQuery` по `:id` из URL; описание, бренд, остаток, рейтинг | 3 |
| | Поиск и пагинация через query-params | `SearchBar` debounce 300ms → `?q=`; `Pagination` → `?page=`; `useSearchProductsQuery` при наличии запроса | 3 |
| | loading / error / empty state | `<Spinner />`, `<ErrorMessage />`, `<EmptyState />` на всех страницах с данными | 2 |
| Redux Toolkit (max 12) | Структура store и слайсов | `configureStore` с `authSlice`, `settingsSlice`, `authApi.reducer`, `productsApi.reducer` | 4 |
| | Селекторы, логика вне компонентов | 9 селекторов в слайсах; компоненты не содержат логику выборки данных | 6 |
| | Хранение настроек (язык, тема) | `settingsSlice` читает из `localStorage` при старте, записывает при каждом изменении | 2 |
| i18n (max 8) | Поддержка ru / en | `react-i18next`; `I18nSync` следит за `settingsSlice.language` и вызывает `i18n.changeLanguage()` | 3 |
| | Перевод всех основных UI-элементов | `en.json` / `ru.json`: навигация, формы, ошибки, пустые состояния, настройки, Dashboard, профиль, регистрация, ErrorBoundary | 5 |
| Архитектура (max 10) | Feature-based структура FSD | 6 слоёв: app / pages / widgets / features / entities / shared; пути через алиасы `@app`, `@shared` и т.д. | 4 |
| | Разделение слоёв и ответственности | API в entities, бизнес-фичи в features, составной UI в widgets, переиспользуемое в shared | 4 |
| | Отсутствие god-компонентов | Каждый компонент — одна ответственность; логика авторизации, данные и UI разнесены по разным файлам | 2 |
| Качество кода (max 8) | TypeScript, корректные типы | `strict: true`; нет `any` и `@ts-ignore`; все props, state и API-ответы типизированы | 3 |
| | Мемоизация, кастомные хуки | `useCallback` в SearchBar / Pagination / LanguageSwitcher / LogoutButton; `useMemo` в ProductsPage; `React.memo` на Header, Sidebar; `useRef` (committedQuery) | 3 |
| | Error Boundary | `ErrorBoundary` — class-компонент с `getDerivedStateFromError`; текст переведён через `i18n.t()` | 2 |
| Документация (max 4) | README с описанием архитектуры и запуска | Описание FSD-слоёв, технологий, маршрутов, тестовых данных и критериев | 2 |
| | Скриншоты ключевых сценариев | — | 2 |
| **ИТОГО** | | | **80** |

## Автор

Фарахов Руслан — HW_3
