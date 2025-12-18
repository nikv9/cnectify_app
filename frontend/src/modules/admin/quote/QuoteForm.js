import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function QuoteForm() {
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/quotes/${id}`).then((res) => {
        setText(res.data.text);
        setAuthor(res.data.author);
      });
    }
  }, [id]);

  const submit = () => {
    if (id) {
      axios
        .put(`http://localhost:5000/quotes/${id}`, { text, author })
        .then(() => navigate("/"));
    } else {
      axios
        .post("http://localhost:5000/quotes", { text, author })
        .then(() => navigate("/"));
    }
  };

  return (
    <>
      <button onClick={() => navigate("/")}>⬅ Back</button>

      <h3>{id ? "Edit Quote" : "New Quote"}</h3>

      <input
        placeholder="Quote"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <input
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />

      <button onClick={submit}>{id ? "Update" : "Create"}</button>
    </>
  );
}

export default QuoteForm;
