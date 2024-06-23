import React from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/store';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/filter/slice';
import { fetchPizzas } from '../redux/pizza/asyncActions';
import { selectFilterPizza } from '../redux/filter/selectors';
import { selectPizzaData } from '../redux/pizza/selectors';
import { SearchPizzaParams } from '../redux/pizza/types';

import { sorts } from '../components/SortPopup';

import { PizzaBlock, Skeleton, Categories, SortPopup, Pagination } from '../components';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { items, status } = useSelector(selectPizzaData);
  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilterPizza);

  const onChangeCategory = React.useCallback(
    (id: number) => {
      dispatch(setCategoryId(id));
    },
    [dispatch],
  );

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  // Проверка на первый рендер, если он первый то не выполняется
  React.useEffect(() => {
    // Если первый рендер, то фильтры не вшиваются в строку запроса
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    // Переключение на то, что рендер уже был
    isMounted.current = true;
  }, [sort.sortProperty, categoryId, currentPage, navigate]);

  // Проверка на URL-параметры и сохранение в redux
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as SearchPizzaParams;

      const sort = sorts.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(
        setFilters({
          categoryId: Number(params.categoryId),
          searchValue: params.search,
          currentPage: Number(params.currentPage),
          sort,
        }),
      );
      isSearch.current = true;
    }
  }, [dispatch]);

  // Если был первый рендер, то запрашиваем пиццы
  React.useEffect(() => {
    window.scrollTo(0, 0);

    const getPizzas = async () => {
      const category = categoryId > 0 ? `category=${categoryId}` : '';
      const sortProperty = sort.sortProperty.replace('-', '');
      const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
      const search = searchValue ? `&search=${searchValue}` : '';

      dispatch(
        fetchPizzas({
          categoryId: String(category),
          sortProperty,
          order,
          search,
          currentPage: String(currentPage),
        }),
      );
    };

    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage, dispatch]);

  // Заглушка скелетон
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);
  const pizzas =
    Array.isArray(items) && items?.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <SortPopup value={sort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>
            Произошла ошибка <span>😕</span>
          </h2>
          <p>К сожалению, не удалось получить пиццы. Попробуйте повторить попытку позже.</p>
        </div>
      ) : (
        <div className="content__items">{status === 'pending' ? skeletons : pizzas}</div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
