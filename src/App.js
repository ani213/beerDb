import React, { Component } from 'react';
import "./App.css"
export class App extends Component {
  state={
    data:null,
    error:null,
    prev:0,
    next:20,
    no:20,
    selectedData:null,
    totalPage:null,
    pageNo:1,
    search:null,
    searchData:null
  }
    componentDidMount=()=>{
   
      fetch(` https://s3-ap-southeast-1.amazonaws.com/he-public-data/beercraft5bac38c.json`,{
          method:"GET",
          headers:new Headers({
              "Content-Type":"application/json",
          }),
      }).then((response)=>{
          if(response.ok){ 
              response.json().then((data)=>{
                let totalPage=Math.ceil(data.length/this.state.no)
                  // console.log(data)
                  this.setState({
                    data:data,
                    selectedData:data.slice(this.state.prev,this.state.next),
                    totalPage:totalPage,
                  })
                  
              })
          }else{
            this.setState({
              error:"Error in API"
            })
          }
      })
      // let data=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]
      // let totalPage=Math.ceil(data.length/this.state.no)
      // this.setState({
      //   data:data,
      //   selectedData:data.slice(this.state.prev,this.state.next),
      //   totalPage:totalPage,
      // })
  }
  handleBack=()=>{
    if(!this.state.search){
      if(this.state.prev!==0 && this.state.prev>0){
        this.setState({
          selectedData:this.state.data.slice(this.state.prev-this.state.no,this.state.prev),
          prev:this.state.prev-this.state.no,
          next:this.state.prev,
          pageNo:this.state.pageNo-1
        })
      }
    }else{
      if(this.state.prev!==0 && this.state.prev>0){
        this.setState({
          selectedData:this.state.searchData.slice(this.state.prev-this.state.no,this.state.prev),
          prev:this.state.prev-this.state.no,
          next:this.state.prev,
          pageNo:this.state.pageNo-1
        })
      }
    }
    
  }
  handleForword=()=>{
    if(!this.state.search){
      if(this.state.next<this.state.data.length && this.state.next!==this.state.data.length){
        this.setState({
          selectedData:this.state.data.slice(this.state.prev+this.state.no,this.state.next+this.state.no),
          prev:this.state.prev+this.state.no,
          next:this.state.next+this.state.no,
          pageNo:this.state.pageNo+1
        })
      }
    }else{
      if(this.state.next<this.state.searchData.length && this.state.next!==this.state.searchData.length){
        this.setState({
          selectedData:this.state.searchData.slice(this.state.prev+this.state.no,this.state.next+this.state.no),
          prev:this.state.prev+this.state.no,
          next:this.state.next+this.state.no,
          pageNo:this.state.pageNo+1
        })
      }
    }
  }
 randomImage=()=>{
  let images=['https://s3-ap-southeast-1.amazonaws.com/he-public-data/csm_01_02-2019_Beer_Brewing_53ef2818e58285158.png','https://s3-ap-southeast-1.amazonaws.com/he-public-data/Swedish_beerb2d62a0.jpg',
  'https://s3-ap-southeast-1.amazonaws.com/he-public-data/EVEREST_SPECIAL_LIMITED_EDITION_BEER_POKHARA_NEPAL_FEB_2013_28851073145129_201905131625260ec63f6.jpg',
   "https://s3-ap-southeast-1.amazonaws.com/he-public-data/https%20_specials-images.forbesimg.com_imageserve_5e325c56f133f400076b17b9_0x03b6f8ad.jpg",
  "https://s3-ap-southeast-1.amazonaws.com/he-public-data/low-calorie-beers-157981804958062d8.jpg"]
   return images[Math.floor(Math.random() * Math.floor(5))]
 }  
 handleOnChange=(e)=>{
  let searchData=this.state.data && this.state.data.filter((ele)=>{
    return ele.name.toLowerCase().includes(e.target.value.toLowerCase())
  })
  
  this.setState({
    search:e.target.value,
    selectedData:searchData.slice(0,this.state.no),
    totalPage:Math.ceil(searchData.length/this.state.no),
    pageNo:1,
    prev:0,
    next:20,
    searchData:searchData
  })
 }
  render() {
    console.log(this.state.selectedData,this.state)
    return (
      <div>
          <div>
            <input placeholder="Search beer" name="search" value={this.state.search||""} onChange={this.handleOnChange}/>
          </div>
            <div className="item-container">
              {
               (this.state.selectedData) && this.state.selectedData.map((ele,index)=>{
                  return(
                    <div key={index} className="ani-card">
                      <img src={this.randomImage()} className="img"/>
                      <div>
                       <h4><span className="heading">Name : </span> <span className="heading">{ele.name}</span></h4>
                       <h4><span className="heading">Style : </span><span className="heading">{ele.style}</span></h4>
                       <h4><span className="heading">Ounce : </span><span className="heading">{ele.ounces}</span></h4>
                      </div>
                   </div>
                  )
                })
              }
            </div>
          <div>
             <div>
              <button onClick={this.handleBack}>Back</button>
              <p>{this.state.pageNo}</p>
              <button onClick={this.handleForword}>Forword</button>
              </div>
              <div>
              {this.state.totalPage && <h3>{this.state.totalPage}</h3>}
              </div>
          </div>
      </div>
    )
  }
}

export default App
