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
