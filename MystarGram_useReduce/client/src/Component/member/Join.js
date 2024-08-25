import React , {useState} from 'react'
import {useNavigate} from "react-router-dom";

function Join() {
    const [member , setMember] = useState({
        email : "" ,password : "" , passwordChk : "", nickname:"" , phone:"", intro:"", fileupload:null
    });
    const [imgSrc , setImgSrc] = useState("");
    const navigate = useNavigate();

    const setChange = (e) => {
        let { name, value } = e.target;
        setMember(prevMember => ({ ...prevMember, [name]: value }));
      };
    
    async function onsubmit(){
        let formdata = new FormData();
        Object.entries(member).forEach(([key, value]) =>{
            if (key === 'fileupload' && value === null) return;
            formdata.append(key , value);
        });

        try{

            let submitture = true;
            document.querySelectorAll(".invalid").forEach((elem)=>{
                let input = elem.querySelector("input");
                if(input.value === ""){
                    let labelText = elem.querySelector("label").innerText;
                    alert(labelText + "가 비어있 습니다.");
                    submitture = false;
                    throw new Error(labelText+"비어있음");
                }
                if(input.name === "passwordChk"){
                    if(input.value !== document.querySelector("input[name='password']").value){
                        alert("비밀번호와 비밀번호 확인이 틀립니다.");
                        submitture = false;
                        throw new Error("비밀번호와 비밀번호 확인이 틀립니다.");
                    }
                }
            });
    
            if(!submitture) return false;


            let response = await fetch("api/member/uploadFile",{ method:"POST", body:formdata});

            let result = await response.json();
            if(result.msg === "ok") {
                alert("회원가입 성공");
                navigate("/");
            }else{
                alert("이미 존재하는 닉네임입니다. 닉네임을 수정해주세요.");
                document.querySelector("input[name='nickname']").focus();
            }
            
        }catch(err){ console.error(err); }
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          setMember(prevMember => ({ ...prevMember, fileupload: file}));
    
          const reader = new FileReader();
          reader.onloadend = () => { setImgSrc(reader.result); };
          reader.readAsDataURL(file);
        }
      };

    return (
    <div className='loginform'>
        <div className='logo' style={{fontSize:"2.0rem"}}>
            Member Join
        </div>
        <div className='field invalid'>
            <label>E-MAIL</label>
            <input type="text" name='email' value={member.email} onChange={setChange} />
        </div>
        <div className='field invalid'>
            <label>PASSWORD</label>
            <input type="password" name='password' value={member.password} onChange={setChange} />
        </div>
        <div className='field invalid'>
            <label>RETYPE PASS</label>
            <input type="password" name='passwordChk' value={member.passwordChk} onChange={setChange} />
        </div>
        <div className='field invalid'>
            <label>NICKNAME</label>
            <input type="text" name='nickname' value={member.nickname} onChange={setChange} />
        </div>
        <div className='field'>
            <label>PHONE</label>
            <input type="text" name='phone' value={member.phone} onChange={setChange} />
        </div>
        <div className='field'>
            <label>INTRO</label>
            <input type="text" name='intro' value={member.intro} onChange={setChange} />
        </div>
        <div className='field'>
            <label>PROFILE-IMG</label>
            <input type="file" name='fileupload' onChange={handleFileChange} />
        </div>
        <div className='field'>
            <label>Profile img preview</label>
            <div><img src={imgSrc} style={{width:"200px"}} /></div>
        </div>
        <div className="btns">
            <button onClick={()=>{onsubmit()}}>JOIN</button>
            <button onClick={()=>{navigate('/')}}>BACK</button>
        </div>
    </div>
    )
}

export default Join
