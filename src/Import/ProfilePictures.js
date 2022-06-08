const GetPicture = (name) => {
    return require('../Images/ProfilePictures/' + String(name) + '.png');
}

export default GetPicture;