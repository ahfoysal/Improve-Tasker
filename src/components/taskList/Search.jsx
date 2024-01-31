/* eslint-disable react/prop-types */
import { useContext } from "react";
import { SearchIcon } from "../../assets/icons/Search";
import { TaskContext } from "../../context";

const SearchForm = () => {
  const { state, dispatch } = useContext(TaskContext);

  const searchHandler = (e) => {
    const value = e.target.value;

    dispatch({ type: "SEARCH_TASKS", payload: value });
    console.log(state.filteredTasks);
  };
  return (
    <form>
      <div className="flex">
        <div className="relative overflow-hidden rounded-lg text-gray-50 md:min-w-[380px] lg:min-w-[440px]">
          <input
            type="search"
            id="search-dropdown"
            className="z-20 block w-full bg-gray-800 px-4 py-2 pr-10 focus:outline-none"
            placeholder="Search Task"
            required
            onChange={searchHandler}
          />
          <button
            type="submit"
            className="absolute right-2 top-0 h-full rounded-e-lg text-white md:right-4"
          >
            <SearchIcon />
            <span className="sr-only">Search</span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchForm;
