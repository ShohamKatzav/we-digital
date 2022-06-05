
let PRODUCTS = [
    {
        id: 1,
        img: require('../Images/Laptops/Asus ROG Strix SCAR 15.jpg'),
        url: "Asus-ROG-Strix-SCAR-15",
        name: "Asus ROG Strix SCAR 15",
        category: "Laptops",
        manufacturer: "Asus",
        price: 18500
    },
    {
        id: 2,
        img: require('../Images/Laptops/Asus ROG Zephyrus M16.jpg'),
        url: "Asus-ROG-Zephyrus-M16",
        name: "Asus ROG Zephyrus M16",
        category: "Laptops",
        manufacturer: "Asus",
        price: 17500
    },
    {
        id: 3,
        img: require('../Images/Laptops/Dell XPS 15.webp'),
        url: "Dell-XPS-15",
        name: "Dell XPS 15",
        category: "Laptops",
        manufacturer: "Dell",
        price: 12000
    },
    {
        id: 4,
        img: require('../Images/Laptops/Dell XPS 17.webp'),
        url: "Dell-XPS-17",
        name: "Dell XPS 17",
        category: "Laptops",
        manufacturer: "Dell",
        price: 13000
    },
    {
        id: 5,
        img: require('../Images/Laptops/MSI Creator Z16P.webp'),
        url: "MSI-Creator-Z16P",
        name: "MSI Creator Z16P",
        category: "Laptops",
        manufacturer: "MSI",
        price: 19300
    },
    {
        id: 6,
        img: require('../Images/Laptops/MSI GS77 Stealth.jpg'),
        url: "MSI-GS77-Stealth",
        name: "MSI GS77 Stealth",
        category: "Laptops",
        manufacturer: "MSI",
        price: 18000
    },
    {
        id: 7,
        img: require('../Images/Displays/Asus ROG Swift PG32UQX.jpg'),
        url: "Asus-ROG-Swift-PG32UQX",
        name: "Asus ROG Swift PG32UQX",
        category: "Displays",
        manufacturer: "Asus",
        price: 16350
    },
    {
        id: 8,
        img: require('../Images/Displays/ASUS ROG Strix XG43UQ.jpg'),
        url: "ASUS-ROG-Strix-XG43UQ",
        name: "ASUS ROG Strix XG43UQ",
        category: "Displays",
        manufacturer: "Asus",
        price: 7250
    },
    {
        id: 9,
        img: require('../Images/Displays/Dell UP2720Q.jpg'),
        url: "Dell-UP2720Q",
        name: "Dell UP2720Q",
        category: "Displays",
        manufacturer: "Dell",
        price: 5980
    },
    {
        id: 10,
        img: require('../Images/Displays/Dell U3223QE.jpg'),
        url: "Dell-U3223QE",
        name: "Dell U3223QE",
        category: "Displays",
        manufacturer: "Dell",
        price: 3320
    },
    {
        id: 11,
        img: require('../Images/Displays/LG 49WL95C.jpg'),
        url: "LG-49WL95C",
        name: "LG 49WL95C",
        category: "Displays",
        manufacturer: "LG",
        price: 7190
    },
    {
        id: 12,
        img: require('../Images/Displays/LG 27MD5KL.jpg'),
        url: "LG-27MD5KL",
        name: "LG 27MD5KL",
        category: "Displays",
        manufacturer: "LG",
        price: 5450
    },
    {
        id: 13,
        img: require('../Images/Desktops/Asus ProArt Station PD5.jpg'),
        url: "Asus-ProArt-Station-PD5",
        name: "Asus ProArt Station PD5",
        category: "Desktops",
        manufacturer: "Asus",
        price: 6850
    },
    {
        id: 14,
        img: require('../Images/Desktops/Asus ROG Strix GT35.jpg'),
        url: "Asus-ROG-Strix-GT35",
        name: "Asus ROG Strix GT35",
        category: "Desktops",
        manufacturer: "Asus",
        price: 10560
    },
    {
        id: 15,
        img: require('../Images/Desktops/Dell Alienware Aurora R13.jpg'),
        url: "Dell-Alienware-Aurora-R13",
        name: "Dell Alienware Aurora R13",
        category: "Desktops",
        manufacturer: "Dell",
        price: 15840
    },
    {
        id: 16,
        img: require('../Images/Desktops/Dell XPS Desktop 8950.jpg'),
        url: "Dell-XPS-Desktop-8950",
        name: "Dell XPS Desktop 8950",
        category: "Desktops",
        manufacturer: "Dell",
        price: 8630
    },
    {
        id: 17,
        img: require('../Images/Desktops/Lenovo IdeaCentre Gaming 5.jpg'),
        url: "Lenovo-IdeaCentre-Gaming-5",
        name: "Lenovo IdeaCentre Gaming 5",
        category: "Desktops",
        manufacturer: "Lenovo",
        price: 3150
    },
    {
        id: 18,
        img: require('../Images/Desktops/Lenovo Legion T7.jpg'),
        url: "Lenovo-Legion-T7",
        name: "Lenovo Legion T7",
        category: "Desktops",
        manufacturer: "Lenovo",
        price: 8300
    },
    {
        id: 19,
        img: require('../Images/Mice/Asus P513 ROG.jpg'),
        url: "Asus-P513-ROG",
        name: "Asus P513 ROG",
        category: "Mice",
        manufacturer: "Asus",
        price: 450
    },
    {
        id: 20,
        img: require('../Images/Mice/Asus P702 ROG Gladius.jpg'),
        url: "Asus-P702-ROG-Gladius",
        name: "Asus P702 ROG Gladius",
        category: "Mice",
        manufacturer: "Asus",
        price: 450
    },
    {
        id: 21,
        img: require('../Images/Mice/Dell MS116-BK.jpg'),
        url: "Dell-MS116-BK",
        name: "Dell MS116-BK",
        category: "Mice",
        manufacturer: "Dell",
        price: 75
    },
    {
        id: 22,
        img: require('../Images/Mice/Dell MS5320W.jpg'),
        url: "Dell-MS5320W",
        name: "Dell MS5320W",
        category: "Mice",
        manufacturer: "Dell",
        price: 200
    },
    {
        id: 23,
        img: require('../Images/Mice/Logitech G502 Lightspeed.webp'),
        url: "Logitech-G502-Lightspeed",
        name: "Logitech G502 Lightspeed",
        category: "Mice",
        manufacturer: "Logitech",
        price: 400
    },
    {
        id: 24,
        img: require('../Images/Mice/Logitech MX Master 3.jpg'),
        url: "Logitech-MX-Master-3",
        name: "Logitech MX Master 3",
        category: "Mice",
        manufacturer: "Logitech",
        price: 420
    },
    {
        id: 25,
        img: require('../Images/Keyboards/Dell KB216.jpg'),
        url: "Dell-KB216",
        name: "Dell KB216",
        category: "Keyboards",
        manufacturer: "Dell",
        price: 120
    },
    {
        id: 26,
        img: require('../Images/Keyboards/Dell KB522.jpg'),
        url: "Dell-KB522",
        name: "Dell KB522",
        category: "Keyboards",
        manufacturer: "Dell",
        price: 160
    },
    {
        id: 27,
        img: require('../Images/Keyboards/Logitech G513 RGB.jpg'),
        url: "Logitech-G513-RGB",
        name: "Logitech G513 RGB",
        category: "Keyboards",
        manufacturer: "Logitech",
        price: 580
    },
    {
        id: 28,
        img: require('../Images/Keyboards/Logitech G910 Orion Spectrum RGB.jpg'),
        url: "Logitech-G910-Orion-Spectrum-RGB",
        name: "Logitech G910 Orion Spectrum RGB",
        category: "Keyboards",
        manufacturer: "Logitech",
        price: 760
    },
    {
        id: 29,
        img: require('../Images/Keyboards/MSI Vigor GK30.jpg'),
        url: "MSI-Vigor-GK30",
        name: "MSI Vigor GK30",
        category: "Keyboards",
        manufacturer: "MSI",
        price: 150
    },
    {
        id: 30,
        img: require('../Images/Keyboards/MSI Vigor GK50 Low Profile.jpg'),
        url: "MSI-Vigor-GK50-Low-Profile",
        name: "MSI Vigor GK50 Low Profile",
        category: "Keyboards",
        manufacturer: "MSI",
        price: 300
    },
];

export default PRODUCTS;