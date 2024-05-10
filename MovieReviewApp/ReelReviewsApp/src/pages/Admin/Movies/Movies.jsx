import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";

const Movies = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-end">
      <Button onClick={() => navigate("/admin/movies/add")}>Add Movie </Button>
    </div>
  );
};

export default Movies;
