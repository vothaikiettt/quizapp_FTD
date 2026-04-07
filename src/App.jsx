//import zone
import "./App.css"
import InterfaceHeader from "./InterfaceZone/Interface";
import InterfaceQuestion from "./InterfaceZone/InterfaceQuestion";
function App() {
  return (
    <>
      <header>
        <InterfaceHeader />
      </header>

      <main>
        <InterfaceQuestion />
      </main>
    </>
  );
}
export default App;
