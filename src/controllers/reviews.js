const { Hotel, Location, Review } = require("../db");

async function getHotelReviewsById(id) {
  try {
    console.log(id);
    let hotelReviewsFinded = await Hotel.findByPk(id, {
      include: [
        {
          model: Review,
          attributes: ["id", "name", "rating", "comment", "user"],
          through: {
            attributes: [],
          },
        },
        {
          model: Location,
          attributes: ["city", "state", "department"],
          through: {
            attributes: [],
          },
        },
      ],
    });

    if (hotelReviewsFinded) {
      return {
        hotel: hotelReviewsFinded.name,
        reviews: hotelReviewsFinded.Reviews,
      };
    }
    return "No reviews found";
  } catch (error) {
    console.log(error);
  }
}

async function createReview({ idHotel, name, rating, comment, user }) {
  const hotelFinded = await Hotel.findByPk(idHotel, {
    include: [
      {
        model: Review,
        attributes: ["id", "name", "rating", "comment", "user"],
        through: {
          attributes: [],
        },
      },
    ],
  });
  const allReviewsUserId = hotelFinded.Reviews.map((r) => r.dataValues.user);

  if (allReviewsUserId.includes(user)) throw `User ${name} already reviewed this hotel.`;

  const reviewCreated = await Review.create({
    name,
    rating,
    comment,
    user,
  });

  hotelFinded.addReviews(reviewCreated);

  return "Review submitted successfully";
}

async function deleteReview(id) {
  await Review.destroy({
    where: {
      id: id,
    },
  });
  return "Deleted";
}

module.exports = {
  createReview,
  deleteReview,
  getHotelReviewsById,
};
