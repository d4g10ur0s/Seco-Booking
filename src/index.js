import React from 'react';

import ReactDOM from 'react-dom/client';
import './index.css';

import psalidi from './img/psalidi.png'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function isInt(n){
  try{
    n=parseInt(n);
  }catch(e){
    return false;
  }
    return Number(n) === n && n % 1 === 0;
}

function isFloat(n){
  try{
    n=parseFloat(n);
  }catch(e){
    return false;
  }
    return Number(n) === n && n % 1 !== 0;
}

class ServicesContent extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      service:this.props.service,
    };
  }

  render(){
    return(
      <Container  className="banner-text services-content-container">
        <Container  className="row">
          <h3 className="service-header">
            {this.state.service.title}
          </h3>
        </Container>
        <Container  className="banner-text row justify-content-center">
          <Container  className="column service-cell" style={{'width' : '20%'}}>
            {'Duration : ' + this.state.service.duration + ' min'}
          </Container>
          <Container  className="column service-cell" style={{'width' : '20%'}}>
            {'Cost : ' + this.state.service.cost + ' eur'}
          </Container>
          <Container  className="column service-cell" style={{'width' : '20%'}}>
            {'MyCost : ' + this.state.service.myCost + ' eur'}
          </Container><br />
          <Container  className="column service-cell">
            {this.state.service.description}
          </Container>
      </Container>
    </Container>
    );
  }
}

class ServicesAddition extends React.Component {

  renderBrakes(){
    return(<input className="services-breaks" type='text' />);
  }

  addBrakes(){
    var arr = this.state.brakes;
    arr.push(this.renderBrakes());
    this.setState({brakes:arr});
  }

  renderBr(){
    return(<br />);
  }

  constructor(props) {
    super(props);
    this.forceUpdate(this.addBrakes);
    this.state = {
      brakes : [this.renderBr()],
      title : null,
      duration : null,
      cost : null,
      myCost : null,
      description : '',
      no_problem : [false,false,false,false,false],
    };

    this.getTitle = this.getTitle.bind(this);
    this.getDuration = this.getDuration.bind(this);
    this.getCost = this.getCost.bind(this);
    this.getMyCost = this.getMyCost.bind(this);
    this.getDescription = this.getDescription.bind(this);
  }

  async getTitle(event){//edw apla check an einai null
    var arr = this.state.no_problem;
    await this.setState({title: event.target.value});
    if(typeof(event.target.value)=='string' && event.target.value.length > 0){
      arr[0] = true;
    }else{arr[0]=false;}
    await this.setState({no_problem : arr});
  }

  async getDuration(event){//bro prepei na paizei monada metrhshs :P
    var arr = this.state.no_problem;
    await this.setState({duration: event.target.value});
    if(isInt(event.target.value) && event.target.value.length > 0){
      arr[1] = true;
    }else{arr[1]=false;}
    await this.setState({no_problem : arr});
    }

  async getCost(event){//to kostos float
    var arr = this.state.no_problem;
    await this.setState({cost: event.target.value});
    if( ( isInt(event.target.value) || isFloat(event.target.value) ) && event.target.value.length > 0){
      arr[2] = true;
    }else{arr[2]=false;}
    await this.setState({no_problem : arr});
  }

  async getMyCost(event){//to kostos float
    var arr = this.state.no_problem;
    await this.setState({myCost: event.target.value});
    if( ( isInt(event.target.value) || isFloat(event.target.value) ) && event.target.value.length > 0){
      arr[3] = true;
    }else{arr[3]=false;}
    await this.setState({no_problem : arr});
  }

  async getDescription(event){//to kostos float
    var arr = this.state.no_problem;
    await this.setState({description: event.target.value});
    if( event.target.value.length > 0 ){
      arr[4] = true;
    }else{arr[4]=false;}
    await this.setState({no_problem : arr});
  }

