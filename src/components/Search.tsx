import { FormEvent, useState } from "react";
import "./Search.css";

function Search({ onSearch }: { onSearch: (searchTerm: string) => void }) {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.replace(/\s+/g, ","));
    }
    setSearchTerm("");
  };

  return (
    <div className="search">
      <form className="search__form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="search__input"
          placeholder="Search for photos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" className="search__button">
          Search
        </button>
      </form>
    </div>
  );
}
export default Search;
