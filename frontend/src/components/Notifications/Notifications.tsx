import { observer } from "mobx-react-lite";
import { useEffect, useRef, useState } from "react";
import { TAlert } from "../../another/interfaces";
import RootStore from "../../store/RootStore";
import style from "./Notifications.module.scss";

function Notificate({ alert }: { alert: TAlert }) {
  const [marginLeft, setMarginLeft] = useState("0");
  const [alertStyle, setAlertStyle] = useState({ opacity: "1", transition: "0" });
  const alertRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      setMarginLeft("-100%");
    }, 10);
    
    setTimeout(() => {
      setAlertStyle({ transition: "0.3s", opacity: "0" });
      setTimeout(() => {
        RootStore.alerts.removeAlert(alert.id);
      }, 300);
    }, 3000);
  }, []);

  const handleClose = (e: any) => {
    if (alertRef && alertRef.current) {
      alertRef.current.style.transition = "0.3s";
      alertRef.current.style.opacity = "0";
    }
    setTimeout(() => {
      RootStore.alerts.removeAlert(alert.id);
    }, 300);
  };

  return (
    <div className={style.popup + " alert alert-" + alert.id} ref={alertRef} style={alertStyle}>
      <div className={style.alert_info}>
        <p>{alert.title}</p>
        <button onClick={(e) => handleClose(e)}>
          <b></b>
          <b></b>
        </button>
      </div>
      <div className={style.alert_lifetime}>
        <div style={{ marginLeft: marginLeft }}></div>
      </div>
    </div>
  );
}

function Notifications() {
  // useEffect(() => {
  //   setInterval(() => {
  //     RootStore.alerts.addAlert("test");
  //   }, 3000);
  // }, []);

  return (
    <div className={style.notifications}>
      {RootStore.alerts.array.map((alert) => (
        <Notificate alert={alert} key={alert.id} />
      ))}
    </div>
  );
}

export default observer(Notifications);
