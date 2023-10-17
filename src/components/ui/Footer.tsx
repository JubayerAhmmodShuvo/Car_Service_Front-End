"use client"
import { Col, Divider, Row } from "antd";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <div
        style={{
          fontSize: "16px",
          backgroundColor: "#001529",
          color: "white",
          padding: "30px 0px",
          margin: "0px 0px 5px 0px",
          textAlign: "center",
          overflowX: "hidden"
        }}
      >
        <Row justify="center" gutter={16}>
          <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <div>
              <p>Popular Searches</p>
              <ul
                style={{
                  listStyle: "none",
                  margin: "10px 0px",
                  padding: 0,
                  fontSize: "18px",
                  color: "white",
                }}
              >
                <li>
                  <Link
                    style={{
                      margin: "9px 0px 10px 0px",
                    }}
                    href="#"
                  >
                    Long Term Service
                  </Link>
                </li>
                <li>
                  <Link
                    style={{
                      margin: "9px 0px 10px 0px",
                    }}
                    href="#"
                  >
                    Short Time Service
                  </Link>
                </li>
                <li>
                  <Link
                    style={{
                      margin: "9px 0px 10px 0px",
                    }}
                    href="#"
                  >
                    Free Service
                  </Link>
                </li>
                <li>
                  <Link
                    style={{
                      margin: "9px 0px 10px 0px",
                    }}
                    href="#"
                  >
                    Service Packages
                  </Link>
                </li>
              </ul>
            </div>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <div>
              <p>Popular Destinations</p>
              <ul
                style={{
                  listStyle: "none",
                  margin: "10px 0px",
                  padding: 0,
                  fontSize: "18px",
                  color: "white",
                }}
              >
                <li>
                  <Link
                    style={{
                      margin: "9px 0px 10px 0px",
                    }}
                    href="#"
                  >
                    Dhaka
                  </Link>
                </li>
                <li>
                  <Link
                    style={{
                      margin: "9px 0px 10px 0px",
                    }}
                    href="#"
                  >
                    Sylhet
                  </Link>
                </li>
                <li>
                  <Link
                    style={{
                      margin: "9px 0px 10px 0px",
                    }}
                    href="#"
                  >
                    Brahmanbaria
                  </Link>
                </li>
                <li>
                  <Link
                    style={{
                      margin: "9px 0px 10px 0px",
                    }}
                    href="#"
                  >
                    Comilla
                  </Link>
                </li>
              </ul>
            </div>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <div>
              <p>Partners</p>
              <ul
                style={{
                  listStyle: "none",
                  margin: "10px 0px",
                  padding: 0,
                  fontSize: "18px",
                  color: "white",
                }}
              >
                <li>
                  <Link
                    style={{
                      margin: "9px 0px 10px 0px",
                    }}
                    href="#"
                  >
                    Toyota
                  </Link>
                </li>
                <li>
                  <Link
                    style={{
                      margin: "9px 0px 10px 0px",
                    }}
                    href="#"
                  >
                    Auto Rental
                  </Link>
                </li>
                <li>
                  <Link
                    style={{
                      margin: "9px 0px 10px 0px",
                    }}
                    href="#"
                  >
                    Car BD
                  </Link>
                </li>
                <li>
                  <Link
                    style={{
                      margin: "9px 0px 10px 0px",
                    }}
                    href="#"
                  >
                    House Of Car
                  </Link>
                </li>
                <li>
                  <Link
                    style={{
                      margin: "6px 0px",
                    }}
                    href="#"
                  >
                    Maven Autos
                  </Link>
                </li>
              </ul>
            </div>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <div>
              <p>Company Info</p>
              <ul
                style={{
                  listStyle: "none",
                  margin: "10px 0px",
                  padding: 0,
                  fontSize: "18px",
                  color: "white",
                }}
              >
                <li>
                  <Link
                    style={{
                      margin: "9px 0px 10px 0px",
                    }}
                    href="#"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    style={{
                      margin: "9px 0px 10px 0px",
                    }}
                    href="#"
                  >
                    Budget Careers
                  </Link>
                </li>
                <li>
                  <Link
                    style={{
                      margin: "9px 0px 10px 0px",
                    }}
                    href="#"
                  >
                    Copyright Notices
                  </Link>
                </li>
                <li>
                  <Link
                    style={{
                      margin: "9px 0px 10px 0px",
                    }}
                    href="#"
                  >
                    Terms of Use
                  </Link>
                </li>
                <li>
                  <Link
                    style={{
                      margin: "9px 0px 10px 0px",
                    }}
                    href="#"
                  >
                    Your Privacy Choices
                  </Link>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
        <p>
          Developed By  
          <Link
            style={{
              color: "red",
              fontSize: "1rem",
              margin: "9px 0px",
              padding:"6px"
            }}
            href="https://github.com/JubayerAhmmodShuvo"
            target="_blank" rel="noopener noreferrer"
          >
               Jubayer Ahmmod Shuvo
        
          </Link>
        </p>
      </div>
    </>
  );
};

export default Footer;
