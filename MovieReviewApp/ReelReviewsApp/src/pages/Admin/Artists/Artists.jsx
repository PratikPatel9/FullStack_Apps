import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import ArtistForm from "./ArtistForm";

const Artists = () => {
  const [showArtistForm, setShowArtistForm] = React.useState(false);
  const navigate = useNavigate();
  return (
    <>
      <div>
        <div className="flex justify-end">
          <Button onClick={() => setShowArtistForm(true)}>Add Artist</Button>
        </div>
        {showArtistForm && (
          <ArtistForm
            showArtistForm={showArtistForm}
            setShowArtistForm={setShowArtistForm}
          />
        )}
      </div>
    </>
  );
};

export default Artists;