  render (){
    return(
      <Container  style={{'padding-top' : '1%', 'padding-bottom' : '2%'}}>
        <form className="services-form">
            <label className="services-labels banner-text"> Title </label>
            <input className="services-input" type='text' value={this.state.title} onChange={this.getTitle}/>
            <label className="services-labels banner-text"> Duration </label>
            <input className="services-duration-tag" type='text' value={this.state.duration} onChange={this.getDuration}/><label className="unit-label"> min </label>
            <label className="services-labels banner-text"> Cost </label>
            <input className="services-duration-tag" type='text' value={this.state.cost} onChange={this.getCost}/><label className="unit-label"> eur </label>
            <label className="services-labels banner-text"> myCost </label>
            <input className="services-duration-tag" type='text' value={this.state.myCost} onChange={this.getMyCost}/><label className="unit-label"> eur </label><br />
            <label className="services-description-label banner-text" style={{'paddingLeft':'1%','paddingRight':'1%'}}> Description </label><br />
            <textarea className="services-description" type='text' value={this.state.description} onChange={this.getDescription}/><br />
            <label className="services-submit" style={{'paddingLeft':'1%','paddingRight':'1%'}} onClick={() => this.addBrakes()}>Add Break</label>
            {this.state.brakes.slice()}
            <button className="services-submit" onClick={(event) => this.props.onClick_2(event,this.state.title,this.state.duration,this.state.cost,this.state.myCost,this.state.no_problem,this.state.description)}>Submit</button>
        </form>
      </Container>
    );
  }
}


class ServicesMain extends React.Component{

  async retrieveService(){
    // Default options are marked with *
    const response = await fetch('http://localhost:8080/retrieveService', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify('') // body data type must match "Content-Type" header
    });
    var rsp = await response.json();

    //prepei na epistrepsw services
    this.setState({services : rsp.serv});

  }

  renderServices(){
    var arr = [];
    if(this.state.services !== null){
      for(var i in this.state.services){
        arr.push(<ServicesContent service = {this.state.services[i]}/>)
      }
    }else{
      arr = [null];
    }
    return arr;
  }

  constructor(props) {
    super(props);
    this.state = {
      services : null,
      services_input : this.props.services_input,
    };
    this.retrieveService();
  }

  render(){
    var arr = this.renderServices();

    return (
      <Container  className="services-layout">
        <h1> Your Services </h1>
        <Container>
          {this.state.services_input}
        </Container>
        <Container className="justify-content-center" style={{'paddingTop' : '1%','paddingBottom' : '1%'}}>
          {arr.slice()}
        </Container>
      </Container>
    );
  }
}

class ServicesOptions extends React.Component{

  render(){
    return (
      <Container className="option-border services-options ">
        <button className="justify-content-center options-button services-option-button" role={"button"} onClick={() => this.props.onClick_1()}>
          Add Service
        </button>
        <button className="justify-content-center options-button services-option-button" type={"button"} role={"button"} onClick={() => this.props.onClick()}>
          Modify Service
        </button>
        <button className="justify-content-center options-button services-option-button" type={"button"} role={"button"} onClick={() => this.props.onClick()}>
          Delete Service
        </button>
      </Container>
    );
  }

}

class ServicesLayout extends React.Component{

  async saveService(service){
    //save Service
    // Default options are marked with *
    const response = await fetch('http://localhost:8080/addService', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(service) // body data type must match "Content-Type" header
    });
    //telos
  }

  async addService(event,title,duration,cost,myCost,arr,description,brakes){

    event.preventDefault();
    //8a paizei parametros, an einai true synexizw alliws pistoli
    var service = {
      title : title,
      duration : duration,
      cost: cost,
      myCost: myCost,
      description : description,
      brakes : brakes
    };

    if(arr[0] && arr[1] && arr[2] && arr[3]){

      this.saveService(service);

      await this.setState( (state, props) => ({
        services_layout : null,
      }));

      await this.setState( (state, props) => ({
        services_layout : <ServicesMain services_input={null} services={[null]}/>,
      }));

    }

  }

  async addServices(){
    var sadd = this.renderServicesAddition();
    await this.setState( (state, props) => ({
      services_layout : null,
    }));
    await this.setState( (state, props) => ({
      services_layout : <ServicesMain services_input={sadd} services={[null]}/>,
    }));
  }//isws na ginetai ke kalutero...

  renderServicesAddition(){
    return <ServicesAddition onClick={() => this.addService()} onClick_2={(title,duration,cost,myCost,arr,description,brakes) => this.addService(title,duration,cost,myCost,arr,description,brakes)}/>;
  }

  constructor(props) {
    super(props);
    this.state = {
      newService : {
        title : '',
        duration : 123,
        cost: 0,
        myCost: 0,
        description : '',
        brakes : []
      },
      services_layout : <ServicesMain services_input={null} services={[null]}/>,
    };

  }

  render(){

    return(
      <div className="row">
        <div className="row" style={{'paddingTop' : '1%'}}>
          <ServicesOptions onClick_1={() => this.addServices()}/>
        </div>
        <div className="row" style={{'paddingTop' : '1%','paddingBottom' : '1%'}}>
          {this.state.services_layout}
        </div>
      </div>
    );
  }
}

