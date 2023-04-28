import "./LoadingAction.css";
import { Oval } from 'react-loader-spinner'
const LoadingAction = () => {

    return (
        <div className="LoadingActionWrapper">
            <Oval
  height={70}
  width={70}
  color="#9B2915"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  ariaLabel='oval-loading'
  secondaryColor="#ff000000"
  strokeWidth={2}
  strokeWidthSecondary={2}

/> 
        </div>
    )
}

export default LoadingAction;