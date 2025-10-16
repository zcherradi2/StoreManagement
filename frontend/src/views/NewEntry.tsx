import { ModalRoot } from "@/shared/interfaces";
import { PageRoot } from "@/shared/PageRoot";
import { useState } from "react";

export const NewEntryForm = ({ root }: { root: PageRoot }) => {
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [number, setNumber] = useState('');
    const [label, setLabel] = useState('');
    const [selectedMagasin, setSelectedMagasin] = useState('');
    
    // Line items state
    const [items, setItems] = useState<Array<{reference: string, name: string, size: string,quantity:number,buyPrice:number,soldPrice:number}>>([]);
    const [currentReference, setCurrentReference] = useState('');
    const [currentName, setCurrentName] = useState('');
    const [currentSize, setCurrentSize] = useState('');
    const [currentQuantity, setCurrentQuantity] = useState(1);
    const [currentsoldPrice, setCurrentsoldPrice] = useState(0);
    const [currentbuyPrice, setCurrentbuyPrice] = useState(0);


    const addItem = () => {
        if (currentReference || currentName || currentSize ||currentQuantity||currentsoldPrice ||currentbuyPrice) {
            setItems([...items, {
                reference: currentReference,
                name: currentName,
                size: currentSize,
                quantity:currentQuantity
                ,buyPrice:currentbuyPrice,
                soldPrice:currentsoldPrice
            }]);
            // Clear inputs
            setCurrentReference('');
            setCurrentName('');
            setCurrentSize('');
        }
    };

    const removeItem = (index: number) => {
        setItems(items.filter((_, i) => i !== index));
    };

    const handleAddDoc = async () => {
        const docData = {
            date,
            number,
            label,
            magasin: selectedMagasin,
            items
        };
        
        // Call your addDoc function here
        console.log('Adding document:', docData);
        // await addDoc(docData);
    };

    return (
        <div className="">
            <div className="max-w-6xl mx-auto bg-white rounded-lg  p-6">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Bon Mouvement de stock</h2>
                
                {/* Form Fields */}
                <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Date
                        </label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Numéro de Bon
                        </label>
                        <input
                            type="text"
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Libellé
                        </label>
                        <input
                            type="text"
                            value={label}
                            onChange={(e) => setLabel(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Magasin
                        </label>
                        <select
                            value={selectedMagasin}
                            onChange={(e) => setSelectedMagasin(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Sélectionner un magasin</option>
                            {root.getter("stores").map((store:any) => (
                                <option key={store.id} value={store.id}>
                                {store.name} - {store.address}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Items Table */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3 text-gray-800">Articles</h3>
                    <div className="overflow-x-auto border border-gray-300 rounded-md">
                        <table className="w-full">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">reference</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Name</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">size</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">quantity</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">buy price</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">sale price</th>

                                    <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item, index) => (
                                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                        <td className="px-4 py-2 text-sm text-gray-700">{item.reference}</td>
                                        <td className="px-4 py-2 text-sm text-gray-700">{item.name}</td>
                                        <td className="px-4 py-2 text-sm text-gray-700">{item.size}</td>
                                        <td className="px-4 py-2 text-sm text-gray-700">{item.quantity}</td>
                                        <td className="px-4 py-2 text-sm text-gray-700">{item.buyPrice}</td>
                                        <td className="px-4 py-2 text-sm text-gray-700">{item.soldPrice}</td>

                                        <td className="px-4 py-2 text-center">
                                            <button
                                                onClick={() => removeItem(index)}
                                                className="text-red-600 hover:text-red-800 font-medium"
                                            >
                                                ✕
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                
                                {/* Input Row */}
                                <tr className="bg-blue-50">
                                    <td className="px-2 py-2">
                                        <input
                                            type="text"
                                            value={currentReference}
                                            onChange={(e) => setCurrentReference(e.target.value)}
                                            placeholder="Référence"
                                            className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        />
                                    </td>
                                    <td className="px-2 py-2">
                                        <input
                                            type="text"
                                            value={currentName}
                                            onChange={(e) => setCurrentName(e.target.value)}
                                            placeholder="Désignation"
                                            className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        />
                                    </td>
                                    <td className="px-2 py-2">
                                        <input
                                            type="text"
                                            value={currentSize}
                                            onChange={(e) => setCurrentSize(e.target.value)}
                                            placeholder="Taille"
                                            className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        />
                                    </td>
                                    <td className="px-2 py-2">
                                        <input
                                            type="text"
                                            value={currentQuantity}
                                            onChange={(e) => setCurrentQuantity(parseInt(e.target.value))}
                                            placeholder="quantity"
                                            className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        />
                                    </td>
                                    <td className="px-2 py-2">
                                        <input
                                            type="text"
                                            value={currentbuyPrice}
                                            onChange={(e) => setCurrentbuyPrice(parseFloat(e.target.value))}
                                            placeholder="buy price"
                                            className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        />
                                    </td>
                                    <td className="px-2 py-2">
                                        <input
                                            type="text"
                                            value={currentsoldPrice}
                                            onChange={(e) => setCurrentsoldPrice(parseFloat(e.target.value))}
                                            placeholder="sale price"
                                            className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        />
                                    </td>
                                    <td className="px-2 py-2 text-center">
                                        <button
                                            onClick={addItem}
                                            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm font-medium"
                                        >
                                            +
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                        Nombre d'Articles: {items.length}
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 justify-end">
                    <button
                        onClick={handleAddDoc}
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium transition-colors"
                    >
                        OK
                    </button>
                    <button
                        onClick={() => {/* Handle cancel */}}
                        className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 font-medium transition-colors"
                    >
                        Annuler
                    </button>
                </div>
            </div>
        </div>
    );
};