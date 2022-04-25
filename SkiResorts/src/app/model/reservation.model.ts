export class Reservation {
    _id: number;
    mountain_id: number;
    firstName: string;
    lastName: string;
    dateFrom: ReservationDate;
    dateTo: ReservationDate;
    price: number;

    constructor(obj?:any) {
        this._id = obj && obj._id || 0;
        this.mountain_id = obj && obj.mountain_id || 0;
        this.firstName = obj && obj.firstName || "";
        this.lastName = obj && obj.lastName || "";
        this.dateFrom = obj && new ReservationDate(obj.dateFrom) || new ReservationDate();
        this.dateTo = obj && new ReservationDate(obj.dateTo) || new ReservationDate();
        this.price = obj && obj.price || 0;
    }
}
export class ReservationDate {
    day: number;
    month: number;
    year: number;
    
    constructor(obj?:any) {
        this.day = obj && obj.day || 0;
        this.month = obj && obj.month || 0;
        this.year = obj && obj.year || 0;
    }
}