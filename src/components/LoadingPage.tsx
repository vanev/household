import Page from "./Page";

type Props = {
  parentUrl?: string;
  title?: string;
};

const LoadingPage = ({ parentUrl, title = "Loading..." }: Props) => (
  <Page title={title} parentUrl={parentUrl}>
    Loading...
  </Page>
);

export default LoadingPage;
