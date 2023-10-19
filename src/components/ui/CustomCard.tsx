import React from "react";
import { Card, Button, Rate } from "antd";

const { Meta } = Card;
import Link from "next/link";

interface CustomCardProps {
  image: string;
  title: string;
  price: number;
  rating: number;
  availability: boolean;
  onAddToCart: () => void;
  onDetails: () => void;
  serviceId: string | undefined;
}

const CustomCard: React.FC<CustomCardProps> = ({
  image,
  title,
  price,
  rating,
  availability,
  onAddToCart,
  onDetails,
  serviceId,
}) => (
  <Card
    hoverable
    style={{ width: "100%", maxWidth: "80%", margin: "20px auto" }}
  >
    <style>
      {`
        @media (max-width: 576px) {
          .ant-card {
            width: 100%;
          }
        }
      `}
    </style>
    <div style={{ position: "relative" }}>
      <img alt={title} src={image} style={{ width: "100%", height: "200px" }} />
      {availability ? (
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            background: "green",
            color: "white",
            padding: "4px 8px",
          }}
        >
          Available
        </div>
      ) : (
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            background: "red",
            color: "white",
            padding: "4px 8px",
          }}
        >
          Not Available
        </div>
      )}
    </div>
    <Meta title={title} description={`Price: $${price}`} />
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div
        style={{
          margin: "7px 0px",
        }}
      >
        <Rate allowHalf disabled defaultValue={rating} />
      </div>
    </div>
    <div
      style={{
        display: "flex",
        margin: "10px 0",
        justifyContent: "space-between",
      }}
    >
      <Link href={`/user/booking/${serviceId}`}>
        <Button type="primary" onClick={onAddToCart}>
          Add to Booking
        </Button>
      </Link>

      <Link href={`/viewservice/${serviceId}`}>
        {/* <Button>Details</Button> */}
        <Button onClick={onDetails}>Details</Button>
      </Link>
    </div>
  </Card>
);

export default CustomCard;
