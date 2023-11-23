import searchIcon from "../assets/search.svg";

const Header = ({
  setFilterValue,
  setSearch,
}: {
  setFilterValue: (filterValue: string) => void;
  setSearch: (search: string) => void;
}) => {
  const filter = ["ALL", "COMPLETED", "ACTIVE"];

  const debounce = (
    func: (search: React.ChangeEvent<HTMLInputElement>) => void
  ) => {
    let timer: number | null;
    return (...args: [React.ChangeEvent<HTMLInputElement>]) => {
      timer && clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, 500);
    };
  };

  const optimize = debounce((e: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value)
  );

  return (
    <header className="md:w-[600px] lg:w-[750px]">
      <h1 className="text-center text-[26px] mb-4">TODO LIST</h1>
      <div className="flex gap-3">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex border-2 border-purple rounded px-3 py-2 w-full"
        >
          <input
            onChange={optimize}
            className="outline-0 w-full"
            type="text"
            placeholder="Search note..."
          />
          <img src={searchIcon} alt="search icon" />
        </form>
        <select
          className="appearance-none border-0 outline-0 bg-purple text-white rounded-md px-2 text-sm"
          name="filter"
          id="filter"
          onChange={(e) => setFilterValue(e.target.value)}
        >
          {filter.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </header>
  );
};

export default Header;
