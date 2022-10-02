const NotFound = () => {
  return <h1>404 - Page Not Found</h1>;
};

NotFound.getLayout = ({ children }) => {
  return children;
};

export default NotFound;
