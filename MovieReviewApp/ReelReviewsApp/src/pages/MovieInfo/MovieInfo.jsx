import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { message, Rate } from "antd";
import { GetMovieById } from "../../API/movies";
import { SetLoading } from "../../redux/loadersSlice";
import { useNavigate, useParams } from "react-router-dom";

const MovieInfo = () => {
  const [movie, setMovie] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const getData = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await GetMovieById(id);
      setMovie(response.data);
      dispatch(SetLoading(false));
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="flex">
        <img
          src={movie?.posters?.[0] || ""}
          alt=""
          className="h-[600px] w-[800px] rounded"
        />
      </div>
    </div>
  );
};

export default MovieInfo;
