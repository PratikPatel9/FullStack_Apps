import { Modal, Rate, message } from "antd";
import React,{ useState } from "react";
import { useDispatch } from "react-redux";
import { SetLoading } from "../../redux/loadersSlice";
import { AddReviews } from "../../API/reviews";

const ReviewForm = ({
  movie,
  reloadData,
  showReviewForm,
  setShowReviewForm
}) => {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const addReview = async () => {
    console.log("You have cliked me!!");
    try {
      dispatch(SetLoading(true));
      const response = await AddReviews({
        movie: movie._id,
        rating,
        comment
      });
      message.success(response.message);
      reloadData();
      setShowReviewForm(false);
      dispatch(SetLoading(false));
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };


  return (
    <Modal
      open={showReviewForm}
      onCancel={() => setShowReviewForm(false)}
      centered
      title="Add Review"
      width={800}
      onOk={addReview}
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="flex w-full">
          <span>Movie : </span>
          <span className="ml-2 font-semibold">{movie?.name}</span>
        </div>
        <Rate value={rating} onChange={(value) => setRating(value)} allowHalf 
          style={{color:"orange"}}
        />
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Enter your Comments"
          cols="30"
          rows="10"
        ></textarea>
      </div>
    </Modal>
  );
};

export default ReviewForm;
