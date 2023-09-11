export const YEARS_DATA = [
  "1960-01-01",
  "1961-01-01",
  "1962-01-01",
  "1963-01-01",
  "1964-01-01",
  "1965-01-01",
  "1966-01-01",
  "1967-01-01",
  "1968-01-01",
  "1969-01-01",
  "1970-01-01",
  "1971-01-01",
  "1972-01-01",
  "1973-01-01",
  "1974-01-01",
  "1975-01-01",
  "1976-01-01",
  "1977-01-01",
  "1978-01-01",
  "1979-01-01",
  "1980-01-01",
  "1981-01-01",
  "1982-01-01",
  "1983-01-01",
  "1984-01-01",
  "1985-01-01",
  "1986-01-01",
  "1987-01-01",
  "1988-01-01",
  "1989-01-01",
  "1990-01-01",
  "1991-01-01",
  "1992-01-01",
  "1993-01-01",
  "1994-01-01",
  "1995-01-01",
  "1996-01-01",
  "1997-01-01",
  "1998-01-01",
  "1999-01-01",
  "2000-01-01",
  "2001-01-01",
  "2002-01-01",
  "2003-01-01",
  "2004-01-01",
  "2005-01-01",
  "2006-01-01",
  "2007-01-01",
  "2008-01-01",
  "2009-01-01",
  "2010-01-01",
  "2011-01-01",
  "2012-01-01",
  "2013-01-01",
  "2014-01-01",
  "2015-01-01",
  "2016-01-01",
  "2017-01-01",
  "2018-01-01",
  "2019-01-01",
  "2020-01-01",
  "2021-01-01",
  "2022-01-01",
  "2023-01-01",
].reverse()

export const TYPES_DATA = ["TV", "Movie", "Special", "OVA", "ONA", "Music"]
export const ORDERS_DATA = ["Favorites", "Score", "Rank", "Start_date", "Popularity"]
export const ANIME_MAIN_GENRES_ARR_DATA = [
  "Action",
  "Adventure",
  "Comedy",
  "Historical",
  "Mystery",
  "Drama",
  "Ecchi",
  "Fantasy",
  "Horror",
  "Martial Arts",
  "Mecha",
  "Music",
  "Romance",
  "School",
  "Sci-Fi",
  "Shoujo",
  "Shounen",
  "Sports",
  "Slice of Life",
  "Supernatural",
  "Psychological",
  "Thriller",
  "Seinen",
  "Josei",
].sort()
export const ANIME_MAIN_GENRES_DATA = [
  {
    genre: "Action",
    id: "1",
  },
  {
    genre: "Adventure",
    id: "2",
  },
  {
    genre: "Comedy",
    id: "4",
  },
  {
    genre: "Mystery",
    id: "7",
  },
  {
    genre: "Drama",
    id: "8",
  },
  {
    genre: "Ecchi",
    id: "9",
  },
  {
    genre: "Fantasy",
    id: "10",
  },
  {
    genre: "Historical",
    id: "13",
  },
  {
    genre: "Horror",
    id: "14",
  },
  {
    genre: "Martial Arts",
    id: "17",
  },
  {
    genre: "Mecha",
    id: "18",
  },
  {
    genre: "Music",
    id: "19",
  },
  {
    genre: "Romance",
    id: "22",
  },
  {
    genre: "School",
    id: "23",
  },
  {
    genre: "Sci-Fi",
    id: "24",
  },
  {
    genre: "Shoujo",
    id: "25",
  },
  {
    genre: "Shounen",
    id: "27",
  },
  {
    genre: "Sports",
    id: "30",
  },
  {
    genre: "Slice of Life",
    id: "36",
  },
  {
    genre: "Supernatural",
    id: "37",
  },
  {
    genre: "Psychological",
    id: "40",
  },
  {
    genre: "Thriller",
    id: "41",
  },
  {
    genre: "Seinen",
    id: "42",
  },
  {
    genre: "Josei",
    id: "43",
  },
]

