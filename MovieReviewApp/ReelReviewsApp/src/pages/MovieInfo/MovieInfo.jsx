import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { message, Rate } from "antd";
import { GetMovieById } from "../../API/movies";
import { SetLoading } from "../../redux/loadersSlice";
import { useNavigate, useParams } from "react-router-dom";
import { getDateFormat } from "../../helpers/helper";

const MovieInfo = () => {
  const [movie, setMovie] = useState(null);
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
  }, [id]);

  return (
    movie && (
      <div>
        <div className="flex flex-col lg:flex-row gap-10 mb-5">
          <img
            src={movie?.posters?.[0] || ""}
            alt=""
            className=" h-72 w-96 lg:h-[600px] lg:w-[600px] rounded"
          />
          <div className="flex flex-col">
            <h1 className="text-[50px] font-semibold text-gray-600 mb-3">
              {movie?.name}
            </h1>
            <hr />
            <div className="flex flex-col gap-1 text-gray-600 w-96 text-sm mt-5">
              <div className="flex justify-between">
                <span>Language :</span>
                <span className="capitalize">{movie?.language}</span>
              </div>
              <div className="flex justify-between">
                <span>Release Date :</span>
                <span className="capitalize">
                  {getDateFormat(movie?.releaseDate)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Genre :</span>
                <span className="capitalize">{movie?.genre}</span>
              </div>
              <div className="flex justify-between">
                <span>Director :</span>
                <span className="capitalize">{movie?.director?.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Actor :</span>
                <span className="capitalize">{movie?.actor?.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Actress :</span>
                <span className="capitalize">{movie?.actress?.name}</span>
              </div>
            </div>
          </div>
        </div>

        <span className="py-5 text-gray-600 text-sm">{movie?.description}</span>

        <div className="mt- mb-10">
          <h1 className="text-gray-600 font-semibold text-md"> Cast & Crew </h1>
          <div className="flex mt-5 gap-5">
            {movie?.cast.map((artist) => {
              return (
                <div
                  key={artist?.id}
                  className="cursor-pointer"
                  onClick={() => navigate(`/artist/${artist?._id}`)}
                >
                  <img
                    src={artist?.images[0] || ""}
                    alt=""
                    className="w-32 h-24 rounded"
                  />
                  <hr/>
                  <span className="text-sm text-gray-600 text-center">{artist?.name}</span>
                </div>
              );
            })}
          </div>
        </div>
        <hr />
      </div>
    )
  );
};

export default MovieInfo;
