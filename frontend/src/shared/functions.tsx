'use client';

import { Card, Doc, Inventory, ModalRoot, Model,Store } from './interfaces';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { PageRoot } from './PageRoot';
// import { Listing } from '@/modals/Modal';
// import { NewEntryForm } from '@/views/NewEntry';
// import { NewEntryForm } from './CustomView';


// ✅ Renamed to follow hook naming convention (must start with "use")
export const useRoot = ():PageRoot => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();
    // const [selectedModal, setSelectedModal] = useState('');

    // const [modalType, setModalType] = useState(1); // 1: Default, 2: Custom
    const [selectedCard, setSelectedCard] = useState<Card|null>(null);
    const [items, setItems] = useState<Model[]>([]); // State to store the fetched items
    const [loading, setLoading] = useState<boolean>(true); // State to track loading
    const [error, setError] = useState<string | null>(null); // State to track errors
    const history = useRef<Card[]>([]); // Use a ref to persist history
    const [selectedItem,setSelectedItem] = useState<Model|null>(null)
    const [stores, setStores] = useState<Store[]>([]);
    const [selectedStore, setSelectedStore] = useState<string>('');
    const root:{[key:string] : [any,(el:any)=>void] } = {
        selectedCard:[selectedCard,setSelectedCard],
        loading:[loading,setLoading],
        error:[error,setError],
        history:[history,()=>{}],
        isModalOpen:[isModalOpen, setIsModalOpen],
        selectedItem:[selectedItem,setSelectedItem],
        items:[items, setItems],
        router:[router,()=>{}],
        stores:[stores,setStores],
        selectedStore:[selectedStore, setSelectedStore]
    }
    return PageRoot.fromRootDict(root)
    // ✅ Only fetch when selectedCard is set and has a listModel
    // useEffect(() => {
    //     // Don't do anything if no card is selected yet
    //     if (selectedCard == null) {
    //         return;
    //     }
    //     // If card is selected but has no listModel, show error
    //     if (selectedCard.listing == null) {
    //         setLoading(false);
    //         setError('No model available for this card.');
    //         return;
    //     }

    //     const fetchItems = async () => {
    //         try {
    //             setLoading(true);
    //             setError(null); // Clear any previous errors
    //             const tableWrapper = selectedCard.listing;
    //             if(tableWrapper){
    //                 const fetchedItems = await tableWrapper.getAll()
    //                 console.log(fetchedItems,"fetched")
    //                 setItems(fetchedItems);
    //             }else{
    //             console.error("Failed to fetch items.");
    //             setError('Failed to fetch items.');
    //             }
                
    //         } catch (err) {
    //             console.error(err);
    //             setError('Failed to fetch items.');
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchItems();
    // }, [selectedCard]);
    
    // const closeModal = () => {
    //     setSelectedItem(null)

    //     setIsModalOpen(false);
    //     history.current = [];
    // };
    
    // const handleCardClick = (card:Card) => {
    //     const [route, onclick, modalT] = [card.route, card.onclick, card.modalType];
        
    //     if (onclick === 'modal') {
    //         // const instance: [Card | null, string,number] = [selectedCard, selectedModal,modalType];

    //         if (selectedCard != null) {
    //             history.current.push(selectedCard); // Push to the ref's current value
    //             console.log('History after push:', history.current);
    //         }

    //         // Trim history to keep only the last 2 entries
    //         if (history.current.length > 3) {
    //             history.current = history.current.slice(-3);
    //         }
    //         // setSelectedModal(route);
    //         // setModalType(modalT ? modalT : 1);
    //         setSelectedCard(card);
    //         setIsModalOpen(true);
    //     } else {
    //         router.push(route);
    //     }
    // };
    // const handleAdd = ()=>{
    //     if(selectedCard?.addCard){
    //         handleCardClick(selectedCard?.addCard)
    //     }
    // }
    // const handleDelete = async (item: Model,root:ModalRoot) => {
    //     try {
    //         // Show a loading state (optional)
    //         setLoading(true);
    //         // Perform the delete operation
    //         await item.getWrapperFromInstance().delete(item.id);
    //         // Update the UI by removing the deleted item from the list
    //         setItems((prevItems) => prevItems.filter((i) => i.id !== item.id));
    //         // Optionally clear the selected item if it was deleted
    //         if (selectedItem?.id === item.id) {
    //             setSelectedItem(null);
    //         }
    //         console.log(`Item with ID ${item.id} deleted successfully.`);
    //     } catch (error) {
    //         console.error(`Failed to delete item with ID ${item.id}:`, error);
    //         setError('Failed to delete the item. Please try again.');
    //     } finally {
    //         // Reset the loading state
    //         setLoading(false);
    //     }
    // };
    // const handleEdit = (item:Model)=>{
    //     item
    // }
    // const getCardsListing = (myCards:{ [key: string]: Card }, title:string) => {
    //     return (
    //         <div>
    //             <h2 className="text-xl font-bold mb-4">{title}</h2>
                
    //             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
    //                 {Object.keys(myCards).map((key) => {
    //                     const card = myCards[key];
    //                     return (
    //                         <button
    //                             key={card.title}
    //                             onClick={() => handleCardClick(card)}
    //                             className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden"
    //                         >
    //                             <div
    //                                 className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
    //                             ></div>
    //                             <div className="p-6 flex flex-col items-center space-y-4">
    //                                 <div
    //                                     className={`bg-gradient-to-br ${card.color} p-4 rounded-full text-white group-hover:scale-110 transition-transform duration-300`}
    //                                 >
    //                                     {card.icon}
    //                                 </div>
    //                                 <h3 className="text-lg font-semibold text-gray-800 text-center">
    //                                     {card.title}
    //                                 </h3>
    //                             </div>
    //                             <div
    //                                 className={`h-1 w-0 group-hover:w-full bg-gradient-to-r ${card.color} transition-all duration-300`}
    //                             ></div>
    //                         </button>
    //                     );
    //                 })}
    //             </div>
    //         </div>
    //     );
    // };
    
    // const getModelListing = (card:Card|null) => {
    //     if(card != null && card.listing != null){
    //         if (loading) {
    //             return (
    //                 <div className="flex items-center justify-center h-full">
    //                     <p className="text-lg font-semibold text-gray-800 text-center m-60">
    //                         Loading items...
    //                     </p>
    //                 </div>
    //             );
    //         }

    //         if (error) {
    //             return (
    //                 <div className="flex items-center justify-center h-full">
    //                     <p className="text-lg font-semibold text-red-500 text-center m-60">
    //                         {error}
    //                     </p>
    //                 </div>
    //             );
    //         }

    //         if (items.length === 0) {
    //             return (
    //                 <div className="flex items-center justify-center h-full">
    //                     <p className="text-lg font-semibold text-gray-800 text-center m-60">
    //                         No items found.
    //                     </p>
    //                 </div>
    //             );
    //         }

    //         return (
    //             <div className=''>

    //                 {/* Action toolbar */}
    //                 <div className="flex items-center justify-start gap-2 mb-4">
    //                     <button
    //                     onClick={handleAdd}
    //                     className="px-8 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-200"
    //                     >
    //                     Add
    //                     </button>
    //                     <button
    //                     onClick={() => selectedItem && handleEdit(selectedItem)}
    //                     className="px-8 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
    //                     >
    //                     Edit
    //                     </button>
    //                     <button
    //                     onClick={() => selectedItem && handleDelete(selectedItem,root)}
    //                     className="px-8 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200"
    //                     >
    //                     Delete
    //                     </button>
    //                     <span className="ml-4 text-gray-700">
    //                     {selectedItem ? `Selected: ${selectedItem.id}` : ""}
    //                     </span>
    //                 </div>
    //                 <div className="border border-gray-300 rounded-lg overflow-hidden w-full">
    //                     {/* Header */}
    //                     {
    //                     (()=>{
    //                         // console.log(items,"ite,s")
    //                         return items[0].getHeaderView()
    //                     })()
    //                     }

    //                     {/* Data rows */}
    //                     {items.map((item: Model, index) => (
    //                         <div
    //                             key={item.id ?? index}
    //                             onClick={() => {if(selectedItem != item){setSelectedItem(item)}else{setSelectedItem(null)}}}
    //                             className={`cursor-pointer ${
    //                             selectedItem?.id === item.id ? "bg-gray-100" : ""
    //                             }`}
    //                         >
    //                             {item.getItemView(root)}
    //                         </div>
    //                     ))}
    //                 </div>
    //             </div>
    //         );
    //     } else {
    //         return (
    //             <div className="flex items-center justify-center h-full">
    //                 <div className="text-lg font-semibold text-gray-800 text-center m-60">
    //                     <p>Custom Modal Content Here</p>
    //                 </div>
    //             </div>
    //         );
    //     }
    // };
    
    // const handleModalCards = (selectedModal:string) => {
    //     return !selectedModal || !(selectedModal.slice(1) in ModalCards) ? 
    //         <div className="flex items-center justify-center h-full">
    //             <div className="text-lg font-semibold text-gray-800 text-center m-60">
    //                 <p>No Options Yet</p>
    //             </div>
    //         </div> : 
    //         (() => {
    //             const [title, myCards] = ModalCards[selectedModal.slice(1)];
    //             return getCardsListing(myCards, title);
    //         })();
    // };
    // const modalGoBack = () => {
    //     console.log('History before pop:', history.current);

    //     const previousCard:Card|undefined = history.current.pop()
    //     setSelectedItem(null)

    //     if (previousCard == null || previousCard == undefined) {
    //         closeModal();
    //     } else {
    //         // history.current.pop(); // Remove the last entry
    //         setSelectedCard(previousCard);
    //         // setSelectedModal(previousCard.route);
    //         // setModalType(previousCard.modalType??1)
    //     }
    // };
    // const initModal = (modalRoot:{[key:string] : [any,(el:any)=>void]}) => {
    //     const contextRoot = {...modalRoot,...root};
    //     // console.log("initiating modal")
    //     return (
    //         <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center">
    //             <div className={`bg-white rounded-lg shadow-lg w-7/12 h-150 border-2 border-gray-200`}>
    //                 {/* Modal Header / Nav Bar */}
    //                 <div className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded-t-lg border-b border-gray-200 w-full">
    //                     <h2 className="font-semibold text-lg">{selectedCard?.title}</h2>
    //                     <div className="flex justify-end items-center gap-2 bg-gray-100 px-4 py-2 rounded-t-lg border-b border-gray-200">
    //                     <button
    //                         onClick={modalGoBack}
    //                         className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
    //                     >
    //                         ←
    //                     </button>
    //                     <button
    //                         onClick={closeModal}
    //                         className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200"
    //                     >
    //                         ✕
    //                     </button>
    //                     </div>
    //                 </div>
    //                 {/* {selectedCard?.modalType === 3 && <NewEntryForm root={root} />} */}
    //                 <div className='w-full min-h-150 p-6 bg-white rounded-lg'>
    //                     {
    //                     (() => {
    //                         const modalType = selectedCard?.modalType ? selectedCard.modalType : 1
    //                         switch (modalType) {
    //                             case 1:
    //                                 return handleModalCards(selectedCard?.route ? selectedCard.route : '');
    //                             case 2:
    //                                 // return getModelListing(selectedCard);
    //                                 return selectedCard?.listing ?(
    //                                     <Listing
    //                                         root={root}
    //                                         modelClass={selectedCard?.listing}
    //                                     />
    //                                 ) : (<div></div>)
    //                             case 3:
    //                                 return (()=>{
    //                                     if(selectedCard?.view){
    //                                         return selectedCard.view(contextRoot)
    //                                     }
    //                                     return <div></div>
    //                                 })()
    //                             default:
    //                                 return (
    //                                     <div className="flex items-center justify-center h-full">
    //                                         <p className="text-lg font-semibold text-gray-800 text-center m-60">
    //                                             Modal type 2 Content
    //                                         </p>
    //                                     </div>
    //                                 );
    //                         }
    //                     })()
    //                     }
    //                 </div>
                    
    //             </div>
    //         </div>
    //     );
    // };
    
    // return { 
    //     isModalOpen, 
    //     setIsModalOpen, 
    //     // selectedModal, 
    //     // setSelectedModal, 
    //     closeModal, 
    //     handleCardClick, 
    //     getCardsListing, 
    //     handleModalCards, 
    //     initModal,
    //     // setModalType,
    //     modalGoBack,
    //     selectedCard
    // };
}