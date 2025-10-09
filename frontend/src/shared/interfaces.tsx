import tableWrapper from "./model"
import React from "react";

export interface Card {
  title: string;
  route: string;
  icon: React.ReactNode;
  color: string;
  onclick?: string;
  modalType?: number; // 1: Default, 2: Custom
  listModel?:tableWrapper<Model>;
}

export abstract class Model{
    abstract id : number;
    abstract getItemView():React.JSX.Element;
    abstract getHeaderView():React.JSX.Element;
    public static tableWrapper:tableWrapper<Model>|null = null;
    abstract getTableWrapper():tableWrapper<Model>
    static fromJSON(o: any){
    }
    // abstract delete():void;
    // abstract create():void;

}
export class Inventory extends Model{
		// 'product_id' => 'int',
		// 'quantity' => 'float',
		// 'purchase_price' => 'float'
        public static tableWrapper:tableWrapper<Inventory> = new tableWrapper<Inventory>("inventory",Inventory);
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
        getItemView(): React.JSX.Element {
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
        getHeaderView(): React.JSX.Element {
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
        public getTableWrapper():tableWrapper<Inventory>{
            return Inventory.tableWrapper
        }
        // interface Inventory2{
        //     id:number;
        //     date:string;
        //     product_id:number;
        //     quantity:number;
        //     purchase_price:number;
        // }
}