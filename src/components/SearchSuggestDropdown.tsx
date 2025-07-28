import React, { useState, useEffect, useRef } from "react";
import "./searchSuggestDropdown.css";

interface Props {
  data: string[];
  placeholder?: string;
  onSelect?: (value: string) => void;
}

const SearchSuggestDropdown: React.FC<Props> = ({
  data,
  placeholder = "Search...",
  onSelect,
}) => {
  const [input, setInput] = useState("");
  const [filtered, setFiltered] = useState<string[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const results = input
      ? data.filter((item) => item.toLowerCase().includes(input.toLowerCase()))
      : [];
    setFiltered(results);
    setHighlightedIndex(-1);
  }, [input, data]);

  const handleSelect = (value: string) => {
    setInput(value);
    setFiltered([]);
    if (onSelect) onSelect(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) => Math.min(prev + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      handleSelect(filtered[highlightedIndex]);
    }
  };

  return (
    <div className="search-dropdown-container">
      <input
        type="text"
        placeholder={placeholder}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="search-dropdown-input"
      />
      {filtered.length > 0 && (
        <ul className="search-dropdown-list" ref={listRef}>
          {filtered.map((item, index) => (
            <li
              key={index}
              onClick={() => handleSelect(item)}
              className={`search-dropdown-item ${
                index === highlightedIndex ? "highlighted" : ""
              }`}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchSuggestDropdown;
