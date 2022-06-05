import PRODUCTS from "../Import/ImportProducts"
import { GetDate, GetLastDate } from "../GetDate/GetDate";

let ORDERS = [
    {
        orderID: 1,
        userID: 1,
        productsID: [1, 20, 3],
        date: GetDate(),
        lastDateToSupply: GetLastDate()
    },
    {
        orderID: 2,
        userID: 2,
        productsID: [1, 2],
        date: GetDate(),
        lastDateToSupply: GetLastDate()
    },
    {
        orderID: 3,
        userID: 3,
        productsID: [1, 2, 3],
        date: GetDate(),
        lastDateToSupply: GetLastDate()
    },
    {
        orderID: 4,
        userID: 4,
        productsID: [1, 2, 5, 7, 2],
        date: GetDate(),
        lastDateToSupply: GetLastDate(),
    },
    {
        orderID: 5,
        userID: 2,
        productsID: [1, 2, 3],
        date: GetDate(),
        lastDateToSupply: GetLastDate(),
    },
    {
        orderID: 6,
        userID: 4,
        productsID: [2, 3],
        date: GetDate(),
        lastDateToSupply: GetLastDate(),
    },
    {
        orderID: 7,
        userID: 3,
        productsID: [1, 2, 3, 10],
        date: GetDate(),
        lastDateToSupply: GetLastDate(),
    },
    {
        orderID: 8,
        userID: 1,
        productsID: [16, 3],
        date: GetDate(),
        lastDateToSupply: GetLastDate(),
    },
    {
        orderID: 9,
        userID: 4,
        productsID: [15, 3],
        date: GetDate(),
        lastDateToSupply: GetLastDate(),
    }
];

const CalcTottalPrices = () => {
    const Products = PRODUCTS;
    for (let i = 0; i < ORDERS.length; i++) {
        var tottalPrice = 0;
        for (let j = 0; j < ORDERS[i].productsID.length; j++)
            tottalPrice += Products.find(product => product.id === ORDERS[i].productsID[j]).price;
        ORDERS[i].tottalPrice = tottalPrice;
    }
}
CalcTottalPrices();

export default ORDERS;