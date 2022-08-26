import {Link} from 'react-router-dom';
import './404.scss';

const Page404 = () => {
  return (
    <div className="error-page">
      <h1 className="error-page__title">404</h1>
      <p className="error-page__message">
        error <span>404</span><br/>
        Sorry! We are unable to find the page you are looking for.
      </p>
      <Link className="button button__main button__long" to="/">
        <div className="inner">
          Go to main
        </div>
      </Link>
    </div>
  )
}

export default Page404;