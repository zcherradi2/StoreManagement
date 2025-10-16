import React, { Dispatch, SetStateAction } from "react";
import TableWrapper from "./model";
import { PageRoot } from "./PageRoot";

export type View = (root: PageRoot) => React.JSX.Element;
export interface Store {
  id: number;
  name: string;
  address: string;
}
export interface Card {
  title: string;
  route: string;
  icon: React.ReactNode;
  color: string;
  onclick?: string;
  modalType?: number; // 1: Default, 2: Custom
  model?:ModelClass<Model>;
  addCard?:Card
  view?:View
}
export type ModalRoot = {[key:string] : [
    any,
    (el:any)=>void
  ]}

export abstract class Model{
    abstract id : number;
    // abstract getItemView(root:ModalRoot):React.JSX.Element;
    // abstract getHeaderView():React.JSX.Element;
    public static tableWrapper:TableWrapper<Model>|null = null;
    public static listingDic: {
        [key: string]: [string, (item: any) => string]
    }
      // This is required by your Listing wrapper
    static getTableWrapper<T extends Model>(): any {
        throw new Error("Must be implemented by subclass");
    }
    static fromJSON(o: any){
    }
    getWrapperFromInstance() {
        const ctor = this.constructor as typeof Inventory;
        return ctor.getTableWrapper();
    }
    getHeaderView(): React.JSX.Element {
        return (
            <div className="flex bg-gray-100 font-bold py-2">
                {Object.keys(Doc.listingDic).map((attrName) => {
                    const [ w, f ] = Doc.listingDic[attrName];
                    return (
                        <div key={attrName} className={`w-${w} text-center`}>
                            {attrName}
                        </div>
                    );
                })}
            </div>
        );
    }
    getItemView(this: Model,root:PageRoot): React.JSX.Element {
        return (
            <div className="flex border-b border-gray-200 py-2">
                {Object.keys((this.constructor as typeof Model).listingDic).map((attrName) => {
                    const [ w, f ] = (this.constructor as typeof Model).listingDic[attrName];
                    return (
                        <div key={attrName} className={`w-${w} text-center`}>
                            {f(this)}
                        </div>
                    );
                })}
            </div>
        );
    }
    getModelName() {
        // `this.constructor` refers to the derived class
        return (this.constructor as typeof Model).listingDic;
    }
    // abstract delete():void;
    // abstract create():void;

}
export type ModelClass<T extends Model> = {
  new (...args: any[]): T; // constructor
  getTableWrapper(): TableWrapper<T>;   // static method
};
export type ModelActionHandlerClass<T extends Model> = {
    new (handleDelete:modelAction<T>,handleAdd:modelAction<T>,handleEdit:modelAction<T>): any; // constructor
    handleDelete?:modelAction<T>
    handleAdd?:modelAction<T>
    handleEdit?:modelAction<T>


}
export type modelAction<T extends Model>= {(item:T,root:PageRoot):Promise<void>|void}
// export type modelActionsHandler<T extends>
export class ModelActionHandler<T extends Model>{
    public handleDelete:modelAction<T> = async (item:T,root:PageRoot)=>{
        const [loading, setLoading] = root.dict.loading
        const [items, setItems] = root.dict.items
        const [selectedItem, setSelectedItem] = root.dict.selectedItem
        const [error, setError] = root.dict.error
        try {
            // Show a loading state (optional)


            setLoading(true);
            // Perform the delete operation
            await item.getWrapperFromInstance().delete(item.id);
            // Update the UI by removing the deleted item from the list
            setItems((prevItems:typeof items) => prevItems.filter((i:T) => i.id !== item.id));
            // Optionally clear the selected item if it was deleted
            if (selectedItem?.id === item.id) {
                setSelectedItem(null);
            }
            console.log(`Item with ID ${item.id} deleted successfully.`);
        } catch (error) {
            console.error(`Failed to delete item with ID ${item.id}:`, error);
            setError('Failed to delete the item. Please try again.');
        } finally {
            // Reset the loading state
            setLoading(false);
        }
    };
    handleAdd:modelAction<T>= (item:T,root:PageRoot)=>{
        if(root.selectedCard?.addCard){
            root.getter("handleCardClick")(root.selectedCard?.addCard)
        }
    }
    handleEdit:modelAction<T>= (item:T,root:PageRoot)=>{
        
    }
    doNothing:modelAction<T> = (item:T,root:PageRoot)=>{}
    constructor(
        handleDelete?: modelAction<T>,
        handleAdd?: modelAction<T>,
        handleEdit?: modelAction<T>
    ) {
        this.handleAdd = handleAdd ?? this.handleAdd ?? this.doNothing;
        this.handleDelete = handleDelete ??  this.handleDelete ?? this.doNothing;
        this.handleEdit = handleEdit ?? this.handleEdit ?? this.doNothing;
    }

}
export class Inventory extends Model{
		// 'product_id' => 'int',
		// 'quantity' => 'float',
		// 'purchase_price' => 'float'
        public static tableWrapper:TableWrapper<Inventory> = new TableWrapper<Inventory>("inventory",Inventory);
        public id:number;
		public date:string;
		public product_id:number;
		public quantity:number;
		public purchase_price:number;
        constructor(id:number,date:string,product_id:number,quantity:number,purchasePrice:number){
            super()
            this.id = id
            this.date=date
            this.product_id = product_id
            this.quantity = quantity
            this.purchase_price = purchasePrice
        }
        getItemView(root:PageRoot): React.JSX.Element {
            return (
                <div className="flex border-b border-gray-200 py-2">
                    <div className="w-1/6 text-center">{this.id}</div>
                    <div className="w-1/6 text-center">{this.date}</div>
                    <div className="w-1/6 text-center">{this.product_id ?? "-"}</div>
                    <div className="w-1/6 text-center">{this.quantity}</div>
                    <div className="w-1/6 text-center">{this.purchase_price}</div>
                </div>
            );
        }
       override getHeaderView(): React.JSX.Element {
            return (<div className="flex bg-gray-100 font-bold py-2">
                        <div className="w-1/6 text-center">ID</div>
                        <div className="w-1/6 text-center">Date</div>
                        <div className="w-1/6 text-center">Product</div>
                        <div className="w-1/6 text-center">Quantity</div>
                        <div className="w-1/6 text-center">Price</div>
                    </div>)
        }
        static fromJSON(o: any):Inventory {
            return new Inventory(o.id, o.date, o.product_id, o.quantity, o.purchase_price);
        }
        static override getTableWrapper():TableWrapper<Inventory>{
            return Inventory.tableWrapper
        }
        
}

