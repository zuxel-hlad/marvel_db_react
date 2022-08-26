import errImg from '../errorMessage/errorImage/error.gif'
import './errorMessage.scss';

const ErrorMessage = () => {
  return (
    <img
      className="error"
      src={errImg}
      alt="error message"/>
  )
}

export default ErrorMessage;