import toast from "react-hot-toast";
import css from "./SearchBar.module.css";

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

const SearchBar = ({ onSubmit }: SearchBarProps) => {
  const handleFormAction = (formData: FormData) => {
    const query = formData.get("query")?.toString().trim() ?? "";

    if (!query) {
      toast.error("Please enter a search query.");
      return;
    }

    onSubmit(query);
  };

  return (
    <form action={handleFormAction} className={css.form}>
      <input
        type="text"
        name="query"
        autoComplete="off"
        autoFocus
        placeholder="Search movies..."
        className={css.input}
      />
      <button type="submit" className={css.button}>
        Search
      </button>
    </form>
  );
};

export default SearchBar;
