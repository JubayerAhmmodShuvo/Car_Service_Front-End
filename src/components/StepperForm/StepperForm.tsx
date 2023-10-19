"use client";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/local-storage";
import { Button, message, Steps } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

interface ISteps {
  title?: string;
  content?: React.ReactElement | React.ReactNode;
}

interface IStepsProps {
  steps: ISteps[];
  persistKey: string;
  submitHandler: (el: any) => void;
  navigateLink?: string;
}

const StepperForm = ({
  steps,
  submitHandler,
  navigateLink,
  persistKey,
}: IStepsProps) => {
  const router = useRouter();

  const [current, setCurrent] = useState<number>(
    !!getFromLocalStorage("step")
      ? Number(JSON.parse(getFromLocalStorage("step") as string).step)
      : 0
  );

  const [savedValues, setSavedValues] = useState(
    !!getFromLocalStorage(persistKey)
      ? JSON.parse(getFromLocalStorage(persistKey) as string)
      : ""
  );

  useEffect(() => {
    setToLocalStorage("step", JSON.stringify({ step: current }));
  }, [current]);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const methods = useForm({ defaultValues: savedValues });
  const watch = methods.watch();

  useEffect(() => {
    setToLocalStorage(persistKey, JSON.stringify(watch));
  }, [watch, persistKey, methods]);

  const { handleSubmit, reset } = methods;

  const handleStudentOnSubmit = (data: any) => {
    submitHandler(data);
    reset();
    setToLocalStorage("step", JSON.stringify({ step: 0 }));
    setToLocalStorage(persistKey, JSON.stringify({}));
    navigateLink && router.push(navigateLink);
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Steps current={current} items={items} />
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(handleStudentOnSubmit)}
          style={{ textAlign: "center" }}
        >
          <div>{steps[current].content}</div>
          <div style={{ marginTop: 24 }}>
            {current > 0 && (
              <Button
                type="default"
                onClick={() => prev()}
                style={{ marginRight: 8 }}
              >
                Previous
              </Button>
            )}
            {current < steps.length - 1 && (
              <Button
                type="primary"
                onClick={() => next()}
                style={{ marginRight: 8 }}
              >
                Next
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button
                type="primary"
                htmlType="submit"
                onClick={() => message.success("Processing complete!")}
              >
                Done
              </Button>
            )}
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default StepperForm;
