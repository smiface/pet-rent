import { makeAutoObservable } from "mobx";
import Auth from './Auth'
import Payment from "./Payment";
import Cars from "./Cars";
import Filters from "./Filters";
import CarStore from './CarStore';

class RootStore {
    
    constructor() {
        makeAutoObservable(this)
    }
    
    public car = new CarStore(this)
    public auth = new Auth(this)
    public cars = new Cars(this)
    public payment = new Payment()
    public filters = new Filters(this)
}

export default new RootStore()