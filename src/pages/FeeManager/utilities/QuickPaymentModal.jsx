import React, { useEffect, useState } from "react";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import PrintIcon from "@mui/icons-material/Print";
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalClose,
  Option,
  Select,
  Sheet,
  Divider,
  Typography,
} from "@mui/joy";
import { db } from "../../../firebase";

function QuickPaymentModal({
  selectedRowData,
  userPaymentData,
  modelOpen,
  setModelOpen,
  paymentRemarks,
  setPaymentRemarks,
}) {
  function getCurrentDate(dateObj) {
    const currDate =
      dateObj.getFullYear() +
      "-" +
      (dateObj.getMonth() + 1) +
      "-" +
      dateObj.getDate();
    return currDate;
  }

  //   const [modelOpen, setModelOpen] = useState(false);
  const [remarkError, setRemarkError] = useState("");
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [sendSms, setSendSMS] = useState(true);
  const [paidAmountError, setPaidAmountError] = useState(false);
  const [paymentMode, setPaymentMode] = useState();
  const [paidAmount, setPaidAmount] = useState();
  const [paymentDate, setPaymentDate] = useState(getCurrentDate(new Date()));
  const [paymentStatus, setPaymentStatus] = useState();
  // const [paymentRemarks, setPaymentRemarks] = useState("");
  const [dueAmount, setDueAmount] = useState();

  useEffect(() => {
    if (selectedRowData) {
      const due =
        parseInt(selectedRowData.fee_total) -
        parseInt(selectedRowData.paid_amount) +
        parseInt(selectedRowData.late_fee);

      setPaymentDate(getCurrentDate(selectedRowData.payment_date.toDate()));
      setDueAmount(due);
      setPaymentMode(selectedRowData.payment_mode);

      if (due === 0) {
        setPaymentStatus(true);
      } else {
        setPaymentStatus(false);
      }
    }
  }, [selectedRowData]);

  const handlePayBtn = () => {
    setPaymentLoading(true);
    setPaidAmountError(false);
    if (paidAmount) {
      const paymentData = {
        payment_date: new Date(paymentDate),
        payment_remarks: paymentRemarks,
        payment_mode: paymentMode,
        paid_amount:
          parseInt(selectedRowData.paid_amount) + parseInt(paidAmount),
      };
      if (userPaymentData.id && selectedRowData.doc_id) {
        db.collection("STUDENTS")
          .doc(userPaymentData.id)
          .collection("PAYMENTS")
          .doc(selectedRowData.doc_id)
          .update(paymentData)
          .then((data) => {
            setPaymentLoading(false);
            setPaymentStatus(true)
          });
      }
    } else {
      setPaidAmountError(true);
      setPaymentLoading(false);
    }
  };

  return (
    <div>
      {selectedRowData ? (
        <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
          open={modelOpen}
          onClose={() => setModelOpen(false)}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Sheet
            variant="outlined"
            sx={{
              width: 550,
              minHeight: 600,
              borderRadius: "md",
              p: 3,
              boxShadow: "lg",
            }}
          >
            <ModalClose variant="plain" sx={{ m: 1 }} />
            <div style={{ display: "flex" }}>
              <ElectricBoltIcon />
              <Typography level="title-lg" mb={1}>
                Quick Payment
              </Typography>
            </div>
            <Divider />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
                height: 550,
              }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex" }}>
                  <div>
                    <Typography level="body-md" sx={{ mt: 1 }}>
                      Payment ID :
                    </Typography>
                    <Typography level="body-md">Payment Title :</Typography>
                    <Typography level="body-md">Payable Amount :</Typography>
                    <Typography level="body-md">Late Fee:</Typography>
                  </div>
                  <div style={{ marginLeft: "20px" }}>
                    <Typography level="body-md" sx={{ mt: 1, fontWeight: 700 }}>
                      {selectedRowData.id}
                    </Typography>
                    <Typography level="body-md">
                      Payment for {selectedRowData.fee_title}
                    </Typography>
                    <Typography level="body-md">
                      Rs. {selectedRowData.fee_total}
                    </Typography>
                    <Typography level="body-md">
                      Rs. {selectedRowData.late_fee}
                    </Typography>
                  </div>
                </div>
                <div style={{ marginTop: "30px" }}>
                  <FormControl>
                    <FormLabel>Remarks</FormLabel>
                    <Input
                      value={paymentRemarks}
                      onChange={(e) => {
                        setPaymentRemarks(e.currentTarget.value);
                      }}
                      disabled={paymentStatus}
                      placeholder="Please enter remark for payment"
                    />
                    <FormHelperText>{remarkError}</FormHelperText>
                  </FormControl>

                  <FormControl sx={{ mt: 1 }}>
                    <FormLabel required>Payment Date</FormLabel>
                    <Input
                      disabled={paymentStatus}
                      type="date"
                      value={paymentDate}
                      required
                      onChange={(e) => setPaymentDate(e.currentTarget.value)}
                    />
                  </FormControl>
                  <FormControl sx={{ mt: 1 }}>
                    <FormLabel required>Send SMS</FormLabel>
                    <Select defaultValue="yes">
                      <Option value="no" disabled={paymentStatus}>
                        No
                      </Option>
                      <Option value="yes" disabled={paymentStatus}>
                        Yes
                      </Option>
                    </Select>
                  </FormControl>
                  <FormControl sx={{ mt: 1 }}>
                    <FormLabel required>Mode Of Payment</FormLabel>
                    <Select
                      value={paymentMode}
                      onChange={(e, newVal) => {
                        setPaymentMode(newVal);
                      }}
                    >
                      <Option value="cash" disabled={paymentStatus}>
                        Cash
                      </Option>
                      <Option value="online" disabled={paymentStatus}>
                        Online
                      </Option>
                    </Select>
                  </FormControl>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography level="h3" sx={{ color: "var(--bs-danger2)" }}>
                  Rs. {dueAmount}
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: 400,
                      marginLeft: "4px",
                    }}
                  >
                    Due
                  </span>
                </Typography>

                <div style={{ display: "flex", alignItems: "center" }}>
                  {paymentStatus ? (
                    <Button startDecorator={<PrintIcon />}>Print Recipt</Button>
                  ) : (
                    <>
                      <Typography>Pay -</Typography>
                      <Input
                        disabled={paymentStatus}
                        placeholder="enter amount"
                        value={paidAmount}
                        error={paidAmountError}
                        onChange={(e) => {
                          setPaidAmount(e.currentTarget.value);
                        }}
                        sx={{ ml: 1 }}
                      />

                      <Button
                        variant="solid"
                        disableElevation
                        sx={{ ml: 2 }}
                        color="success"
                        loading={paymentLoading}
                        onClick={handlePayBtn}
                        disabled={paymentStatus}
                      >
                        Pay Now
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
            {paymentStatus ? (
              <img
                style={{ position: "absolute", top: 70, right: 50 }}
                height={100}
                src="https://firebasestorage.googleapis.com/v0/b/orient-public-school.appspot.com/o/Dummy%20Images%2Fpaid2.png?alt=media&token=208e9ef0-2ad8-4016-beec-507b21af2221"
              ></img>
            ) : null}
          </Sheet>
        </Modal>
      ) : (
        "loading"
      )}
    </div>
  );
}

export default QuickPaymentModal;
