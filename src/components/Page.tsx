import classNames from "classnames";
import { ReactNode, useEffect } from "react";
import { Link } from "react-router-dom";
import css from "./Page.module.css";

type Props = {
  children: ReactNode;
  className?: string;
  mainClassName?: string;
  parentUrl?: string;
  title: string;
};

const Page = ({
  children,
  className,
  mainClassName,
  parentUrl,
  title,
}: Props) => {
  useEffect(() => {
    window.document.title = `${title} | Household`;
  }, [title]);

  return (
    <div className={classNames(css.root, className)}>
      {parentUrl ? (
        <Link to={parentUrl} className={css.back}>
          Back
        </Link>
      ) : null}

      <h1 className={css.title}>{title}</h1>

      <main className={classNames(css.main, mainClassName)}>{children}</main>
    </div>
  );
};

export default Page;
