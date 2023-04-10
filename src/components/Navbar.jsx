
import {Component} from "react";
import '../css/navbar.css'
import Readme from "./Readme";
import Modal from "react-modal";


// flex-grow overflow-y-auto text-left sm: px-6 xl:px-32 max-w-lg lg:max-w-2xl xl:max-w-3xl 2xl:max-w-7xl
// vfm__content relative flex flex-col max-h-full mx-4 p-4 border rounded bg-night-blue text-white
class NavBar extends  Component{
  constructor(props) {
    super(props);
    this.state = {showModal: false}
    this.closeOrOpenModal = this.closeOrOpenModal.bind(this)
  }

  closeOrOpenModal(isOpen){
    this.setState({showModal: isOpen})
  }
  render() {
    return  <nav id="navbar" className="bg-white border-gray-200 px-2 sm:px-4 dark:bg-gray-900" key={"navbar"}>
      <Modal
          isOpen={this.state.showModal}
          className={"vfm__content relative flex flex-col max-h-full mx-4 p-4 border rounded bg-night-blue text-white"}
          b
      >
        <Readme onCloseModal={() => this.closeOrOpenModal(false)}/>
      </Modal>
      <div className="container flex flex-wrap justify-between items-center mx-auto flex items-center">
      <span id="nav-title" className="leading-none self-center text-2xl sm:text-4xl font-semibold whitespace-nowrap text-white md:text-5xl mt-1 mb-2">
        <u>Julian PASSEBECQ / 27</u><br/>Energy & Data Engineer
      </span>
        <div className="graph_one">
          <table id="animations-example-6" className="charts-css column show-labels hide-data data-spacing-5 show-primary-axis">
            <tbody>
            <tr>
              <th scope="row">BI</th>
              <td className="td_one"></td>
            </tr>
            <tr>
              <th scope="row">SQL</th>
              <td className="td_two"></td>
            </tr>
            <tr>
              <th scope="row">ETL</th>
              <td className="td_three"></td>
            </tr>
            <tr>
              <th scope="row">DATA</th>
              <td className="td_four"></td>
            </tr>
            <tr>
              <th scope="row">CLOUD</th>
              <td className="td_five"></td>
            </tr>
            </tbody>
          </table>
        </div>
        <div className="w-auto text-white py-2.5" id="navbar-buttons">
          <button onClick={() => this.closeOrOpenModal(true)} className="nav-button text-sm sm:text-lg bg-white hover:bg-black hover:text-white text-black font-bold py-1 px-2 md:px-4 rounded inline-flex items-center mr-2.5">
          <svg  xmlns="http://www.w3.org/2000/svg" className="mr-1 nav-icon w-4 h-4 lg:w-6 lg:h-6"
                viewBox="0 0 24 24"> >
            <path d="M3 24h19v-23h-1v22h-18v1zm17-24h-18v22h18v-22zm-3 17h-12v1h12v-1zm0-3h-12v1h12v-1zm0-3h-12v1h12v-1zm-7.348-3.863l.948.3c-.145.529-.387.922-.725 1.178-.338.257-.767.385-1.287.385-.643 0-1.171-.22-1.585-.659-.414-.439-.621-1.04-.621-1.802 0-.806.208-1.432.624-1.878.416-.446.963-.669 1.642-.669.592 0 1.073.175 1.443.525.221.207.386.505.496.892l-.968.231c-.057-.251-.177-.449-.358-.594-.182-.146-.403-.218-.663-.218-.359 0-.65.129-.874.386-.223.258-.335.675-.335 1.252 0 .613.11 1.049.331 1.308.22.26.506.39.858.39.26 0 .484-.082.671-.248.187-.165.322-.425.403-.779zm3.023 1.78l-1.731-4.842h1.06l1.226 3.584 1.186-3.584h1.037l-1.734 4.842h-1.044z"/>
          </svg>
          <span className="mt-1">CV</span>
        </button>
      </div>
    </div>
  </nav>
  }
}

export default NavBar
