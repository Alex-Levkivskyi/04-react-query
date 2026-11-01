import { useState } from "react";
import type { ComponentType } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import ReactPaginateModule from "react-paginate";
import type { ReactPaginateProps } from "react-paginate";

import { fetchMovies } from "../../services/movie-api";
import SearchBar from "../SearchBar/SearchBar";
import MovieList from "../MovieList/MovieList";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import css from "./App.module.css";

type ModuleWithDefault<T> = { default: T };

const ReactPaginate = (
  ReactPaginateModule as unknown as ModuleWithDefault<
    ComponentType<ReactPaginateProps>
  >
).default;

const App = () => {
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["movies", query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: Boolean(query.trim()),
    placeholderData: keepPreviousData,
  });

  const handleSearch = (newQuery: string) => {
    if (newQuery === query) return;
    setQuery(newQuery);
    setPage(1);
  };

  const totalPages = data?.total_pages ?? 0;
  const movies = data?.results ?? [];

  return (
    <div className={css.container}>
      <header className={css.header}>
        <span>Powered by TMDB</span>
        <SearchBar onSubmit={handleSearch} />
      </header>

      {totalPages > 1 && (
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setPage(selected + 1)}
          forcePage={page - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
        />
      )}

      {isLoading && <Loader />}
      {isError && <ErrorMessage message={(error as Error).message} />}
      {!isLoading && !isError && movies.length > 0 && (
        <MovieList movies={movies} />
      )}
    </div>
  );
};

export default App;
