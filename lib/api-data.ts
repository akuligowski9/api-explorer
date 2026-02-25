import catalogRaw from "@/data/catalog.json";
import type { ApiEntry, CatalogData, PreviewData } from "./types";
import { slugify } from "./slugify";

// Import all preview files statically
import openMeteo from "@/data/previews/open-meteo.json";
import restcountries from "@/data/previews/restcountries.json";
import pokApi from "@/data/previews/pok-api.json";
import coingecko from "@/data/previews/coingecko.json";
import spacex from "@/data/previews/spacex.json";
import jsonplaceholder from "@/data/previews/jsonplaceholder.json";
import dogCeo from "@/data/previews/dog-ceo.json";
import theCatApi from "@/data/previews/the-cat-api.json";
import nasa from "@/data/previews/nasa.json";
import openLibrary from "@/data/previews/open-library.json";
import jokeapi from "@/data/previews/jokeapi.json";
import ipApi from "@/data/previews/ip-api.json";
import nationalizeIo from "@/data/previews/nationalize-io.json";
import agifyIo from "@/data/previews/agify-io.json";
import boredApi from "@/data/previews/bored-api.json";
import httpCat from "@/data/previews/http-cat.json";
import unsplash from "@/data/previews/unsplash.json";
import github from "@/data/previews/github.json";
import hackernews from "@/data/previews/hackernews.json";
import openFoodFacts from "@/data/previews/open-food-facts.json";
import exchangerateApi from "@/data/previews/exchangerate-api.json";
import covid19 from "@/data/previews/covid-19.json";
import qrCodeGenerator from "@/data/previews/qr-code-generator.json";
import loremPicsum from "@/data/previews/lorem-picsum.json";
import numbers from "@/data/previews/numbers.json";
// Batch 2
import catFacts from "@/data/previews/cat-facts.json";
import adviceSlip from "@/data/previews/advice-slip.json";
import kanyeRest from "@/data/previews/kanye-rest.json";
import rickAndMorty from "@/data/previews/rick-and-morty.json";
import openTrivia from "@/data/previews/open-trivia.json";
import themealdb from "@/data/previews/themealdb.json";
import thecocktaildb from "@/data/previews/thecocktaildb.json";
import freeDictionary from "@/data/previews/free-dictionary.json";
import jikan from "@/data/previews/jikan.json";
import deckOfCards from "@/data/previews/deck-of-cards.json";
import sunriseAndSunset from "@/data/previews/sunrise-and-sunset.json";
import xkcd from "@/data/previews/xkcd.json";
import artInstitute from "@/data/previews/art-institute-of-chicago.json";
import openBreweryDb from "@/data/previews/open-brewery-db.json";
import genderizeIo from "@/data/previews/genderize-io.json";
// Batch 3
import ronSwanson from "@/data/previews/ron-swanson-quotes.json";
import quotableQuotes from "@/data/previews/quotable-quotes.json";
import emojihub from "@/data/previews/emojihub.json";
import chucknorris from "@/data/previews/chucknorris-io.json";
import randomUser from "@/data/previews/random-user-generator.json";
import waifuIm from "@/data/previews/waifu-im.json";
import worldTimeApi from "@/data/previews/world-time-api.json";
import colormagic from "@/data/previews/colormagic.json";
import itunes from "@/data/previews/itunes.json";
import wikipedia from "@/data/previews/wikipedia.json";
import cataas from "@/data/previews/cataas.json";
import randomUselessFacts from "@/data/previews/random-useless-facts.json";
import icanhazdadjoke from "@/data/previews/icanhazdadjoke.json";
import randomfox from "@/data/previews/randomfox.json";
import meowfacts from "@/data/previews/meowfacts.json";
// Batch 4
import placebear from "@/data/previews/placebear.json";
import placedog from "@/data/previews/placedog.json";
import httpDog from "@/data/previews/http-dog.json";
import coffee from "@/data/previews/coffee.json";
import foodish from "@/data/previews/foodish.json";
import dicebearAvatars from "@/data/previews/dicebear-avatars.json";
import imgflip from "@/data/previews/imgflip.json";
import iconHorse from "@/data/previews/icon-horse.json";
import dogPics from "@/data/previews/dog-pics.json";
import shields from "@/data/previews/shields.json";
import baconmockup from "@/data/previews/baconmockup.json";
import amiiboapi from "@/data/previews/amiiboapi.json";
import breakingBadQuotes from "@/data/previews/breaking-bad-quotes.json";
import punkapi from "@/data/previews/punkapi.json";
// Batch 5
import jellyBellyWiki from "@/data/previews/jelly-belly-wiki.json";
import isevenHumor from "@/data/previews/iseven-humor.json";
import baconIpsum from "@/data/previews/bacon-ipsum.json";
import fakestoreapi from "@/data/previews/fakestoreapi.json";
import itsthisforthat from "@/data/previews/itsthisforthat.json";
import corporateBuzzWords from "@/data/previews/corporate-buzz-words.json";
import officialJoke from "@/data/previews/official-joke.json";
import techy from "@/data/previews/techy.json";
import evilInsultGenerator from "@/data/previews/evil-insult-generator.json";
import forismatic from "@/data/previews/forismatic.json";
import programmingQuotes from "@/data/previews/programming-quotes.json";
import dragonBall from "@/data/previews/dragon-ball.json";
import airportsapi from "@/data/previews/airportsapi.json";
import harryPotter from "@/data/previews/harry-potter.json";
// Batch 6
import cheapshark from "@/data/previews/cheapshark.json";
import gutendex from "@/data/previews/gutendex.json";
import datamuse from "@/data/previews/datamuse.json";
import cityBikes from "@/data/previews/city-bikes.json";
import isro from "@/data/previews/isro.json";
import chroniclingAmerica from "@/data/previews/chronicling-america.json";
import dummyjson from "@/data/previews/dummyjson.json";
import bobsBurgersApi from "@/data/previews/bob-s-burgers-api.json";
import quoteGarden from "@/data/previews/quote-garden.json";
import colormind from "@/data/previews/colormind.json";
import purgomalum from "@/data/previews/purgomalum.json";
import postmanEcho from "@/data/previews/postman-echo.json";
import czechNationalBank from "@/data/previews/czech-national-bank.json";
import economiaAwesome from "@/data/previews/economia-awesome.json";
// Batch 7
import anApiOfIceAndFire from "@/data/previews/an-api-of-ice-and-fire.json";
import eurovisionSongContest from "@/data/previews/eurovision-song-contest.json";
import balldontlie from "@/data/previews/balldontlie.json";
import f1Api from "@/data/previews/f1-api.json";
import fantasyPremierLeague from "@/data/previews/fantasy-premier-league.json";
import dattebayoApi from "@/data/previews/dattebayo-api.json";
import bibleApi from "@/data/previews/bible-api.json";
import phoneSpecification from "@/data/previews/phone-specification.json";
import dogs from "@/data/previews/dogs.json";
import nhtsa from "@/data/previews/nhtsa.json";
import patentsview from "@/data/previews/patentsview.json";
import archiveOrg from "@/data/previews/archive-org.json";
import adsbdb from "@/data/previews/adsbdb.json";
import bcFerries from "@/data/previews/bc-ferries.json";
// Batch 8
import hebrewCalendar from "@/data/previews/hebrew-calendar.json";
import czechNamedaysCalendar from "@/data/previews/czech-namedays-calendar.json";
import apiColombia from "@/data/previews/api-colombia.json";
import brazil from "@/data/previews/brazil.json";
import bandsintown from "@/data/previews/bandsintown.json";
import chineseCharacterWeb from "@/data/previews/chinese-character-web.json";
import wiktionary from "@/data/previews/wiktionary.json";
import administrativeDivisonsDb from "@/data/previews/administrative-divisons-db.json";
import colourlovers from "@/data/previews/colourlovers.json";
import disify from "@/data/previews/disify.json";
import codeforces from "@/data/previews/codeforces.json";
import inshortsNews from "@/data/previews/inshorts-news.json";
import arbeitnow from "@/data/previews/arbeitnow.json";
import ticketmaster from "@/data/previews/ticketmaster.json";
// Batch 9
import chessCom from "@/data/previews/chess-com.json";
import disney from "@/data/previews/disney.json";
import dungeonsAndDragons from "@/data/previews/dungeons-and-dragons.json";
import freetogame from "@/data/previews/freetogame.json";
import hyruleCompendium from "@/data/previews/hyrule-compendium.json";
import magicTheGathering from "@/data/previews/magic-the-gathering.json";
import swapi from "@/data/previews/swapi.json";
import yuGiOh from "@/data/previews/yu-gi-oh.json";
import zelda from "@/data/previews/zelda.json";
import tvmaze from "@/data/previews/tvmaze.json";
import gameOfThronesQuotes from "@/data/previews/game-of-thrones-quotes.json";
import strangerThingsQuotes from "@/data/previews/stranger-things-quotes.json";
import movieQuote from "@/data/previews/movie-quote.json";
import thronesapi from "@/data/previews/thronesapi.json";
import finalSpace from "@/data/previews/final-space.json";
import stapi from "@/data/previews/stapi.json";
import cdnjs from "@/data/previews/cdnjs.json";
import httpbin from "@/data/previews/httpbin.json";
import npmRegistry from "@/data/previews/npm-registry.json";
import reqres from "@/data/previews/reqres.json";
// Batch 10
import nominatim from "@/data/previews/nominatim.json";
import postcodesIo from "@/data/previews/postcodes-io.json";
import zippopotamUs from "@/data/previews/zippopotam-us.json";
import launchLibrary2 from "@/data/previews/launch-library-2.json";
import newton from "@/data/previews/newton.json";
import openNotify from "@/data/previews/open-notify.json";
import usgsEarthquake from "@/data/previews/usgs-earthquake-hazards-program.json";
import nobelPrize from "@/data/previews/nobel-prize.json";
import universitiesList from "@/data/previews/universities-list.json";
import poetrydb from "@/data/previews/poetrydb.json";
import wizardWorld from "@/data/previews/wizard-world.json";
import coincap from "@/data/previews/coincap.json";
import coinlore from "@/data/previews/coinlore.json";
import frankfurter from "@/data/previews/frankfurter.json";
import nagerDate from "@/data/previews/nager-date.json";
import ukBankHolidays from "@/data/previews/uk-bank-holidays.json";
import usWeather from "@/data/previews/us-weather.json";
import ukCarbonIntensity from "@/data/previews/uk-carbon-intensity.json";
import websiteCarbon from "@/data/previews/website-carbon.json";
import airQualityIndex from "@/data/previews/air-quality-index.json";
// Batch 11
import metropolitanMuseum from "@/data/previews/metropolitan-museum-of-art.json";
import stoicismQuote from "@/data/previews/stoicism-quote.json";
import zenQuotes from "@/data/previews/zen-quotes.json";
import musicbrainz from "@/data/previews/musicbrainz.json";
import radioBrowser from "@/data/previews/radio-browser.json";
import randomdog from "@/data/previews/randomdog.json";
import randomduck from "@/data/previews/randomduck.json";
import yoMommaJokes from "@/data/previews/yo-momma-jokes.json";
import randomDadJoke from "@/data/previews/random-dad-joke.json";
import tacofancy from "@/data/previews/tacofancy.json";
import whiskyhunter from "@/data/previews/whiskyhunter.json";
import mlbRecords from "@/data/previews/mlb-records-and-stats.json";
import nhlRecords from "@/data/previews/nhl-records-and-stats.json";
import footballStandings from "@/data/previews/football-standings.json";
import makeup from "@/data/previews/makeup.json";
import openCollective from "@/data/previews/open-collective.json";
import pinballMap from "@/data/previews/pinball-map.json";
import robohash from "@/data/previews/robohash.json";
import thisPersonDoesNotExist from "@/data/previews/this-person-does-not-exist.json";
import placekeanu from "@/data/previews/placekeanu.json";
// Batch 12
import ipify from "@/data/previews/ipify.json";
import jsdelivr from "@/data/previews/jsdelivr.json";
import quickchart from "@/data/previews/quickchart.json";
import yesNo from "@/data/previews/yes-no.json";
import whatTheCommit from "@/data/previews/what-the-commit.json";
import uuidGenerator from "@/data/previews/uuid-generator.json";
import crossrefMetadata from "@/data/previews/crossref-metadata-search.json";
import stephenKing from "@/data/previews/stephen-king.json";
import quran from "@/data/previews/quran.json";
import spaceflightNews from "@/data/previews/spaceflight-news.json";
import mmoGames from "@/data/previews/mmo-games.json";
import genshinImpact from "@/data/previews/genshin-impact.json";
import fbiWanted from "@/data/previews/fbi-wanted.json";
import interpolRedNotices from "@/data/previews/interpol-red-notices.json";
import dataUsa from "@/data/previews/data-usa.json";
import openDisease from "@/data/previews/open-disease.json";
import libretranslate from "@/data/previews/libretranslate.json";
import wakatime from "@/data/previews/wakatime.json";
import passwordinator from "@/data/previews/passwordinator.json";
import statusPizza from "@/data/previews/status-pizza.json";
// Batch 13
import arxiv from "@/data/previews/arxiv.json";
import worldBank from "@/data/previews/world-bank.json";
import kimiquotes from "@/data/previews/kimiquotes.json";
import jokeFather from "@/data/previews/joke-father.json";
import geekJokes from "@/data/previews/geek-jokes.json";
import funtranslations from "@/data/previews/funtranslations.json";
import crafatar from "@/data/previews/crafatar.json";
import digimonInformation from "@/data/previews/digimon-information.json";
import monsterHunterWorld from "@/data/previews/monster-hunter-world.json";
import scryfall from "@/data/previews/scryfall.json";
import lrclib from "@/data/previews/lrclib.json";
import graphCountries from "@/data/previews/graph-countries.json";
import transportForBelgium from "@/data/previews/transport-for-belgium.json";
import refugeRestrooms from "@/data/previews/refuge-restrooms.json";
import whenIsNextMcuFilm from "@/data/previews/when-is-next-mcu-film.json";
import waifuPics from "@/data/previews/waifu-pics.json";
import nekosbest from "@/data/previews/nekosbest.json";
import dolarapi from "@/data/previews/dolarapi.json";
import razorpayIfsc from "@/data/previews/razorpay-ifsc.json";
import onwater from "@/data/previews/onwater.json";

