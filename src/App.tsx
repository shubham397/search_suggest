import SearchSuggestDropdown from "./components/SearchSuggestDropdown";
import "./styles.css";

export default function App() {
  const cities = [
    "New York",
    "London",
    "Paris",
    "Tokyo",
    "Sydney",
    "Berlin",
    "Toronto",
    "Dubai",
  ];

  return (
    <div className="App">
      <SearchSuggestDropdown data={cities} />
    </div>
  );
}
