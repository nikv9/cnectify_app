import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function QuotesList() {
  const [quotes, setQuotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/quotes")
      .then((res) => setQuotes(res.data));
  }, []);

  const deleteQuote = (id) => {
    axios
      .delete(`http://localhost:5000/quotes/${id}`)
      .then(() => setQuotes(quotes.filter((q) => q.id !== id)));
  };

  return (
    <>
      <button onClick={() => navigate("/new")}>➕ New Quote</button>

      <table border="1">
        <thead>
          <tr>
            <th>Quote</th>
            <th>Author</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {quotes.map((q) => (
            <tr key={q.id}>
              <td>{q.text}</td>
              <td>{q.author}</td>
              <td>
                <button onClick={() => navigate(`/edit/${q.id}`)}>Edit</button>
                <button onClick={() => deleteQuote(q.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default QuotesList;
