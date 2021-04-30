import React,{useState} from 'react'
import ReactDOM from 'react-dom'
import settings from '../../img/settings-icon.png'

const WidgetSettings = (props) =>{
  const [widgetState,setWidgetState]= useState(props.widgetslist)
  console.log(props.widgetslist)
  const onChangeHandler = (e,index) =>{
    let widgets = [...widgetState]
    let newstate = ''
    
    if (e.target.checked ===false){
      newstate= false
    }
    else{
      newstate = true
    }
    widgets[index].state = newstate   
    setWidgetState(widgets)
  }

  const onSave = (event) => {
    props.updatedWidgetState(widgetState)
    event.preventDefault()
  }
    
  return (
    
    <div className="bg-white rounded-lg border-gray-200 m-10 w-8/12">
      <div className="flex">
        <img className="p-8" src={settings}/>
        <span className="text-primary-200 font-sans font-bold ml-8 py-6 pt-8">ウィジェット設定</span>
      </div>
      <div className="bg-gray-300 flex flex-justify grid-cols-2 justify-around font-bold text-center w-full">
        <span className="">ウィジェット名</span>
        <span text-center>表示</span>
      </div>
          
      <div>
        {
          widgetState.map((widget, index) => {
            return (<div key={index} className=" h-10 w-full py-6 text-gray-500 font-sans text-md mb-2 mt-2 pl-2 self-center overflow-hidden flex content-center">
              <span className=" col-span-1 w-6/12 pl-10"> {widget.label} </span>
              <span className="pl-60 col-span-1 w-6/12"> <input type="checkbox" className="bg-primary-200 border-primary-200 w-6 h-6" onChange={(e)=>onChangeHandler(e,index)} value={index} defaultChecked={widget.state}/></span>
            </div>)
          })
        }
      </div>
      <div className="flex justify-around py-16 ">
        <form onSubmit= {onSave}>
          
          <button className="rounded-xl text-white px-3 py-3 bg-primary-200 border-gray-300 content-center">保存する</button>
        </form>
      </div>
    </div>  

  )
}
export default WidgetSettings

if (document.getElementById('widgetSettings')){
  ReactDOM.render(<WidgetSettings/>,document.getElementById('widgetSettings'))
}