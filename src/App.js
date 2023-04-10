import './css/app.css'
import Navbar from "./components/Navbar";
import DataTable from "./components/DataTable";
import Modal from 'react-modal'

Modal.setAppElement("#app")
function App() {
  return [
      <Navbar/>,
      <DataTable/>
  ]
}

export default App;
