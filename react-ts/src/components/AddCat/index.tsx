import { useState } from "react";
import { useCreateCatMutation } from "../../graphql/generated/schemas";

import "./style.css";

const AddCat = () => {
  const [url, setUrl] = useState("");
  const [createCat] = useCreateCatMutation();

  const onUrlChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    setUrl(e.target.value);
  };

  const a = async () => {
    fetch('http://localhost:3001/sse').then((el) => {
      console.log(el);
    })
  }

  const submit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!url) {
      return;
    }
    e.preventDefault();
    createCat({ variables: { cat: { url, likes: 0 } } });
    await a()
    window.location.href = "/admin";
  };

  return (
    <div className="add_wrapper">
      <div className="add_header">
        <h1>Add cat</h1>
      </div>

      <div className="content">
        <label htmlFor="link">Link</label>
        <input type="text" id="link" onChange={onUrlChange} />
        <button onClick={submit}>Submit</button>
      </div>
    </div>
  );
};

export default AddCat;