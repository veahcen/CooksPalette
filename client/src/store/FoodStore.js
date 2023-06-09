import {makeAutoObservable} from "mobx";

export default class FoodStore {
    constructor() {
        this._types = []
        this._foods = []
        this._favorites = []
        this._reviews = []
        this._selectedType = {}
        this._page = 1
        this._totalCount = 0
        this._limit = 3
        this._searchResults = []
        makeAutoObservable(this)
    } // mobx следит за изменениями переменных

    setFavorites(favorites){
        this._favorites = favorites
    }

    setTypes(types) {
        this._types = types
    }
    setFoods(foods) {
        this._foods = foods
    }

    setSelectedType(type) {
        this.setPage(1)
        this._selectedType = type
    }

    setTotalCount(count) {
        this._totalCount = count
    }
    setPage(page) {
        this._page = page
    }

    setSearchResults(results) {
        this._searchResults = results; // Устанавливаем результаты поиска
    }

    setFoodReviews(reviews) {
        this._reviews = reviews;
    }

    get favorites(){
        return this._favorites
    }

    get types() {
        return this._types
    }
    get foods() {
        return this._foods
    }
    get selectedType() {
        return this._selectedType
    }
    get totalCount() {
        return this._totalCount
    }
    get page() {
        return this._page
    }
    get limit() {
        return this._limit
    }
    get searchResults() {
        return this._searchResults; // Возвращаем результаты поиска
    }
    get isSearching() {
        return this._searchResults.length > 0;
    }

    get foodReviews() {
        return this._reviews;
    }
}