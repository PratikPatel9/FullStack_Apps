import apiRequest from ".";

export const AddReviews = async (payload) => {
  return await apiRequest({
    method: "POST",
    endPoint: "/api/reviews",
    payload
  });
};


export const GetAllReviews = async (payload) => {
  return await apiRequest({
    method: "GET",
    endPoint: `/api/reviews`,
    queryStrings:payload
  });
};
