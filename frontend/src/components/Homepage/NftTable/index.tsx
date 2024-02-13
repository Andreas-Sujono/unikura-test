"use client";
import React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import { getComparator, stableSort } from "./utils";
import { useGetAllMintedNFT } from "@/api/nft";
import { NFTItem } from "@/types";
import Image from "next/image";
import { Typography } from "@mui/material";

const tableHeadData = [
  {
    label: "Token ID",
    key: "tokenId",
    sortable: false,
  },
  {
    label: "Name",
    key: "name",
    sortable: false,
  },
  {
    label: "Description",
    key: "description",
    sortable: false,
  },
  {
    label: "Chain",
    key: "chain",
    sortable: true,
  },
  {
    label: "Attributes",
    key: "attributes",
    sortable: false,
  },
  {
    label: "Score",
    key: "score",
    sortable: true,
  },
];

type OrderType = string;

interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
  order: "asc" | "desc";
  orderBy: string;
}

function NftTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;

  const createSortHandler =
    (property: string) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {tableHeadData.map((headCell) => (
          <TableCell
            key={headCell.key}
            align={"left"}
            padding={"normal"}
            sortDirection={orderBy === headCell.key ? order : false}
          >
            {headCell.sortable ? (
              <TableSortLabel
                active={orderBy === headCell.key}
                direction={orderBy === headCell.key ? order : "asc"}
                onClick={createSortHandler(headCell.key)}
              >
                <Typography color="text.secondary">{headCell.label}</Typography>
              </TableSortLabel>
            ) : (
              <Typography color="text.secondary">{headCell.label}</Typography>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function NftTable() {
  const [order, setOrder] = React.useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = React.useState<OrderType>("tokenId");

  const { data: nftMap } = useGetAllMintedNFT();
  const allNftItems = ([] as NFTItem[]).concat(...Object.values(nftMap || {}));

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: OrderType
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const visibleRows = React.useMemo(
    () =>
      stableSort<NFTItem>(
        allNftItems.map((item) => ({
          ...item,
          chain: item.chainMetadata.label,
          score: Number(
            item.attributes.find((item2) => item2.traitType === "Score")
              ?.value || 0
          ),
        })),
        getComparator(order, orderBy)
      ),
    [order, orderBy, allNftItems]
  );

  return (
    <Box maxWidth="lg" sx={{ margin: "auto", mt: "4rem" }}>
      <Typography sx={{ mb: "1rem" }} variant="h6" fontWeight={500}>
        All NFT
      </Typography>
      <Paper
        sx={{
          width: "100%",
          mb: 2,
          borderRadius: "0.5rem",
          background: "transparent",
        }}
      >
        <TableContainer>
          <Table sx={{ minWidth: 750, p: "1rem" }} size={"medium"}>
            <NftTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {visibleRows.map((row: NFTItem) => {
                return (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={row.tokenId + row.chainMetadata.label}
                  >
                    <TableCell align="left">{row.tokenId}</TableCell>
                    <TableCell align="left">
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                        }}
                      >
                        <Image
                          src={row.imageURL}
                          width={80}
                          height={80}
                          alt=""
                          style={{ borderRadius: "8px" }}
                        />
                        <Typography>{row.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        maxWidth: "300px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {row.description}
                    </TableCell>
                    <TableCell align="left">
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                        }}
                      >
                        <Image
                          src={row.chainMetadata.logoUrl}
                          width={24}
                          height={24}
                          alt=""
                        />
                        <Typography>{row.chainMetadata.label}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="left">
                      {row.attributes.map((item) => (
                        <ul
                          key={item.traitType}
                          style={{
                            listStyleType: "none",
                            margin: 0,
                            padding: 0,
                          }}
                        >
                          <li>
                            <Typography
                              color="text.secondary"
                              display="inline"
                              variant="body2"
                            >
                              {item.traitType}: &nbsp;
                            </Typography>
                            <Typography color="text.primary" display="inline">
                              {item.value}
                            </Typography>
                          </li>
                        </ul>
                      ))}
                    </TableCell>
                    <TableCell align="left">
                      <Typography
                        color="text.primary"
                        display="inline"
                        variant="h6"
                      >
                        {
                          row.attributes.find(
                            (item) => item.traitType === "Score"
                          )?.value
                        }
                      </Typography>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
