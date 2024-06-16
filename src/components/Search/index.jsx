import React from 'react';
import debounce from 'lodash.debounce';
import styles from './Search.module.scss';

import { SearchContext } from '../../App';

function Search() {
  const [value, setValue] = React.useState('');
  const { setSearchPizza } = React.useContext(SearchContext);
  const inputRef = React.useRef();

  const onClickClear = () => {
    setSearchPizza('');
    setValue('');
    inputRef.current.focus();
  };

  const updateSearchValue = React.useCallback(
    debounce((str) => {
      setSearchPizza(str);
    }, 1000),
    [],
  );

  const onChangeInput = (e) => {
    setValue(e.target.value);
    updateSearchValue(e.target.value);
  };

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
          value={value}
          ref={inputRef}
          onChange={onChangeInput}
          className={styles.input}
          placeholder="Поиск пиццы..."
        />
      </label>
      {value && (
        <svg
          className={styles.closeIcon}
          onClick={onClickClear}
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
