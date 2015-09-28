import React from 'react';
import './SearchBar.scss';
import VoteInfoActionCreator from '../../actions/VoteInfoActionCreator';
import {REGION, INPOT} from '../../constant/FilterType';



export default class SearchBar extends React.Component{
  constructor(){
    super();
    this.state = { listVisible: false, FilterText: 'Filter' };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
  }
  selectItem(index){
    this.setState({ listVisible: false, FilterText: this.props.filters[index]});
  }
  showDropDownList() {
    this.setState({ listVisible: true });
  }
  _toggleDropDownList(e){
    let targetClassList = e.target.classList;
    if(targetClassList.contains('dropItemArea') || targetClassList.contains('dropItem')){
      return;
    }
    if(this.state.listVisible === true){
      this.setState({ listVisible: false });
    }
  }
  componentDidMount(){
    if(document !== undefined){
      document.querySelector('body').addEventListener('click', this._toggleDropDownList.bind(this));
    }
  }
  componentWillUnmount(){
    document.querySelector('body').removeEventListener('click', this._toggleDropDownList.bind(this));
  }
  _search(){
    let filterText = React.findDOMNode(this.refs.inputBox).value;
    let filterType = '';
    switch (this.state.FilterText) {
      case 'Region':
        filterType = REGION;
      break;
      case 'Last Inpot':
        filterType = INPOT;
      break;
      default:
        return;
    }
    VoteInfoActionCreator.searchInfo(filterType, filterText);
  }
  render(){
    return (
      <div className='SearchBar'>
        <div className='barDropMenu'>
          <span className='placeHolder'>{this.state.FilterText}</span>
          <div className='fa fa-sort-desc dropMenuIcon' onClick={this.showDropDownList.bind(this)} />
          {
            this.state.listVisible === false ? '' :
            <div className='dropDownList'>
              {
                this.props.filters.map((item, index) => {
                  return (
                    <div key={index} className='dropItemArea' onClick={this.selectItem.bind(this, index)}>
                      <div className='dropItem'>{item}</div>
                    </div>
                  );
                })
              }
            </div>
          }
        </div>
        <input className='TextInput' type='text' ref='inputBox'
          placeholder='Search'/>
        <button className='fa fa-search fa-lg serachButton' onClick={this._search.bind(this)}/>
      </div>
    );
  }
}

SearchBar.defaultProps = {
  filters: ['Region', 'Last Inpot']
};
