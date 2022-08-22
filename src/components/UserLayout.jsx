import Navbar from './Navbar/index';

const UserLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="max-w-6xl p-2 mx-auto mt-12 lg:p-8 lg:mt-32">
        {children}
      </main>
    </>
  );
};

export default UserLayout;
