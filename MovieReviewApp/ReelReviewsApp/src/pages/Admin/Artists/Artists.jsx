import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, message, Table } from "antd";
import ArtistForm from "./ArtistForm";
import { useDispatch } from "react-redux";
import { SetLoading } from "../../../redux/loadersSlice";
import { DeleteArtist, GetAllArtists } from "../../../API/artist";
import { getDateFormat } from "../../../helpers/helper";

const Artists = () => {
  const [artists, setArtists] = useState([]);
  const dispatch = useDispatch();
  const [showArtistForm, setShowArtistForm] = React.useState(false);
  const [selectedArtist, setSelectedArtist] = React.useState(null);
  const navigate = useNavigate();

  // First need to fectch all the Artists for Update Artist data
  const fetchArtists = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await GetAllArtists();
      console.log(response.data);
      setArtists(response.data);
      dispatch(SetLoading(false));
    } catch (error) {
      message.error(error.message);
      dispatch(SetLoading(false));
    }
  };

  // Delete Artist data

  const deleteArtist = async (id) => {
    try {
      dispatch(SetLoading(true));
      const response = await DeleteArtist(id);
      // console.log(response.data); //debugg purpose
      message.success(response.message);
      fetchArtists();
      dispatch(SetLoading(false));
    } catch (error) {
      message.error(error.message);
      dispatch(SetLoading(false));
    }
  };

  // i need to set Columns for table data that should be match with mongodb database EXACTLY

  const columns = [
    {
      title: "Artist",
      dataIndex: "profile",
      render: (text, record) => {
        const imageUrl = record?.images?.[0] || "";
        return <img src={imageUrl} alt="" className="w-20 h-20 rounded" />;
      }
    },
    {
      title: "Name",
      dataIndex: "name"
    },
    {
      title: "DOB",
      dataIndex: "dob",
      render: (text, record) => {
        return getDateFormat(text);
      }
    },
    {
      title: "Proffession",
      dataIndex: "proffession"
    },
    {
      title: "Debut Year",
      dataIndex: "debutYear"
    },
    {
      title: "Debut Movie",
      dataIndex: "debutMovie"
    },
    // below column will be used for edit and delete operation
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => {
        return (
          <div className=" flex gap-5">
            <i
              className="ri-edit-2-fill"
              onClick={() => {
                setSelectedArtist(record);
                setShowArtistForm(true);
              }}
            ></i>
            <i
              className="ri-delete-bin-6-fill"
              onClick={() => {
                deleteArtist(record._id);
              }}
            ></i>
          </div>
        );
      }
    }
  ];

  useEffect(() => {
    fetchArtists();
  }, []);

  return (
    <>
      <div>
        <div className="flex justify-end">
          <Button
            onClick={() => {
              setSelectedArtist(null);
              setShowArtistForm(true);
            }}
          >
            Add Artist
          </Button>
        </div>
        <Table dataSource={artists} columns={columns} className="mt-5" />
        {showArtistForm && (
          <ArtistForm
            showArtistForm={showArtistForm}
            setShowArtistForm={setShowArtistForm}
            selectedArtist={selectedArtist}
            reloadData={fetchArtists}
          />
        )}
      </div>
    </>
  );
};

export default Artists;
