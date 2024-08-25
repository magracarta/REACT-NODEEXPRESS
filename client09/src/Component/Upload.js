import React ,{useState} from 'react'

function Upload(props) {

  const [content, setContent] = useState(""); 

  let changeContent = (e)=> setContent(e.target.value);
  
  let onSubmit = ()=>{
    props.setContentList(prev => [...prev, content]);
    setContent("");
  }
  return (
    <div style={{display:"felx", flexDirection:"row", justifyContent:"center"}}>
        <input type ="text" value={content} onChange={changeContent}/>
        <button onClick={onSubmit}>전송</button>
    </div>
  )
}

export default Upload
