function Layout({ children, className }) {
  return (
    <div className={`${className} w-full mx-auto px-4 max-w-[1200px]`}>
      {children}
    </div>
  );
}

export default Layout;