class DayContentCell extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      num : this.props.num,
      day : this.props.day,
    };
  }

  render(){
    return (
      <td className='calendar-day-button' role='button' onClick={() => this.props.onClick(this.state.num,this.state.day)}>
        {this.state.num}
      </td>
    );
  }
}

class DayNameCell extends React.Component{

  render(){
    return (
      <th className='calendar-day-names'>
        {this.props.name}
      </th>
    );
  }
}

class DayContent extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      num : this.props.num,
      day : this.props.day,
    };
  }

  renderHour(i){
    if(i - 10 < 0){i='0'+i;}
    return (
      <Container className="row">
        <h5 className="day-content-hour-header">{i+':00'}</h5>
      </Container>
    );
  }

  renderHours(){
    var arr = [];
    for(var i=8; i<23; i++){
      arr.push(this.renderHour(i));
    }
    return arr;
  }

  render(){
    var month_name = new Date();

    return (
      <Container className="day-content">
        <h1 className='banner-text day-content-header'>
          {this.state.day + ' ' +this.state.num + ' of ' + month_name.toLocaleString('default', { month: 'long' })}
        </h1>
        {this.renderHours().slice()}
      </Container>
    );
  }

}

class CalendarLayout extends React.Component{

  constructor(props) {
    super(props);
    var arr_with_names = this.get_days_names();
    var calendar_days = this.get_days_content();
    this.state = {
      content : this.renderCalendar(arr_with_names,calendar_days),
    };
  }

  renderDay(daynum,dayname){return(<DayContent num={daynum} day={dayname}/>); }

  async dayClick(daynum,dayname){
    if(dayname !== undefined){
      await this.setState({content : this.renderDay(daynum,dayname) });
    }
  }

  renderCalendar(arr_with_names,calendar_days){
    return(
      //8a prepei na epistrefei oloklhro to calendar
      <table className="calendar-table">
        <tr>
          {arr_with_names}
        </tr>
        <tr>
          {calendar_days.slice(0,7)}
        </tr>
        <tr>
          {calendar_days.slice(7,14)}
        </tr>
        <tr>
          {calendar_days.slice(14,21)}
        </tr>
        <tr>
          {calendar_days.slice(21,28)}
        </tr>
        <tr>
          {calendar_days.slice(28,35)}
        </tr>
      </table>
    );
  }

  renderDayNameCell(i){return(<DayNameCell name={i} />);}

  renderDayCell(i,dayname){return(<DayContentCell num={i} day={dayname} onClick={(daynum,dayname) => this.dayClick(daynum,dayname)}/>);}

