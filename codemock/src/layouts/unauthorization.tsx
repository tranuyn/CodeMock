import { Button } from "@mui/material";
import { green } from "@mui/material/colors";

// pages/unauthorized.js  (or app/unauthorized/page.tsx)
const urlBG =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdCeaHABEg62_q1oDbND5Gi8trDQTW8POt3F5AKMBAJbDyVw0yxhSIdPKV-LpZsGbW0h4&usqp=CAU";
function Unauthorized() {
  return (
    <div
      style={{
        position: "fixed",
        minHeight: "100vh",
        top: 0,
        zIndex: -10,
        backgroundColor: "#e5f6ff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        minWidth: "100vw",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <img src={`${urlBG}`} style={{ width: "30%" }} />
        <h1
          style={{
            fontSize: 20,
            fontWeight: "500",
          }}
        >
          Bạn không có quyền truy cập tài nguyên này
        </h1>
      </div>
    </div>
  );
}

export default Unauthorized;
