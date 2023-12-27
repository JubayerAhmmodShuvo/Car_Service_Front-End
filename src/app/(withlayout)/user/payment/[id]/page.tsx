"use client";
import { Card, Typography, Image, Row, Col } from "antd";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "@/components/CheckoutForm";
import { useGetBookingByIdQuery } from "@/redux/api/bookingApi";

const { Meta } = Card;
const { Text, Title } = Typography;

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const imageStyle = {
  width: "100%",
  height: "80%",
  
  objectFit: "cover" as "cover",
};

type IDProps = {
  params: any;
};

export default function Home({ params }: IDProps) {
  const { id: productId } = params;
 

  const { data: booking, isLoading } = useGetBookingByIdQuery(productId);

const product = {
  name: booking?.service?.title,
  price: booking?.service?.pricing,
  image: booking?.service?.images,
  _id: booking?.service?._id
};

  return (
    <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
      <Col xs={24} sm={22} md={20} lg={18} xl={16} xxl={14}>
        <Card className="w-full bg-base-100 shadow-xl mb-7">
          <div className="text-center" style={{ padding: "2rem" }}>
            <Title level={2} className="mb-2">
              Please Pay for{" "}
              <Text
                type="secondary"
                className="font-serif font-semibold text-purple-700"
              >
                {booking?.service?.title}
              </Text>
            </Title>
            <div className="flex justify-center items-center">
              <div className="w-24 h-24 overflow-hidden rounded-full mx-auto mb-4">
                <Image
                  className="w-full h-full object-cover"
                  src={booking?.service?.images}
                  alt="Product Image"
                  style={imageStyle}
                />
              </div>
            </div>
            <Title level={4} className="font-bold text-center mt-4">
              Total Amount: ${" "}
              <Text className="font-serif">{booking?.service?.pricing}</Text>
            </Title>
          </div>
        </Card>
        <Card className="flex-shrink-0 mb-16 shadow-2xl bg-base-100 p-6">
          <div className="card-body">
            <Elements stripe={stripePromise}>
              <PaymentForm product={product} />
            </Elements>
          </div>
        </Card>
      </Col>
    </Row>
  );
}
