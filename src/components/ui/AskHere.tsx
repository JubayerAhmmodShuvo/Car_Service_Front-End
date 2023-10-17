import React from "react";
import { Row, Col,  Input, Button, message } from "antd";
import FormTextArea from "../FORMS/FormTextArea";
import { useCreateFaqMutation } from "@/redux/api/faqApi";
import Form from "../FORMS/Form";

const AskHere = () => {

   const [create, { error }] = useCreateFaqMutation();
   const onSubmit = async (values: any) => {
     try {
       const formData = new FormData();

       for (const key in values) {
         if (values.hasOwnProperty(key)) {
           formData.append(key, values[key]);
         }
       }

       message.loading("Creating...");
       const response = await create(formData);

       if (response) {
         message.success("Faq's created successfully!");
       } else {
         message.error("Faq's creation failed.");
       }
     } catch (err: any) {
       console.error(err.message);
     }
   };
  return (
    <div style={{ backgroundColor: "", overflowX: "hidden" }}>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={12} lg={12}>
          <img
            src="https://staticsb.we.org/f/52095/3000x2880/ac250fd823/you-ask-we-answer-mobile.jpg"
            alt="Your Image"
            style={{ width: "100%", height: "400px" }}
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div style={{ overflowX: "hidden"}}>
            <Form submitHandler={onSubmit}  >
              <div
                style={{
                  border: "1px solid #d9d9d9",
                  borderRadius: "5px",
                  padding: "15px",
                  margin: "35px",
                }}
              >
                <h1
                  style={{
                    fontSize: "18px",
                    fontWeight: "500",
                    margin: "5px 0px",
                    textAlign: "center",
                    fontStyle: "italic",
                    
                  }}
                >
                  Ask Anything you want
                </h1>
                <Row>
                  <Col
                    xs={24}
                    sm={24}
                    md={24}
                    lg={24}
                    xl={24}
                    style={{ margin: "50px 0" }}
                  >
                    <FormTextArea
                      name="question"
                      label=""
                      rows={4}
                    />
                  </Col>
                </Row>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "30px",
                }}
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                    backgroundColor: "darkviolet",
                    border: "none",
                    width: "30%",
                  }}
                >
                  Ask
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AskHere;
