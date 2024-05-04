import insideOne from "../images/image1.jpeg";
// import insideTwo from "../images/Door_colors.jpg";
// import insideTwo from "../images/Door_color.jpg";

const Scenes = {
  insideOne: {
    // title: "interior 1",
    image: insideOne,
    pitch: -11,
    yaw: -3,
    hotSpot: {
      flowerVase: {
        type: "custom",
        pitch: 16.28,
        yaw: 17.66,
        // nameModel: "flowerVase",
        cssClass: "hotSpotElement",
      },
    },
  },
};

export default Scenes;
