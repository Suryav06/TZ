import React, { useState } from "react";
import countryList from 'react-select-country-list';
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Typography,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Select,
  Option,
  Dialog,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import {
  CreditCardIcon,
  LockClosedIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";


function Payment() {
  const [type, setType] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpires, setCardExpires] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [showPaymentSuccessDialog, setShowPaymentSuccessDialog] = useState(false);
  const [showOrderPlacedDialog, setShowOrderPlacedDialog] = useState(false);
  const countries = countryList().getData();

  const formatCardNumber = (value) => {
    return value.replace(/\s+/g, '').replace(/(\d{4})/g, '$1 ').trim();
  };

  const formatExpires = (value) => {
    return value.replace(/^(\d{2})(\d{2})$/, '$1/$2');
  };

  const handlePayment = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsPaymentSuccessful(true);
      setShowPaymentSuccessDialog(true);
      
    }, 2000); 
  };

  const handleOrderPlacement = () => {
    setShowPaymentSuccessDialog(false);
    setShowOrderPlacedDialog(true);
    setIsOrderPlaced(true);
   
  };
  

  return (
    <div className="flex justify-center items-center bg-gray-100 mb-2">
      <Card className="w-full max-w-[20rem]">
        <CardHeader
          color="gray"
          floated={false}
          shadow={false}
          className="m-0 grid place-items-center px-2 py-4 text-center"
        >
          <div className="mb-2 h-16 p-4 text-white">
            {type === "card" ? (
              <CreditCardIcon className="h-8 w-8 text-white" />
            ) : (
              <img alt="paypal" className="w-10" src="https://docs.material-tailwind.com/icons/paypall.png" />
            )}
          </div>
          <Typography variant="h5" color="white">
            Payment
          </Typography>
        </CardHeader>
        <CardBody>
          <Tabs value={type} className="overflow-hidden">
            <TabsHeader className="relative z-0">
              <Tab value="card" onClick={() => setType("card")}>
                Card
              </Tab>
              <Tab value="paypal" onClick={() => setType("paypal")}>
                PayPal
              </Tab>
            </TabsHeader>
            <TabsBody
              className="!overflow-x-hidden !overflow-y-hidden"
              animate={{
                initial: {
                  x: type === "card" ? 200 : -200,
                },
                mount: {
                  x: 0,
                },
                unmount: {
                  x: type === "card" ? 200 : -200,
                },
              }}
            >
              <TabPanel value="card" className="p-0">
                <form className="mt-4 flex flex-col gap-2">
                  <div>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-1 font-medium"
                    >
                      Email
                    </Typography>
                    <Input
                      type="email"
                      placeholder="name@mail.com"
                      className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                  </div>

                  <div className="my-2">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-1 font-medium"
                    >
                      Card Details
                    </Typography>

                    <Input
                      maxLength={19}
                      value={formatCardNumber(cardNumber)}
                      onChange={(event) => setCardNumber(event.target.value)}
                      icon={
                        <CreditCardIcon className="absolute left-0 h-4 w-4 text-blue-gray-300" />
                      }
                      placeholder="0000 0000 0000 0000"
                      className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                    <div className="my-2 flex items-center gap-2">
                      <div>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="mb-1 font-medium"
                        >
                          Expires
                        </Typography>
                        <Input
                          maxLength={5}
                          value={formatExpires(cardExpires)}
                          onChange={(event) => setCardExpires(event.target.value)}
                          containerProps={{ className: "min-w-[60px]" }}
                          placeholder="00/00"
                          className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                          labelProps={{
                            className: "before:content-none after:content-none",
                          }}
                        />
                      </div>
                      <div>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="mb-1 font-medium"
                        >
                          CVC
                        </Typography>
                        <Input
                          maxLength={4}
                          containerProps={{ className: "min-w-[60px]" }}
                          placeholder="000"
                          className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                          labelProps={{
                            className: "before:content-none after:content-none",
                          }}
                        />
                      </div>
                    </div>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-1 font-medium"
                    >
                      Holder Name
                    </Typography>
                    <Input
                      placeholder="John Doe"
                      className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                  </div>
                  <Button size="sm" onClick={handlePayment}>Pay Now</Button>
                  <Typography
                    variant="small"
                    color="gray"
                    className="mt-2 flex items-center justify-center gap-2 font-medium opacity-60"
                  >
                    <LockClosedIcon className="-mt-0.5 h-4 w-4" /> Payments are
                    secure and encrypted
                  </Typography>
                </form>
              </TabPanel>
              <TabPanel value="paypal" className="p-0">
                <form className="mt-4 flex flex-col gap-2">
                  <div>
                    <Typography
                      variant="paragraph"
                      color="blue-gray"
                      className="mb-2 font-medium"
                    >
                      Personal Details
                    </Typography>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-1 font-medium"
                    >
                      Email
                    </Typography>
                    <Input
                      type="email"
                      placeholder="name@mail.com"
                      className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                  </div>

                  <div className="my-2">
                    <Typography
                      variant="paragraph"
                      color="blue-gray"
                      className="mb-2 font-medium"
                    >
                      Billing Address
                    </Typography>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-1 font-medium"
                    >
                      Country
                    </Typography>

                    <Select
                      placeholder="Select your country"
                      className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      menuProps={{ className: "h-36" }}
                    >
                      {countries.map(({ label, value }) => (
                        <Option key={value} value={value}>
                          <div className="flex items-center gap-x-2">
                            {label}
                          </div>
                        </Option>
                      ))}
                    </Select>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mt-2 -mb-1 font-medium"
                    >
                      Postal Code
                    </Typography>
                    <Input
                      placeholder="0000"
                      className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      containerProps={{ className: "mt-2" }}
                    />
                  </div>
                  <Button size="sm" onClick={handlePayment} >Pay with PayPal</Button>
                  
                  <Typography
                    variant="small"
                    color="gray"
                    className="flex items-center justify-center gap-2 font-medium opacity-60"
                  >
                    <LockClosedIcon className="-mt-0.5 h-4 w-4" /> Payments are
                    secure and encrypted
                  </Typography>
                </form>
              </TabPanel>
            </TabsBody>
          </Tabs>
        </CardBody>
      </Card>

      {/* Loading Screen */}
      {isLoading && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-4 rounded">
            <Typography variant="h6">Processing Payment...</Typography>
          </div>
        </div>
      )}

      {/* Payment Success Dialog */}
      <Dialog open={showPaymentSuccessDialog} handler={setShowPaymentSuccessDialog}>
        <DialogBody>
          <Typography variant="h6">Payment Done Successfully!</Typography>
        </DialogBody>
        <DialogFooter>
          <Button color="blue" onClick={handleOrderPlacement}>
            OK
          </Button>
        </DialogFooter>
      </Dialog>

      
      <Dialog open={showOrderPlacedDialog} handler={setShowOrderPlacedDialog}>
        <DialogBody>
          <Typography variant="h6">Order Placed Successfully!</Typography>
        </DialogBody>
        <DialogFooter>
        <Link to={"/"}><Button color="blue" onClick={() => setShowOrderPlacedDialog(false)}>
            OK
          </Button></Link> 
        </DialogFooter>
      </Dialog>
    </div>
  );
}

export default Payment;
