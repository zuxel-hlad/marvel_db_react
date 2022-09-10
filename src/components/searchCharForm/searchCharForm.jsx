import useApi from '../../services/MarvelService';
import {Link} from 'react-router-dom';
import {useState} from 'react';
import {Field, Form, Formik, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import './serachCharForm.scss';
import MyErrorMessage from "../errorMessage/ErrorMessage";

const SearchCharForm = () => {
  const [searchedValue, setSearchedValue] = useState('');
  const [searchedChar, setSearchedChar] = useState(null);
  const {getCharacterByName, loading, clearError, error} = useApi();

  const getCharFromApi = async (char) => {
    clearError();
    setSearchedChar(null)
    setSearchedValue('');
    const responseChar = await getCharacterByName(char);
    setSearchedChar(responseChar);
  };

  let searchResultsForRender = null;
  if (searchedChar && searchedValue) {
    searchResultsForRender = (
      <div className="search-form__group search-form__group_footer">
        <span className="search-form__text search-form__text_success">
          {`There is! Visit ${searchedChar.name} page?`}
        </span>
        <Link
          className="button button__secondary"
          to={`/characters/${searchedChar.name}`}
        >
          <div className="inner">TO PAGE</div>
        </Link>
      </div>
    );
  } else if (!searchedChar && searchedValue) {
    searchResultsForRender = (
      <div className="search-form__group search-form__group_footer">
        <span className="search-form__text search-form__text_error">
          The character was not found. Check the name and try again!
        </span>
      </div>
    );
  } else {
    searchResultsForRender = null;
  }

  const customErrorMessage = error ? <div className="search-form__critical-error"><MyErrorMessage/></div> : null

  return (
    <Formik
      initialValues={{char: ''}}
      validationSchema={Yup.object({
        char: Yup.string()
          .min(2, 'Please enter more than 2 symbols!')
      })}
      onSubmit={(values) => {
        getCharFromApi(values.char);
        setSearchedValue(values.char);
      }}>
      <Form className="search-form">
        <div className="search-form__group search-form__group_main">
          <label className="search-form__label">
            <span className="search-form__text">
              Or find a character by name:
            </span>
            <Field
              className="search-form__input"
              name="char"
              id="char"
              type="text"
              placeholder="Enter character name"
            />
          </label>
          <button
            className="button button__main"
            type="submit"
            disabled={loading}>
            <div className="inner">FIND</div>
          </button>
        </div>
        <ErrorMessage className="search-form__text search-form__text_error search-form__text_validate-error" name="char"
                      component="span"/>
        {customErrorMessage}
        {searchResultsForRender}
      </Form>
    </Formik>
  );
};

export default SearchCharForm;