  get_days_content(){
    var day_names = [ "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth()+1, 0).getDate();
    var day_num = [];
    for(var i = 0; i<(firstDay.getDay() - 1); i++){
      day_num.push(this.renderDayCell(' '));
    }//gia na valw kena

    for(i = 1; i<=lastDay; i++){
      day_num.push(this.renderDayCell(i,day_names[(day_num.length)%7]));//mod
    }
    var stath = 35 - day_num.length;
    for(i=0; i<stath; i++){
      day_num.push(this.renderDayCell(' '));
    }

    return day_num;
  }

  get_days_names(){
    var day_names = [ "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    var arr_with_names = [];
    for (var i in day_names){
      arr_with_names.push(this.renderDayNameCell(day_names[i]));
    }
    return arr_with_names;
  }

  render(){

    return(
      //8a prepei na epistrefei oloklhro to calendar
      <Container >
        {
          this.state.content
        }
      </Container>
    );
  }
}

class OptionsLayout extends React.Component{//to layout me ola ta options

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render (){
    return (
      <Container  className="color option-border" style={{'paddingRight' : '5%','paddingLeft' : '5%','margin-left' :'1%'}}>
        <Row className="generic-option-button justify-content-center options-button" role={"button"} onClick={() => this.props.onClick_2()}>
          Calendar
        </Row>
        <Row className="generic-option-button justify-content-center options-button" type={"button"} role={"button"} onClick={() => this.props.onClick_1()}>
          Services
        </Row>
      </Container >
    );
  }

}

class MainLayout extends React.Component {//to main layout ths selida

  constructor(props) {
    super(props);
    this.state = {
      content : this.renderCalendarLayout(),
    };
  }

  renderServicesLayout(){return (<ServicesLayout />);}

  renderCalendarLayout(){return (<CalendarLayout />);}

  handleServicesClick(){this.setState({content : this.renderServicesLayout()});}

  async handleCalendarClick(){//edw paizei 8ema
    await this.setState({content : null});
    await this.setState({content : this.renderCalendarLayout()});
    this.forceUpdate();
  }

  render(){
    return (
      <Container fluid className="main-layout-color">
        <Row>
          <Col className="col-md-2" style={{'paddingTop' : '1%'}}>
            <OptionsLayout onClick_1={() => this.handleServicesClick()} onClick_2={() => this.handleCalendarClick()}/>
          </Col >
          <Col style={{'paddingTop' : '1%'}}>
            {this.state.content}
          </Col>
        </Row>
      </Container>
    );
  }
}

class Banner extends React.Component {//to banner ths selidas
  render(){
    return (
    <Container fluid className="banner-color justify-content-center" >
      <Row md="auto">
        <div className="h1 banner-text d-flex"> Seco Haircuts </div>
      </Row>
    </Container>
  );
  }
}

class SecoPage extends React.Component {//main app
  render(){
    return (
        <div className="main-layout-color">
          <Banner />
          <MainLayout />
        </div>
    )
  }
}


class ClientOptions extends React.Component {

  render(){
    return (
      <div className="row client-option-container">
      <button className="col client-option-button">
        About
      </button>
      <button className="col client-option-button">
        Achievements
      </button>
      <button className="col client-option-button">
        Services
      </button>
      <button className="col client-option-button">
        Appointement
      </button>
      <button className="col client-option-button">
        Contact
      </button>
      </div>
    );
  }

}

class ContactInfo extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      header : this.props.header,
      content : this.props.content,
      links : this.props.links,
    };

  }

  render(){
    return(
      <div className="col contact-header">
      {this.state.header}
        <div className="row contact-info">
          {this.state.content}
          {this.state.links}
        </div>
      </div>
    );
  }
}

class ClientContact extends React.Component{

  renderLink(){
    return(
      <div className="social-links">
      <a className="the-ref" href="https://www.facebook.com">
        Facebook
      </a>
      |
      <a className="the-ref" href="https://www.facebook.com">
        Instagram
      </a>
      </div>
    );
  }

  render(){
    var l1 = this.renderLink();
    return(
      <div className="row client-contact">
        <div className="col h1">
          isws kapoia licences
        </div>
        <div className="col">
          <div className="row">
          <ContactInfo header={'EMAIL'} content={'mplampla@hotmail.com'}/>
          <ContactInfo header={'FOLLOW'} links={l1} />
          <ContactInfo header={'CALL US'} content={'+30 6923587634'} />
          </div>
          <div className="row">
          <ContactInfo header={'HOURS'} content={'mplampla@hotmail.com'} />
          </div>
        </div>
      </div>
    );
  }

}


class BookingDaysContainer extends React.Component{

  render(){
    return(
      <form className="form-inline booking-days-container col">
        <label>
          Choose Day & Hour
        </label>
        <input type="date" className="row booking-calendar">
        </input>
      </form>
    );
  }

}

class BookingForm extends React.Component {

  render(){
    return (
      <form className="booking-container col-6">
        <h2 style={{'color' : '#FFFFFFFF'}}>
          Contact Info
        </h2>
      <input className="row booking-input" type="text" placeholder="Name">
      </input>
      <input className="row booking-input" type="text" placeholder="Sirname">
      </input>
      <input className="row booking-input" type="text" placeholder="Phone">
      </input>
      <input className="row booking-input" type="text" placeholder="E-Mail">
      </input>
      <button className="book-button">
        Submit
      </button>
      </form>
    );
  }

}

