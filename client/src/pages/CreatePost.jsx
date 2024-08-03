import { Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreatePost = () => {
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput type="text" placeholder="Title" required id="title" className="flex-1" />
          <Select>
            <option value="uncategorized">Select a category</option>
            <option value="himatek">Himatek</option>
            <option value="himasia">Himasia</option>
            <option value="himadigi">Himadigi</option>
            <option value="himaraksi">Himaraksi</option>
            <option value="himaforka">Himaforka</option>
            <option value="himatekom">Himatekom</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-lime-500 border-dotted p-3">
          <FileInput type="file" accept="image/*" />
          <Button type="button" gradientDuoTone="tealToLime" size="sm" outline>
            Upload Image
          </Button>
        </div>
        <ReactQuill theme="snow" placeholder="Write something..." className="mb-12 h-72" required />
        <Button type="submit" gradientDuoTone="tealToLime">
          Publish
        </Button>
      </form>
    </div>
  );
};

export default CreatePost;
