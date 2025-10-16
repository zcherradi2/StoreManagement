import { Model } from './interfaces';


export default class TableWrapper<T extends Model> {
  private table: string;
  private baseUrl: string;
  public modelClass:  new (...args: any[]) => T;
  private parameters: Record<string, any> = {};
  constructor(table: string, modelClass: new (...args: any[]) => T , baseUrl = "http://localhost:8000/api") {
    this.table = table;
    this.baseUrl = baseUrl;
    this.modelClass = modelClass;
  }
  private hydrate(data: any): T {
    return Object.assign(new this.modelClass(), data);
  }
  public withParameters(parameters: Record<string, any>){
    this.parameters = parameters;
    return this
  }
  private async request<R = T | T[]>(
    method: string,
    endpoint: string = "",
    body?: Record<string, any>
  ): Promise<R> {
    console.log(this.parameters)
    // console.log("heleleleoeeelee")
    let requestBody = this.parameters
    ? { ...(body || {}), ...this.parameters }
    : body;
    let url = `${this.baseUrl}/${this.table}${endpoint}`;
    if (method.toUpperCase() === "GET" && requestBody) {
        const params = new URLSearchParams();
        for (const key in requestBody) {
            params.append(key, typeof requestBody[key] === "object" 
                ? JSON.stringify(requestBody[key])
                : String(requestBody[key])
            );
        }
        url += `?${params.toString()}`;
        requestBody = undefined;
    }
    console.log(url)

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      ...(requestBody ? { body: JSON.stringify(requestBody) } : {}),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`HTTP ${res.status}: ${errorText}`);
    }
    if (res.status === 204) {
        return undefined as unknown as R; // Explicitly return `undefined` for void responses
    }
    const json = await res.json();
    return Array.isArray(json.data) ? json.data.map((d: T )=> this.hydrate(d)) as R : this.hydrate(json.data) as unknown as R;
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