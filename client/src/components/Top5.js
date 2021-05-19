import { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import { Card, emphasize } from "@material-ui/core";
import { Animated } from "react-animated-css";
import "./Top5.css";
import firstPlace from '../img/firstplace.svg'
import Footer from "./Footer";

function Top5() {
  const [top, setTop] = useState([]);

  useEffect(() => {
    fetchTop5();
  }, []);

  const fetchTop5 = () => {
    fetch("https://api.succeedatfailing.com/top")
      .then((response) => response.json())
      .then((top) => {
        console.log(top);
        setTop(top);
      });
  };

  let topApps = top.map((app, index) => {
    let top = ''
    if(index == 0) {
        top = <img src={firstPlace} alt='firstPlaceRibbon' className='ribbonSvg'/>
    } else {
       top = <ranking># {index + 1}</ranking>
    }

    return (
      <div className="cardTop5Div">
        <Card className="cardTop5">
          <div className="cardContentDiv">
            {top}
            
            <br />
            <br />
            <Avatar
              alt="Remy Sharp"
              src={app.profileImage}
              className="avatar"
            />
            <br />
            <strong>{app.username}</strong> with <br />
            <strong className='boldApps'>{app.total_apps}</strong> Applications
            <br />
            <br />
          </div>
        </Card>
      </div>
    );
  });

  return (
    <div className="topBoxes" style={{ "text-align": "-webkit-center" }}>
      <Animated
        animationIn="bounceInUp"
        animationOut="fadeOut"
        isVisible={true}
      >
        <br />
        <h1>Top 5</h1>
        <br />
        <div className="top5Div">{topApps}</div>
      </Animated>
      <Footer />
    </div>
  );
}

export default Top5;
