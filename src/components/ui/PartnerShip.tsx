import React from "react";

const logos = [
  "https://pngimg.com/d/car_logo_PNG1667.png",
  "https://www.freepnglogos.com/uploads/bmw-car-logo-png-brand-image-2.png",
  "https://www.designrush.com/uploads/users/customer-11/image_1526487017_D4nHpYcQEqJIECHp7VuoM7UR9XJw8GdGB0wdshls.png",
  "https://purepng.com/public/uploads/thumbnail//purepng.com-toyota-car-logologocar-brand-logoscarstoyota-car-logo-1701527428948jxuem.png",
  "https://listcarbrands.com/wp-content/uploads/2016/03/Mini-Logo.png",
  "https://car-logos.b-cdn.net/wp-content/uploads/2023/03/hyundai-logo-2011-present-1024x742.webp",
  "https://www.logo.wine/a/logo/Ford_of_Britain/Ford_of_Britain-Logo.wine.svg",
  "https://car-brand-names.com/wp-content/uploads/2019/09/Proton-logo.png",
  "https://purepng.com/public/uploads/thumbnail//purepng.com-nissan-car-logologocar-brand-logoscarsnissan-car-logo-1701527428763sqzkf.png",
  "https://1000logos.net/wp-content/uploads/2021/03/Mazda-logo.png",
  "https://www.carlogos.org/car-logos/suzuki-logo.png",
  "https://logos-world.net/wp-content/uploads/2022/02/Baojun-Logo.png",
  "https://pngimg.com/uploads/car_logo/car_logo_PNG1651.png",
];

const logoWidth = 150; 
const gap = 20; 
const animationDuration = 30; 

const PartnerShip = () => {
  return (
    <>
      <h1
        style={{
          padding: "30px",
          backgroundColor: "#fff",
          overflowX: "hidden",
          color: "black",
          textAlign: "center",
          fontStyle: "italic",
          fontSize:"2rem"
          
        }}
      >
        Our Partners
      </h1>
      <div
        style={{
          backgroundColor: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "300px",
          overflow: "hidden",
          position: "relative",
          padding: "30px",
        }}
      >
        <div
          style={{
            display: "flex",
            position: "absolute",
            alignItems: "center",
            justifyContent: "center",
            top: 62,
            left: "100%",
            animation: `logosAnimation ${animationDuration}s linear infinite`,
          }}
        >
          {logos.map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt={`Partner Logo ${index + 1}`}
              style={{
                width: `${logoWidth}px`,
                marginLeft: `${gap}px`,
                alignItems: "center",
                justifyContent: "center",
              }}
            />
          ))}
        </div>
        <style jsx>{`
          @keyframes logosAnimation {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(
                -${logoWidth * logos.length + gap * (logos.length - 1)}px
              );
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default PartnerShip;
