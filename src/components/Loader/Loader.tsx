import css from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={css.wrapper}>
      <div className={css.spinner} />
    </div>
  );
};

export default Loader;
