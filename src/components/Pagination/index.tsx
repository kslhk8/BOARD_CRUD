import Pagination from "@mui/material/Pagination"

interface PaginationProps {
  count: number
  sx?: object
  variant?: "text" | "outlined" | undefined
  onChange: (event: React.ChangeEvent<unknown>, page: number) => void
  page: number
}
const pageComponentStyle = {
  marginTop: "24px",
  "& .MuiPaginationItem-root": {
    color: "black",
    borderColor: "black",
    "&.Mui-selected": {
      color: "black",
      borderColor: "black",
    },
  },
}
export default function PaginationItem({
  count,
  sx,
  variant,
  onChange,
  page,
}: PaginationProps) {
  return (
    <Pagination
      count={count}
      variant={variant || "outlined"}
      page={page}
      onChange={onChange}
      sx={sx || pageComponentStyle}
    />
  )
}
