import { Component } from 'react'
import { Button , Picker} from '@tarojs/components'
import './index.less'
import China_city from './china_city.json'



export default class Index extends Component {
  constructor(){
    super(...arguments)
    this.state = ({
      alls:[],
      Picker_key:[]
    })
  }

  componentWillMount () {
    this.getPickerCity([0,0,0])
   }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  getPickerCity(key){
        
    let province = new Array();//省
    let city = new Array();//市
    let county = new Array();//区

    //省
    China_city.forEach(provinces => {
        province.push(provinces['name'])
    });

    //市
    if(China_city[key[0]]['children']&&China_city[key[0]]['children'].length>0){
        China_city[key[0]]['children'].forEach(citys => {
            city.push(citys['name'])
        })
    }
    //区县
    China_city[key[0]]['children'][key[1]]['children'].forEach(countys => {
        county.push(countys['name'])
    });
    let alls = new Array();
    alls.push(province)
    alls.push(city)
    alls.push(county)
    this.setState({
        alls,
        Picker_key:key,
    })


    
  }
  changeChina(e){
    let {column,value} = e.detail
    switch (column) {
        case 0:
            this.getPickerCity([value,0,0])                    
            break;
        case 1:
            this.getPickerCity([this.state.Picker_key[0],value,0])
            break;
        case 2:
            this.getPickerCity([this.state.Picker_key[0],this.state.Picker_key[1],value])
            break;
        default:
            break;
    }
}
  render () {
    return (
      <>
        <Picker range={this.state.alls} mode='multiSelector' value={this.state.Picker_key}  onColumnChange={e => this.changeChina(e)}>
          <Button className='btns'>点击</Button> 
        </Picker>
      </>
    )
  }
}
