import Navigation from './Navigation/index';

const UserLayout = ({ children }) => {
  return (
    <>
      <Navigation />
      <main className="max-w-6xl p-2 mx-auto mt-12 lg:p-8 lg:mt-32">{children}</main>
    </>
  );
};

export default UserLayout;
