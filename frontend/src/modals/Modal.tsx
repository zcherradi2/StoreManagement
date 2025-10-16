'use client';

import {useModalFunctions} from '@/shared/functions'
import { Card, Model ,ModelClass} from '@/shared/interfaces';

import { ModalCards } from '@/shared/constants';

import { useState, useEffect, SetStateAction, Dispatch } from 'react';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
// const defaultNav = (<div className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded-t-lg border-b border-gray-200">
//                         <h2 className="font-semibold text-lg">{selectedCard?.title}</h2>
//                         <div className="flex justify-end items-center gap-2 bg-gray-100 px-4 py-2 rounded-t-lg border-b border-gray-200">
//                         <button
//                             onClick={modalGoBack}
//                             className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
//                         >
//                             ←
//                         </button>
//                         <button
//                             onClick={closeModal}
//                             className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200"
//                         >
//                             ✕
//                         </button>
//                         </div>
//                     </div>)
class StatefulView{
    static states=[];
    public root?:Modal;
    constructor(){

    }
    render(){
        return <div></div>
    }
}
export class Listing<T extends Model> extends StatefulView{
    private items?:Model[];
    private setItems?:Dispatch<SetStateAction<Model[]>>;
    private loading?:boolean;
    private setLoading?:Dispatch<SetStateAction<boolean>>;
    private setError:any;
    private error:string|null = null;
    public model;
    // public model = T;
    constructor(model : ModelClass<T>){
        super();
        this.model = model;
        
    }
    setRoot(root:Modal){
        this.setError = root.setError
        this.error = root.error
        this.root = root;
    }
    isReady(){
        if(this.error ==null || this.setError == null||this.root == null){
            return false
        }
        return true
    }
    useListing(){
        [this.loading, this.setLoading] = useState<boolean>(true); // State to track loading
        [this.items, this.setItems] = useState<Model[]>([]); // State to store the fetched items
        // ✅ Only fetch when selectedCard is set and has a listModel
        useEffect(() => {
            // Don't do anything if no card is selected yet
            const fetchItems = async () => {
                try {
                    if (this.setLoading && this.setItems) {
                        this.setLoading(true);
                        this.setError(null); // Clear any previous errors
                        const model = this.model.getTableWrapper();
                        if(model){
                            const fetchedItems = await model.getAll()
                            
                            this.setItems(fetchedItems);
                        }else{
                        console.error("Failed to fetch items.");
                        this.setError('Failed to fetch items.');
                    }
                    }
                    
                    
                } catch (err) {
                    console.error(err);
                    this.setError('Failed to fetch items.');
                } finally {
                    if(this.setLoading)
                    this.setLoading(false);
                }
            };
    
            fetchItems();
        }, [this.model]);
    }
}
export class Modal {
    private nav:React.JSX.Element;
    private closeModal;
    private getCardsListing
    private initModal;
    private card:Card;
    private isModalOpen;
    private router;
    private setIsModalOpen;
    private selectedCard;
    private setSelectedCard;

    public error;
    public setError;
    private history;
    private listing;
    // private selectedModal:string
    constructor(card:Card){
        [this.isModalOpen, this.setIsModalOpen] = useState<boolean>(false);
        this.router = useRouter();
        // [this.selectedModal, this.setSelectedModal] = useState('');
        if(card.listing){
            this.listing = card.listing
            this.listing.setRoot(this)
        }
        // const [modalType, setModalType] = useState(1); // 1: Default, 2: Custom
        [this.selectedCard, this.setSelectedCard] = useState<Card|null>(null);
        [this.error, this.setError] = useState<string | null>(null); // State to track errors
        this.history = useRef<Card[]>([]); // Use a ref to persist history
        const [selectedItem,setSelectedItem] = useState<Model|null>(null)
        // ✅ Only fetch when selectedCard is set and has a listModel
        useEffect(() => {
            // Don't do anything if no card is selected yet
            if (this.selectedCard == null) {
                return;
            }
    
            // If card is selected but has no listModel, show error
            if (this.selectedCard.listModel == null) {
                this.setLoading(false);
                this.setError('No model available for this card.');
                return;
            }
    
            const fetchItems = async () => {
                try {
                    this.setLoading(true);
                    this.setError(null); // Clear any previous errors
                    
                    const model = this.selectedCard?.listModel;
                    if(model){
                        const fetchedItems = await model.getAll()
                        
                        this.setItems(fetchedItems);
                    }else{
                    console.error("Failed to fetch items.");
                    this.setError('Failed to fetch items.');
                    }
                    
                } catch (err) {
                    console.error(err);
                    this.setError('Failed to fetch items.');
                } finally {
                    this.setLoading(false);
                }
            };
    
            fetchItems();
        }, [this.selectedCard]);

        this.nav = (<div className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded-t-lg border-b border-gray-200">
                        <h2 className="font-semibold text-lg">{selectedCard?.title}</h2>
                        <div className="flex justify-end items-center gap-2 bg-gray-100 px-4 py-2 rounded-t-lg border-b border-gray-200">
                        <button
                            onClick={modalGoBack}
                            className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
                        >
                            ←
                        </button>
                        <button
                            onClick={closeModal}
                            className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200"
                        >
                            ✕
                        </button>
                        </div>
                    </div>)
        this.card = card
        this.closeModal = closeModal
        this.getCardsListing = getCardsListing
        this.initModal = initModal
    }
    init(){

    }
}