import React, { useEffect, useState } from "react";
import { Tabs, Form, Select, Button, message } from "antd";
import { antValidationError } from "../../../helpers/helper";
import { useDispatch } from "react-redux";
import { SetLoading } from "../../../redux/loadersSlice";
import { GetAllArtists } from "../../../API/artist";

const MovieForm = () => {
  const [artists = [], setArtists] = useState([]);
  const dispatch = useDispatch();

  const getArtists = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await GetAllArtists();
      //   below line set all the data but i want to get data in artist id and name label-value so i ned to create simeple object into setArtist()
      //   setArtists(response.data);
      setArtists(
        response.data.map((artist) => ({
          value: artist._id,
          label: artist.name
        }))
      );
      dispatch(SetLoading(false));
    } catch (error) {
      message.error(error.message);
      dispatch(SetLoading(false));
    }
  };
  const onFinish = (values) => {
    console.log(values);
  };

  useEffect(() => {
    getArtists();
  }, []);
  return (
    <div>
      <h1 className="text-gray-600 text-xl font-semibold uppercase">
        Add movie{" "}
      </h1>
      <Tabs>
        <Tabs.TabPane tab="Details" key="1">
          <Form
            layout="vertical"
            className="flex flex-col gap-5"
            onFinish={onFinish}
          >
            <div className="grid grid-cols-3 gap-5">
              <Form.Item
                label="Name : "
                name="name"
                rules={antValidationError}
                className="col-span-2"
              >
                <input />
              </Form.Item>
              <Form.Item
                label="Release Date : "
                name="releaseDate"
                rules={antValidationError}
              >
                <input type="date" />
              </Form.Item>
            </div>
            <Form.Item
              label="Description : "
              name="description"
              rules={antValidationError}
            >
              {/* <Input.TextArea autoSize={{ minRows: 3, maxRows: 6 }} /> */}
              <textarea autoSize={{ minRows: 3, maxRows: 6 }} />
            </Form.Item>
            <div className="grid grid-cols-3 gap-5">
              <Form.Item
                label="Actor : "
                name="actor"
                rules={antValidationError}
              >
                <Select options={artists} showSearch />
              </Form.Item>
              <Form.Item
                label="Actress : "
                name="actress"
                rules={antValidationError}
              >
                <Select options={artists} />
              </Form.Item>
              <Form.Item
                label="Director : "
                name="director"
                rules={antValidationError}
              >
                <Select options={artists} />
              </Form.Item>
            </div>
            <div className="grid grid-cols-3 gap-5">
              <Form.Item
                label="Genre :"
                name="genre"
                rules={antValidationError}
              >
                <Select>
                  {[
                    { label: "Action", value: "action" },
                    { label: "Adventure", value: "adventure" },
                    { label: "Comedy", value: "comedy" },
                    { label: "Drama", value: "drama" },
                    { label: "Fantasy", value: "fantasy" },
                    { label: "Horror", value: "horror" },
                    { label: "Mystery", value: "mystery" },
                    { label: "Romance", value: "romance" },
                    { label: "Sci-Fi", value: "sci-fi" },
                    { label: "Thriller", value: "thriller" }
                  ].map((genre) => (
                    <Select.Option key={genre.value} value={genre.value}>
                      {genre.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="Language :"
                name="language"
                rules={antValidationError}
              >
                <Select>
                  {[
                    { label: "English", value: "english" },
                    { label: "Hindi", value: "hindi" },
                    { label: "Spanish", value: "spanish" },
                    { label: "French", value: "french" },
                    { label: "German", value: "german" },
                    { label: "Italian", value: "italian" },
                    { label: "Japanese", value: "japanese" },
                    { label: "Korean", value: "korean" },
                    { label: "Russian", value: "russian" }
                  ].map((language) => (
                    <Select.Option key={language.value} value={language.value}>
                      {language.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Trailer : "
                name="trailer"
                rules={antValidationError}
              >
                <input type="text" />
              </Form.Item>
            </div>
            <Form.Item label="Cast & Crew :" name="cast">
              <Select options={artists} mode="tags" />
            </Form.Item>
            <div className="flex justify-end gap-5">
              <Button> Cancel</Button>
              <Button htmlType="submit" type="primary">
                {" "}
                Save
              </Button>
            </div>
          </Form>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Posters" key="2"></Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default MovieForm;