export const ANIME_SUB_GENRES_DATA = [
  {
    genre: "Cars",
    id: "3",
  },
  {
    genre: "Avant Garde",
    id: "5",
  },
  {
    genre: "Demons",
    id: "6",
  },
  {
    genre: "Avant Garde",
    id: "5",
  },
  {
    genre: "Games",
    id: "11",
  },
  {
    genre: "Hentai",
    id: "12",
  },
  {
    genre: "Kids",
    id: "15",
  },
  {
    genre: "Parody",
    id: "20",
  },
  {
    genre: "Samurai",
    id: "21",
  },
  {
    genre: "Girl's Love",
    id: "26",
  },
  {
    genre: "Boy's Love",
    id: "28",
  },
  {
    genre: "Space",
    id: "29",
  },
  {
    genre: "Super Power",
    id: "31",
  },
  {
    genre: "Vampire",
    id: "32",
  },
  {
    genre: "Harem",
    id: "35",
  },
  {
    genre: "Military",
    id: "38",
  },
  {
    genre: "Police",
    id: "39",
  },
  {
    genre: "Award Winning",
    id: "46",
  },
  {
    genre: "Gourmet",
    id: "47",
  },
  {
    genre: "Work Life",
    id: "48",
  },
  {
    genre: "Erotica",
    id: "49",
  },
]

const GENRE_MANGA_ACTION = 1
const GENRE_MANGA_ADVENTURE = 2
const GENRE_MANGA_CARS = 3
const GENRE_MANGA_COMEDY = 4
const GENRE_MANGA_DEMENTIA = 5 // Renamed to the above by MAL
const GENRE_MANGA_AVANT_GARDE = 5
const GENRE_MANGA_DEMONS = 6
const GENRE_MANGA_MYSTERY = 7
const GENRE_MANGA_DRAMA = 8
const GENRE_MANGA_ECCHI = 9
const GENRE_MANGA_FANTASY = 10
const GENRE_MANGA_GAME = 11
const GENRE_MANGA_HENTAI = 12
const GENRE_MANGA_HISTORICAL = 13
const GENRE_MANGA_HORROR = 14
const GENRE_MANGA_KIDS = 15
const GENRE_MANGA_MAGIC = 16 // Removed by MAL - will throw BadResponseException (404)
const GENRE_MANGA_MARTIAL_ARTS = 17
const GENRE_MANGA_MECHA = 18
const GENRE_MANGA_MUSIC = 19
const GENRE_MANGA_PARODY = 20
const GENRE_MANGA_SAMURAI = 21
const GENRE_MANGA_ROMANCE = 22
const GENRE_MANGA_SCHOOL = 23
const GENRE_MANGA_SCI_FI = 24
const GENRE_MANGA_SHOUJO = 25
const GENRE_MANGA_GIRLS_LOVE = 26
const GENRE_MANGA_SHOUJO_AI = 26 // Renamed to the above by MAL
const GENRE_MANGA_SHOUNEN = 27
const GENRE_MANGA_BOYS_LOVE = 28
const GENRE_MANGA_SHOUNEN_AI = 28 // Renamed to the above by MAL
const GENRE_MANGA_SPACE = 29
const GENRE_MANGA_SPORTS = 30
const GENRE_MANGA_SUPER_POWER = 31
const GENRE_MANGA_VAMPIRE = 32
const GENRE_MANGA_YAOI = 33 // Merged into GENRE_MANGA_BOYS_LOVE by MAL - will throw BadResponseException (404)
const GENRE_MANGA_YURI = 34 // Merged into GENRE_MANGA_GIRLS_LOVE by MAL - will throw BadResponseException (404)
const GENRE_MANGA_HAREM = 35
const GENRE_MANGA_SLICE_OF_LIFE = 36
const GENRE_MANGA_SUPERNATURAL = 37
const GENRE_MANGA_MILITARY = 38
const GENRE_MANGA_POLICE = 39
const GENRE_MANGA_PSYCHOLOGICAL = 40
const GENRE_MANGA_SEINEN = 41
const GENRE_MANGA_JOSEI = 42
const GENRE_MANGA_DOUJINSHI = 43
const GENRE_MANGA_GENDER_BENDER = 44
const GENRE_MANGA_SUSPENSE = 45
const GENRE_MANGA_THRILLER = 45 // Renamed to the above by MAL
const GENRE_MANGA_AWARD_WINNING = 46
const GENRE_MANGA_GOURMET = 47
const GENRE_MANGA_WORK_LIFE = 48
const GENRE_MANGA_EROTICA = 49
