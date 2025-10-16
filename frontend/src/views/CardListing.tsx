import { Card, ModalRoot, Model, ModelActionHandler, ModelActionHandlerClass, ModelClass } from "@/shared/interfaces";
import { PageRoot } from "@/shared/PageRoot";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
type CardListingProps<T extends Model> = {
    root: PageRoot;
    CardDict:{ [key: string]: Card};
    title:string
};
export function CardListing<T extends Model>(props: CardListingProps<T>) {
        let { root,CardDict,title } = props;
        const [selectedCard,setSelectedCard] = [root.selectedCard,root.setSelectedCard]
        const history = root.history
        const [isModalOpen, setIsModalOpen] = [root.isModalOpen, root.setIsModalOpen]
        const router = root.router;
        const handleCardClick = (card:Card) => {
            const [route, onclick, modalT] = [card.route, card.onclick, card.modalType];
            
            if (onclick === 'modal') {
                // const instance: [Card | null, string,number] = [selectedCard, selectedModal,modalType];

                if (selectedCard != null) {
                    history.current.push(selectedCard); // Push to the ref's current value
                    console.log('History after push:', history.current);
                }

                // Trim history to keep only the last 2 entries
                if (history.current.length > 3) {
                    history.current = history.current.slice(-3);
                }
                // setSelectedModal(route);
                // setModalType(modalT ? modalT : 1);
                setSelectedCard(card);
                setIsModalOpen(true);
            } else {
                router.push(route);
            }
        };
        return (
            <div>
                <h2 className="text-xl font-bold mb-4">{title}</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                    {Object.keys(CardDict).map((key) => {
                        const card = CardDict[key];
                        return (
                            <button
                                key={card.title}
                                onClick={() => handleCardClick(card)}
                                className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden"
                            >
                                <div
                                    className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                                ></div>
                                <div className="p-6 flex flex-col items-center space-y-4">
                                    <div
                                        className={`bg-gradient-to-br ${card.color} p-4 rounded-full text-white group-hover:scale-110 transition-transform duration-300`}
                                    >
                                        {card.icon}
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-800 text-center">
                                        {card.title}
                                    </h3>
                                </div>
                                <div
                                    className={`h-1 w-0 group-hover:w-full bg-gradient-to-r ${card.color} transition-all duration-300`}
                                ></div>
                            </button>
                        );
                    })}
                </div>
            </div>
        );
}