// export class InventoryRow extends Model{
//     public static tableWrapper:tableWrapper<Inventory> = new tableWrapper<InventoryRow>("inventoryRow",InventoryRow);
//         public id:number;
// 		public date:string;
// 		public product_id:number;
// 		public quantity:number;
// 		public purchase_price:number;

// }


export class Doc extends Model {

    public static tableWrapper: TableWrapper<Doc> = new TableWrapper<Doc>(
        "documents",
        Doc
    );
    public static listingDic: {
        [key: string]: [string, (item: Doc) => string]
    } = {
        Date: [
            "1/12",
            (item: Doc) => item.date ?? "-"
        ],
        Number: [
            "1/12",
            (item: Doc) => item.number ?? "-"
        ],
        Label: [
            "4/12",
            (item: Doc) => item.description ?? ""
        ],
        User: [
            "1/12",
            (item: Doc) => item.username ?? "-"
        ]
    };
    public id: number;
    public type?: string | null;
    public number?: string | null;
    public date?: string | null;
    public time?: string | null;
    public third_party_id?: number | null;
    public origin_store_id?: number | null;
    public destination_store_id?: number | null;
    public user_id?: number | null;
    public total_ht?: number | null;
    public total_vat?: number | null;
    public total_ttc?: number | null;
    public discount?: number | null;
    public net_total?: number | null;
    public paid?: number | null;
    public balance?: number | null;
    public status: number;
    public closure_id?: number | null;
    public description?: string | null;
    public invoice_id: number;
    public username:string;

    constructor(
        id: number,
        type: string | null,
        number: string | null,
        date: string | null,
        time: string | null,
        third_party_id: number | null,
        origin_store_id: number | null,
        destination_store_id: number | null,
        user_id: number | null,
        total_ht: number | null,
        total_vat: number | null,
        total_ttc: number | null,
        discount: number | null,
        net_total: number | null,
        paid: number | null,
        balance: number | null,
        status: number,
        closure_id: number | null,
        description: string | null,
        invoice_id: number,
        username:string
    ) {
        super();
        this.id = id;
        this.type = type;
        this.number = number;
        this.date = date;
        this.time = time;
        this.third_party_id = third_party_id;
        this.origin_store_id = origin_store_id;
        this.destination_store_id = destination_store_id;
        this.user_id = user_id;
        this.total_ht = total_ht;
        this.total_vat = total_vat;
        this.total_ttc = total_ttc;
        this.discount = discount;
        this.net_total = net_total;
        this.paid = paid;
        this.balance = balance;
        this.status = status;
        this.closure_id = closure_id;
        this.description = description;
        this.invoice_id = invoice_id;
        this.username = username;
    }

    static fromJSON(o: any): Doc {
        return new Doc(
            o.id,
            o.type,
            o.number,
            o.date,
            o.time,
            o.third_party_id,
            o.origin_store_id,
            o.destination_store_id,
            o.user_id,
            o.total_ht,
            o.total_vat,
            o.total_ttc,
            o.discount,
            o.net_total,
            o.paid,
            o.balance,
            o.status,
            o.closure_id,
            o.description,
            o.invoice_id,
            o.username
        );
    }

    static override getTableWrapper(): TableWrapper<Doc> {
        return Doc.tableWrapper;
    }


        // return (
        //     <div className="flex bg-gray-100 font-bold py-2">
        //         {/* <div className="w-1/12 text-center">ID</div> */}
        //         {/* <div className="w-1/12 text-center">Type</div> */}
        //         <div className="w-1/12 text-center">Date</div>
        //         <div className="w-1/12 text-center">Number</div>

        //         {/* <div className="w-1/12 text-center">Total TTC</div>
        //         <div className="w-1/12 text-center">Paid</div> */}
        //         {/* <div className="w-1/12 text-center">Balance</div> */}
        //         {/* <div className="w-1/12 text-center">Status</div> */}
        //         <div className="w-4/12 text-center">Label</div>

        //     </div>
        // );
    



        // return (
        //     <div className="flex border-b border-gray-200 py-2">
        //         {/* <div className="w-1/12 text-center">{this.id}</div> */}
        //         {/* <div className="w-1/12 text-center">{this.type ?? "-"}</div> */}
        //         <div className="w-1/12 text-center">{this.date ?? "-"}</div>
        //         <div className="w-1/12 text-center">{this.number ?? "-"}</div>

        //         {/* <div className="w-1/12 text-center">{this.total_ttc ?? "-"}</div> */}
        //         {/* <div className="w-1/12 text-center">{this.paid ?? "-"}</div> */}
        //         {/* <div className="w-1/12 text-center">{this.balance ?? "-"}</div> */}
        //         {/* <div className="w-1/12 text-center">{this.status}</div> */}
        //         <div className="w-4/12 text-center">{this.description ?? ''}</div>
        //         <div>{this.user_id??"0"}</div>
        //     </div>
        // );
}

