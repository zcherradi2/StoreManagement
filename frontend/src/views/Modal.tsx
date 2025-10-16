import { Card, ModalRoot, Model, ModelActionHandler, ModelActionHandlerClass, ModelClass } from "@/shared/interfaces";
import { useEffect, useState } from "react";
import { CardListing } from "./CardListing";
import { ModalCards } from "@/shared/constants";
import { Listing } from "./Listing";
type ModalProps<T extends Model> = {
    root: ModalRoot;
};
export function Modal<T extends Model>(props: ModalProps<T>) {
    let { root } = props;
    const [selectedCard,setSelectedCard] = root.selectedCard
    const [selectedItem,setSelectedItem] = root.selectedItem
    const [isModalOpen, setIsModalOpen] = root.isModalOpen
    const [history,setHistory] = root.history

    const closeModal = () => {
        setSelectedItem(null)

        setIsModalOpen(false);
        history.current = [];
    };
    const modalGoBack = () => {
        console.log('History before pop:', history.current);

        const previousCard:Card|undefined = history.current.pop()
        setSelectedItem(null)

        if (previousCard == null || previousCard == undefined) {
            closeModal();
        } else {
            // history.current.pop(); // Remove the last entry
            setSelectedCard(previousCard);
            // setSelectedModal(previousCard.route);
            // setModalType(previousCard.modalType??1)
        }
    };
    const getCardsAndTitle = ():[string,{[key: string]: Card}|null]=>{
        const selectedModal = selectedCard?.route
        if(!selectedModal || !(selectedModal.slice(1) in ModalCards)){
            return ['',null]
        }else{
            const [title, myCards] = ModalCards[selectedModal.slice(1)];
            return [title, myCards]
        }
    }
    return (
                <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center">
                    <div className={`bg-white rounded-lg shadow-lg w-7/12 h-150 border-2 border-gray-200`}>
                        {/* Modal Header / Nav Bar */}
                        <div className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded-t-lg border-b border-gray-200 w-full">
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
                        </div>
                        {/* {selectedCard?.modalType === 3 && <NewEntryForm root={root} />} */}
                        <div className='w-full min-h-150 p-6 bg-white rounded-lg'>
                            {(() => {
                                const modalType = selectedCard?.modalType ? selectedCard.modalType : 1
                                switch (modalType) {
                                    case 1:
                                        const [title, myCards] = getCardsAndTitle();
                                        
                                        return myCards == null ? 
                                            <div className="flex items-center justify-center h-full">
                                                <div className="text-lg font-semibold text-gray-800 text-center m-60">
                                                    <p>No Options Yet</p>
                                                </div>
                                            </div>
                                            :
                                            <CardListing
                                                root={root}
                                                CardDict={myCards}
                                                title={title}
                                            />
                                    case 2:
                                        // return getModelListing(selectedCard);
                                        return selectedCard?.listing ?(
                                            <Listing
                                                root={root}
                                                modelClass={selectedCard?.listing}
                                            />
                                        ) : (<div></div>)
                                    case 3:
                                        return (()=>{
                                            if(selectedCard?.view){
                                                return selectedCard.view(root)
                                            }
                                            return <div></div>
                                        })()
                                    default:
                                        return (
                                            <div className="flex items-center justify-center h-full">
                                                <p className="text-lg font-semibold text-gray-800 text-center m-60">
                                                    Modal type 2 Content
                                                </p>
                                            </div>
                                        );
                                }
                            })()}
                        </div>
                        
                    </div>
                </div>
            );
};
