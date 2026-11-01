import css from "./ErrorMessage.module.css";

interface ErrorMessageProps {
  message?: string;
}

const ErrorMessage = ({
  message = "Something went wrong. Please try again later.",
}: ErrorMessageProps) => {
  return <p className={css.message}>{message}</p>;
};

export default ErrorMessage;
