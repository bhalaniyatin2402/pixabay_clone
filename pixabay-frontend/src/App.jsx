import Header from "./components/layout/Header";
import ImageDetailModal from "./components/modal/ImageDetailModal";
import CustomRoutes from "./routes/CustomRoutes";

function App() {
  return (
    <>
      <Header />
      <CustomRoutes />
      <ImageDetailModal />
    </>
  );
}

export default App;
