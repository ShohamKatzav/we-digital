const ProfilePictures =
    [
        {
            username: "Shoham",
            img: require('../Images/ProfilePictures/Shoham.png')
        },
        {
            username: "Moshe",
            img: require('../Images/ProfilePictures/Moshe.png')
        },
        {
            username: "Yossef",
            img: require('../Images/ProfilePictures/Yossef.png')
        },
        {
            username: "Dana",
            img: require('../Images/ProfilePictures/Dana.png')
        },
        {
            username: "Haim",
            img: require('../Images/ProfilePictures/Haim.png')
        },
        {
            username: "Efrat",
            img: require('../Images/ProfilePictures/Efrat.png')
        }
    ];

const GetPicture = (name) => {
    for (let i = 0; i < ProfilePictures.length; i++) {
        if (ProfilePictures[i].username === name) {
            return ProfilePictures[i].img;
        }
    }
}

export default GetPicture;