const catalog = catalogRaw as CatalogData;

const previewFiles: PreviewData[] = [
  openMeteo, restcountries, pokApi, coingecko, spacex,
  jsonplaceholder, dogCeo, theCatApi, nasa, openLibrary,
  jokeapi, ipApi, nationalizeIo, agifyIo, boredApi,
  httpCat, unsplash, github, hackernews, openFoodFacts,
  exchangerateApi, covid19, qrCodeGenerator, loremPicsum, numbers,
  catFacts, adviceSlip, kanyeRest, rickAndMorty, openTrivia,
  themealdb, thecocktaildb, freeDictionary, jikan, deckOfCards,
  sunriseAndSunset, xkcd, artInstitute, openBreweryDb, genderizeIo,
  ronSwanson, quotableQuotes, emojihub, chucknorris, randomUser,
  waifuIm, worldTimeApi, colormagic, itunes, wikipedia,
  cataas, randomUselessFacts, icanhazdadjoke, randomfox, meowfacts,
  placebear, placedog, httpDog, coffee, foodish,
  dicebearAvatars, imgflip, iconHorse, dogPics, shields,
  baconmockup, amiiboapi, breakingBadQuotes, punkapi,
  jellyBellyWiki, isevenHumor, baconIpsum, fakestoreapi, itsthisforthat,
  corporateBuzzWords, officialJoke, techy, evilInsultGenerator, forismatic,
  programmingQuotes, dragonBall, airportsapi, harryPotter,
  cheapshark, gutendex, datamuse, cityBikes, isro,
  chroniclingAmerica, dummyjson, bobsBurgersApi, quoteGarden, colormind,
  purgomalum, postmanEcho, czechNationalBank, economiaAwesome,
  anApiOfIceAndFire, eurovisionSongContest, balldontlie, f1Api, fantasyPremierLeague,
  dattebayoApi, bibleApi, phoneSpecification, dogs, nhtsa,
  patentsview, archiveOrg, adsbdb, bcFerries,
  hebrewCalendar, czechNamedaysCalendar, apiColombia, brazil, bandsintown,
  chineseCharacterWeb, wiktionary, administrativeDivisonsDb, colourlovers, disify,
  codeforces, inshortsNews, arbeitnow, ticketmaster,
  chessCom, disney, dungeonsAndDragons, freetogame, hyruleCompendium,
  magicTheGathering, swapi, yuGiOh, zelda, tvmaze,
  gameOfThronesQuotes, strangerThingsQuotes, movieQuote, thronesapi, finalSpace,
  stapi, cdnjs, httpbin, npmRegistry, reqres,
  nominatim, postcodesIo, zippopotamUs, launchLibrary2, newton,
  openNotify, usgsEarthquake, nobelPrize, universitiesList, poetrydb,
  wizardWorld, coincap, coinlore, frankfurter, nagerDate,
  ukBankHolidays, usWeather, ukCarbonIntensity, websiteCarbon, airQualityIndex,
  metropolitanMuseum, stoicismQuote, zenQuotes, musicbrainz, radioBrowser,
  randomdog, randomduck, yoMommaJokes, randomDadJoke, tacofancy,
  whiskyhunter, mlbRecords, nhlRecords, footballStandings, makeup,
  openCollective, pinballMap, robohash, thisPersonDoesNotExist, placekeanu,
  ipify, jsdelivr, quickchart, yesNo, whatTheCommit,
  uuidGenerator, crossrefMetadata, stephenKing, quran, spaceflightNews,
  mmoGames, genshinImpact, fbiWanted, interpolRedNotices, dataUsa,
  openDisease, libretranslate, wakatime, passwordinator, statusPizza,
  arxiv, worldBank, kimiquotes, jokeFather, geekJokes,
  funtranslations, crafatar, digimonInformation, monsterHunterWorld, scryfall,
  lrclib, graphCountries, transportForBelgium, refugeRestrooms, whenIsNextMcuFilm,
  waifuPics, nekosbest, dolarapi, razorpayIfsc, onwater,
] as PreviewData[];

const previewMap = new Map<string, PreviewData>();
for (const data of previewFiles) {
  previewMap.set(data.id, data);
}

function buildEntries(): ApiEntry[] {
  return catalog.entries.map((entry) => {
    const slug = slugify(entry.API);
    const preview = previewMap.get(slug);
    return { ...entry, slug, preview };
  });
}

let cachedEntries: ApiEntry[] | null = null;

export function getAllApis(): ApiEntry[] {
  if (!cachedEntries) {
    cachedEntries = buildEntries();
  }
  return cachedEntries;
}

export function getFeaturedApis(): ApiEntry[] {
  return getAllApis().filter((api) => api.preview !== undefined);
}

export function getApiBySlug(slug: string): ApiEntry | undefined {
  return getAllApis().find((api) => api.slug === slug);
}

export function getApisByCategory(category: string): ApiEntry[] {
  return getAllApis().filter((api) => api.Category === category);
}

export function getAllSlugs(): string[] {
  return getAllApis().map((api) => api.slug);
}

export function getSimilarApis(api: ApiEntry, limit = 6): ApiEntry[] {
  return getAllApis()
    .filter((a) => a.Category === api.Category && a.slug !== api.slug)
    .slice(0, limit);
}
