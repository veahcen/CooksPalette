import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = false // переменные с таким назв не меняем
        this._user = {}
        makeAutoObservable(this)
    } // mobx следит за изменениями переменных

    setIsAuth(bool) {
        this._isAuth = bool
    }
    setUser(user) {
        this._user = user
    }

    get isAuth() {
        return this._isAuth
    }
    get user() {
        return this._user
    }
}