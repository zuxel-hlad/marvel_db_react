import './serachCharForm.scss';

const SearchCharForm = () => {
  return (
    <form className="search-form">
      <div className="search-form__group search-form__group_main">
        <label className="search-form__label">
          <span className="search-form__text">
            Or find a character by name:
          </span>
          <input
            className="search-form__input"
            type="text"
            name="search"
            placeholder="Enter name"
          />
        </label>
        <button className="button button__main" type="submit">
          <div className="inner">FIND</div>
        </button>
      </div>
      <div className="search-form__group search-form__group_footer">
        <span className="search-form__text search-form__text_error">
          This field is required
        </span>
        <button className="button button__secondary" type="button">
          <div className="inner">TO PAGE</div>
        </button>
      </div>
    </form>
  );
};

export default SearchCharForm;
