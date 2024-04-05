import AboutUs from "./Components/AboutUs";
import Camps from "./Components/Camps";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Hospitals from "./Components/Hospitals";
import Registration from "./Components/Registration";

function App() {
  return (
    <div className="h-full w-full flex flex-col">
      <Header />
      <Registration />
      <Camps />
      <Hospitals />
      <AboutUs />
      <Footer />
    </div>
  );
}

export default App;
