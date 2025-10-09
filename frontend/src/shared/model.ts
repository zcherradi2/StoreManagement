import { Model } from './interfaces';


export default class tableWrapper<T extends Model> {
  private table: string;
  private baseUrl: string;
  public modelClass:  new (...args: any[]) => T;
  constructor(table: string, modelClass: new (...args: any[]) => T , baseUrl = "http://localhost:8000/api") {
    this.table = table;
    this.baseUrl = baseUrl;
    this.modelClass = modelClass;
  }
  private hydrate(data: any): T {
    return Object.assign(new this.modelClass(), data);
  }
  private async request<R = T | T[]>(
    method: string,
    endpoint: string = "",
    body?: Record<string, any>
  ): Promise<R> {
    
    const res = await fetch(`${this.baseUrl}/${this.table}${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`HTTP ${res.status}: ${errorText}`);
    }
    if (res.status === 204) {
        return undefined as unknown as R; // Explicitly return `undefined` for void responses
    }
    const data = await res.json();
    return Array.isArray(data) ? data.map(d => this.hydrate(d)) as R : this.hydrate(data) as unknown as R;
  }

  async getAll(): Promise<T[]> {
    return this.request<T[]>("GET"); // Explicitly specify the return type as T[]
  }

  async getById(id: number | string): Promise<T> {
    return this.request<T>("GET", `/${id}`); // Explicitly specify the return type as T
  }

  async create(data: Record<string, any>): Promise<T> {
    return this.request<T>("POST", "", data);
  }

  async update(id: number | string, data: Record<string, any>): Promise<T> {
    return this.request<T>("PUT", `/${id}`, data);
  }

  async delete(id: number | string): Promise<void> {
    await this.request<void>("DELETE", `/${id}`);
  }
}

// export class Inventory{
// 		// 'product_id' => 'int',
// 		// 'quantity' => 'float',
// 		// 'purchase_price' => 'float'
//         public id:number;
// 		public date:string;
// 		public product_id:number;
// 		public quantity:number;
// 		public purchase_price:number;
//         constructor(id:number,date:string,product_id:number,quantity:number,purchasePrice:number){
//             this.id = id
//             this.date=date
//             this.product_id = product_id
//             this.quantity = quantity
//             this.purchase_price = purchasePrice
//         }
// }