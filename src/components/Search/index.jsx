import styles from './Search.module.scss';

function Search({ searchPizza, setSearchPizza }) {
  return (
    <div className={styles.root}>
      <label>
        <svg
          className={styles.icon}
          fill="none"
          height="24"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" x2="16.65" y1="21" y2="16.65" />
        </svg>
        <input
          value={searchPizza}
          onChange={(e) => setSearchPizza(e.target.value)}
          className={styles.input}
          placeholder="Поиск пиццы..."
        />
      </label>
      {searchPizza && (
        <svg
          className={styles.closeIcon}
          onClick={() => setSearchPizza('')}
          height="48"
          viewBox="0 0 48 48"
          width="48"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M38 12.83l-2.83-2.83-11.17 11.17-11.17-11.17-2.83 2.83 11.17 11.17-11.17 11.17 2.83 2.83 11.17-11.17 11.17 11.17 2.83-2.83-11.17-11.17z" />
        </svg>
      )}
    </div>
  );
}

export default Search;
