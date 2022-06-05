export const GetDate = () => {
    let date = new Date();
    return DateToString(date);
}

export const GetLastDate = () => {
    let date = new Date();
    date.setDate(date.getDate() + 7);
    return DateToString(date);
}

const DateToString = (date) => {
    date = date - (date.getTimezoneOffset() * 60000);
    date = new Date(date);
    date = date.toISOString().substr(0, 19);
    date = date.replace("T", ", Hour: ");
    return "Date: " + date;
}