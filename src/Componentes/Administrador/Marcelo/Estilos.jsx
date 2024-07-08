import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import Pagination from "@mui/material/Pagination";
import Grid from "@mui/material/Grid";

// Buscador
export const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius * 2,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    [theme.breakpoints.up("sm")]: {
        width: "auto",
    },
    border: "2px solid #C9C9C9",
    width: "auto",
}));

export const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    width: "100%",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        [theme.breakpoints.up("sm")]: {
            width: "50ch",
            "&:focus": {
                width: "100ch",
            },
        },
    },
}));

// Tabla de usuarios
export const TransparentTableContainer = styled(TableContainer)({
    backgroundColor: "transparent",
    overflow: "hidden",
    height: "auto", //lo dejo asi por el momento
});

export const TransparentTable = styled(Table)({
    border: "1px solid transparent",
    margin: "10px",
    padding: "5px",
});

export const TransparentTableCell = styled(TableCell)({
    borderBottom: "none",
    color: "black",
    padding: "5px",
});

export const FirstRowTableCell = styled(TransparentTableCell)({
    fontWeight: "bold",
    padding: "10px 5px 10px 5px",
});

// Paginación
export const PaginationContainer = styled(Grid)({
    display: "flex",
    justifyContent: "flex-end",
});

export const CustomPagination = styled(Pagination)({
    "& .MuiPaginationItem-root": { border: "none" },
    "& .MuiPaginationItem-root:hover": { backgroundColor: "#a6d4f2" },
});
