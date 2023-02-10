import { Link } from 'react-router-dom';
import { memo } from 'react';
import {
    Field,
    Form,
    Formik,
    ErrorMessage as FormikErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import './serachCharForm.scss';
import ErrorMessage from '../errorMessage/ErrorMessage';

const SearchCharForm = ({ data, isError, isLoading, isFetching, onSearch }) => {
    const searchResults = !data ? null : Object.keys(data).length > 0 ? (
        <div className="search-form__group search-form__group_footer">
            <span className="search-form__text search-form__text_success">
                {`There is! Visit ${data.name} page?`}
            </span>
            <Link
                className="button button__secondary"
                to={`/characters/${data.id}`}
            >
                <div className="inner">TO PAGE</div>
            </Link>
        </div>
    ) : (
        <div className="search-form__group search-form__group_footer">
            <span className="search-form__text search-form__text_error">
                The character was not found. Check the name and try again!
            </span>
        </div>
    );

    const errorMessage = isError ? (
        <div className="search-form__critical-error">
            <ErrorMessage />
        </div>
    ) : null;

    return (
        <Formik
            initialValues={{ charName: '' }}
            validationSchema={Yup.object({
                charName: Yup.string()
                    .min(2, 'Please enter more than 2 symbols!')
                    .required(
                        "Field can't be empty! Please, enter the character name?"
                    ),
            })}
            onSubmit={onSearch}
        >
            <Form className="search-form">
                <div className="search-form__group search-form__group_main">
                    <label className="search-form__label">
                        <span className="search-form__text">
                            Or find a character by name:
                        </span>
                        <Field
                            className="search-form__input"
                            name="charName"
                            id="charName"
                            type="text"
                            placeholder="Enter character name"
                        />
                    </label>
                    <button
                        className="button button__main"
                        type="submit"
                        disabled={isLoading || isFetching}
                    >
                        <div className="inner">FIND</div>
                    </button>
                </div>
                <FormikErrorMessage
                    className="search-form__text search-form__text_error search-form__text_validate-error"
                    name="charName"
                    component="span"
                />
                {errorMessage}
                {searchResults}
            </Form>
        </Formik>
    );
};

export default memo(SearchCharForm);
