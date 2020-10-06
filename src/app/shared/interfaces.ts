export class Certificate{
    id?: number;
    name: string;
    description: string;
    price: number;
    dateCreation?: Date;
    duration: string;
    dateModification?: Date;

    constructor(id: number, name: string, description: string, price: number,
                dateCreation: Date, duration: string, dateModification?: Date){
            this.id = id;
            this.name = name;
            this.description = description;
            this.price = price;
            this.dateCreation = dateCreation;
            this.dateModification = dateModification;
            this.duration = duration;
    }
}

export class BikeGoods{
    id?: number;
    name: string;
    price: number;
    goodsType: string;

    constructor(id: number, name: string, price: number, goodsType: string){
            this.id = id;
            this.name = name;
            this.price = price;
            this.goodsType = goodsType;
        }
}

export class User{
    id?: number;
    username: string;
    password?: string;
    roles?: string;

    constructor(id: number, username: string, password: string, roles: string){
            this.id = id;
            this.username = username;
            this.roles = roles;
            this.password = password;
    }
}


export class Order{
    id?: number;
    userId: number;
    orderDate?: Date;
    priceTotal: number;
    certificatesId?: number[];

    constructor(id: number, userId: number, orderDate: Date, priceTotal: number, certificatesId: number[]){
            this.id = id;
            this.userId = userId;
            this.orderDate = orderDate;
            this.priceTotal = priceTotal;
            this.certificatesId = certificatesId;
    }
}
