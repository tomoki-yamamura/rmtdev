type SearchFormProps = {
  searchText: string;
  setSearchText: (searchText: string) => void;
}

export default function SearchForm({
  searchText,
  setSearchText
}: SearchFormProps) {

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }

  return (
    <form onSubmit={submitHandler} action="#" className="search">
      <button type="submit">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>

      <input
        onChange={(e) => {
          setSearchText(e.target.value)
        }}
        value={searchText}
        spellCheck="false"
        type="text"
        required
        placeholder="Find remote developer jobs..."
      />
    </form>
  );
}
