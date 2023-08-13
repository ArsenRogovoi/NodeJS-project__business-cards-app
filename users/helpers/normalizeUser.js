const normalizeUser = (rawUser) => {
  return {
    ...rawUser,
    name: {
      ...rawUser.name,
      middle: rawUser.name.middle || "",
    },
    image: {
      ...rawUser.image,
      url: rawUser.image.url || "../../public/images/business-card.jpg",
      alt: rawUser.image.alt || "Business card image",
    },
    address: {
      ...rawUser.address,
      state: rawUser.address.state || "not defined",
    },
  };
};

module.exports = normalizeUser;
