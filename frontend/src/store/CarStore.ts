import axios from "axios";
import { makeAutoObservable } from "mobx";

type TCarInfo = {
    title: string,
    images: string[],
    about: string,
    category: string,
    price: number
}

class CarStore {
    public Root:any;
    constructor(Root:any)   {
        makeAutoObservable(this);
        this.Root = Root;
    }

    title: string = ''
    images: string[] = []
    about: string = ''
    category:string = ''
    price:number | null = null
    
    setCar(carInfo:TCarInfo){
        this.title = carInfo.title
        this.images = carInfo.images
        this.about = carInfo.about
        this.category = carInfo.category
        this.price = carInfo.price
    }

    loadCar(id:number){
        const url = '/pick/car:' + id
        
        axios.get(url)
        .then(res => {
            console.log(res.data)
            this.setCar(res.data)
        })
    }

}

export default CarStore