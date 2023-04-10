import React, {Component} from "react";
import PropTypes from "prop-types";

class Readme extends Component{
    static propTypes = {
        onCloseModal: PropTypes.func
    }



    render() {
        return [
            <div className="flex-grow overflow-y-auto text-left sm: px-6 xl:px-32 max-w-lg lg:max-w-2xl xl:max-w-3xl 2xl:max-w-7xl">
            </div>,
            <h2 className="text-2xl mt-8 font-bold text-white">CONTACT & CV</h2>,
            <div className="ml-2 md:ml-4">
                <h3>
                    CV / Resume :
                    <a href="https://www.canva.com/design/DAFc0XSUzCc/NBuL3JYwa20b_qm8-92psQ/view?utm_content=DAFc0XSUzCc&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton"
                       target="_blank" rel="noreferrer"><u> PDF</u></a>
                </h3>
                <h3>
                    Phone :
                    <a href="tel:+33 7 67 42 48 98"  target="_blank" rel="noreferrer" ><u>+33 7 67 42 48 98</u></a>
                </h3>
                <h3>
                    Linkedin:
                    <a href="https://www.linkedin.com/in/julian-p95/"  target="_blank" rel="noreferrer" ><u>Julian Passebecq</u></a>
                </h3>
                <h3>
                    Professional Github :
                    <a href="https://github.com/julian-p95" target="_blank" rel="noreferrer"><u>Julian-p95</u></a>
                </h3><h3>
                Email :
                <a href="mailto:julian.passebecq@gmail.com"><u>julian.passebecq@gmail.com</u></a>
            </h3>
            </div>,
            <h2 className="text-2xl mt-8 font-bold text-white">WORK EXP </h2>,
            <div className="ml-2 md:ml-4">
            </div>,
            <h2 className="text-xl mt-6">2022: Danone, Digital Manager</h2>,
            <h2 className="text-xl mt-6">2020/21: Startup, Data Sc, Cloud</h2>,
            <h2 className="text-xl mt-6">2018/19: TOTAL, Product Owner</h2>,
            <h2 className="text-xl mt-6">2017: SAVENCIA, Data Intern</h2>,
            <button onClick={this.props.onCloseModal} className="absolute top-0 right-2 mt-2 mr-2 text-2xl sm:text-base">X</button>
        ]
    }
}

export default Readme