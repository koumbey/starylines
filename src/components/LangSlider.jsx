import {Component} from "react";
import {Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../css/langSlider.css";
import { useSwiper } from 'swiper/react';
import {FreeMode, Keyboard, Navigation} from "swiper";
import PropTypes from "prop-types";

function SlideNextButton(props) {
  const swiper = useSwiper();
  if (props.orient === "left") {
    return (
        <button onClick={() => swiper.slidePrev()}>
          <svg
              className="prev w-12 fill-gray hover:fill-mikado"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
          >
            <path d="M16 8v-4l8 8-8 8v-4h-16l8-8h8z"/>
          </svg>
        </button>
    );
  }
  else{
    return  <button onClick={() => swiper.slideNext()}>
      <svg
          className="w-12 fill-gray hover:fill-mikado"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
      >
        <path d="M16 8v-4l8 8-8 8v-4h-16l8-8h8z" />
      </svg>
    </button>
  }
}


class LangSlider extends Component{
  static propTypes = {
    categories: PropTypes.arrayOf(PropTypes.string).isRequired
  }
  constructor(props) {
    super(props);
    this.state = {selected: this.props.selected}
    this.onCategoryClick = this.onCategoryClick.bind(this)
  }

  setState(state, callback) {
    super.setState(state, callback);
  }

  onCategoryClick(category){
    this.setState({selected: category})
    if (this.props.callback){
      this.props.callback(category)
    }
  }
  renderSwiperSlides(category){
    return category.map((item, ind) =>{
      let className = "max-h-16 category-img max-w-16 sm:max-h-18 sm:max-w-18 md:max-h-20 md:max-w-20 lg:max-h-24 lg:max-w-24 xl:max-h-28 xl:max-w-28 lang-logo"
      if ((this.state.selected === "all") || (this.state.selected === item)){
        className = className + " logo-selected";
      }
      return <SwiperSlide className="px-2 !mx-0 single-category" key={ind}>
        <img
            className={className}
            alt="cat"
            src={"logos/" + item + ".png"}
            onClick={() => this.onCategoryClick(item)}
        />
        <p className="category-name">{item.split(' ').map(str=>str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()).join(' ') }</p>
      </SwiperSlide>
    })

  }

  renderSwiper(){
    let category = this.props.categories
    return  <div className="lang-wrapper">
      <Swiper
          grabCursor={true}
          slideToClickedSlide={true}
          centeredSlides={true}
          loop={true}
          modules={[Keyboard, Navigation, FreeMode]}
          breakpoints={{'1280': {slidesPerView: 7}}}
          navigation={true}
          freeMode={true}
          keyboard={{enabled: true}}
          slidesPerView={5}
      >
        {this.renderSwiperSlides(category)}
        <div id="swiper-buttons" className="flex justify-between mb-4 mt-4 mx-4">
          <SlideNextButton orient={"left"}/>
          <SlideNextButton orient={"right"}/>
        </div>
      </Swiper>
    </div>
  }
  render() {
    return (
          <div className="my-12">
            <div className="titl">
            </div>
            <hr className="border1" style={{width: "100%", align: "center", marginTop: "-3em", color: "white"}}/>
              <div className="tit">
              </div>
            {this.renderSwiper()}
          </div>
          )
  }
}


export default LangSlider