class ClientService extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      title : this.props.service.title,
      duration : this.props.service.duration + ' min',
      cost : this.props.service.cost + ' eur',
      description : this.props.service.description,
      book : null,
      bookdays: null,
    }
    this.addBookingForm = this.addBookingForm.bind(this);
  }

  async addBookingForm(){
    await this.setState( (state, props) => ({
      book : <BookingForm />,
      bookdays : <BookingDaysContainer />,
    }));
  }

  render(){
    return (
      <div className="row">
        <div className="column service-heads">
          {this.state.title}
        </div>
        <div className="column service-heads">
          {this.state.duration}
          &#128337;
        </div>
        <div className="column service-heads">
          {this.state.cost}
        </div>
        <div className="row description-row">
          <div className="column description-container">
            <h3 className="services-banner">
              {"Description"}
            </h3>
            <div style={{'font-size' : '25px'}}>
              {this.state.description}
            </div>
            </div>
            <button className="book-button" onClick={this.addBookingForm}>
              Book Now
            </button>
        </div>
        <div className="row">
          {this.state.book}
          {this.state.bookdays}
        </div>
      </div>
    );
  }
}

class ClientServices extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      serv : null,
    };

    this.retrieveService();

  }

  async retrieveService(){
    // Default options are marked with *
    const response = await fetch('http://localhost:8080/retrieveService', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify('') // body data type must match "Content-Type" header
    });
    var rsp = await response.json();
    var ret = await this.renderServices(rsp);
    return ret;
  }

  renderService(content){
    return(
      <div className="container service-container h1">
        <ClientService service={content}/>
      </div>
    );
  }

  async renderServices(content){
    var arr = [];
    content = content.serv;

    for(var i in content){
      console.log(content[i]);
      arr.push(this.renderService(content[i]));
    }

    await this.setState({serv : arr})

  }


  render(){

    return (
      <div className="row about-background client-about">
      <h1 className="services-banner">
        Services<br />
        <img className="desc-img"
          src={psalidi}
        />
      </h1>
      {this.state.serv}
      </div>
    );
  }

}

class SlideShow extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      content : ["https://wallpaperaccess.com/full/926989.jpg",
                "https://picstatio.com/large/57d450/anime-girl-digital-art.jpg"
              ],
      p : 0,
    };
    this.nextImage= this.nextImage.bind(this);
    this.previousImage= this.previousImage.bind(this);
  }

  previousImage(){
    var p = this.state.p-1;
    if(p<0){p = this.state.content.length - 1;}
    this.setState( (state,props) => ({
      p : p,
    }));
  }

  nextImage(){
    var p = this.state.p+1;
    if(p>this.state.content.length-1){p=0;}
    this.setState( (state,props) => ({
      p : p,
    }));
  }

  render(){
    return(
      <div className="slider-container">
      <a class="prev" onClick={this.previousImage}>❮</a>
      <a class="next" onClick={this.nextImage}>❯</a>
      <img className="slider-image"
          src={this.state.content[this.state.p]}
          alt="example"
        />
      </div>
    );
  }

}

class ClientAchievements extends React.Component {

  render (){
    return (
      <div className="row about-background client-achievements">
          <SlideShow />
      </div>
    );
  }


}

class ClientAbout extends React.Component{

  render(){
    return(
      <div className="row about-background">
        <div className="column justify-content-center seco-about">
          <h2>
            About
          </h2>
          <div className="container-fluid info-about">
            aa
            q
            qq
            qq
            qq
            qq
          </div>
        </div>
        <div className="column photo-container">
          Edw lew na mpei mia photo
        </div>
      </div>
    );
  }

}

class ClientBanner extends React.Component {

  render(){
    return(
      <div className="row client-banner">
        <div className="client-logo h1 col">EDW 8A MPEI FASH ME LOGO</div>
        <div className="h1 col">
         <ClientOptions />
        </div>
      </div>
    );
  }

}

class ClientPage extends React.Component {

  render(){
    return(
      <div className="main-background">
        <ClientBanner />
        <ClientAbout />
        <ClientAchievements />
        <ClientServices />
        <ClientContact />
      </div>
    );
  }

}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Routes>
      <Route path='/' element={<ClientPage />}>
      </Route>
      <Route path='/seco' element={<SecoPage />}>
      </Route>
    </Routes>
  </Router>
);
