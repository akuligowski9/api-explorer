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
