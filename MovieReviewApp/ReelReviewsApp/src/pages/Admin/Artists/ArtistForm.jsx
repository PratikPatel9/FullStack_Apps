import React from "react";
import { Modal, Form, Input } from "antd";
import { antValidationError } from "../../../helpers/helper";

const ArtistForm = ({ showArtistForm, setShowArtistForm }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(values);
  };
  return (
    <>
      <Modal
        open={showArtistForm}
        onCancel={() => setShowArtistForm(false)}
        title="Add Artist Form"
        centered
        width={800}
        okText="Add"
        onOk={() => {
          form.submit();
        }}
      >
        <Form
          layout="vertical"
          className="flex flex-col gap-5"
          onFinish={onFinish}
          form={form}
        >
          <Form.Item label="Name : " name="name" rules={antValidationError}>
            <input />
          </Form.Item>
          <div className="grid grid-cols-2 gap-5">
            <Form.Item
              label="Date of Birth : "
              name="dob"
              rules={antValidationError}
            >
              <input type="date" />
            </Form.Item>
            <Form.Item
              label="Debut Year : "
              name="debutYear"
              rules={antValidationError}
            >
              <input type="number" />
            </Form.Item>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <Form.Item
              label="Proffession : "
              name="proffession"
              rules={antValidationError}
            >
              <select name="" id="">
                <option value="">-- Select --</option>
                <option value="Actor">Actor</option>
                <option value="Actress">Actress</option>
                <option value="Director">Director</option>
                <option value="Producer">Producer</option>
                <option value="Music Director">Music Director</option>
                <option value="Singer">Singer</option>
                <option value="Lyricist">Lyricist</option>
                <option value="Cinematographer">Cinematographer</option>
                <option value="Camera Men">Camera Men</option>
                <option value="Editor">Editor</option>
                <option value="Stunt Men">Stunt Men</option>
              </select>
            </Form.Item>
            <Form.Item
              label="Debut Movie : "
              name="debutMovie"
              rules={antValidationError}
            >
              <input type="text" />
            </Form.Item>
          </div>
          <Form.Item label="Bio : " name="bio" rules={antValidationError}>
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            label="Profile Picture : "
            name="ProfilePicture"
            rules={antValidationError}
          >
            <input type="text" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ArtistForm;
