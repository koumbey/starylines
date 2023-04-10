import {Component} from "react";
import PropTypes from "prop-types";
import '../css/vuedatable.css'

class EasyDataTable extends Component{
    static propTypes = {
        rows: PropTypes.arrayOf(PropTypes.object).isRequired,
        columns: PropTypes.arrayOf(PropTypes.object).isRequired,
        expandColumns: PropTypes.arrayOf(PropTypes.string)
    }

    constructor(props) {
        super(props);
        this.state = {
            expandRowNumber: null,
            pageNumber:1
        }
        this.expandRow = this.expandRow.bind(this)
        this.renderExpandRow = this.renderExpandRow.bind(this)
        this.nextPage = this.nextPage.bind(this)
    }
    expandRow(rowNumber){
        let value = (this.state.expandRowNumber === rowNumber)?null:rowNumber
        this.setState({expandRowNumber: value})
    }
    renderTableHeader(){
        let tableHeader = this.props.columns.map((col, index) =>{
            return <th key={index} className="sortable desc break-words sm:text-lg lg:text-xl text-black undefined" data-v-0c7bc512="">
                    <span className="header direction-center" data-v-0c7bc512="">
                        <span className="header-text" data-v-0c7bc512="">{col.name}</span>
                        <i className="sortType-icon desc" data-v-0c7bc512=""></i>
                    </span>
            </th>
        })
        return <thead className="vue3-easy-data-table__header" data-v-0c7bc512="">
        <tr data-v-0c7bc512="">
            <th className="break-words sm:text-lg lg:text-xl text-black !px-0 sm:px-0" data-v-0c7bc512="" >
                <span className="header direction-center" data-v-0c7bc512="">
                    <span className="header-text" data-v-0c7bc512="">
                    </span></span>
            </th>
            {tableHeader}
        </tr>
        </thead>
    }
    renderExpandRow(row){
        let tableRow = this.props.expandColumns.map((item, colIndex) =>{
            return <div className={item} key={colIndex}>
                <h2 className="font-bold">{item}</h2>
                <p>{row[item]}</p>
            </div>
        })
        return <tr className="" data-v-0c7bc512="" key={"expandRow"}>
            <td colSpan="6" className="expand" data-v-0c7bc512="">
                <div className="expended-row">
                    {tableRow}
                </div>
            </td>
        </tr>
    }
    renderTableBody(){
        let cols = this.props.columns
        let currentStates = this.state
        let changeRowExpandState = this.expandRow
        let renderExpandRowFunc = this.renderExpandRow
        let startNumber = ((this.state.pageNumber - 1 ) * 25)
        let endNumber = (this.state.pageNumber * 25) - 1
        let tableBody = this.props.rows.slice(startNumber, endNumber).map((row, rowIndex) =>{
            let tableRow = cols.map((item, colIndex) =>{
                return <td className="text-sm sm:text-lg undefined direction-center" key={colIndex} data-v-0c7bc512="">{row[item.key]}</td>
            })
            let isRowExpanded = currentStates.expandRowNumber === rowIndex
            let iconClassName = (isRowExpanded)?"expand-icon expanding":"expand-icon"
            let renderedRows = [(<tr className="" key={rowIndex} data-v-0c7bc512="">
                <td className="can-expand text-sm sm:text-lg expand-button !px-0 sm:!px-3 direction-center" data-v-0c7bc512="" onClick={()=>changeRowExpandState(rowIndex)}>
                    <i className={iconClassName} data-v-0c7bc512=""></i>
                </td>
                {tableRow}
            </tr>)]
            if (isRowExpanded){
                renderedRows.push(renderExpandRowFunc(row))
            }
            return renderedRows
        })
        return <tbody className="vue3-easy-data-table__body row-alternation" data-v-0c7bc512="">
        {tableBody.flatMap(item=>item)}
        </tbody>
    }

    nextPage(delta){
        let newPageNumber = this.state.pageNumber + delta
        if ((delta === 1 && ((this.state.pageNumber * 25) <= this.props.rows.length)) || (delta === -1 && (newPageNumber > 0))){
            this.setState({pageNumber: newPageNumber})
        }
    }

    renderTableFooter(){
        let startNumber = ((this.state.pageNumber - 1 ) * 25) + 1
        let endNumber = this.state.pageNumber * 25
        let changeNumber = this.nextPage
        let nextPageClasseName = (this.props.rows.length < endNumber )? "next-page__click-button last-page": "next-page__click-button"
        let previewPageClassName = (this.state.pageNumber === 1 )? "previous-page__click-button first-page": "previous-page__click-button"
        return <div className="vue3-easy-data-table__footer" data-v-0c7bc512="">
            <div className="pagination__rows-per-page" data-v-0c7bc512="">rows per page:
                <div className="easy-data-table__rows-selector" data-v-09dad912="" data-v-0c7bc512="" style={{"--7fe9410c":"#FFC40C"}}>
                    <div className="rows-input__wrapper" data-v-09dad912="">
                        <div className="rows-input" data-v-09dad912="">25</div>
                        <div className="triangle" data-v-09dad912=""></div>
                    </div>
                    <ul className="select-items" data-v-09dad912="">
                        <li className="selected" data-v-09dad912="">25</li>
                        <li className="" data-v-09dad912="">50</li>
                        <li className="" data-v-09dad912="">100</li>
                    </ul>
                </div>
            </div>
            <div className="pagination__items-index" data-v-0c7bc512="">{startNumber}–{endNumber} of {this.props.rows.length}</div>
            <div className={previewPageClassName} data-v-c9da5286="">
                <span className="arrow arrow-right" data-v-c9da5286="" onClick={()=>changeNumber(-1)}></span>
            </div>
            <div className={nextPageClasseName} data-v-c9da5286="">
                <span className="arrow arrow-left" data-v-c9da5286="" onClick={()=>changeNumber(1)}></span>
            </div>
        </div>
    }
    render() {
        return <div className="vue3-easy-data-table data-table font-mono" style={{"--02c8cecc": "180px"}} updatepage="" data-v-0c7bc512="">
            <div className="vue3-easy-data-table__main fixed-header hoverable" data-v-0c7bc512={""}>
                <table data-v-0c7bc512="">
                    <colgroup data-v-0c7bc512="">
                        <col data-v-0c7bc512=""/>
                        <col data-v-0c7bc512=""/>
                        <col data-v-0c7bc512=""/>
                        <col data-v-0c7bc512=""/>
                        <col data-v-0c7bc512=""/>
                        <col data-v-0c7bc512=""/>
                    </colgroup>
                    {this.renderTableHeader()}
                    {this.renderTableBody()}
                </table>
            </div>
            {this.renderTableFooter()}
        </div>
    }
}

export default EasyDataTable