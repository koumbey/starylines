import {Component} from "react";
import '../css/datatable.css'
import EasyDataTable from "./EasyDataTable";
import LangSlider from "./LangSlider";

class DataTable extends Component{

    constructor(props) {
        super(props);
        this.state = {data: [], filters: {}, columns: [], rows: [], search: "", categories: []}
        this.isLoaded = false
        this.parseData = this.parseData.bind(this)
        this.filterRows = this.filterRows.bind(this)
        this.resetAll = this.resetAll.bind(this)
        this.onContextSelect = this.onContextSelect.bind(this)
        this.applyFilters = this.applyFilters.bind(this)
        this.onSearch = this.onSearch.bind(this)
    }
    setState(state, callback) {
        super.setState(state, callback);
    }

    filterRows(category){
        let filters = this.state.filters
        filters["Tool"] = category
        let rows = this.applyFilters(filters)
        this.setState({rows: rows, filters: filters})
    }

    applyFilters(filters){
        let result = this.state.data
        if (filters) {
            result = this.state.data.filter(item => Object.keys(filters).every(k => item[k].toLowerCase() === filters[k].toLowerCase()))
        }
        return result
    }

    parseData(dataStr){
        const temp = dataStr.substring(47).slice(0, -2);
        const json = JSON.parse(temp);
        const colNames = json.table.rows[0].c.map(item => {return {name: item.v, key: item.v}})
        let categories = []
        let lowerCategories = []
        let jsonArrays = json.table.rows.slice(1).map(row => {
            let newRow = {}
            colNames.forEach((col, index) =>{
                if (col.name){
                    newRow[col.name] = row.c[index].v
                }
            })
            let category = newRow["Tool"]
            if (!lowerCategories.includes(category.toLowerCase())){
                categories.push(category)
                lowerCategories.push(category.toLowerCase())
            }
            return newRow
        })
        let displayCols = ["Project", "Tool", "Context",  "Classification", "Link"].map(item => {return {name: item, key: item}})
        this.setState({data: jsonArrays, columns: displayCols, rows: jsonArrays, categories:categories})
    }

    onSearch(event){
        event.preventDefault()
        let searchValue = event?.target?.value
        let rows = this.applyFilters(this.state.filters)
        if (searchValue && searchValue !== this.state.search){
            let value = searchValue.toLowerCase()
            rows = rows.filter(item => (item["Project"].toLowerCase().includes(value) || item["Classification"].toLowerCase().includes(value)))
        }
        this.setState({rows: rows, search: searchValue})
    }
    resetAll(){
        this.setState({rows: this.state.data, filters: {}, search: ""})
    }

    componentDidMount() {
        let url = "https://docs.google.com/spreadsheets/d/";
        let sheet_id = "1s4Die_W5Euxq2Hi1rznWMQm5GKZ9v7EjjdzXOpiCS2A";
        let query1 = "/gviz/tq";
        let endpoint = `${url}${sheet_id}${query1}`;
        if (! this.isLoaded) {
            fetch(endpoint, {method: "GET"}).then((res) => res.text()).then(this.parseData)
            this.isLoaded = true
        }

    }

    onContextSelect(event){
        event.preventDefault()
        let selectedValue = event?.target?.value
        let filters = this.state.filters
        if (selectedValue){
            console.log(selectedValue)
            filters["Context"] = selectedValue
        }else{
            delete filters["Context"]
        }
        let rows = this.state.data.filter(item => Object.keys(filters).every(k=> item[k] === filters[k]))
        this.setState({rows: rows, filters: filters})
    }

    renderGridHeader(){
       return <div className="w-full mb-6 md:mb-0" key={"GridHeader"}>
            <div className="project-details-container">
                <div className="usage-filter count-box"></div>
                <div className="titl">
                    <h1 className="Software_heading"><u>PROJECTS IN PORTFOLIO</u> </h1>
                    <h2 className="Software_heading2">Swipe & Click Icons to Filter </h2>
                </div>
            </div>
            <div className="relative filter-section  mb-4">
                <div className="usage-filter">
                    <input
                        onKeyUp={this.onSearch}
                        placeholder="Search Engine"
                        className="block appearance-none bg-gray-200 border border-gray-200 text-gray-700 py-1 px-1 pr-1 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-state"
                    />
                </div>
                <div className="usage-filter second-filter">
                    <select onChange={event => this.onContextSelect(event)} className="Select="> >
                    <option value="">Context</option>
                    <option value="Education">Education</option>
                    <option value="Company">Company</option>
                    <option value="Personal">Personal</option>
                </select>
            </div>
            <button onClick={this.resetAll} className="bg-gray-200 reset-btn  text-dark font-bold py-1 px-1">Reset</button>

    </div>
    </div>
    }
    render() {
        return (
            <div className="mx-0 sm:mx-12 md:mx-16 lg:mx-20" key={'swiper'}>
                <LangSlider categories={this.state.categories} callback={this.filterRows} selected={this.state.filter}/>
                <hr className="border2" style={{width: "100%", align: "center", marginTop: "-3em",marginBottom: "2.5em", color: "white"}}/>
                {this.renderGridHeader()}
                <EasyDataTable columns={this.state.columns} rows={this.state.rows} key={"Grid"} expandColumns={["Details", "Description"]}/>
            </div>
        )

    }
}



export default DataTable