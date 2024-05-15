import apiRequest from ".";

export const AddReviews = async (payload) => {
  return await apiRequest({
    method: "POST",
    endPoint: "/api/reviews",
    payload
  });
};
