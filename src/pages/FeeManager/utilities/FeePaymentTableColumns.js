export const FEE_TABLE_COLS = [
  {
    field: "id",
    title: "Payment ID",
  },
  { field: "fee_title", title: "Fee Title" },
  { field: "fee_total", title: "Total" },
  { field: "discount_amount", title: "Disc." },
  { field: "late_fee", title: "Late Fee" },
  { field: "paid_amount", title: "Paid" },
  {
    field: "due_amount",
    title: "Due",
    render: (rowData) => {
      const dueAmount =
        parseInt(rowData.fee_total) -
        parseInt(rowData.paid_amount) +
        parseInt(rowData.late_fee);
      // console.log(dueAmount)
      return <p>{dueAmount}</p>;
    },
  },
  {
    field: "payment_status",
    title: "Status",
    render: (rowData) => {
      const styles = {
        width: 40,
        height: 40,
        borderRadius: "50%",
        cursor: "pointer",
        objectFit: "cover",
      };
      const dueAmount =
        parseInt(rowData.fee_total) -
        parseInt(rowData.paid_amount) +
        parseInt(rowData.late_fee);
      if (dueAmount === 0) {
        return (
          <p
            style={{
              color: "var(--bs-white)",
              backgroundColor: "var(--bs-success)",
              textAlign: "center",
              textTransform: "capitalize",
            }}
          >
            Paid
          </p>
        );
      } else {
        return (
          <p
            style={{
              color: "var(--bs-white)",
              backgroundColor: "var(--bs-danger2)",
              textAlign: "center",
              textTransform: "capitalize",
            }}
          >
            Due
          </p>
        );
      }
    },
  },
];
