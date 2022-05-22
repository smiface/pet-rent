import RootStore from "../../store/RootStore";
import style from './Login.module.scss';

function Login() {
    return ( 
       <div className={style.wrapper}>
            <button onClick={()=> RootStore.auth.login()}>Login</button>
       </div>
     );
}

export default Login;