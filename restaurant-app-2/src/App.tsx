import { SetStateAction, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SearchForm from "./SearchForm";
import RestaurantList from "./RestaurantList";
import RestaurantDetails from "./RestaurantDetails";
import NotFound from "./NotFound";
import axios from "axios";
import OpenAI from "openai";

function App() {

  const openai = new OpenAI({
    apiKey: "",
    dangerouslyAllowBrowser: true,
  });

  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Ensure your API key is not exposed in your source code.
  const apiKey = "";

  const handleUserInput = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setUserInput(e.target.value);
  };

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `Find restaurants in ${userInput}, convert it to a JSON object with the following format: { "restaurants": [ { "id": 0, "name": "Restaurant 1", "type": "Type 1", "location": "Location 1" }, { "id": 1, "name": "Restaurant 2", "type": "Type 2", "location": "Location 2" } ] }`,
          },
        ],
      });

      console.log(JSON.parse(response.choices[0].message.content));

      // q: what will the json response look like?
      // a: { "restaurants": [ { "id": 0, "name": "Restaurant 1", "type": "Type 1", "location": "Location 1" }, { "id": 1, "name": "Restaurant 2", "type": "Type 2", "location": "Location 2" } ] }

      setResponse(
        JSON.parse(
          response.choices[0].message.content
            ? response.choices[0].message.content
            : "[Restau]"
        )
      );
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Router>
      <div style= {{ backgroundColor: "#D3D3D3", minHeight: "100vh", minWidth: "200vh"}}>
      <div className="main" style={{ display: "flex", justifyContent: "center", alignItems: "center", marginRight: "30vh"}}>
        <nav>
          <ul>
            <li>
              <Link to="/ ">Home</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SearchForm
                  userInput={userInput}
                  handleUserInput={handleUserInput}
                  handleSearch={handleSearch}
                  isLoading={isLoading}
                />
                <RestaurantList restaurants={response} />
              </>
            }
          />
          <Route
            path="/restaurant/:id"
            element={
              <RestaurantDetails response={response} match={undefined} />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      </div>
    </Router>
  );
}

export default App;