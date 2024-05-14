import React from "react";
import { FaMapMarkerAlt, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function AboutCard(props) {
  const commonColorStyle = "text-blue-500";
  const priceBoxStyle = "bg-green-500 text-white rounded-full px-2 py-1";
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate(`/properties/${props.id}`);
      }}
      className="flex z-49 flex-col bg-red
                  backdrop-blur-2xl
             rounded-3xl gap-5 bg-slate-400/5 items-center border relative border-slate-300/50 hover:bg-slate-400/20 p-5 transition-all duration-200"
    >
      <div className="img">
        <img
          src={props.image}
          alt={props.name}
          className="rounded-3xl w-[105%]"
        />
      </div>
      <div className="text flex flex-col w-full">
        <div className="category flex justify-between items-start mb-2">
          <span
            style={{
              background:
                props.category === "For Sale" ? "#25b5791a" : "#ff98001a",
              color: props.category === "For Sale" ? "#25b579" : "#ff9800",
            }}
          >
            {props.category}
          </span>
          <FaHeart className="text-xl" />
        </div>
        <h2
          className={`text-left capitalize font-bold ${commonColorStyle} text-2xl drop-shadow font-sans shadow-accent mt-2`}
        >
          {props.name}
        </h2>
        <p className={`flex items-center mt-1 ${commonColorStyle} `}>
          <FaMapMarkerAlt className="hover:text-blue-600 mr-2 text-xl" />
          <span className="text-lg">{props.location}</span>
        </p>
        <div className="button flex"></div>
        <div className={`${commonColorStyle} flex items-center mt-10 ml-1`}>
          <div className={priceBoxStyle}>{props.price}</div>
          <span className="ml-1">/Month</span>
          <span className={`${commonColorStyle} ml-auto`}>{props.type}</span>
        </div>
      </div>
    </div>
  );
}
