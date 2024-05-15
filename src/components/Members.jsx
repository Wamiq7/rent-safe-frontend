/* eslint-disable react/destructuring-assignment */
import { Link } from "react-router-dom";

function Members(props) {
  return (
    <div className="flex md:flex-row flex-col w-full items-start justify-start">
      <Link
        to={props.to}
        className="flex items-center hover:text-accent justify-start gap-3 text-lg text-slate-800"
      >
        <img
          src={props.image}
          alt=""
          className={`${props.imageclass} rounded-full  object-cover aspect-square`}
        />
        <div className="flex flex-col">
          <div className="flex flex-col md:flex-row gap-2">

            <p>{'Name: '}</p>
            <h1 className={`${props.className} truncate w-[250px] md:w-full`}>
              {props.name}
            </h1>
          </div>
          <div className="flex flex-col md:flex-row gap-2">

            <p> {'Wallet:'}</p>
            <h1 className={`${props.className} truncate w-[250px] md:w-full`}>
              {props.walletAddress}
            </h1>
          </div>

          <div className="flex flex-col md:flex-row gap-2">

            <p>{props.estateName && 'Estate:'}</p>
            <h1 className={`${props.className} truncate w-[250px] md:w-full`}>
              {props.estateName}
            </h1>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Members;
