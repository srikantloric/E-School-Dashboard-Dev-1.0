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
  { field: "due_amount", title: "Due" },
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
      return (
        <p
          style={{
            color: "var(--bs-white)",
            backgroundColor: `${
              rowData.payment_status === "paid"
                ? "var(--bs-success)"
                : "var(--bs-danger2)"
            }`,
            textAlign: "center",
            textTransform: "capitalize",
          }}
        >
          {rowData.payment_status}
        </p>
      );
    },
  },
];
