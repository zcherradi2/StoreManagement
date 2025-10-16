import { Dispatch, RefObject, SetStateAction } from "react";
import { Card, Model } from "./interfaces"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";



export class PageRoot{
    public selectedCard;
    public setSelectedCard;
    public loading
    public setLoading
    public error
    public setError
    public history
    public isModalOpen
    public setIsModalOpen
    public selectedItem
    public setSelectedItem
    public items
    public setItems
    public router
    public dict:{[key:string] : [any,(el:any)=>void]};
    constructor(
        selectedCard:Card|null,
        setSelectedCard:Dispatch<SetStateAction<Card | null>>,
        loading:boolean,
        setLoading:Dispatch<SetStateAction<boolean>>,
        error:string | null,
        setError:Dispatch<SetStateAction<string | null>>,
        history:RefObject<Card[]>,
        isModalOpen:boolean,
        setIsModalOpen:Dispatch<SetStateAction<boolean>>,
        selectedItem:Model|null,
        setSelectedItem:Dispatch<SetStateAction<Model|null>>,
        items:Model[],
        setItems:Dispatch<SetStateAction<Model[]>>,
        router:AppRouterInstance,
    ){
        this.selectedCard =selectedCard
        this.setSelectedCard = setSelectedCard
        this.loading = loading
        this.setLoading = setLoading
        this.error = error
        this.setError = setError
        this.history = history
        this.isModalOpen = isModalOpen
        this.setIsModalOpen = setIsModalOpen
        this.selectedItem = selectedItem
        this.setSelectedItem = setSelectedItem
        this.items = items
        this.setItems = setItems
        this.router = router
        this.dict = {}
    }

    static fromRootDict(root: { [key: string]: [any, (el: any) => void] }): PageRoot {
        return new PageRoot(
            root.selectedCard[0],   // selectedCard
            root.selectedCard[1],   // setSelectedCard
            root.loading[0],        // loading
            root.loading[1],        // setLoading
            root.error[0],          // error
            root.error[1],          // setError
            root.history[0],        // history
            root.isModalOpen[0],    // isModalOpen
            root.isModalOpen[1],    // setIsModalOpen
            root.selectedItem[0],   // selectedItem
            root.selectedItem[1],   // setSelectedItem
            root.items[0],          // items
            root.items[1],          // setItems
            root.router[0]          // router
        ).withDict(root);
    }
    public withDict(dict:{[key:string] : [any,(el:any)=>void]}){
        this.dict = dict
        return this
    }
    public putState(key:string,value:[any,any]){
        this.dict[key] = value
    }
    public getter(key:string){
        if(key in this.dict){
            return this.dict[key][0]
        }
        return undefined
    }
    public setter(key:string,value:any){
        if(key in this.dict){
            this.dict[key][1](value)
            return true
        }
        return false
    }
}