import { message } from "antd";
import React, { useEffect, useState } from "react";
import { GetQuerySearchFilterResults } from "../API/filters";
import { useNavigate } from "react-router-dom";

const Filters = ({ filters, setFilters }) => {
  const [hideResults, setHideResults] = useState(false);
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const response = await GetQuerySearchFilterResults(filters);
      setResults(response.data);
    } catch (error) {
      message.error(error.message);
    }
  };
  useEffect(() => {
    if (filters.search) {
      // use debounce here
      const debounce = setTimeout(() => {
        getData();
      }, 500);
      return () => clearTimeout(debounce);
    }
  }, [filters.search]);

  return (
    <div className="mb-5 w-1/2 relative">
      <input
        type="text"
        placeholder="Search Movies / Artists"
        value={filters.search}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        onFocus={() => setHideResults(false)}
        onBlur={() => {
          setTimeout(() => {
            setHideResults(true);
          }, 200);
        }}
      />
      {/* results div */}

      {filters.search &&
        !hideResults &&
        (results?.movies?.length || results?.artists?.length) && (
          <div className="quickSearch text-gray-600">
            {/* Movie Filter */}
            {results?.movies?.length > 0 ? (
              results?.movies?.map((movie) => (
                <div
                  key={movie?._id}
                  className="flex gap-10 items-center border p-2 cursor-pointer mt-2"
                  onClick={() => navigate(`/movie/${movie?._id}`)}
                >
                  <img
                    src={movie?.posters[0]}
                    alt=""
                    className="h-10 w-10 rounded"
                  />
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-600 text-md">
                      {movie?.name}
                    </span>
                    <span className="text-sm text-gray-500"> Movie </span>
                  </div>
                </div>
              ))
            ) : (
              <div>No movies found</div>
            )}

            {/* Artist filter */}
            {results?.artists?.length > 0 ? (
              results?.artists?.map((artist) => (
                <div
                  key={artist?._id}
                  className="flex gap-10 items-center border p-2 cursor-pointer mt-2"
                  onClick={() => navigate(`/artist/${artist?._id}`)}
                >
                  <img
                    src={artist?.images[0]}
                    alt=""
                    className="h-10 w-10 rounded"
                  />
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-600 text-md">
                      {artist?.name}
                    </span>
                    <span className="text-sm text-gray-500"> Artist </span>
                  </div>
                </div>
              ))
            ) : (
              <div>No artists found</div>
            )}
          </div>
        )}
    </div>
  );
};

export default Filters;
