"use client"

import React from "react";
import { Button, Collapse } from "antd";
import UMCollapse, { ItemProps } from "@/components/ui/UMCollapse";
import { useGetAllFaqQuery } from "@/redux/api/faqApi";
import Link from "next/link";
// Import UMCollapse and ItemProps

const { Panel } = Collapse;

const Page = () => {
  const { data: faqs } = useGetAllFaqQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
      pollingInterval: 6000,
    }
  );

 
  const formattedFaqs: ItemProps[] = faqs?.map((faq: { question: any; answer: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; }, index: { toString: () => any; }) => ({
    key: index.toString(), 
    label: faq.question,
    children: <p>{faq.answer}</p>,
  }));

  return (
    <div>
      <h1
        style={{
          textAlign: "center",
          margin: "20px 0px",
        }}
      >
        Everything people frequently ask here...
      </h1>
      <Link href={`faq/askhere`}>
        <Button
          style={{
            backgroundColor: "darkviolet",
            border: "none",
            width: "30%",
            margin: "auto",
            color: "white",
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
            marginBottom:"20px"
          }}
        >
          Ask Here
        </Button>
      </Link>
      <UMCollapse items={formattedFaqs} />
    </div>
  );
};

export default Page;
