import { ModalRoot, Model, ModelActionHandler, ModelActionHandlerClass, ModelClass } from "@/shared/interfaces";
import { useEffect, useState } from "react";
type ListingProps<T extends Model> = {
    root: ModalRoot;
    modelClass: ModelClass<T>;                  // T is inferred from this
    actionHandler?: ModelActionHandler<T> | null;
};
export function Listing<T extends Model>(props: ListingProps<T>) {
    let { root, modelClass, actionHandler } = props;
    const [items, setItems] = useState<Array<T>>([]);
    const [loading, setLoading] = root.loading
    const [error,setError] =root.error
    const [selectedCard,setSelectedCard] = root.selectedCard
    const [selectedItem,setSelectedItem] = root.selectedItem
    if(actionHandler==null){
        actionHandler = new ModelActionHandler<T>()
    }

    // const model;
    // public model = T;
    // constructor(model : ModelClass<T>){
    //     super();
    //     this.model = model;
        
    // }
    // setRoot(root:Modal){
    //     this.setError = root.setError
    //     this.error = root.error
    //     this.root = root;
    // }
    const isReady = ()=>{
        if(error ==null || setError == null || root == null || loading == null|| selectedCard==null){
            return false
        }
        return true
    }
    useEffect(() => {
        // Don't do anything if no card is selected yet
        const fetchItems = async () => {
            try {
                if (setLoading != null && setItems != null) {
                    setLoading(true);
                    setError(null); // Clear any previous errors
                    const tableWrapper = modelClass.getTableWrapper();
                    if(tableWrapper){
                        const fetchedItems = await tableWrapper.getAll()
                        
                        setItems(fetchedItems);
                    }else{
                    console.error("Failed to fetch items.");
                    setError('Failed to fetch items.');
                }
                }
                
                
            } catch (err) {
                console.error(err);
                setError('Failed to fetch items.');
            } finally {
                if(setLoading != null)
                setLoading(false);
            }
        };

        fetchItems();
    }, [modelClass]);
    if(selectedCard != null && selectedCard.listing != null){
        if (loading) {
            return (
                <div className="flex items-center justify-center h-full">
                    <p className="text-lg font-semibold text-gray-800 text-center m-60">
                        Loading items...
                    </p>
                </div>
            );
        }

        if (error) {
            return (
                <div className="flex items-center justify-center h-full">
                    <p className="text-lg font-semibold text-red-500 text-center m-60">
                        {error}
                    </p>
                </div>
            );
        }

        if (items.length === 0) {
            return (
                <div className="flex items-center justify-center h-full">
                    <p className="text-lg font-semibold text-gray-800 text-center m-60">
                        No items found.
                    </p>
                </div>
            );
        }

        return (
            <div className=''>
                {/* Action toolbar */}
                <div className="flex items-center justify-start gap-2 mb-4">
                    <button
                    onClick={()=>{}}
                    className="px-8 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-200"
                    >
                    Add
                    </button>
                    <button
                    onClick={() => selectedItem && actionHandler.handleEdit(selectedItem,root)}
                    className="px-8 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
                    >
                    Edit
                    </button>
                    <button
                    onClick={() => selectedItem && actionHandler.handleDelete(selectedItem,root)}
                    className="px-8 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200"
                    >
                    Delete
                    </button>
                    <span className="ml-4 text-gray-700">
                    {selectedItem ? `Selected: ${selectedItem.id}` : ""}
                    </span>
                </div>
                <div className="border border-gray-300 rounded-lg overflow-hidden w-full">
                    {/* Header */}
                    {
                    (()=>{
                        // console.log(items,"ite,s")
                        return items[0].getHeaderView()
                    })()
                    }

                    {/* Data rows */}
                    {items.map((item: T, index) => (
                        <div
                            key={item.id ?? index}
                            onClick={() => {if(selectedItem != item){setSelectedItem(item)}else{setSelectedItem(null)}}}
                            className={`cursor-pointer ${
                            selectedItem?.id === item.id ? "bg-gray-100" : ""
                            }`}
                        >
                            {item.getItemView(root)}
                        </div>
                    ))}
                </div>
            </div>
        );
    } else {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-lg font-semibold text-gray-800 text-center m-60">
                    <p>Custom Modal Content Here</p>
                </div>
            </div>
        );
    }
}
