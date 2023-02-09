

function User(user) {
    const { name, profileImage, introduction, profileLink } = user;
    this.name = name;
    this.profileImage = profileImage;
    this.profileLink = profileLink;
    this.introduction = introduction;
}


module.exports = User;
