import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import RegionBar from '../RegionBar/RegionBar';

import './ContentArea.scss';

export default class ContentArea extends React.Component{
  constructor(){
    super();
  }
  render(){
    let voteInfoBars = this.props.voteDataList.map((item, index) => {
      return (
        item.display === false ? '' :
        <RegionBar {...item} areaTitles = {['State', 'District', 'Township']}
          canExpand = {item.subItemCount === 0 ? false : true} key = {index}/>
      );
    });
    return (
      <div className={'ContentArea'}>

        <SearchBar filters={['Region', 'Last Inpot']}/>
        <RegionBar isTitle={true}/>
        {voteInfoBars}
      </div>
    );
  }
}
