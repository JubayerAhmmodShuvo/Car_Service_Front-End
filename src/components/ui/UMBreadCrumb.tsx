import { Breadcrumb } from "antd";
import Link from "next/link";
import { HomeOutlined } from "@ant-design/icons";

const UMBreadCrumb = ({
  items,
  style, 
}: {
  items: {
    label: string;
    link: string;
  }[];
  style?: React.CSSProperties; 
}) => {
  const breadCrumbItems = [
    {
      title: (
        <Link href="/">
          <HomeOutlined />
        </Link>
      ),
    },
    ...items.map((item) => {
      return {
        title: item.link ? (
          <Link href={item.link}>{item.label}</Link>
        ) : (
          <span>{item.label}</span>
        ),
      };
    }),
  ];

  return (
    <div style={style}>
     
      <Breadcrumb items={breadCrumbItems}></Breadcrumb>
    </div>
  );
};

export default UMBreadCrumb;
